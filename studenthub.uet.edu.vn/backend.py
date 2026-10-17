"""
StudentHub UET Backend Services & Database Layer
Features:
- P1: Career Guidance (Roles, Skills, Course Mappings, Self-Assessment, Roadmap)
- P2: AI Chatbot Assistant (Knowledge Base, Provider Abstraction, History Persistence)
- P3: Organizations & Laboratories Directory (Clubs, Labs, Departments, Bookmarks)
- P4: Career Mentorship & Alumni Network (Mentors, Consultation Requests, Status Tracking)
"""

import os
import json
import sqlite3
import datetime
import urllib.request
import urllib.error
import re

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "studenthub.db")

# ---------------------------------------------------------------------------
# Database Initialization & Schema
# ---------------------------------------------------------------------------
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS career_roles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        salary_range TEXT,
        market_demand TEXT,
        responsibilities TEXT,
        required_skills TEXT,
        course_mappings TEXT
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS skills_assessment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_code TEXT NOT NULL,
        role_id TEXT NOT NULL,
        ratings TEXT NOT NULL,
        gap_analysis TEXT,
        updated_at TEXT NOT NULL
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS learning_roadmaps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_code TEXT NOT NULL,
        role_id TEXT NOT NULL,
        role_title TEXT NOT NULL,
        stages TEXT NOT NULL,
        notes TEXT,
        updated_at TEXT NOT NULL
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS organizations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        field TEXT NOT NULL,
        summary TEXT NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT,
        recruitment_status TEXT,
        recruitment_period TEXT,
        contact_person TEXT,
        email TEXT,
        website TEXT,
        facebook TEXT,
        location TEXT,
        verified INTEGER DEFAULT 1
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS organization_bookmarks (
        student_code TEXT NOT NULL,
        org_id TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY (student_code, org_id)
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS mentors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        expertise TEXT NOT NULL,
        field TEXT NOT NULL,
        experience_years INTEGER DEFAULT 0,
        bio TEXT NOT NULL,
        topics TEXT NOT NULL,
        availability TEXT,
        contact_channel TEXT,
        is_sample INTEGER DEFAULT 1
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS mentorship_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_code TEXT NOT NULL,
        mentor_id TEXT NOT NULL,
        mentor_name TEXT NOT NULL,
        topic TEXT NOT NULL,
        reason TEXT NOT NULL,
        preferred_time TEXT,
        contact_email TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'PENDING',
        notes TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS chat_conversations (
        id TEXT PRIMARY KEY,
        student_code TEXT NOT NULL,
        title TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id TEXT NOT NULL,
        sender TEXT NOT NULL,
        content TEXT NOT NULL,
        sources TEXT,
        created_at TEXT NOT NULL
    )
    """)

    conn.commit()
    conn.close()

# ---------------------------------------------------------------------------
# Seed Realistic UET Demonstration Data
# ---------------------------------------------------------------------------
def seed_data_if_needed():
    conn = get_db()
    cur = conn.cursor()

    # Check if career_roles has data
    cur.execute("SELECT COUNT(*) FROM career_roles")
    if cur.fetchone()[0] == 0:
        roles = [
            (
                "se-fullstack",
                "Kỹ sư Phát triển Phần mềm (Full-stack Software Engineer)",
                "Công nghệ phần mềm",
                "Chịu trách nhiệm thiết kế, phát triển và bảo trì các hệ thống ứng dụng web và di động từ frontend đến backend và cơ sở dữ liệu.",
                "15.000.000 - 35.000.000 VNĐ/tháng",
                "Rất cao (Nhu cầu tuyển dụng liên tục tại các tập đoàn công nghệ và startup)",
                json.dumps([
                    "Phát triển giao diện web tương tác cao với React, Next.js hoặc Vue.js.",
                    "Xây dựng RESTful API và GraphQL server hiệu năng cao với Node.js, Python hoặc Java.",
                    "Thiết kế cấu trúc cơ sở dữ liệu quan hệ (PostgreSQL, MySQL) và NoSQL.",
                    "Tham gia quy trình CI/CD, viết kiểm thử tự động (Unit test, Integration test)."
                ], ensure_ascii=False),
                json.dumps([
                    {"name": "Lập trình Web hiện đại (HTML/CSS/JS/TS, React)", "category": "Kỹ thuật", "level": "Nâng cao"},
                    {"name": "Thiết kế & Phát triển Backend (Python/Node/Java API)", "category": "Kỹ thuật", "level": "Nâng cao"},
                    {"name": "Cơ sở dữ liệu & Tối ưu hóa truy vấn (SQL & NoSQL)", "category": "Kỹ thuật", "level": "Trung cấp"},
                    {"name": "Kiến trúc hệ thống phần mềm & Design Patterns", "category": "Kỹ thuật", "level": "Trung cấp"},
                    {"name": "Làm việc nhóm & Giao tiếp trong quy trình Agile/Scrum", "category": "Kỹ năng mềm", "level": "Nâng cao"},
                    {"name": "Tiếng Anh chuyên ngành CNTT", "category": "Kỹ năng bổ trợ", "level": "Trung cấp"}
                ], ensure_ascii=False),
                json.dumps([
                    {"courseCode": "INT3306", "courseName": "Phát triển ứng dụng Web", "relevance": "Cốt lõi", "reason": "Cung cấp nền tảng toàn diện về kiến trúc Web client-server, RESTful API và lập trình frontend hiện đại.", "type": "verified"},
                    {"courseCode": "INT2204", "courseName": "Lập trình hướng đối tượng", "relevance": "Cốt lõi", "reason": "Xây dựng tư duy thiết kế phần mềm theo mẫu chuẩn OOP và Clean Code.", "type": "verified"},
                    {"courseCode": "INT3110", "courseName": "Cơ sở dữ liệu nâng cao", "relevance": "Cốt lõi", "reason": "Giúp nắm vững tối ưu hóa truy vấn, lập chỉ mục và thiết kế CSDL mở rộng.", "type": "verified"},
                    {"courseCode": "INT2211", "courseName": "Hệ điều hành", "relevance": "Bổ trợ", "reason": "Hiểu cơ chế quản lý tiến trình, bộ nhớ và I/O khi triển khai ứng dụng phần mềm.", "type": "verified"},
                    {"courseCode": "INT3505", "courseName": "An toàn và bảo mật thông tin", "relevance": "Bổ trợ", "reason": "Bảo vệ ứng dụng web khỏi các lỗ hổng OWASP Top 10 phổ biến.", "type": "verified"}
                ], ensure_ascii=False)
            ),
            (
                "ai-data-engineer",
                "Kỹ sư Trí tuệ Nhân tạo & Dữ liệu (AI / Data Engineer)",
                "Trí tuệ nhân tạo & Khoa học dữ liệu",
                "Nghiên cứu và phát triển các mô hình học máy, xử lý ngôn ngữ tự nhiên, thị giác máy tính và xây dựng đường ống dữ liệu quy mô lớn.",
                "18.000.000 - 45.000.000 VNĐ/tháng",
                "Bùng nổ (Nhu cầu cấp thiết trong làn sóng GenAI và Chuyển đổi số)",
                json.dumps([
                    "Thu thập, làm sạch và xử lý các tập dữ liệu lớn phục vụ huấn luyện mô hình.",
                    "Huấn luyện, tinh chỉnh (Fine-tune) và tối ưu hóa các mô hình Machine Learning / Deep Learning.",
                    "Đóng gói và triển khai mô hình AI (Model Serving) qua API an toàn, độ trễ thấp.",
                    "Theo dõi hiệu suất mô hình (MLOps) và cập nhật dữ liệu định kỳ."
                ], ensure_ascii=False),
                json.dumps([
                    {"name": "Toán học cho AI (Đại số tuyến tính, Giải tích, Xác suất thống kê)", "category": "Nền tảng", "level": "Nâng cao"},
                    {"name": "Lập trình Python & Thư viện AI (PyTorch, TensorFlow, Scikit-learn)", "category": "Kỹ thuật", "level": "Nâng cao"},
                    {"name": "Xử lý dữ liệu quy mô lớn (Pandas, Spark, SQL)", "category": "Kỹ thuật", "level": "Trung cấp"},
                    {"name": "Triển khai mô hình & MLOps (Docker, ONNX, FastAPI)", "category": "Kỹ thuật", "level": "Trung cấp"},
                    {"name": "Tư duy giải quyết vấn đề và phân tích thực nghiệm", "category": "Kỹ năng mềm", "level": "Nâng cao"}
                ], ensure_ascii=False),
                json.dumps([
                    {"courseCode": "INT3401", "courseName": "Trí tuệ nhân tạo", "relevance": "Cốt lõi", "reason": "Nền tảng về tìm kiếm trạng thái, thuật toán học máy cổ điển và heuristic.", "type": "verified"},
                    {"courseCode": "MAT1101", "courseName": "Xác suất thống kê", "relevance": "Cốt lõi", "reason": "Cơ sở lý thuyết để hiểu các hàm mất mát, phân phối dữ liệu và đánh giá độ chính xác mô hình.", "type": "verified"},
                    {"courseCode": "INT1006", "courseName": "Cấu trúc dữ liệu và giải thuật", "relevance": "Cốt lõi", "reason": "Tối ưu hóa độ phức tạp thời gian/bộ nhớ khi xử lý lượng dữ liệu khổng lồ.", "type": "verified"},
                    {"courseCode": "INT3110", "courseName": "Cơ sở dữ liệu nâng cao", "relevance": "Bổ trợ", "reason": "Lưu trữ và trích xuất dữ liệu đa chiều hiệu quả.", "type": "verified"}
                ], ensure_ascii=False)
            ),
            (
                "cyber-security",
                "Chuyên viên An toàn Thông tin (Cybersecurity Specialist)",
                "An ninh mạng & Hệ thống",
                "Bảo vệ hạ tầng mạng, ứng dụng và dữ liệu số khỏi các mối đe dọa tấn công mạng; thực hiện đánh giá lỗ hổng và giám sát an ninh (SOC).",
                "16.000.000 - 40.000.000 VNĐ/tháng",
                "Cao và ổn định (Nhu cầu bắt buộc tại ngân hàng, tài chính, cơ quan nhà nước)",
                json.dumps([
                    "Kiểm thử xâm nhập (Penetration Testing) ứng dụng web, mạng và hệ thống nội bộ.",
                    "Giám sát cảnh báo an ninh, phân tích mã độc và ứng cứu sự cố bảo mật (Incident Response).",
                    "Thiết lập tường lửa, cấu hình chính sách bảo mật mạng và kiểm soát truy cập.",
                    "Soát xét tuân thủ tiêu chuẩn an toàn thông tin (ISO 27001, PCI-DSS)."
                ], ensure_ascii=False),
                json.dumps([
                    {"name": "Giao thức Mạng máy tính & Phân tích gói tin (TCP/IP, Wireshark)", "category": "Nền tảng", "level": "Nâng cao"},
                    {"name": "Bảo mật ứng dụng Web & Kỹ thuật tấn công/phòng thủ", "category": "Kỹ thuật", "level": "Nâng cao"},
                    {"name": "Mật mã học & Quản lý chứng chỉ bảo mật (PKI, Encryption)", "category": "Kỹ thuật", "level": "Trung cấp"},
                    {"name": "Quản trị hệ thống Linux & Scripting (Bash, Python)", "category": "Kỹ thuật", "level": "Trung cấp"},
                    {"name": "Tư duy điều tra và xử lý sự cố khẩn cấp", "category": "Kỹ năng mềm", "level": "Trung cấp"}
                ], ensure_ascii=False),
                json.dumps([
                    {"courseCode": "INT3505", "courseName": "An toàn và bảo mật thông tin", "relevance": "Cốt lõi", "reason": "Cung cấp lý thuyết mật mã, các loại hình tấn công và giải pháp an ninh mạng.", "type": "verified"},
                    {"courseCode": "INT3202", "courseName": "Mạng máy tính", "relevance": "Cốt lõi", "reason": "Nền tảng thiết yếu về kiến trúc mạng, mô hình OSI, định tuyến và phân tích luồng dữ liệu.", "type": "verified"},
                    {"courseCode": "INT2211", "courseName": "Hệ điều hành", "relevance": "Cốt lõi", "reason": "Hiểu kiến trúc nhân, quyền hạn người dùng và quản lý bộ nhớ để phát hiện mã độc.", "type": "verified"}
                ], ensure_ascii=False)
            ),
            (
                "devops-cloud",
                "Kỹ sư Vận hành & Điện toán Đám mây (DevOps / Cloud Engineer)",
                "Hạ tầng & Đám mây",
                "Tự động hóa quy trình phân phối phần mềm, triển khai và duy trì các hệ thống đám mây (AWS, GCP, Azure) ổn định và sẵn sàng mở rộng.",
                "18.000.000 - 42.000.000 VNĐ/tháng",
                "Rất cao (Mọi doanh nghiệp số đều đang chuyển dịch lên hạ tầng Cloud)",
                json.dumps([
                    "Xây dựng và duy trì đường ống tự động tích hợp và triển khai (CI/CD Pipelines).",
                    "Đóng gói ứng dụng thành container (Docker) và điều phối với Kubernetes (K8s).",
                    "Quản lý hạ tầng bằng mã nguồn (Infrastructure as Code - Terraform, Ansible).",
                    "Thiết lập hệ thống giám sát cảnh báo tài nguyên (Prometheus, Grafana)."
                ], ensure_ascii=False),
                json.dumps([
                    {"name": "Quản trị hệ điều hành Linux nâng cao", "category": "Nền tảng", "level": "Nâng cao"},
                    {"name": "Container & Điều phối (Docker, Kubernetes)", "category": "Kỹ thuật", "level": "Nâng cao"},
                    {"name": "Nền tảng đám mây (AWS / Google Cloud / Azure)", "category": "Kỹ thuật", "level": "Trung cấp"},
                    {"name": "CI/CD & Tự động hóa (GitHub Actions, GitLab CI)", "category": "Kỹ thuật", "level": "Nâng cao"},
                    {"name": "Giám sát & Tối ưu chi phí hạ tầng (Monitoring & FinOps)", "category": "Kỹ thuật", "level": "Trung cấp"}
                ], ensure_ascii=False),
                json.dumps([
                    {"courseCode": "INT2211", "courseName": "Hệ điều hành", "relevance": "Cốt lõi", "reason": "Kiến thức căn bản về quản lý tài nguyên, file system và shell scripting trên Linux.", "type": "verified"},
                    {"courseCode": "INT3202", "courseName": "Mạng máy tính", "relevance": "Cốt lõi", "reason": "Hiểu rõ DNS, Load Balancing, VPC, Subnetting khi thiết kế mạng đám mây.", "type": "verified"},
                    {"courseCode": "INT3306", "courseName": "Phát triển ứng dụng Web", "relevance": "Bổ trợ", "reason": "Nắm bắt vòng đời ứng dụng web để tối ưu hóa quy trình deploy và cấu hình server.", "type": "verified"}
                ], ensure_ascii=False)
            ),
            (
                "embedded-iot",
                "Kỹ sư Hệ thống Nhúng & IoT (Embedded & IoT Engineer)",
                "Điện tử & Nhúng",
                "Thiết kế phần mềm cho vi điều khiển, thiết bị thông minh, xe tự hành và các giải pháp Internet vạn vật (Internet of Things).",
                "14.000.000 - 35.000.000 VNĐ/tháng",
                "Tăng trưởng mạnh (Xu hướng thiết bị thông minh, Smart Home và Xe điện tử)",
                json.dumps([
                    "Lập trình firmware nhúng trên vi điều khiển STM32, ESP32, ARM Cortex.",
                    "Lập trình giao tiếp cảm biến và ngoại vi qua UART, SPI, I2C, CAN bus.",
                    "Xây dựng giao thức kết nối IoT không dây (MQTT, BLE, LoRa, Wi-Fi).",
                    "Tối ưu hóa năng lượng tiêu thụ và kích thước bộ nhớ thiết bị nhúng."
                ], ensure_ascii=False),
                json.dumps([
                    {"name": "Lập trình C / C++ cho Hệ thống Nhúng", "category": "Kỹ thuật", "level": "Nâng cao"},
                    {"name": "Kiến trúc vi xử lý và hệ điều hành thời gian thực (RTOS)", "category": "Kỹ thuật", "level": "Nâng cao"},
                    {"name": "Giao thức truyền thông nhúng (SPI, I2C, CAN, MQTT)", "category": "Kỹ thuật", "level": "Trung cấp"},
                    {"name": "Đọc sơ đồ mạch và đo kiểm tín hiệu điện tử cơ bản", "category": "Kỹ thuật", "level": "Trung cấp"}
                ], ensure_ascii=False),
                json.dumps([
                    {"courseCode": "INT2211", "courseName": "Hệ điều hành", "relevance": "Cốt lõi", "reason": "Hiểu các cơ chế lập lịch, ngắt phần cứng và đồng bộ tiến trình trong môi trường nhúng.", "type": "verified"},
                    {"courseCode": "INT1004", "courseName": "Lập trình nâng cao", "relevance": "Cốt lõi", "reason": "Nắm vững kỹ thuật lập trình C/C++, con trỏ và quản lý bộ nhớ trực tiếp.", "type": "verified"},
                    {"courseCode": "INT3202", "courseName": "Mạng máy tính", "relevance": "Bổ trợ", "reason": "Cung cấp nền tảng kết nối mạng phục vụ các giải pháp IoT đám mây.", "type": "verified"}
                ], ensure_ascii=False)
            ),
            (
                "product-manager",
                "Quản lý Sản phẩm Công nghệ (Tech Product Manager)",
                "Quản lý & Sản phẩm",
                "Định hình tầm nhìn sản phẩm, nghiên cứu nhu cầu người dùng, cầu nối giữa đội ngũ kỹ thuật, kinh doanh và thiết kế để tạo nên sản phẩm thành công.",
                "18.000.000 - 45.000.000 VNĐ/tháng",
                "Cao (Được săn đón tại các công ty công nghệ và quy mô đa quốc gia)",
                json.dumps([
                    "Nghiên cứu thị trường và phỏng vấn người dùng để phát hiện nhu cầu tiềm ẩn.",
                    "Xây dựng Product Roadmap và ưu tiên tính năng (Feature Backlog).",
                    "Phối hợp chặt chẽ với Tech Lead và UI/UX Designer để hiện thực hóa tính năng.",
                    "Đo lường các chỉ số tăng trưởng sản phẩm (AARRR, Retention, Conversion)."
                ], ensure_ascii=False),
                json.dumps([
                    {"name": "Nghiên cứu người dùng & Khám phá sản phẩm (Product Discovery)", "category": "Sản phẩm", "level": "Nâng cao"},
                    {"name": "Hiểu biết kỹ thuật và kiến trúc phần mềm cơ bản", "category": "Kỹ thuật", "level": "Trung cấp"},
                    {"name": "Phân tích dữ liệu sản phẩm (Google Analytics, Mixpanel, SQL)", "category": "Dữ liệu", "level": "Trung cấp"},
                    {"name": "Kỹ năng lãnh đạo không quyền lực & Thuyết phục", "category": "Kỹ năng mềm", "level": "Nâng cao"},
                    {"name": "Giao tiếp và quản lý kỳ vọng của các bên liên quan", "category": "Kỹ năng mềm", "level": "Nâng cao"}
                ], ensure_ascii=False),
                json.dumps([
                    {"courseCode": "INT3306", "courseName": "Phát triển ứng dụng Web", "relevance": "Cốt lõi", "reason": "Hiểu cách thức một sản phẩm web hoạt động thực tế để giao tiếp hiệu quả với kỹ sư.", "type": "verified"},
                    {"courseCode": "INT2204", "courseName": "Lập trình hướng đối tượng", "relevance": "Bổ trợ", "reason": "Rèn luyện tư duy logic cấu trúc hệ thống.", "type": "verified"},
                    {"courseCode": "MAT1101", "courseName": "Xác suất thống kê", "relevance": "Bổ trợ", "reason": "Phục vụ việc chạy thử nghiệm A/B Testing và đưa ra quyết định dựa trên dữ liệu.", "type": "verified"}
                ], ensure_ascii=False)
            )
        ]
        cur.executemany("""
            INSERT INTO career_roles (id, title, category, description, salary_range, market_demand, responsibilities, required_skills, course_mappings)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, roles)

    # Check organizations
    cur.execute("SELECT COUNT(*) FROM organizations")
    if cur.fetchone()[0] == 0:
        orgs = [
            (
                "clb-tin-hoc",
                "Câu lạc bộ Tin học UET (UET Computer Club)",
                "club",
                "Công nghệ & Học thuật",
                "Câu lạc bộ học thuật chuyên sâu hàng đầu UET, tập hợp sinh viên đam mê thuật toán, lập trình thi đấu và phát triển phần mềm.",
                "CLB Tin học UET là nơi quy tụ các sinh viên tài năng đam mê thuật toán, lập trình thi đấu quốc tế ICPC và phát triển dự án công nghệ thực chiến. CLB thường xuyên tổ chức các buổi đào tạo thuật toán, workshop công nghệ và cuộc thi UET Code Camp thường niên.",
                "Sinh viên UET có niềm đam mê lập trình, chịu khó học hỏi, ưu tiên sinh viên năm 1, 2.",
                "Đang tuyển thành viên",
                "Học kỳ 1 hàng năm (Tháng 9 - Tháng 10)",
                "Chủ nhiệm CLB: Hoàng Minh Tuấn",
                "clbtinhoc@uet.vnu.edu.vn",
                "https://fb.com/ueticpc",
                "https://facebook.com/ueticpc",
                "Phòng 305-G2, ĐH Công nghệ, 144 Xuân Thủy, Cầu Giấy, Hà Nội",
                1
            ),
            (
                "clb-robotics",
                "Câu lạc bộ Robotics & AI (UET Robotics Club)",
                "club",
                "Robotics & Tự động hóa",
                "Sân chơi nghiên cứu và chế tạo robot, xe tự hành, thiết bị bay thông minh và tham gia các cuộc thi Robocon toàn quốc.",
                "CLB Robotics UET là môi trường thực hành sáng tạo cho sinh viên các ngành Cơ kỹ thuật, Cơ điện tử và CNTT. Thành viên được tài trợ linh kiện, tham gia thiết kế vi mạch, lập trình nhúng và đại diện trường thi Robocon Việt Nam.",
                "Sinh viên đam mê phần cứng, lập trình C/C++, thiết kế 3D hoặc cơ khí.",
                "Mở đăng ký dự án mới",
                "Tuyển sinh quanh năm theo từng dự án Robocon",
                "Phụ trách: TS. Trần Anh Tuấn (Khoa Cơ điện tử)",
                "robotics@uet.vnu.edu.vn",
                "https://uet.vnu.edu.vn",
                "https://facebook.com/uetrobotics",
                "Xưởng Robotics, Tầng 1 Nhà G3",
                1
            ),
            (
                "clb-guitar",
                "Câu lạc bộ Âm nhạc UET Guitar Club",
                "club",
                "Văn hóa nghệ thuật",
                "Không gian giao lưu âm nhạc, rèn luyện kỹ năng biểu diễn và gắn kết sinh viên sau những giờ học căng thẳng.",
                "Được thành lập từ những ngày đầu của trường, UET Guitar Club là mái nhà chung ấm áp của những tâm hồn yêu âm nhạc. CLB biểu diễn tại mọi sự kiện lớn của trường và tổ chức Acoustic Night định kỳ hàng tháng.",
                "Yêu thích âm nhạc, hòa đồng, không bắt buộc phải biết chơi nhạc cụ từ trước.",
                "Đang hoạt động",
                "Đợt tuyển chính vào đầu năm học mới",
                "Trưởng ban tổ chức: Lê Thu Trang",
                "guitarclub@uet.vnu.edu.vn",
                "https://fb.com/uetguitarclub",
                "https://facebook.com/uetguitarclub",
                "Khu vực sảnh G2 - G3",
                1
            ),
            (
                "lab-ai",
                "Phòng Thí nghiệm Trí tuệ Nhân tạo & Xử lý Ngôn ngữ (AILab)",
                "lab",
                "Trí tuệ nhân tạo (AI & NLP)",
                "Phòng thí nghiệm nghiên cứu chuyên sâu về Học máy, Mô hình ngôn ngữ lớn (LLM) và Thị giác máy tính.",
                "Phòng thí nghiệm do các Giáo sư, Tiến sĩ đầu ngành tại Khoa CNTT dẫn dắt, thực hiện các đề tài cấp Nhà nước và hợp tác quốc tế. Sinh viên tham gia được trực tiếp làm nghiên cứu, công bố bài báo khoa học quốc tế (IEEE, ACM) và tiếp cận dàn máy chủ GPU công suất cao.",
                "Sinh viên từ năm 3 trở lên, điểm trung bình tích lũy từ 3.2, nắm chắc Giải tích, Đại số và Python.",
                "Tuyển nghiên cứu viên sinh viên",
                "Nhận hồ sơ đợt 1 đến hết 30/11 hàng năm",
                "Trưởng phòng TN: PGS.TS. Nguyễn Lê Minh",
                "ailab@vnu.edu.vn",
                "https://ailab.uet.vnu.edu.vn",
                "https://facebook.com/uet.ailab",
                "Phòng 401, Nhà E3, 144 Xuân Thủy",
                1
            ),
            (
                "lab-cybersecurity",
                "Phòng Thí nghiệm An toàn Thông tin & Mạng (NetSec Lab)",
                "lab",
                "An ninh mạng & Hệ thống",
                "Nghiên cứu bảo mật hệ thống mạng thế hệ mới, phân tích mã độc và phát hiện tấn công tự động bằng AI.",
                "NetSec Lab tập trung vào nghiên cứu giải pháp an toàn mạng cho hạ tầng trọng yếu, blockchain và bảo mật IoT. Phòng thí nghiệm là cái nôi rèn luyện các đội thi Capture The Flag (CTF) đạt giải cao toàn quốc và khu vực ASEAN.",
                "Có kiến thức vững về Mạng máy tính và Hệ điều hành, tư duy đạo đức bảo mật tốt.",
                "Mở đăng ký thực tập",
                "Phỏng vấn trực tiếp hàng tháng",
                "Trưởng phòng TN: TS. Vũ Mạnh Hùng",
                "netsec@uet.vnu.edu.vn",
                "https://netsec.uet.vnu.edu.vn",
                "https://facebook.com/netseclab",
                "Phòng 312, Nhà G2, 144 Xuân Thủy",
                1
            ),
            (
                "dept-fit",
                "Khoa Công nghệ Thông tin (Faculty of Information Technology)",
                "department",
                "Khoa đào tạo chính khóa",
                "Khoa đào tạo nòng cốt của Trường ĐH Công nghệ với các ngành CNTT, Kỹ thuật Phần mềm, Khoa học Máy tính.",
                "Khoa Công nghệ Thông tin là đơn vị uy tín hàng đầu cả nước về đào tạo và nghiên cứu khoa học máy tính. Khoa phụ trách quản lý chuyên môn các học phần ngành INT, đồ án tốt nghiệp và kết nối thực tập doanh nghiệp.",
                "Dành cho toàn thể sinh viên theo học các chương trình đào tạo của Khoa CNTT.",
                "Liên hệ giờ hành chính",
                "Thứ 2 đến Thứ 6 (8h00 - 17h00)",
                "Văn phòng Khoa: CV. Hoàng Thị Loan",
                "fit@vnu.edu.vn",
                "https://fit.uet.vnu.edu.vn",
                "https://facebook.com/fit.uet.vnu",
                "Phòng 301, Nhà E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội",
                1
            ),
            (
                "dept-academic-affairs",
                "Phòng Đào tạo (Office of Academic Affairs)",
                "department",
                "Phòng chức năng quản lý",
                "Đơn vị quản lý đào tạo, kế hoạch học tập, đăng ký học phần, lịch thi và cấp phát văn bằng chứng chỉ.",
                "Phòng Đào tạo hỗ trợ sinh viên giải quyết mọi thắc mắc liên quan đến quy chế đào tạo, chuẩn đầu ra ngoại ngữ, bảng điểm chính thức, chuyển điểm và đăng ký học phần trên cổng đào tạo.",
                "Tất cả sinh viên các hệ đại học và sau đại học tại UET.",
                "Tiếp sinh viên trực tiếp",
                "Sáng 8h30 - 11h30, Chiều 14h00 - 16h30 các ngày làm việc",
                "Tiếp nhận hồ sơ: Bàn 1 & 2 Phòng Đào tạo",
                "daotao_dhcn@vnu.edu.vn",
                "https://uet.vnu.edu.vn/dao-tao",
                "https://facebook.com/uet.vnu.edu.vn",
                "Phòng 105, Nhà E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội",
                1
            )
        ]
        cur.executemany("""
            INSERT INTO organizations (id, name, category, field, summary, description, requirements, recruitment_status, recruitment_period, contact_person, email, website, facebook, location, verified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, orgs)

    # Check mentors
    cur.execute("SELECT COUNT(*) FROM mentors")
    if cur.fetchone()[0] == 0:
        mentors = [
            (
                "mentor-1",
                "Anh Trần Quang Huy",
                "Senior Tech Lead & Solution Architect",
                "FPT Software (Alumni K58 UET)",
                json.dumps(["Full-stack Web", "Microservices", "Cloud AWS", "System Architecture"], ensure_ascii=False),
                "Công nghệ phần mềm & Hệ thống",
                9,
                "Cựu sinh viên K58 Khoa CNTT, 9 năm kinh nghiệm phát triển phần mềm cho thị trường Nhật Bản và Bắc Mỹ. Từng hướng dẫn hơn 30 sinh viên UET hoàn thành đồ án tốt nghiệp và đỗ thực tập sinh tại FPT, Viettel, VNG.",
                json.dumps([
                    "Định hướng lộ trình trở thành Software Engineer chuyên nghiệp",
                    "Review CV kỹ thuật và mẹo phỏng vấn vòng Coding/System Design",
                    "Chia sẻ kinh nghiệm làm việc trong dự án quy mô lớn"
                ], ensure_ascii=False),
                "Tối Thứ 4 & Sáng Thứ 7 hàng tuần (Online Google Meet)",
                "Email / Google Meet",
                1
            ),
            (
                "mentor-2",
                "Chị Nguyễn Hoàng Mai Lan",
                "AI Research Lead & Data Scientist",
                "Viettel AI Center (Alumni K60 UET)",
                json.dumps(["Machine Learning", "NLP / LLM", "PyTorch", "Data Science"], ensure_ascii=False),
                "Trí tuệ nhân tạo & Dữ liệu",
                7,
                "Cựu sinh viên K60 ngành Khoa học Máy tính UET, Thạc sĩ Khoa học Máy tính tại KAIST (Hàn Quốc). Hiện dẫn dắt nhóm nghiên cứu xử lý ngôn ngữ tự nhiên ứng dụng trợ lý ảo tại Viettel.",
                json.dumps([
                    "Tư vấn lựa chọn hướng nghiên cứu AI và viết bài báo khoa học",
                    "Định hướng học bổng du học Thạc sĩ / Tiến sĩ ngành AI",
                    "Thực tế công việc AI Engineer tại doanh nghiệp công nghệ lớn"
                ], ensure_ascii=False),
                "Chiều Chủ Nhật (14:00 - 17:00)",
                "Google Meet",
                1
            ),
            (
                "mentor-3",
                "Anh Phạm Đức Minh",
                "Cyber Security Consultant & Penetration Tester",
                "VNPT Cyber Immunity (Alumni K59 UET)",
                json.dumps(["Web Security", "Penetration Testing", "Security Operations", "Network Audit"], ensure_ascii=False),
                "An toàn thông tin",
                8,
                "Cựu sinh viên K59 UET, chứng chỉ quốc tế OSCP, CISSP, CEH. Từng phát hiện nhiều lỗ hổng bảo mật nghiêm trọng trong các hệ thống chính phủ và tài chính.",
                json.dumps([
                    "Lộ trình học và thi các chứng chỉ quốc tế ngành An toàn thông tin",
                    "Kỹ năng thực hành CTF và phòng thủ hệ thống",
                    "Định hướng nghề nghiệp Pentester vs SOC Analyst"
                ], ensure_ascii=False),
                "Tối Thứ 6 (20:00 - 21:30)",
                "Discord / Google Meet",
                1
            ),
            (
                "mentor-4",
                "Chị Đặng Phương Thảo",
                "Senior Product Manager",
                "MoMo Fintech (Alumni K61 UET)",
                json.dumps(["Product Management", "Agile/Scrum", "User Experience", "Data-driven Decision"], ensure_ascii=False),
                "Quản lý sản phẩm công nghệ",
                6,
                "Tốt nghiệp Kỹ sư CNTT tại UET sau đó chuyển hướng chuyên sâu sang mảng Quản lý sản phẩm công nghệ (Product Management) tại MoMo và ZaloPay.",
                json.dumps([
                    "Chuyển đổi từ kỹ sư lập trình sang Quản lý sản phẩm (Developer to PM)",
                    "Xây dựng tư duy sản phẩm lấy người dùng làm trung tâm",
                    "Chuẩn bị hồ sơ ứng tuyển vị trí Associate Product Manager (APM)"
                ], ensure_ascii=False),
                "Sáng Thứ 7 (09:00 - 11:30)",
                "Google Meet / Coffee tại Cầu Giấy",
                1
            )
        ]
        cur.executemany("""
            INSERT INTO mentors (id, name, title, company, expertise, field, experience_years, bio, topics, availability, contact_channel, is_sample)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, mentors)

    conn.commit()
    conn.close()

# ---------------------------------------------------------------------------
# Structured UET Knowledge Repository for AI Chatbot
# ---------------------------------------------------------------------------
UET_KNOWLEDGE_BASE = [
    {
        "keywords": ["chuẩn đầu ra", "điều kiện tốt nghiệp", "tín chỉ tốt nghiệp", "tot nghiep", "cntt", "khoa cntt"],
        "topic": "Điều kiện tốt nghiệp hệ đào tạo cử nhân CNTT UET",
        "reference": "Quy chế Đào tạo ĐHQGHN & Sổ tay sinh viên UET 2024",
        "type": "verified",
        "answer": "Để được xét tốt nghiệp đại học chính quy tại Trường Đại học Công nghệ (UET - ĐHQGHN), sinh viên cần hoàn thành các điều kiện chính:\n1. Tích lũy đủ số tín chỉ quy định của chương trình đào tạo (thông thường từ 128 - 135 tín chỉ tùy ngành).\n2. Điểm trung bình chung tích lũy toàn khóa (GPA) đạt từ 2.00/4.00 trở lên.\n3. Đạt chuẩn đầu ra Ngoại ngữ theo quy định (chứng chỉ VSTEP bậc 3/6 trở lên, IELTS tương đương theo quy định của ĐHQGHN).\n4. Đạt chuẩn đầu ra Giáo dục Thể chất và Giáo dục Quốc phòng - An ninh.\n5. Đạt chuẩn kỹ năng CNTT theo quy định.\n6. Tại thời điểm xét tốt nghiệp không bị truy cứu trách nhiệm hình sự hoặc không đang trong thời gian bị kỷ luật từ mức đình chỉ học tập trở lên.\nLưu ý: Mọi quy định chi tiết cụ thể từng khóa được công bố tại Phòng Đào tạo (P105-E3)."
    },
    {
        "keywords": ["đăng ký học phần", "dang ky hoc phan", "hủy học phần", "rút môn", "tin chi"],
        "topic": "Quy trình đăng ký và điều chỉnh học phần",
        "reference": "Thông báo Phòng Đào tạo UET & Cổng thông tin dangkyhoc.vnu.edu.vn",
        "type": "verified",
        "answer": "Quy trình đăng ký học phần tại UET được thực hiện theo các bước:\n1. Đợt 1 (Đăng ký sớm): Sinh viên đăng ký trực tuyến trên hệ thống dangkyhoc.vnu.edu.vn theo khung giờ mở cho từng khóa.\n2. Đợt 2 (Đăng ký bổ sung & Đổi lớp): Diễn ra trước khi học kỳ mới bắt đầu hoặc trong 2 tuần đầu kỳ học.\n3. Rút bớt học phần: Sinh viên được phép rút bớt học phần trong thời hạn quy định (thường trong 2-4 tuần đầu học kỳ), học phần rút sẽ không tính vào điểm GPA nhưng vẫn phải nộp học phí theo quy định.\nLưu ý: Sinh viên cần theo dõi kỹ khung giờ và thông báo thời gian mở cổng trên website chính thức của Phòng Đào tạo (uet.vnu.edu.vn/dao-tao)."
    },
    {
        "keywords": ["học phí", "hoc phi", "thanh toan", "ngan hang", "bidv", "mien giam"],
        "topic": "Học phí và phương thức thanh toán",
        "reference": "Phòng Kế hoạch - Tài chính UET & Cổng StudentHub UET",
        "type": "verified",
        "answer": "Quy định thanh toán học phí tại StudentHub UET:\n1. Sinh viên có thể xem chi tiết học phí của từng học kỳ tại mục 'Tài chính sinh viên' trên cổng StudentHub.\n2. Phương thức nộp: Chuyển khoản ngân hàng hoặc nộp qua cổng thanh toán liên kết theo đúng cấu trúc mã hóa đơn được cấp.\n3. Hồ sơ miễn giảm học phí: Được thu nhận vào đầu mỗi năm học theo hướng dẫn của Phòng Công tác Sinh viên (Phòng 104-E3).\nKhuyến cáo: Luôn kiểm tra kỹ mã sinh viên và mã học kỳ trước khi hoàn tất chuyển khoản."
    },
    {
        "keywords": ["giấy xác nhận", "giay xac nhan", "vay von", "hoan nghia vu", "the sinh vien", "thu tuc hanh chinh"],
        "topic": "Thủ tục xin cấp giấy xác nhận và hành chính sinh viên",
        "reference": "Phòng Công tác Sinh viên (P104-E3) & Cổng StudentHub",
        "type": "verified",
        "answer": "Để tạo yêu cầu thủ tục hành chính tại UET:\n1. Sinh viên truy cập mục 'Thủ tục hành chính' -> 'Tạo yêu cầu' trên cổng StudentHub UET.\n2. Chọn loại biểu mẫu cần cấp: Giấy xác nhận đang là sinh viên, Giấy vay vốn ngân hàng chính sách, Giấy tạm hoãn nghĩa vụ quân sự, hoặc Đề nghị cấp lại thẻ sinh viên.\n3. Điền các trường thông tin cần thiết và gửi yêu cầu.\n4. Sau khi cán bộ tiếp nhận duyệt (thường từ 1-2 ngày làm việc), sinh viên nhận kết quả tại Phòng Công tác Sinh viên (Phòng 104, Nhà E3) hoặc nhận bản điện tử có ký số nếu hệ thống hỗ trợ."
    },
    {
        "keywords": ["học bổng", "hoc bong", "khuyen khich", "toshiba", "mitsubishi", "doanh nghiep"],
        "topic": "Chính sách học bổng khuyến khích và tài trợ doanh nghiệp",
        "reference": "Phòng Công tác Sinh viên & Hội đồng Học bổng UET",
        "type": "verified",
        "answer": "UET có hai nguồn học bổng chính dành cho sinh viên:\n1. Học bổng Khuyến khích học tập (ngân sách): Xét theo từng học kỳ dựa trên kết quả học tập (GPA >= 2.50) và điểm rèn luyện (Loại Khá trở lên), không có môn thi bị điểm F.\n2. Học bổng tài trợ doanh nghiệp: Các học bổng danh giá thường niên như Toshiba, Mitsubishi, Yamada, Viettel, Samsung, POSCO TJ Park... Yêu cầu sinh viên có thành tích xuất sắc, tích cực tham gia NCKH hoặc hoàn cảnh vượt khó.\nThông tin mở hồ sơ được cập nhật thường xuyên tại mục 'Bảng tin' trên StudentHub và website uet.vnu.edu.vn."
    },
    {
        "keywords": ["câu lạc bộ", "clb", "phòng thí nghiệm", "lab", "nckh", "nghien cuu"],
        "topic": "Hoạt động câu lạc bộ và nghiên cứu khoa học sinh viên",
        "reference": "Đoàn Thanh niên - Hội Sinh viên UET & Phòng KHCN",
        "type": "verified",
        "answer": "Sinh viên UET có nhiều cơ hội tham gia các CLB và Lab nghiên cứu:\n1. CLB học thuật & công nghệ: CLB Tin học UET (thuật toán, ICPC), CLB Robotics & AI (Robocon, thiết bị thông minh).\n2. CLB nghệ thuật & kỹ năng: UET Guitar Club, CLB Tiếng Anh, CLB Thể thao, Đội Tình nguyện UET.\n3. Phòng thí nghiệm (Lab): AILab (Trí tuệ nhân tạo), NetSec Lab (An toàn thông tin), VNu Lab (IoT & Hệ thống nhúng).\nSinh viên có thể tra cứu toàn bộ danh bạ, thời gian tuyển và liên hệ tại mục 'Câu lạc bộ & Phòng thí nghiệm' trên thanh điều hướng StudentHub."
    },
    {
        "keywords": ["cố vấn", "mentor", "alumni", "cuu sinh vien", "huong nghiep", "thuc tap"],
        "topic": "Mạng lưới Cố vấn nghề nghiệp & Cựu sinh viên UET",
        "reference": "Mạng lưới Cựu sinh viên & Hỗ trợ việc làm UET",
        "type": "verified",
        "answer": "Chương trình Cố vấn nghề nghiệp (Career Mentorship) kết nối sinh viên UET với các cựu sinh viên và chuyên gia cấp cao đang công tác tại các tập đoàn công nghệ lớn (FPT, Viettel, VNPT, MoMo, VNPT...).\nSinh viên có thể:\n- Tra cứu danh bạ Mentor theo chuyên môn và lĩnh vực.\n- Đặt lịch hẹn tư vấn 1-on-1 (Review CV, định hướng phỏng vấn, chia sẻ kinh nghiệm đồ án).\n- Theo dõi trạng thái yêu cầu tại mục 'Cố vấn nghề nghiệp' trên StudentHub."
    }
]

def search_knowledge_base(query):
    query_lower = query.lower()
    matched = []
    for item in UET_KNOWLEDGE_BASE:
        score = sum(1 for kw in item["keywords"] if kw in query_lower)
        if score > 0:
            matched.append((score, item))
    matched.sort(key=lambda x: x[0], reverse=True)
    return [m[1] for m in matched]

# ---------------------------------------------------------------------------
# AI Chatbot Handler (External Provider with Local Knowledge Fallback)
# ---------------------------------------------------------------------------
def process_chat_message(student_code, conversation_id, user_message):
    user_message = user_message.strip()
    if not user_message:
        return {"error": "Tin nhắn không được để trống."}, 400
    if len(user_message) > 1000:
        return {"error": "Tin nhắn vượt quá giới hạn 1000 ký tự cho phép."}, 400

    conn = get_db()
    cur = conn.cursor()

    # Ensure conversation exists
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cur.execute("SELECT id FROM chat_conversations WHERE id = ? AND student_code = ?", (conversation_id, student_code))
    row = cur.fetchone()
    if not row:
        title = user_message[:35] + ("..." if len(user_message) > 35 else "")
        cur.execute("""
            INSERT INTO chat_conversations (id, student_code, title, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?)
        """, (conversation_id, student_code, title, now, now))
    else:
        cur.execute("UPDATE chat_conversations SET updated_at = ? WHERE id = ?", (now, conversation_id))

    # Save user message
    cur.execute("""
        INSERT INTO chat_messages (conversation_id, sender, content, created_at)
        VALUES (?, 'user', ?, ?)
    """, (conversation_id, user_message, now))

    # Knowledge Retrieval
    kb_results = search_knowledge_base(user_message)

    ai_answer = ""
    sources = []

    # Check for external AI API key
    gemini_key = os.environ.get("GEMINI_API_KEY")
    openai_key = os.environ.get("OPENAI_API_KEY")

    if gemini_key:
        try:
            prompt = f"""Bạn là Trợ lý sinh viên AI chính thức của Trường Đại học Công nghệ - ĐHQGHN (StudentHub UET).
Người hỏi: Sinh viên {student_code}.
Dữ liệu chuẩn UET tham khảo: {json.dumps(kb_results, ensure_ascii=False)}
Câu hỏi sinh viên: "{user_message}"
Yêu cầu trả lời:
- Trả lời bằng tiếng Việt thân thiện, rõ ràng, mang tính tư vấn học vụ chính xác.
- Chỉ dựa vào thông tin chính thức của UET đã có, tuyệt đối không bịa đặt quy chế, hạn nộp hay số liên lạc.
- Nếu không chắc chắn hoặc câu hỏi ngoài phạm vi, hướng dẫn sinh viên liên hệ Phòng Đào tạo (P105-E3, daotao_dhcn@vnu.edu.vn) hoặc Phòng CTSV (P104-E3)."""
            req_data = json.dumps({
                "contents": [{"parts": [{"text": prompt}]}]
            }).encode("utf-8")
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
            req = urllib.request.Request(url, data=req_data, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                res_json = json.loads(resp.read().decode("utf-8"))
                ai_answer = res_json["candidates"][0]["content"]["parts"][0]["text"]
                sources = [{"title": kb["topic"], "ref": kb["reference"], "type": kb["type"]} for kb in kb_results[:3]]
        except Exception as e:
            ai_answer = ""

    if not ai_answer:
        # Smart Built-in Knowledge Response
        if kb_results:
            primary_match = kb_results[0]
            ai_answer = f"Chào bạn! Dưới đây là thông tin hướng dẫn giải đáp từ kho tri thức chính thức của Trường ĐH Công nghệ:\n\n{primary_match['answer']}"
            if len(kb_results) > 1:
                ai_answer += f"\n\nBạn cũng có thể tham khảo thêm về: '{kb_results[1]['topic']}'."
            sources = [{"title": kb["topic"], "ref": kb["reference"], "type": kb["type"]} for kb in kb_results[:3]]
        else:
            ai_answer = (
                "Xin chào bạn! Câu hỏi của bạn hiện chưa có trong cơ sở dữ liệu quy chế chuẩn được số hóa của StudentHub UET.\n\n"
                "📌 Khuyến nghị hỗ trợ:\n"
                "- Về học vụ, điểm số và đăng ký học phần: Vui lòng liên hệ Phòng Đào tạo (Phòng 105-E3, email: daotao_dhcn@vnu.edu.vn).\n"
                "- Về thủ tục sinh viên, học bổng và rèn luyện: Vui lòng liên hệ Phòng Công tác Sinh viên (Phòng 104-E3, email: ctsv_dhcn@vnu.edu.vn).\n"
                "- Bạn cũng có thể gửi phản ánh trực tiếp qua mục 'Trợ giúp & Góp ý' trên thanh menu."
            )
            sources = [{"title": "Bộ phận Một cửa UET", "ref": "Phòng 104 & 105 Nhà E3, 144 Xuân Thủy", "type": "official-contact"}]

    # Save assistant message
    cur.execute("""
        INSERT INTO chat_messages (conversation_id, sender, content, sources, created_at)
        VALUES (?, 'assistant', ?, ?, ?)
    """, (conversation_id, ai_answer, json.dumps(sources, ensure_ascii=False), now))

    conn.commit()
    conn.close()

    return {
        "status": "success",
        "conversationId": conversation_id,
        "message": {
            "sender": "assistant",
            "content": ai_answer,
            "sources": sources,
            "createdAt": now
        }
    }, 200

# Initialize DB on load
init_db()
seed_data_if_needed()
