import urllib.request
import urllib.error
import json
import sys

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

BASE_URL = "http://localhost:8080"
passed = 0
failed = 0

def test(name, condition, details=""):
    global passed, failed
    if condition:
        print(f" [PASS] {name}")
        passed += 1
    else:
        print(f" [FAIL] {name}: {details}")
        failed += 1

import urllib.parse

def request(path, method="GET", data=None):
    parts = urllib.parse.urlsplit(path)
    safe_path = urllib.parse.quote(parts.path)
    safe_query = urllib.parse.quote(parts.query, safe="=&")
    url = BASE_URL + safe_path + (("?" + safe_query) if safe_query else "")
    headers = {"Content-Type": "application/json"}
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            content = resp.read().decode("utf-8")
            status = resp.getcode()
            try:
                parsed = json.loads(content)
            except Exception:
                parsed = content
            return status, parsed
    except urllib.error.HTTPError as e:
        content = e.read().decode("utf-8")
        try:
            parsed = json.loads(content)
        except Exception:
            parsed = content
        return e.code, parsed
    except Exception as e:
        return 500, str(e)

print("=" * 60)
print("RUNNING STUDENTHUB UET NEW FEATURES API TEST SUITE")
print("=" * 60)

# 1. P1: Career Roles
status, res = request("/api/career/roles")
test("GET /api/career/roles returns 200", status == 200 and res.get("code") == 200)
test("GET /api/career/roles has at least 5 roles", len(res.get("data", [])) >= 5)

# Role detail
status, res = request("/api/career/roles/se-fullstack")
test("GET /api/career/roles/se-fullstack returns 200", status == 200 and res.get("data", {}).get("id") == "se-fullstack")
test("Role has required skills and course mappings", len(res.get("data", {}).get("requiredSkills", [])) > 0 and len(res.get("data", {}).get("courseMappings", [])) > 0)

# Save assessment
assessment_payload = {
    "roleId": "se-fullstack",
    "ratings": {"Lập trình Web hiện đại": 4, "Thiết kế Backend": 3},
    "gapAnalysis": {"Lập trình Web hiện đại": {"current": 4, "target": 4, "gap": 0}}
}
status, res = request("/api/career/assessment", method="POST", data=assessment_payload)
test("POST /api/career/assessment returns 200", status == 200 and res.get("code") == 200)

status, res = request("/api/career/assessment?roleId=se-fullstack")
test("GET /api/career/assessment retrieves saved ratings", status == 200 and res.get("data", {}).get("ratings", {}).get("Lập trình Web hiện đại") == 4)

# Save roadmap
roadmap_payload = {
    "roleId": "se-fullstack",
    "roleTitle": "Kỹ sư Phát triển Phần mềm",
    "stages": [{"stage": 1, "title": "Nền tảng", "duration": "Năm 1"}],
    "notes": "Test roadmap"
}
status, res = request("/api/career/roadmap", method="POST", data=roadmap_payload)
test("POST /api/career/roadmap returns 200", status == 200 and res.get("code") == 200)

status, res = request("/api/career/roadmap?roleId=se-fullstack")
test("GET /api/career/roadmap retrieves saved roadmap", status == 200 and len(res.get("data", {}).get("stages", [])) == 1)

# 2. P2: Chatbot Assistant
chat_payload = {"message": "Điều kiện tốt nghiệp ngành CNTT UET là gì?"}
status, res = request("/api/chat/send", method="POST", data=chat_payload)
test("POST /api/chat/send returns answer with 200", status == 200 and res.get("status") == "success")
test("Chatbot returns sources and content", len(res.get("message", {}).get("content", "")) > 50 and len(res.get("message", {}).get("sources", [])) > 0)

# Chatbot validation test: empty message
status, res = request("/api/chat/send", method="POST", data={"message": ""})
test("POST /api/chat/send rejects empty message with 400", status == 400)

# Chatbot validation test: length limit > 1000 chars
status, res = request("/api/chat/send", method="POST", data={"message": "A" * 1005})
test("POST /api/chat/send rejects >1000 chars with 400", status == 400)

# 3. P3: Organizations Directory
status, res = request("/api/organizations")
test("GET /api/organizations returns 200", status == 200 and len(res.get("data", [])) >= 6)

status, res = request("/api/organizations/clb-tin-hoc")
test("GET /api/organizations/clb-tin-hoc returns detail", status == 200 and res.get("data", {}).get("id") == "clb-tin-hoc")

# Toggle bookmark
status, res = request("/api/organizations/bookmark", method="POST", data={"orgId": "clb-tin-hoc"})
test("POST /api/organizations/bookmark toggles bookmark", status == 200 and "bookmarked" in res)

# 4. P4: Mentors & Connection Requests
status, res = request("/api/mentors")
test("GET /api/mentors returns mentor list", status == 200 and len(res.get("data", [])) >= 4)

# Submit mentorship request
req_payload = {
    "mentorId": "mentor-1",
    "topic": "Định hướng trở thành Full-stack Engineer",
    "reason": "Em muốn xin tư vấn kinh nghiệm chọn môn học và chuẩn bị CV thực tập.",
    "preferredTime": "Tối thứ 7",
    "contactEmail": "21020001@vnu.edu.vn"
}
status, res = request("/api/mentorship-requests", method="POST", data=req_payload)
test("POST /api/mentorship-requests saves request with 200", status == 200 and res.get("data", {}).get("status") == "PENDING")
created_id = res.get("data", {}).get("id")

# Fetch student's requests
status, res = request("/api/mentorship-requests")
test("GET /api/mentorship-requests returns student requests", status == 200 and any(r["id"] == created_id for r in res.get("data", [])))

# Cancel request
status, res = request(f"/api/mentorship-requests/{created_id}/cancel", method="POST")
test("POST /api/mentorship-requests/<id>/cancel cancels request", status == 200 and res.get("code") == 200)

# 5. Routing Fallback
status, res = request("/career-guidance")
test("SPA route /career-guidance serves index.html", status == 200 and "<!doctype html>" in str(res).lower())

status, res = request("/student-assistant")
test("SPA route /student-assistant serves index.html", status == 200 and "<!doctype html>" in str(res).lower())

status, res = request("/organizations")
test("SPA route /organizations serves index.html", status == 200 and "<!doctype html>" in str(res).lower())

status, res = request("/mentorship")
test("SPA route /mentorship serves index.html", status == 200 and "<!doctype html>" in str(res).lower())

# 6. P3 Upgrade: Lecturers Data Table API
status, res = request("/api/organizations/lecturers")
test("GET /api/organizations/lecturers returns 200", status == 200 and res.get("code") == 200)
test("Lecturers API has 37 total items", res.get("total", 0) >= 37)
test("First page returns lecturers list", len(res.get("data", [])) > 0)
first_lec = res.get("data", [])[0] if res.get("data") else {}
test("Lecturer has STT, fullName, title, email, department", all(k in first_lec for k in ["stt", "fullName", "title", "email", "department"]))

# Pagination test
status, res = request("/api/organizations/lecturers?page=2&limit=10")
test("GET /api/organizations/lecturers?page=2&limit=10 returns page 2", status == 200 and res.get("page") == 2 and len(res.get("data", [])) == 10)
test("Page 2 STT starts at 11", res.get("data", [])[0].get("stt") == 11)

# Search test
status, res = request("/api/organizations/lecturers?q=Nguyễn")
test("GET /api/organizations/lecturers?q=Nguyễn filters by name", status == 200 and len(res.get("data", [])) > 0)

# Department filter test
status, res = request("/api/organizations/lecturers?department=Bộ môn Khoa học Máy tính")
test("GET /api/organizations/lecturers?department=... filters by department", status == 200 and all(l.get("department") == "Bộ môn Khoa học Máy tính" for l in res.get("data", [])))

# 7. Career Quiz Upgrade: 20-Question Quiz & Scoring Logic API
status, res = request("/api/career/quiz/config")
test("GET /api/career/quiz/config returns 200", status == 200 and res.get("code") == 200)
quiz_config = res.get("data", {})
test("Quiz has exactly 20 questions", len(quiz_config.get("questions", [])) == 20)
test("Quiz has 5 criteria groups", len(quiz_config.get("groups", [])) == 5)
test("Quiz has career paths with program URLs", len(quiz_config.get("career_paths", [])) >= 8 and all("program_url" in p for p in quiz_config.get("career_paths", [])))

# Submit 20 questions
mock_answers = {
    f"q{i}": (8 if i in [1, 2, 5, 6, 9, 10, 13, 14, 17, 18] else 4)
    for i in range(1, 21)
}
submit_payload = {"answers": mock_answers}
status, res = request("/api/career/quiz/submit", method="POST", data=submit_payload)
test("POST /api/career/quiz/submit returns 200", status == 200 and res.get("code") == 200)
quiz_res = res.get("data", {})
test("Quiz submission returns 5 group scores (1-10)", all(k in quiz_res.get("group_scores", {}) and 1 <= quiz_res["group_scores"][k] <= 10 for k in ["interests", "competence", "experience", "goals", "readiness"]))
test("Quiz submission returns ranked career paths", len(quiz_res.get("rankings", [])) >= 3)
top_rec = quiz_res.get("rankings", [])[0]
test("Top recommendation has program_url, strengths, and improvements", "program_url" in top_rec and len(top_rec.get("strengths", [])) > 0 and len(top_rec.get("improvements", [])) > 0)

# Get latest quiz result
status, res = request("/api/career/quiz/latest")
test("GET /api/career/quiz/latest returns saved quiz result", status == 200 and res.get("code") == 200 and res.get("data") is not None)

# Get quiz history
status, res = request("/api/career/quiz/history")
test("GET /api/career/quiz/history returns history list", status == 200 and len(res.get("data", [])) >= 1)

print("=" * 60)
print(f"TEST RESULTS: {passed} PASSED, {failed} FAILED")
print("=" * 60)

if failed > 0:
    sys.exit(1)
