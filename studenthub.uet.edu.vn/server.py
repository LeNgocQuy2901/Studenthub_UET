import http.server
import json
import os
import socketserver
import sys
import urllib.parse
import datetime

import backend

PORT = 8080
TARGET_DIR = os.path.dirname(os.path.abspath(__file__))

class StudentHubServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=TARGET_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def get_student_code(self):
        auth_header = self.headers.get("Authorization", "")
        # Default mock student code if none or mock token
        return "21020001"

    def read_json_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length > 0:
            raw_body = self.rfile.read(content_length).decode("utf-8")
            try:
                return json.loads(raw_body)
            except Exception:
                return {}
        return {}

    def parse_path_and_query(self):
        raw = self.path
        try:
            raw = raw.encode("latin1").decode("utf-8")
        except Exception:
            pass
        raw = urllib.parse.unquote(raw, encoding="utf-8")
        parsed = urllib.parse.urlparse(raw)
        return parsed.path, urllib.parse.parse_qs(parsed.query)

    # -----------------------------------------------------------------------
    # API Router - GET Requests
    # -----------------------------------------------------------------------
    def do_GET(self):
        path, query = self.parse_path_and_query()
        student_code = self.get_student_code()

        # Handle API Routes
        if path.startswith("/api/"):
            conn = backend.get_db()
            cur = conn.cursor()

            # P1: Career Roles List
            if path == "/api/career/roles":
                keyword = query.get("q", [""])[0].lower()
                category = query.get("category", [""])[0]

                cur.execute("SELECT * FROM career_roles")
                rows = cur.fetchall()
                results = []
                for r in rows:
                    role_dict = {
                        "id": r["id"],
                        "title": r["title"],
                        "category": r["category"],
                        "description": r["description"],
                        "salaryRange": r["salary_range"],
                        "marketDemand": r["market_demand"],
                        "responsibilities": json.loads(r["responsibilities"]),
                        "requiredSkills": json.loads(r["required_skills"]),
                        "courseMappings": json.loads(r["course_mappings"])
                    }
                    if category and category != "all" and role_dict["category"] != category:
                        continue
                    if keyword:
                        match_text = f"{role_dict['title']} {role_dict['description']} {role_dict['category']}".lower()
                        if keyword not in match_text:
                            continue
                    results.append(role_dict)
                conn.close()
                return self.send_json({"code": 200, "data": results})

            # P1: Career Role Detail
            if path.startswith("/api/career/roles/"):
                role_id = path.split("/")[-1]
                cur.execute("SELECT * FROM career_roles WHERE id = ?", (role_id,))
                r = cur.fetchone()
                conn.close()
                if not r:
                    return self.send_json({"code": 404, "message": "Không tìm thấy vai trò nghề nghiệp"}, 404)
                return self.send_json({
                    "code": 200,
                    "data": {
                        "id": r["id"],
                        "title": r["title"],
                        "category": r["category"],
                        "description": r["description"],
                        "salaryRange": r["salary_range"],
                        "marketDemand": r["market_demand"],
                        "responsibilities": json.loads(r["responsibilities"]),
                        "requiredSkills": json.loads(r["required_skills"]),
                        "courseMappings": json.loads(r["course_mappings"])
                    }
                })

            # P1: Career Quiz Config (20 Questions, 5 Groups, Career Matrix)
            if path == "/api/career/quiz/config":
                conn.close()
                return self.send_json({"code": 200, "data": backend.get_career_quiz_config()})

            # P1: Career Quiz Latest Result
            if path == "/api/career/quiz/latest":
                conn.close()
                latest = backend.get_latest_career_quiz(student_code)
                return self.send_json({"code": 200, "data": latest})

            # P1: Career Quiz History
            if path == "/api/career/quiz/history":
                conn.close()
                history = backend.get_career_quiz_history(student_code)
                return self.send_json({"code": 200, "data": history})

            # P1: Get Student's Saved Skills Assessment
            if path == "/api/career/assessment":
                role_id = query.get("roleId", [""])[0]
                if role_id:
                    cur.execute("SELECT * FROM skills_assessment WHERE student_code = ? AND role_id = ? ORDER BY id DESC LIMIT 1", (student_code, role_id))
                else:
                    cur.execute("SELECT * FROM skills_assessment WHERE student_code = ? ORDER BY id DESC LIMIT 1", (student_code,))
                r = cur.fetchone()
                conn.close()
                if not r:
                    return self.send_json({"code": 200, "data": None})
                return self.send_json({
                    "code": 200,
                    "data": {
                        "id": r["id"],
                        "roleId": r["role_id"],
                        "ratings": json.loads(r["ratings"]),
                        "gapAnalysis": json.loads(r["gap_analysis"]) if r["gap_analysis"] else {},
                        "updatedAt": r["updated_at"]
                    }
                })

            # P1: Get Saved Roadmap
            if path == "/api/career/roadmap":
                role_id = query.get("roleId", [""])[0]
                if role_id:
                    cur.execute("SELECT * FROM learning_roadmaps WHERE student_code = ? AND role_id = ? ORDER BY id DESC LIMIT 1", (student_code, role_id))
                else:
                    cur.execute("SELECT * FROM learning_roadmaps WHERE student_code = ? ORDER BY id DESC LIMIT 1", (student_code,))
                r = cur.fetchone()
                conn.close()
                if not r:
                    return self.send_json({"code": 200, "data": None})
                return self.send_json({
                    "code": 200,
                    "data": {
                        "id": r["id"],
                        "roleId": r["role_id"],
                        "roleTitle": r["role_title"],
                        "stages": json.loads(r["stages"]),
                        "notes": r["notes"],
                        "updatedAt": r["updated_at"]
                    }
                })

            # P2: Get Chat Conversations
            if path == "/api/chat/conversations":
                cur.execute("SELECT * FROM chat_conversations WHERE student_code = ? ORDER BY updated_at DESC", (student_code,))
                rows = cur.fetchall()
                convs = [{"id": r["id"], "title": r["title"], "createdAt": r["created_at"], "updatedAt": r["updated_at"]} for r in rows]
                conn.close()
                return self.send_json({"code": 200, "data": convs})

            # P2: Get Messages in a Conversation
            if path.startswith("/api/chat/conversations/") and path.endswith("/messages"):
                parts = path.split("/")
                conv_id = parts[4]
                # verify ownership
                cur.execute("SELECT id FROM chat_conversations WHERE id = ? AND student_code = ?", (conv_id, student_code))
                if not cur.fetchone():
                    conn.close()
                    return self.send_json({"code": 403, "message": "Không có quyền truy cập đoạn chat này"}, 403)

                cur.execute("SELECT * FROM chat_messages WHERE conversation_id = ? ORDER BY id ASC", (conv_id,))
                rows = cur.fetchall()
                messages = []
                for m in rows:
                    messages.append({
                        "id": m["id"],
                        "sender": m["sender"],
                        "content": m["content"],
                        "sources": json.loads(m["sources"]) if m["sources"] else [],
                        "createdAt": m["created_at"]
                    })
                conn.close()
                return self.send_json({"code": 200, "data": messages})

            # P3: Organizations Lecturers Data Table
            if path == "/api/organizations/lecturers" or path == "/api/lecturers":
                keyword = query.get("q", [""])[0]
                unit_id = query.get("unit", query.get("department", ["all"]))[0]
                academic_title = query.get("title", ["all"])[0]
                page = int(query.get("page", [1])[0])
                limit = int(query.get("limit", [15])[0])
                conn.close()
                data = backend.get_lecturers(keyword=keyword, unit_id=unit_id, academic_title=academic_title, page=page, limit=limit)
                return self.send_json({"code": 200, "data": data["items"], "total": data["total"], "page": data["page"], "limit": data["limit"], "totalPages": data["totalPages"]})

            # P3: Organizations & Labs List
            if path == "/api/organizations":
                category = query.get("category", ["all"])[0]
                keyword = query.get("q", [""])[0].lower()

                # Get student bookmarks
                cur.execute("SELECT org_id FROM organization_bookmarks WHERE student_code = ?", (student_code,))
                bookmarked_ids = {row[0] for row in cur.fetchall()}

                cur.execute("SELECT * FROM organizations")
                rows = cur.fetchall()
                orgs = []
                for r in rows:
                    org_dict = {
                        "id": r["id"],
                        "name": r["name"],
                        "category": r["category"],
                        "field": r["field"],
                        "summary": r["summary"],
                        "description": r["description"],
                        "requirements": r["requirements"],
                        "recruitmentStatus": r["recruitment_status"],
                        "recruitmentPeriod": r["recruitment_period"],
                        "contactPerson": r["contact_person"],
                        "email": r["email"],
                        "website": r["website"],
                        "facebook": r["facebook"],
                        "location": r["location"],
                        "verified": bool(r["verified"]),
                        "isBookmarked": r["id"] in bookmarked_ids
                    }
                    if category and category != "all" and org_dict["category"] != category:
                        continue
                    if keyword:
                        searchable = f"{org_dict['name']} {org_dict['summary']} {org_dict['field']} {org_dict['description']}".lower()
                        if keyword not in searchable:
                            continue
                    orgs.append(org_dict)
                conn.close()
                return self.send_json({"code": 200, "data": orgs})

            # P3: Organization Detail
            if path.startswith("/api/organizations/"):
                org_id = path.split("/")[-1]
                cur.execute("SELECT * FROM organizations WHERE id = ?", (org_id,))
                r = cur.fetchone()
                if not r:
                    conn.close()
                    return self.send_json({"code": 404, "message": "Không tìm thấy tổ chức"}, 404)

                cur.execute("SELECT 1 FROM organization_bookmarks WHERE student_code = ? AND org_id = ?", (student_code, org_id))
                is_bookmarked = bool(cur.fetchone())
                conn.close()

                return self.send_json({
                    "code": 200,
                    "data": {
                        "id": r["id"],
                        "name": r["name"],
                        "category": r["category"],
                        "field": r["field"],
                        "summary": r["summary"],
                        "description": r["description"],
                        "requirements": r["requirements"],
                        "recruitmentStatus": r["recruitment_status"],
                        "recruitmentPeriod": r["recruitment_period"],
                        "contactPerson": r["contact_person"],
                        "email": r["email"],
                        "website": r["website"],
                        "facebook": r["facebook"],
                        "location": r["location"],
                        "verified": bool(r["verified"]),
                        "isBookmarked": is_bookmarked
                    }
                })

            # P4: Mentors Directory
            if path == "/api/mentors":
                keyword = query.get("q", [""])[0].lower()
                field = query.get("field", ["all"])[0]

                cur.execute("SELECT * FROM mentors")
                rows = cur.fetchall()
                results = []
                for r in rows:
                    m_dict = {
                        "id": r["id"],
                        "name": r["name"],
                        "title": r["title"],
                        "company": r["company"],
                        "expertise": json.loads(r["expertise"]),
                        "field": r["field"],
                        "experienceYears": r["experience_years"],
                        "bio": r["bio"],
                        "topics": json.loads(r["topics"]),
                        "availability": r["availability"],
                        "contactChannel": r["contact_channel"],
                        "isSample": bool(r["is_sample"])
                    }
                    if field and field != "all" and field not in m_dict["field"]:
                        continue
                    if keyword:
                        searchable = f"{m_dict['name']} {m_dict['company']} {m_dict['title']} {m_dict['field']} {' '.join(m_dict['expertise'])}".lower()
                        if keyword not in searchable:
                            continue
                    results.append(m_dict)
                conn.close()
                return self.send_json({"code": 200, "data": results})

            # P4: Mentorship Requests List (Student's Own)
            if path == "/api/mentorship-requests":
                cur.execute("SELECT * FROM mentorship_requests WHERE student_code = ? ORDER BY id DESC", (student_code,))
                rows = cur.fetchall()
                results = []
                for r in rows:
                    results.append({
                        "id": r["id"],
                        "mentorId": r["mentor_id"],
                        "mentorName": r["mentor_name"],
                        "topic": r["topic"],
                        "reason": r["reason"],
                        "preferredTime": r["preferred_time"],
                        "contactEmail": r["contact_email"],
                        "status": r["status"],
                        "notes": r["notes"],
                        "createdAt": r["created_at"],
                        "updatedAt": r["updated_at"]
                    })
                conn.close()
                return self.send_json({"code": 200, "data": results})

            conn.close()
            return self.send_json({"code": 404, "message": "API endpoint không tồn tại"}, 404)

        # -------------------------------------------------------------------
        # Static file & SPA Fallback
        # -------------------------------------------------------------------
        clean_path = path.split('?')[0].split('#')[0]
        local_path = self.translate_path(clean_path)

        if not os.path.exists(local_path) or (os.path.isdir(local_path) and not os.path.exists(os.path.join(local_path, "index.html"))):
            self.path = "/index.html"

        return super().do_GET()

    # -----------------------------------------------------------------------
    # API Router - POST Requests
    # -----------------------------------------------------------------------
    def do_POST(self):
        path, _ = self.parse_path_and_query()
        student_code = self.get_student_code()
        body = self.read_json_body()

        if path.startswith("/api/"):
            conn = backend.get_db()
            cur = conn.cursor()
            now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            # P1: Submit Career Quiz Assessment
            if path == "/api/career/quiz/submit":
                answers = body.get("answers", {})
                if not answers:
                    conn.close()
                    return self.send_json({"code": 400, "message": "Câu trả lời không được để trống."}, 400)
                conn.close()
                result = backend.submit_career_quiz(student_code, answers)
                return self.send_json({"code": 200, "data": result, "message": "Hoàn thành đánh giá định hướng nghề nghiệp!"})

            # P1: Save Skills Assessment
            if path == "/api/career/assessment":
                role_id = body.get("roleId", "")
                ratings = body.get("ratings", {})
                gap_analysis = body.get("gapAnalysis", {})

                if not role_id:
                    conn.close()
                    return self.send_json({"code": 400, "message": "roleId là bắt buộc."}, 400)

                cur.execute("""
                    INSERT INTO skills_assessment (student_code, role_id, ratings, gap_analysis, updated_at)
                    VALUES (?, ?, ?, ?, ?)
                """, (student_code, role_id, json.dumps(ratings, ensure_ascii=False), json.dumps(gap_analysis, ensure_ascii=False), now))
                conn.commit()
                conn.close()
                return self.send_json({"code": 200, "message": "Lưu kết quả tự đánh giá kỹ năng thành công."})

            # P1: Save Personalized Roadmap
            if path == "/api/career/roadmap":
                role_id = body.get("roleId", "")
                role_title = body.get("roleTitle", "")
                stages = body.get("stages", [])
                notes = body.get("notes", "")

                if not role_id or not stages:
                    conn.close()
                    return self.send_json({"code": 400, "message": "Dữ liệu lộ trình không đầy đủ."}, 400)

                cur.execute("""
                    INSERT INTO learning_roadmaps (student_code, role_id, role_title, stages, notes, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (student_code, role_id, role_title, json.dumps(stages, ensure_ascii=False), notes, now))
                conn.commit()
                conn.close()
                return self.send_json({"code": 200, "message": "Lưu lộ trình học tập thành công!"})

            # P2: Send Chat Message to AI Assistant
            if path == "/api/chat/send":
                conv_id = body.get("conversationId") or f"conv_{int(datetime.datetime.now().timestamp())}"
                message = body.get("message", "")

                result, status = backend.process_chat_message(student_code, conv_id, message)
                conn.close()
                return self.send_json(result, status)

            # P3: Toggle Bookmark Organization
            if path == "/api/organizations/bookmark":
                org_id = body.get("orgId", "")
                if not org_id:
                    conn.close()
                    return self.send_json({"code": 400, "message": "orgId là bắt buộc"}, 400)

                cur.execute("SELECT 1 FROM organization_bookmarks WHERE student_code = ? AND org_id = ?", (student_code, org_id))
                if cur.fetchone():
                    cur.execute("DELETE FROM organization_bookmarks WHERE student_code = ? AND org_id = ?", (student_code, org_id))
                    bookmarked = False
                else:
                    cur.execute("INSERT INTO organization_bookmarks (student_code, org_id, created_at) VALUES (?, ?, ?)", (student_code, org_id, now))
                    bookmarked = True
                conn.commit()
                conn.close()
                return self.send_json({"code": 200, "bookmarked": bookmarked, "message": "Đã cập nhật trạng thái lưu."})

            # P4: Submit Mentorship Request
            if path == "/api/mentorship-requests":
                mentor_id = body.get("mentorId", "")
                topic = body.get("topic", "").strip()
                reason = body.get("reason", "").strip()
                preferred_time = body.get("preferredTime", "").strip()
                contact_email = body.get("contactEmail", "").strip()

                # Validation
                if not mentor_id or not topic or not reason or not contact_email:
                    conn.close()
                    return self.send_json({"code": 400, "message": "Vui lòng điền đầy đủ các thông tin bắt buộc (Chủ đề, Lý do, Email)."}, 400)

                # Get mentor name
                cur.execute("SELECT name FROM mentors WHERE id = ?", (mentor_id,))
                mentor_row = cur.fetchone()
                mentor_name = mentor_row["name"] if mentor_row else "Cố vấn"

                cur.execute("""
                    INSERT INTO mentorship_requests (student_code, mentor_id, mentor_name, topic, reason, preferred_time, contact_email, status, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, ?)
                """, (student_code, mentor_id, mentor_name, topic, reason, preferred_time, contact_email, now, now))
                req_id = cur.lastrowid
                conn.commit()
                conn.close()

                return self.send_json({
                    "code": 200,
                    "message": "Gửi yêu cầu tư vấn thành công! Cố vấn sẽ phản hồi qua email của bạn.",
                    "data": {"id": req_id, "status": "PENDING"}
                })

            # P4: Cancel Mentorship Request
            if path.startswith("/api/mentorship-requests/") and path.endswith("/cancel"):
                req_id = path.split("/")[3]
                cur.execute("SELECT student_code, status FROM mentorship_requests WHERE id = ?", (req_id,))
                row = cur.fetchone()
                if not row:
                    conn.close()
                    return self.send_json({"code": 404, "message": "Không tìm thấy yêu cầu"}, 404)
                if row["student_code"] != student_code:
                    conn.close()
                    return self.send_json({"code": 403, "message": "Bạn không có quyền thao tác trên yêu cầu này"}, 403)
                if row["status"] != "PENDING":
                    conn.close()
                    return self.send_json({"code": 400, "message": "Chỉ có thể hủy yêu cầu đang ở trạng thái 'Chờ phản hồi'"}, 400)

                cur.execute("UPDATE mentorship_requests SET status = 'CANCELLED', updated_at = ? WHERE id = ?", (now, req_id))
                conn.commit()
                conn.close()
                return self.send_json({"code": 200, "message": "Đã hủy yêu cầu tư vấn thành công."})

            conn.close()
            return self.send_json({"code": 404, "message": "Endpoint không tồn tại"}, 404)

        self.send_response(404)
        self.end_headers()

if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass

    with http.server.ThreadingHTTPServer(("", PORT), StudentHubServer) as httpd:
        print("=" * 60, flush=True)
        print(f"[+] StudentHub UET Enhanced Server running at:", flush=True)
        print(f"[+] http://localhost:{PORT}", flush=True)
        print(f"[+] Serving: {TARGET_DIR}", flush=True)
        print(f"[+] Database: {backend.DB_PATH}", flush=True)
        print(f"[+] Features: P1 Career Guidance, P2 AI Chatbot, P3 Organizations, P4 Mentorship", flush=True)
        print("=" * 60, flush=True)
        print("Press Ctrl+C to stop.", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.", flush=True)
