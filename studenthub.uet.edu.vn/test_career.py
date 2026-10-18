"""Career API integration tests, always using a disposable database.

Run: python -B test_career.py
The existing studenthub.db is never opened or changed by this suite.
"""
import contextlib
import io
import json
import os
from pathlib import Path
import tempfile
import threading
import unittest
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parent
(ROOT / "tmp").mkdir(exist_ok=True)
TEMP = tempfile.TemporaryDirectory(prefix="career-tests-", dir=ROOT / "tmp")
os.environ["STUDENTHUB_DB_PATH"] = str(Path(TEMP.name) / "test.db")

import backend
import career_backend as career
from server import StudentHubServer
from http.server import ThreadingHTTPServer


class QuietHandler(StudentHubServer):
    def log_message(self, *args):
        pass


class CareerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), QuietHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base = "http://127.0.0.1:%d" % cls.server.server_port

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def setUp(self):
        with backend.get_db() as conn:
            conn.execute("DELETE FROM career_profiles")
            conn.execute("DELETE FROM learning_roadmaps")

    def request(self, path, body=None):
        req = urllib.request.Request(self.base + "/api/career/" + path,
                                     data=None if body is None else json.dumps(body).encode(),
                                     headers={"Content-Type": "application/json"})
        try:
            response = urllib.request.urlopen(req)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            return response.status, json.loads(response.read())

    def get(self, path):
        status, response = self.request(path)
        self.assertEqual(status, 200, response)
        return response["data"]

    def post(self, path, body):
        status, response = self.request(path, body)
        self.assertEqual(status, 200, response)
        return response["data"]

    def complete_profile(self, interest="ai", goal="data"):
        profile = career.empty_profile()
        profile.update(interests=[interest], ratings={skill["id"]: 3 for skill in career.SKILLS},
                       goal=goal, postgraduate="maybe", step=3, completed=True)
        self.post("profile", {"profile": profile})
        return profile

    def test_01_new_profile_has_unanswered_skills(self):
        state = self.get("profile")
        self.assertEqual(state["profile"]["ratings"], {})
        self.assertFalse(state["profile"]["completed"])
        self.assertEqual(self.get("recommendations"), [])

    def test_02_draft_resumes_exactly(self):
        profile = career.empty_profile()
        profile.update(interests=["ai", "research"], ratings={"math": 4}, step=2)
        self.post("profile", {"profile": profile})
        self.assertEqual(self.get("profile")["profile"], profile)
        self.assertEqual(self.get("recommendations"), [])

    def test_03_incomplete_profile_cannot_be_completed(self):
        profile = career.empty_profile()
        profile["completed"] = True
        self.assertEqual(self.request("profile", {"profile": profile})[0], 400)

    def test_04_invalid_ratings_rejected(self):
        for ratings in ({"math": 0}, {"math": 6}, {"math": True}, {"math": 2.5}, {"made-up": 4}):
            profile = career.empty_profile()
            profile["ratings"] = ratings
            self.assertEqual(self.request("profile", {"profile": profile})[0], 400)

    def test_05_ranking_explained_and_deterministic(self):
        self.complete_profile()
        ranking = self.get("recommendations")
        self.assertEqual(len(ranking), 6)
        self.assertEqual(ranking[0]["roleId"], "ai-data-engineer")
        self.assertEqual(ranking, self.get("recommendations"))
        for result in ranking:
            self.assertTrue(0 <= result["score"] <= 100)
            self.assertEqual(result["score"], sum(result["breakdown"].values()))
            self.assertTrue(result["reasons"])
            self.assertTrue(result["gaps"])

    def test_06_answers_change_the_recommended_role(self):
        self.complete_profile("security", "security")
        self.assertEqual(self.get("recommendations")[0]["roleId"], "cyber-security")
        self.complete_profile("product", "startup")
        self.assertEqual(self.get("recommendations")[0]["roleId"], "product-manager")

    def test_07_saved_roles_survive_profile_updates(self):
        self.post("saved-roles", {"roleId": "ai-data-engineer", "saved": True})
        self.complete_profile()
        self.assertEqual(self.get("profile")["savedRoleIds"], ["ai-data-engineer"])
        self.post("saved-roles", {"roleId": "ai-data-engineer", "saved": False})
        self.assertEqual(self.get("profile")["savedRoleIds"], [])

    def test_08_plans_cover_each_course_once_and_start_unfinished(self):
        for role in self.get("roles"):
            plan = self.get("plan?roleId=" + role["id"])
            courses = [item["courseCode"] for stage in plan["stages"] for item in stage["items"] if item.get("courseCode")]
            self.assertCountEqual(courses, [course["courseCode"] for course in role["courseMappings"]])
            self.assertEqual(len(courses), len(set(courses)))
            self.assertFalse(any(item["done"] for stage in plan["stages"] for item in stage["items"]))
            self.assertEqual(plan["stages"][0]["status"], "IN_PROGRESS")

    def test_09_progress_persists_and_is_separate_for_each_role(self):
        plan = self.get("plan?roleId=ai-data-engineer")
        item = plan["stages"][0]["items"][0]["id"]
        self.post("plan", {"roleId": plan["roleId"], "completions": {item: True}})
        loaded = self.get("plan?roleId=ai-data-engineer")
        self.assertTrue(loaded["saved"])
        self.assertTrue(loaded["stages"][0]["items"][0]["done"])
        other = self.get("plan?roleId=se-fullstack")
        self.assertFalse(any(item["done"] for stage in other["stages"] for item in stage["items"]))

    def test_10_unknown_progress_and_invalid_roles_rejected(self):
        self.assertEqual(self.request("plan", {"roleId": "invalid"})[0], 400)
        self.assertEqual(self.request("plan?roleId=invalid")[0], 404)
        self.assertEqual(self.request("plan", {"roleId": "se-fullstack", "completions": {"not-a-task": True}})[0], 400)

    def test_11_regeneration_keeps_completed_common_items(self):
        plan = self.get("plan?roleId=ai-data-engineer")
        item = plan["stages"][0]["items"][0]["id"]
        self.post("plan", {"roleId": plan["roleId"], "completions": {item: True}})
        self.complete_profile()
        updated = self.post("plan", {"roleId": plan["roleId"], "regenerate": True})
        self.assertTrue(next(task for stage in updated["stages"] for task in stage["items"] if task["id"] == item)["done"])

    def test_12_legacy_roadmap_is_readable_and_can_be_saved(self):
        legacy = [{"stage": 1, "title": "Old saved plan", "duration": "Năm 1", "courses": [{"courseCode": "INT2204", "courseName": "OOP"}], "skills": ["Python"]}]
        with backend.get_db() as conn:
            conn.execute("INSERT INTO learning_roadmaps(student_code,role_id,role_title,stages,notes,updated_at) VALUES(?,?,?,?,?,?)",
                         ("21020001", "se-fullstack", "Saved role", json.dumps(legacy), "", "2026-01-01"))
        plan = self.get("plan?roleId=se-fullstack")
        self.assertEqual(plan["stages"][0]["title"], "Old saved plan")
        self.assertEqual([item["label"] for item in plan["stages"][0]["items"]], ["OOP", "Python"])
        item = plan["stages"][0]["items"][0]["id"]
        saved = self.post("plan", {"roleId": "se-fullstack", "completions": {item: True}})
        self.assertTrue(saved["stages"][0]["items"][0]["done"])

    def test_13_jobs_are_explicitly_samples_and_filters_work(self):
        jobs = self.get("jobs?roleId=ai-data-engineer&type=internship")
        self.assertTrue(jobs)
        self.assertTrue(all(job["sample"] and job["roleId"] == "ai-data-engineer" and job["type"] == "internship" for job in jobs))
        self.assertEqual(self.get("jobs?q=no-such-company"), [])

    def test_14_profiles_are_isolated_by_student(self):
        profile = self.complete_profile()
        other = career.load_profile("other-student")
        self.assertEqual(other["profile"], career.empty_profile())
        self.assertEqual(career.load_profile("21020001")["profile"], profile)

    def test_15_existing_api_and_other_pages_regression(self):
        source = (ROOT / "test_suite.py").read_text(encoding="utf-8").replace('BASE_URL = "http://localhost:8080"', 'BASE_URL = ' + repr(self.base))
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            namespace = {"__name__": "__main__"}
            exec(compile(source, str(ROOT / "test_suite.py"), "exec"), namespace)
        self.assertEqual(namespace["failed"], 0, output.getvalue())
        self.assertGreaterEqual(namespace["passed"], 23)
        print(f"\nExisting API regression: {namespace['passed']} passed.")


if __name__ == "__main__":
    try:
        unittest.main(verbosity=2)
    finally:
        try:
            TEMP.cleanup()
        except Exception:
            pass
