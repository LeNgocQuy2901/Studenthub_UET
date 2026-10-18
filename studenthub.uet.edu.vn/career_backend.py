"""Career guidance only: questionnaire, explained ranking and saved learning progress.

Scores are an advisory index, not a probability of professional success.
Existing career/assessment and career/roadmap APIs remain compatible.
"""
import datetime
import json

import backend


INTERESTS = [
    {"id": "software", "label": "Phát triển phần mềm", "icon": "code", "color": "blue"},
    {"id": "ai", "label": "AI & Khoa học dữ liệu", "icon": "chart", "color": "cyan"},
    {"id": "security", "label": "An ninh mạng", "icon": "shield", "color": "cyan"},
    {"id": "design", "label": "Thiết kế giao diện", "icon": "design", "color": "purple"},
    {"id": "systems", "label": "Hệ thống & Đám mây", "icon": "server", "color": "blue"},
    {"id": "business", "label": "Phân tích kinh doanh", "icon": "trend", "color": "purple"},
    {"id": "research", "label": "Nghiên cứu khoa học", "icon": "flask", "color": "purple"},
    {"id": "product", "label": "Quản trị sản phẩm", "icon": "briefcase", "color": "green"},
    {"id": "embedded", "label": "Hệ thống nhúng & IoT", "icon": "chip", "color": "orange"},
]
SKILLS = [
    {"id": "programming", "label": "Lập trình (Python, Java, C/C++)"},
    {"id": "math", "label": "Toán học và xác suất thống kê"},
    {"id": "data", "label": "Cơ sở dữ liệu & phân tích dữ liệu"},
    {"id": "systems", "label": "Hệ điều hành, mạng & đám mây"},
    {"id": "security", "label": "An toàn và bảo mật thông tin"},
    {"id": "hardware", "label": "Phần cứng & hệ thống nhúng"},
    {"id": "communication", "label": "Giao tiếp & làm việc nhóm"},
    {"id": "product", "label": "Nghiên cứu người dùng & sản phẩm"},
]
GOALS = [
    {"id": "engineering", "label": "Trở thành kỹ sư phát triển phần mềm"},
    {"id": "data", "label": "Làm việc trong lĩnh vực dữ liệu / AI"},
    {"id": "research", "label": "Theo đuổi nghiên cứu và học thuật"},
    {"id": "security", "label": "Làm việc trong lĩnh vực an ninh mạng"},
    {"id": "startup", "label": "Khởi nghiệp / phát triển sản phẩm"},
    {"id": "explore", "label": "Chưa xác định rõ, muốn khám phá thêm"},
]
POSTGRADUATE = [
    {"id": "yes", "label": "Có"}, {"id": "maybe", "label": "Có thể"},
    {"id": "no", "label": "Chưa có kế hoạch"},
]

# Stable skill IDs make ratings comparable across roles without leaking one
# role's specialist question names into another role's assessment.
ROLE_PROFILES = {
    "se-fullstack": {"name": "Full-stack Software Engineer", "icon": "code", "color": "blue", "interests": ["software", "design"], "goals": ["engineering", "startup"], "skills": {"programming": 4, "data": 3, "systems": 3, "communication": 4}},
    "ai-data-engineer": {"name": "AI / Data Engineer", "icon": "chart", "color": "cyan", "interests": ["ai", "research"], "goals": ["data", "research"], "skills": {"programming": 4, "math": 4, "data": 4, "communication": 3}},
    "cyber-security": {"name": "Cybersecurity Specialist", "icon": "shield", "color": "purple", "interests": ["security", "systems"], "goals": ["security", "research"], "skills": {"security": 4, "systems": 4, "programming": 3, "communication": 3}},
    "devops-cloud": {"name": "DevOps / Cloud Engineer", "icon": "server", "color": "blue", "interests": ["systems", "software"], "goals": ["engineering"], "skills": {"systems": 4, "programming": 4, "security": 3, "communication": 3}},
    "embedded-iot": {"name": "Embedded & IoT Engineer", "icon": "chip", "color": "orange", "interests": ["embedded", "research"], "goals": ["engineering", "research"], "skills": {"hardware": 4, "programming": 4, "systems": 3, "math": 3}},
    "product-manager": {"name": "Tech Product Manager", "icon": "briefcase", "color": "green", "interests": ["product", "business", "design"], "goals": ["startup"], "skills": {"product": 4, "communication": 4, "data": 3, "programming": 2}},
}


def init_db():
    with backend.get_db() as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS career_profiles (
            student_code TEXT PRIMARY KEY,
            profile TEXT NOT NULL,
            saved_roles TEXT NOT NULL DEFAULT '[]',
            updated_at TEXT NOT NULL
        )""")


def empty_profile():
    return {"interests": [], "ratings": {}, "goal": "", "postgraduate": "", "step": 1, "completed": False}


def load_profile(student_code):
    with backend.get_db() as conn:
        row = conn.execute("SELECT * FROM career_profiles WHERE student_code = ?", (student_code,)).fetchone()
    if not row:
        return {"profile": empty_profile(), "savedRoleIds": [], "updatedAt": None}
    return {"profile": json.loads(row["profile"]), "savedRoleIds": json.loads(row["saved_roles"]), "updatedAt": row["updated_at"]}


def now():
    return datetime.datetime.now().isoformat(timespec="seconds")


def valid_profile(value):
    if not isinstance(value, dict):
        raise ValueError("Hồ sơ đánh giá không hợp lệ.")
    profile = empty_profile()
    profile.update({key: value[key] for key in profile if key in value})
    interests = profile["interests"]
    if not isinstance(interests, list) or any(not isinstance(x, str) or x not in {i["id"] for i in INTERESTS} for x in interests):
        raise ValueError("Lĩnh vực quan tâm không hợp lệ.")
    profile["interests"] = list(dict.fromkeys(interests))
    ratings = profile["ratings"]
    if not isinstance(ratings, dict) or any(key not in {s["id"] for s in SKILLS} or type(val) is not int or not 1 <= val <= 5 for key, val in ratings.items()):
        raise ValueError("Mức kỹ năng phải là số nguyên từ 1 đến 5.")
    for field, options in [("goal", GOALS), ("postgraduate", POSTGRADUATE)]:
        if not isinstance(profile[field], str) or profile[field] not in {""} | {x["id"] for x in options}:
            raise ValueError("Mục tiêu hoặc kế hoạch học cao hơn không hợp lệ.")
    if type(profile["step"]) is not int or profile["step"] not in (1, 2, 3) or type(profile["completed"]) is not bool:
        raise ValueError("Bước đánh giá không hợp lệ.")
    if profile["completed"] and (not profile["interests"] or len(ratings) != len(SKILLS) or not profile["goal"] or not profile["postgraduate"]):
        raise ValueError("Vui lòng trả lời đầy đủ sở thích, 8 kỹ năng và mục tiêu.")
    return profile


def get_roles():
    with backend.get_db() as conn:
        rows = conn.execute("SELECT * FROM career_roles ORDER BY id").fetchall()
    return [{"id": row["id"], "title": row["title"], "category": row["category"],
             "description": row["description"], "requiredSkills": json.loads(row["required_skills"]),
             "courseMappings": json.loads(row["course_mappings"])} for row in rows]


def recommendations(profile, roles):
    if not profile.get("completed"):
        return []
    skill_labels = {s["id"]: s["label"] for s in SKILLS}
    interest_labels = {i["id"]: i["label"] for i in INTERESTS}
    results = []
    for role in roles:
        spec = ROLE_PROFILES.get(role["id"])
        if not spec:
            continue
        matched = [i for i in spec["interests"] if i in profile["interests"]]
        interest = 1.0 if spec["interests"][0] in matched else (0.65 if matched else 0.0)
        skill = sum(min(profile["ratings"][key] / target, 1) for key, target in spec["skills"].items()) / len(spec["skills"])
        goal = 0.5 if profile["goal"] == "explore" else (1.0 if profile["goal"] in spec["goals"] else 0.0)
        reasons = []
        if matched:
            reasons.append("Bạn quan tâm đến " + ", ".join(interest_labels[i] for i in matched) + ".")
        strong = [skill_labels[key] for key, target in spec["skills"].items() if profile["ratings"][key] >= target]
        if strong:
            reasons.append("Kỹ năng đã đạt mức gợi ý: " + "; ".join(strong) + ".")
        if goal == 1:
            reasons.append("Mục tiêu 3–5 năm của bạn phù hợp với hướng nghề này.")
        if not reasons:
            reasons.append("Đây là một hướng để bạn khám phá thêm; hiện chưa trùng với sở thích và mục tiêu đã chọn.")
        gaps = [{"id": key, "label": skill_labels[key], "current": profile["ratings"][key], "target": target,
                 "gap": max(0, target - profile["ratings"][key])} for key, target in spec["skills"].items()]
        gaps.sort(key=lambda g: (-g["gap"], g["id"]))
        results.append({"roleId": role["id"], "score": round(40 * interest + 40 * skill + 20 * goal),
                        "breakdown": {"interests": round(40 * interest), "skills": round(40 * skill), "goals": round(20 * goal)},
                        "reasons": reasons, "gaps": gaps})
    return sorted(results, key=lambda r: (-r["score"], r["roleId"]))


def stage_statuses(stages):
    active_found = False
    for stage in stages:
        total = len(stage["items"])
        done = sum(bool(item.get("done")) for item in stage["items"])
        stage["completedCount"] = done
        stage["totalCount"] = total
        if total and done == total:
            stage["status"] = "COMPLETED"
        elif not active_found:
            stage["status"] = "IN_PROGRESS"
            active_found = True
        else:
            stage["status"] = "PLANNED"
    return stages


def build_plan(role, profile):
    stages = [
        {"stage": 1, "title": "Nền tảng", "duration": "Năm 1–2", "items": []},
        {"stage": 2, "title": "Chuyên sâu", "duration": "Năm 2–3", "items": []},
        {"stage": 3, "title": "Thực hành", "duration": "Năm 3–4", "items": []},
        {"stage": 4, "title": "Phát triển nghề nghiệp", "duration": "Sau tốt nghiệp", "items": []},
    ]
    basic_codes = {"INT2204", "INT2211", "INT1006", "INT1004", "MAT1101", "INT3202"}
    seen = set()
    for course in role["courseMappings"]:
        code = course["courseCode"]
        if code in seen:
            continue
        seen.add(code)
        index = 0 if code in basic_codes else (2 if course.get("relevance") == "Bổ trợ" else 1)
        stages[index]["items"].append({"id": "course:" + code, "label": course["courseName"], "courseCode": code, "reason": course.get("reason", ""), "done": False})
    tasks = [
        [("foundation", "Củng cố tư duy lập trình và kiến thức nền tảng")],
        [("specialist", "Thực hiện dự án chuyên ngành đầu tiên")],
        [("portfolio", "Xây dựng portfolio cá nhân"), ("internship", "Thực tập hoặc tham gia dự án thực tế")],
        [("cv", "Hoàn thiện CV và chuẩn bị phỏng vấn"), ("apply", "Ứng tuyển vị trí phù hợp với năng lực")],
    ]
    for stage, task_list in zip(stages, tasks):
        stage["items"].extend({"id": "task:" + key, "label": label, "done": False} for key, label in task_list)
    ranking = recommendations(profile, [role])
    if ranking:
        for gap in ranking[0]["gaps"]:
            if gap["gap"]:
                stages[1]["items"].append({"id": "skill:" + gap["id"], "label": "Bổ sung: " + gap["label"], "done": False})
    if profile.get("postgraduate") == "yes":
        stages[3]["items"].append({"id": "task:postgraduate", "label": "Tìm hiểu chương trình học cao hơn phù hợp", "done": False})
    return stage_statuses(stages)


def load_plan(student_code, role, profile):
    with backend.get_db() as conn:
        row = conn.execute("SELECT * FROM learning_roadmaps WHERE student_code = ? AND role_id = ? ORDER BY id DESC LIMIT 1", (student_code, role["id"])).fetchone()
    if not row:
        return {"roleId": role["id"], "roleTitle": role["title"], "stages": build_plan(role, profile), "saved": False, "updatedAt": None}
    stages = json.loads(row["stages"])
    # Preserve old course/skill content while upgrading it to editable items.
    if not stages or any(not isinstance(s, dict) or not isinstance(s.get("items"), list) for s in stages):
        converted = []
        for index, old in enumerate(stages):
            items = []
            for i, course in enumerate(old.get("courses", [])):
                items.append({"id": "legacy:%d:course:%d" % (index, i), "label": course.get("courseName", "Môn học"), "courseCode": course.get("courseCode", ""), "reason": course.get("reason", ""), "done": False})
            for i, skill in enumerate(old.get("skills", [])):
                items.append({"id": "legacy:%d:skill:%d" % (index, i), "label": str(skill), "done": False})
            if not items:
                items.append({"id": "legacy:%d:task" % index, "label": old.get("description") or old.get("title", "Hoàn thành giai đoạn"), "done": False})
            converted.append({"stage": index + 1, "title": old.get("title", "Giai đoạn %d" % (index + 1)), "duration": old.get("duration", ""), "items": items})
        stages = converted or build_plan(role, profile)
    return {"roleId": role["id"], "roleTitle": role["title"], "stages": stage_statuses(stages), "saved": True, "updatedAt": row["updated_at"]}


def sample_jobs():
    # Deliberately marked sample listings, with no invented live vacancies or dates.
    entries = [
        ("se-fullstack", "Full-stack Developer Intern", "FPT Software", "internship", "FPT"),
        ("se-fullstack", "Backend Developer", "Doanh nghiệp phần mềm", "fulltime", "SE"),
        ("ai-data-engineer", "AI / Data Engineer Intern", "Viettel Group", "internship", "VT"),
        ("ai-data-engineer", "Machine Learning Engineer", "Doanh nghiệp AI", "fulltime", "AI"),
        ("cyber-security", "Security Analyst Intern", "Doanh nghiệp an toàn thông tin", "internship", "SEC"),
        ("devops-cloud", "Junior DevOps Engineer", "Doanh nghiệp công nghệ", "fulltime", "DEV"),
        ("embedded-iot", "Embedded Software Intern", "Doanh nghiệp hệ thống nhúng", "internship", "IoT"),
        ("product-manager", "Associate Product Manager", "Doanh nghiệp sản phẩm số", "fulltime", "PM"),
    ]
    logos = {
        "FPT": "/images/companies/fpt.png",
        "VT": "/images/companies/viettel.png",
    }
    return [{"id": "demo-%d" % (index + 1), "roleId": role, "title": title, "company": company,
             "type": kind, "location": "Hà Nội", "logo": logo, "logoUrl": logos.get(logo), "sample": True,
             "description": "Vị trí minh họa giúp bạn hình dung cơ hội nghề nghiệp và chuẩn bị năng lực. Đây không phải tin tuyển dụng đang mở.",
             "requirements": ["Có kiến thức nền tảng liên quan đến vị trí.", "Có dự án học tập hoặc portfolio thể hiện kỹ năng.", "Có khả năng giao tiếp, làm việc nhóm và tự học."]}
            for index, (role, title, company, kind, logo) in enumerate(entries)]


def response(data):
    return {"code": 200, "data": data}, 200


def handle_get(path, query, student_code):
    if path == "/api/career/config":
        return response({"interests": INTERESTS, "skills": SKILLS, "goals": GOALS, "postgraduate": POSTGRADUATE,
                         "roleProfiles": ROLE_PROFILES, "scoreWeights": {"interests": 40, "skills": 40, "goals": 20}})
    if path == "/api/career/profile":
        return response(load_profile(student_code))
    if path == "/api/career/recommendations":
        return response(recommendations(load_profile(student_code)["profile"], get_roles()))
    if path == "/api/career/plan":
        role_id = query.get("roleId", [""])[0]
        role = next((r for r in get_roles() if r["id"] == role_id), None)
        if not role:
            return {"code": 404, "message": "Không tìm thấy nghề nghiệp."}, 404
        return response(load_plan(student_code, role, load_profile(student_code)["profile"]))
    if path == "/api/career/jobs":
        jobs = sample_jobs()
        for key in ("roleId", "type", "location"):
            value = query.get(key, [""])[0]
            if value and value != "all":
                jobs = [job for job in jobs if job[key] == value]
        keyword = query.get("q", [""])[0].strip().casefold()
        if keyword:
            jobs = [job for job in jobs if keyword in (job["title"] + " " + job["company"]).casefold()]
        return response(jobs)
    return None


def handle_post(path, body, student_code):
    if path not in ("/api/career/profile", "/api/career/saved-roles", "/api/career/plan"):
        return None
    try:
        if not isinstance(body, dict):
            raise ValueError("Dữ liệu gửi lên không hợp lệ.")
        if path == "/api/career/profile":
            profile = valid_profile(body.get("profile"))
            timestamp = now()
            with backend.get_db() as conn:
                conn.execute("""INSERT INTO career_profiles(student_code, profile, saved_roles, updated_at)
                    VALUES (?, ?, '[]', ?) ON CONFLICT(student_code) DO UPDATE SET
                    profile=excluded.profile, updated_at=excluded.updated_at""", (student_code, json.dumps(profile, ensure_ascii=False), timestamp))
            return response(load_profile(student_code))
        if path == "/api/career/saved-roles":
            role_id = body.get("roleId")
            if role_id not in {role["id"] for role in get_roles()} or type(body.get("saved")) is not bool:
                raise ValueError("Nghề nghiệp hoặc trạng thái lưu không hợp lệ.")
            # Read and write the saved set in one transaction.
            with backend.get_db() as conn:
                conn.execute("BEGIN IMMEDIATE")
                row = conn.execute("SELECT saved_roles FROM career_profiles WHERE student_code=?", (student_code,)).fetchone()
                saved = json.loads(row["saved_roles"]) if row else []
                saved = [x for x in saved if x != role_id]
                if body["saved"]:
                    saved.append(role_id)
                conn.execute("""INSERT INTO career_profiles(student_code, profile, saved_roles, updated_at)
                    VALUES (?, ?, ?, ?) ON CONFLICT(student_code) DO UPDATE SET
                    saved_roles=excluded.saved_roles, updated_at=excluded.updated_at""",
                             (student_code, json.dumps(empty_profile()), json.dumps(saved), now()))
            return response({"savedRoleIds": saved})
        role_id = body.get("roleId")
        role = next((role for role in get_roles() if role["id"] == role_id), None)
        if not role:
            raise ValueError("Không tìm thấy nghề nghiệp.")
        profile = load_profile(student_code)["profile"]
        plan = load_plan(student_code, role, profile)
        # Regeneration is explicit. Normal saving always preserves the saved plan.
        if body.get("regenerate") is True:
            completed = {item["id"] for stage in plan["stages"] for item in stage["items"] if item.get("done")}
            plan["stages"] = build_plan(role, profile)
            for stage in plan["stages"]:
                for item in stage["items"]:
                    item["done"] = item["id"] in completed
        completions = body.get("completions", {})
        known = {item["id"] for stage in plan["stages"] for item in stage["items"]}
        if not isinstance(completions, dict) or any(key not in known or type(val) is not bool for key, val in completions.items()):
            raise ValueError("Tiến độ lộ trình không hợp lệ.")
        for stage in plan["stages"]:
            for item in stage["items"]:
                if item["id"] in completions:
                    item["done"] = completions[item["id"]]
        stages = stage_statuses(plan["stages"])
        with backend.get_db() as conn:
            conn.execute("""INSERT INTO learning_roadmaps(student_code, role_id, role_title, stages, notes, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)""", (student_code, role_id, role["title"], json.dumps(stages, ensure_ascii=False), "Career guidance v2", now()))
        return response(load_plan(student_code, role, profile))
    except (ValueError, TypeError) as error:
        return {"code": 400, "message": str(error)}, 400
