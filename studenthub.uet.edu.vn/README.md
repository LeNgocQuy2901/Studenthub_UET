# 🎓 StudentHub UET - Cổng Thông Tin & Trợ Lý Học Vụ Sinh Viên UET

> **Phiên bản nâng cấp mở rộng (Enhanced Academic Prototype)**  
> Dành cho sinh viên Trường Đại học Công nghệ – Đại học Quốc gia Hà Nội (VNU-UET).  
> Tích hợp 4 nhóm tính năng mới: **Định hướng nghề nghiệp**, **Trợ lý sinh viên AI**, **Danh bạ Câu lạc bộ & Phòng thí nghiệm (Crawl chính thức từ web UET)**, và **Mạng lưới Cố vấn nghề nghiệp 1-on-1**.

---

## 📌 Mục lục
1. [Giới thiệu tổng quan](#-giới-thiệu-tổng-quan)
2. [Yêu cầu hệ thống & Cài đặt môi trường](#-yêu-cầu-hệ-thống--cài-đặt-môi-trường)
3. [Hướng dẫn khởi chạy dự án](#-hướng-dẫn-khởi-chạy-dự-án)
4. [Kiểm thử tự động (Test Suite)](#-kiểm-thử-tự-động-test-suite)
5. [Cấu trúc mã nguồn & Công nghệ](#-cấu-trúc-mã-nguồn--công-nghệ)
6. [Tài liệu Mock API cho Trợ lý AI (Danh sách câu hỏi mẫu)](#-tài-liệu-mock-api-cho-trợ-lý-ai-danh-sách-câu-hỏi-mẫu)
7. [Chính sách an toàn & Bảo mật](#-chính-sách-an-toàn--bảo-mật)

---

## 🌟 Giới thiệu tổng quan

Dự án mở rộng dựa trên giao diện cổng thông tin học sinh - sinh viên **StudentHub UET**, bổ sung 4 nhóm tính năng trọng tâm:

1. **P1 — Định hướng học tập theo nghề nghiệp (`/career-guidance`):**
   - Khám phá các vị trí nghề nghiệp CNTT phổ biến: *Full-stack Software Engineer, AI/ML Engineer, Cyber Security Specialist, DevOps/Cloud Engineer, Tech Product Manager, Embedded & IoT Engineer*.
   - Bản đồ ánh xạ kỹ năng nghề nghiệp với các môn học chính khóa tại UET (INT2204, INT2211, INT3202, INT3306, INT3401, INT3505...).
   - Công cụ tự đánh giá kỹ năng (Skills Assessment), phân tích khoảng cách kỹ năng (Gap Analysis).
   - Thiết lập và lưu trữ lộ trình học tập cá nhân hóa (Learning Roadmap).

2. **P2 — Trợ lý sinh viên AI UET (`/student-assistant` & Floating Widget):**
   - Widget trò chuyện nổi (Floating Chatbot) hiện diện ở góc màn hình trên mọi trang.
   - Trang trò chuyện chuyên biệt có lịch sử hội thoại, giao diện trực quan.
   - Tích hợp kho tri thức chuẩn UET và hỗ trợ fallback sang Mock AI thông minh khi không có kết nối internet hoặc API Key ngoài.
   - Luôn hiển thị nguồn dẫn tham chiếu chính thức (*fit.uet.vnu.edu.vn, uet.vnu.edu.vn*).

3. **P3 — Danh bạ Câu lạc bộ, Bộ môn & Phòng thí nghiệm (`/organizations`):**
   - Chứa **22 đơn vị**, bao gồm **toàn bộ 5 Bộ môn chuyên môn** và **10 Phòng thí nghiệm** được cào dữ liệu trực tiếp từ cổng thông tin Khoa CNTT ([fit.uet.vnu.edu.vn/gioi-thieu/cac-bo-mon/](https://www.fit.uet.vnu.edu.vn/gioi-thieu/cac-bo-mon/)).
   - Bộ lọc theo nhóm: *Tất cả, Câu lạc bộ, Phòng thí nghiệm, Bộ môn / Khoa*.
   - Xem chi tiết: Lãnh đạo/Chủ nhiệm bộ môn, danh sách giảng viên, địa chỉ phòng làm việc (Nhà E3, G2, G3), mô tả nghiên cứu.
   - Đánh dấu lưu (Bookmark) danh bạ yêu thích có lưu trạng thái vĩnh viễn vào CSDL.

4. **P4 — Mạng lưới Cố vấn nghề nghiệp & Cựu sinh viên (`/mentorship`):**
   - Danh bạ Mentor là các Cựu sinh viên UET tiêu biểu đang làm việc tại các tập đoàn lớn (FPT, Viettel, VNPT, MoMo...).
   - Đặt lịch hẹn tư vấn 1-on-1 (Review CV, định hướng phỏng vấn, tư vấn đồ án/du học).
   - Quản lý trạng thái yêu cầu (*Chờ phản hồi, Đã chấp nhận, Từ chối, Đã hủy*) kèm tính năng hủy lịch hẹn theo đúng mã sinh viên sở hữu.

---

## 💻 Yêu cầu hệ thống & Cài đặt môi trường

### 1. Yêu cầu phần mềm
- **Hệ điều hành:** Windows 10/11, macOS, hoặc Linux.
- **Python:** Phiên bản **3.9** trở lên (Khuyến nghị Python 3.11 hoặc 3.13).
  - *Kiểm tra phiên bản:* `python --version`
- **Thư viện phụ thuộc:** **HOÀN TOÀN KHÔNG CẦN CÀI ĐẶT THÊM PACKAGE BÊN NGOÀI** (`pip install`). Toàn bộ server backend sử dụng 100% thư viện chuẩn tích hợp sẵn của Python (`http.server`, `sqlite3`, `json`, `urllib`, `datetime`, `re`, `hashlib`).
- **Trình duyệt Web:** Google Chrome, Microsoft Edge, Firefox, Brave hoặc Safari.

---

## 🚀 Hướng dẫn khởi chạy dự án

### Cách 1: Khởi chạy bằng Python Server (Khuyến nghị đầy đủ tính năng)

Đây là phương thức chuẩn giúp chạy toàn bộ giao diện SPA, REST API và cơ sở dữ liệu SQLite:

1. **Mở Terminal / PowerShell / Command Prompt** và di chuyển vào thư mục dự án:
   ```bash
   cd studenthub.uet.edu.vn
   ```

2. **Chạy server phát triển:**
   ```bash
   python server.py
   ```
   *Khi khởi chạy thành công, console sẽ hiển thị:*
   ```text
   ============================================================
   [+] StudentHub UET Enhanced Server running at:
   [+] http://localhost:8080
   [+] Serving: ...\studenthub.uet.edu.vn
   [+] Database: ...\studenthub.uet.edu.vn\studenthub.db
   [+] Features: P1 Career Guidance, P2 AI Chatbot, P3 Organizations, P4 Mentorship
   ============================================================
   ```

3. **Mở trình duyệt và truy cập:**
   👉 **[http://localhost:8080](http://localhost:8080)**

---

### Cách 2: Chạy Frontend tĩnh độc lập (Offline / Live Server)

Nếu bạn mở thư mục bằng **VS Code Live Server** (cổng 5500), `npx serve`, hoặc bất kỳ web server tĩnh nào:
- Hệ thống đã tích hợp sẵn **Client-side Mock API** (`mock-api.js`).
- Toàn bộ dữ liệu điểm số, thời khóa biểu, tài chính, cũng như **Trợ lý sinh viên AI** sẽ tự động kích hoạt chế độ **Mock Engine trực tiếp trong trình duyệt**, đảm bảo mọi câu hỏi vẫn được trả lời mượt mà mà không gặp lỗi kết nối.

---

### Cách 3 (Tùy chọn): Kết nối API Key trí tuệ nhân tạo thật (Gemini / OpenAI)

Mặc định hệ thống sử dụng thuật toán **Semantic/Keyword Retrieval & Mock AI Engine** nội bộ cực kỳ chuẩn xác và không tốn phí. Nếu muốn kết nối LLM đám mây trực tiếp:

- **Trên Windows PowerShell:**
  ```powershell
  $env:GEMINI_API_KEY="your-gemini-api-key-here"
  python server.py
  ```
- **Trên Linux / macOS:**
  ```bash
  export GEMINI_API_KEY="your-gemini-api-key-here"
  python server.py
  ```

---

## 🧪 Kiểm thử tự động (Test Suite)

Dự án tích hợp sẵn bộ kiểm thử tự động gồm **23 bài test** bao phủ 100% các endpoint REST API, ràng buộc dữ liệu, bảo mật quyền sinh viên và cơ chế định tuyến Single Page Application.

Để chạy bộ kiểm thử:
```bash
cd studenthub.uet.edu.vn
python test_suite.py
```

**Kết quả kiểm thử chuẩn:**
```text
============================================================
RUNNING STUDENTHUB UET NEW FEATURES API TEST SUITE
============================================================
 [PASS] GET /api/career/roles returns 200
 [PASS] GET /api/career/roles has at least 5 roles
 [PASS] GET /api/career/roles/se-fullstack returns 200
 [PASS] Role has required skills and course mappings
 [PASS] POST /api/career/assessment returns 200
 [PASS] GET /api/career/assessment retrieves saved ratings
 [PASS] POST /api/career/roadmap returns 200
 [PASS] GET /api/career/roadmap retrieves saved roadmap
 [PASS] POST /api/chat/send returns answer with 200
 [PASS] Chatbot returns sources and content
 [PASS] POST /api/chat/send rejects empty message with 400
 [PASS] POST /api/chat/send rejects >1000 chars with 400
 [PASS] GET /api/organizations returns 200
 [PASS] GET /api/organizations/clb-tin-hoc returns detail
 [PASS] POST /api/organizations/bookmark toggles bookmark
 [PASS] GET /api/mentors returns mentor list
 [PASS] POST /api/mentorship-requests saves request with 200
 [PASS] GET /api/mentorship-requests returns student requests
 [PASS] POST /api/mentorship-requests/<id>/cancel cancels request
 [PASS] SPA route /career-guidance serves index.html
 [PASS] SPA route /student-assistant serves index.html
 [PASS] SPA route /organizations serves index.html
 [PASS] SPA route /mentorship serves index.html
============================================================
TEST RESULTS: 23 PASSED, 0 FAILED
============================================================
```

---

## 📁 Cấu trúc mã nguồn & Công nghệ

```text
Studenthub_UET/
├── README.md                           # Tài liệu hướng dẫn cài đặt & vận hành dự án
└── studenthub.uet.edu.vn/               # Thư mục mã nguồn chính của ứng dụng
    ├── server.py                       # HTTP Server đa luồng (ThreadingHTTPServer), điều phối SPA & REST API
    ├── backend.py                      # Logic tầng dữ liệu SQLite (studenthub.db), kho tri thức UET & AI Handler
    ├── features.js                     # React Components cho 4 tính năng mới & Floating Chatbot Widget
    ├── mock-api.js                     # Adapter Mock dữ liệu học vụ, avatar Blob & Mock AI Chatbot
    ├── crawled_fit_units.json          # Dữ liệu 15 Bộ môn & PTN chính thức cào từ fit.uet.vnu.edu.vn
    ├── test_suite.py                   # Script kiểm thử tự động 23 kịch bản API & SPA routing
    ├── studenthub.db                   # Cơ sở dữ liệu SQLite lưu trữ vĩnh viễn (auto-seed khi khởi tạo)
    ├── index.html                      # Trang chủ SPA của cổng StudentHub UET
    ├── index.C_p596eZ.js               # Bundle chính (React 18, React Router, Redux Toolkit)
    ├── index.C5ysKaTQ.css              # Hệ thống Stylesheet Tailwind CSS chuẩn StudentHub
    └── images/                         # Thư mục hình ảnh, logo biểu trưng UET
```

---

## 🤖 Tài liệu Mock API cho Trợ lý AI (Danh sách câu hỏi mẫu)

Hệ thống Trợ lý sinh viên AI ([`/student-assistant`](http://localhost:8080/student-assistant) hoặc Floating Chatbot Widget góc phải màn hình) đã được nạp sẵn kho tri thức chuẩn hóa từ quy chế ĐHQGHN, Sổ tay sinh viên UET và dữ liệu cào trực tiếp từ website Khoa CNTT.

Dưới đây là **danh sách các nhóm chủ đề và câu hỏi mẫu** bạn có thể copy/paste trực tiếp để kiểm tra khả năng giải đáp của trợ lý:

### 1. Nhóm Các Bộ môn Khoa CNTT - UET (Dữ liệu cào chính thức)
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Khoa CNTT UET có những bộ môn nào?"* | Liệt kê đầy đủ 5 bộ môn: Các Hệ thống Thông tin, Công nghệ Phần mềm, Khoa học Máy tính, Khoa học & Kỹ thuật tính toán, Mạng & Truyền thông Máy tính. |
| *"Bộ môn Công nghệ phần mềm chủ nhiệm là ai và ở phòng nào?"* | Chủ nhiệm: TS. Võ Đình Hiếu, địa chỉ: P321 Nhà E3, các hướng nghiên cứu kiến trúc phần mềm, web/mobile, kiểm thử. |
| *"Bộ môn Các hệ thống thông tin nghiên cứu về cái gì?"* | Chủ nhiệm: PGS.TS. Nguyễn Ngọc Hóa, hướng nghiên cứu khai phá dữ liệu, GIS, tích hợp dịch vụ, an toàn thông tin (P311-313 Nhà E3). |
| *"Bộ môn Khoa học máy tính do thầy nào làm chủ nhiệm?"* | Chủ nhiệm: TS. Trần Quốc Long (P315-317 Nhà E3), nghiên cứu về AI, học máy, NLP, thị giác máy tính. |
| *"Bộ môn Mạng và truyền thông máy tính ở đâu?"* | Chủ nhiệm: TS. Nguyễn Hoài Sơn (P406 Nhà E3), nghiên cứu mạng máy tính, điện toán đám mây, an ninh mạng, IoT. |

---

### 2. Nhóm Các Phòng thí nghiệm & Lab nghiên cứu (Dữ liệu cào chính thức)
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Trường UET có những phòng thí nghiệm nào?"* | Cung cấp danh sách 4 PTN trọng điểm (NetSec Lab, KTLab, PTN Hệ thống Nhúng, HCI Lab) và 6 PTN mục tiêu đón đầu công nghệ. |
| *"Phòng thí nghiệm An toàn thông tin nghiên cứu về gì?"* | PTN NetSec Lab (P312 Nhà G2) - Trưởng phòng: TS. Vũ Mạnh Hùng. Nghiên cứu bảo mật, phân tích mã độc, mật mã học và đào tạo đội tuyển CTF. |
| *"Có những phòng thí nghiệm mục tiêu nào tại Khoa CNTT?"* | Giới thiệu 6 PTN mục tiêu: Tối ưu hóa các Hệ thống lớn, Blockchain, Tin Sinh Y Học, Internet of Things (IoT), Đảm bảo Chất lượng Phần mềm, Trí tuệ Nhân tạo. |
| *"Phòng thí nghiệm KTLab hay HCI Lab làm về lĩnh vực gì?"* | KTLab chuyên sâu về Khai phá dữ liệu và Mô hình ngôn ngữ lớn (LLM); HCI Lab chuyên về Tương tác người - máy, VR/AR và Đồ họa thị giác. |

---

### 3. Nhóm Chuẩn đầu ra & Điều kiện xét tốt nghiệp
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Điều kiện tốt nghiệp ra trường cần những gì?"* | 6 tiêu chuẩn: Đủ tín chỉ (128-135), CPA >= 2.00, chuẩn Ngoại ngữ VSTEP/IELTS, chứng chỉ GDTC, chứng chỉ GDQP-AN, Chuẩn kỹ năng CNTT. |
| *"Chuẩn đầu ra ngoại ngữ của UET là gì?"* | Chứng chỉ VSTEP bậc 3/6 (tương đương B1) trở lên hoặc chứng chỉ quốc tế (IELTS tương đương theo quy định của ĐHQGHN). |
| *"GPA bao nhiêu thì đủ điều kiện tốt nghiệp?"* | Điểm trung bình chung tích lũy toàn khóa (GPA/CPA) phải đạt tối thiểu từ **2.00 / 4.00** trở lên và không còn môn F chưa trả nợ. |

---

### 4. Nhóm Đăng ký học phần, Rút môn & Lịch học
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Quy trình đăng ký học phần diễn ra như thế nào?"* | Hướng dẫn 3 đợt: Đợt đăng ký sớm trên `dangkyhoc.vnu.edu.vn`, đợt đổi lớp bổ sung đầu kỳ, và quy trình theo dõi lịch mở cổng theo khóa. |
| *"Khi nào thì được rút bớt học phần?"* | Được phép rút bớt môn trong 2-4 tuần đầu kỳ học; môn rút không tính vào GPA nhưng vẫn phải nộp học phí theo quy chế. |
| *"Lớp học phần bị trùng lịch hoặc muốn xin mở thêm lớp thì làm sao?"* | Hướng dẫn liên hệ Phòng Đào tạo (Phòng 105 Nhà E3, email `daotao_dhcn@vnu.edu.vn`). |

---

### 5. Nhóm Học phí & Kênh thanh toán
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Xem học phí ở đâu và nộp như thế nào?"* | Tra cứu tại mục **Tài chính sinh viên** trên StudentHub; nộp chuyển khoản ngân hàng qua tài khoản trường tại BIDV theo cú pháp quy định. |
| *"Hồ sơ miễn giảm học phí nộp ở đâu?"* | Thu nhận vào đầu mỗi năm học tại **Phòng Công tác Sinh viên (Phòng 104, Nhà E3)**. |

---

### 6. Nhóm Thủ tục hành chính Một cửa sinh viên
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Làm sao để xin giấy xác nhận sinh viên?"* | Vào mục **Thủ tục hành chính -> Tạo yêu cầu** trên StudentHub, chọn loại biểu mẫu, đợi duyệt 1-2 ngày và nhận tại P104-E3. |
| *"Thủ tục xin giấy tạm hoãn nghĩa vụ quân sự thế nào?"* | Hướng dẫn gửi yêu cầu cấp giấy hoãn NVQS trên hệ thống, mang CCCD nhận bản có dấu đỏ tại Bộ phận Một cửa P104-E3. |
| *"Xin giấy vay vốn ngân hàng chính sách xã hội ở đâu?"* | Tạo yêu cầu biểu mẫu vay vốn trên cổng StudentHub và nhận tại P104 Nhà E3. |
| *"Mất thẻ sinh viên thì làm lại như thế nào?"* | Đăng ký cấp lại thẻ sinh viên trên cổng hoặc liên hệ trực tiếp bàn tiếp nhận P104-E3. |

---

### 7. Nhóm Chính sách học bổng
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Điều kiện để nhận học bổng khuyến khích học tập?"* | GPA học kỳ từ 2.50 trở lên, điểm rèn luyện Khá trở lên, không có học phần nào bị điểm F, xếp hạng từ cao xuống thấp theo quỹ học bổng. |
| *"Có những học bổng doanh nghiệp nào dành cho sinh viên UET?"* | Giới thiệu các học bổng tài trợ: Toshiba, Mitsubishi, Yamada, Viettel, POSCO, Samsung, Honda Award... cập nhật trên bảng tin trường. |

---

### 8. Nhóm Câu lạc bộ & Hoạt động phong trào
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Trường UET có những câu lạc bộ nào nổi bật?"* | Giới thiệu CLB Tin học UET (ICPC), CLB Robotics & AI (Robocon), CLB Guitar UET, CLB Thể thao, Đội Tình nguyện... |
| *"CLB Tin học UET có hoạt động gì?"* | Đào tạo thuật toán thi đấu quốc tế ICPC, tổ chức UET Code Camp thường niên và phát triển dự án thực chiến (P305-G2). |
| *"CLB Robotics & AI sinh hoạt ở đâu?"* | Xưởng nghiên cứu Robotics tại Tầng 1 Nhà G3, chế tạo xe tự hành và robot đại diện trường thi Robocon. |

---

### 9. Nhóm Mạng lưới Cố vấn nghề nghiệp (Mentor 1-on-1)
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Làm thế nào để đặt lịch tư vấn với Mentor?"* | Vào mục **Cố vấn nghề nghiệp** trên thanh menu, chọn Mentor phù hợp và gửi biểu mẫu đặt lịch tư vấn 1-on-1. |
| *"Có mentor nào tư vấn về Web Full-stack hoặc AI không?"* | Giới thiệu **Anh Trần Quang Huy** (Tech Lead FPT - K58) cho Full-stack/Cloud và **Chị Lê Minh Anh** (AI Lead Viettel - K60) cho AI/NLP/Du học. |
| *"Mentor có thể hỗ trợ những việc gì?"* | Review CV kỹ thuật, phỏng vấn thử (Mock Interview), định hướng đồ án tốt nghiệp, chia sẻ kinh nghiệm thực tế tại doanh nghiệp. |

---

### 10. Nhóm Định hướng nghề nghiệp & Lộ trình học tập
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Nên học những môn nào để làm Kỹ sư Phần mềm Full-stack?"* | Các môn cốt lõi: INT2204 (OOP), INT2211 (HĐH), INT3306 (Phát triển ứng dụng Web), INT3202 (Mạng máy tính), INT3110 (CSDL). |
| *"Lộ trình học để trở thành Kỹ sư Trí tuệ Nhân tạo (AI Engineer)?"* | Nền tảng Toán (Giải tích, Đại số, XSTK), Lập trình Python, INT3401 (Trí tuệ nhân tạo), Học máy, NLP và tham gia thực tập tại AILab/KTLab. |
| *"Học ngành An toàn thông tin thì cần chuẩn bị kỹ năng gì?"* | Mạng máy tính (INT3202), Hệ điều hành (INT2211), Mật mã & An toàn thông tin (INT3505), Linux scripting, thực hành CTF tại NetSec Lab. |

---

### 11. Nhóm Thông tin liên hệ các phòng ban chức năng
| Câu hỏi mẫu | Nội dung Trợ lý AI giải đáp |
|---|---|
| *"Phòng Đào tạo UET ở đâu, email là gì?"* | Phòng 105, Nhà E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội. Email: `daotao_dhcn@vnu.edu.vn`. |
| *"Phòng Công tác Sinh viên (CTSV) tiếp sinh viên khi nào?"* | Phòng 104, Nhà E3. Giờ tiếp sinh viên: Sáng 8h30 - 11h30, Chiều 14h00 - 16h30 các ngày làm việc. Email: `ctsv_dhcn@vnu.edu.vn`. |
| *"Văn phòng Khoa Công nghệ Thông tin ở phòng nào?"* | Phòng 301, Nhà E3, Trường ĐH Công nghệ. Email: `fit@vnu.edu.vn`. |

---

## 🔒 Chính sách an toàn & Bảo mật

- **Ranh giới tác vụ (Workspace Isolation):** Toàn bộ mã nguồn, cơ sở dữ liệu và tài nguyên hoạt động được giới hạn 100% bên trong thư mục dự án `studenthub.uet.edu.vn`. Tuyệt đối không can thiệp hệ thống máy tính người dùng.
- **Tính minh bạch dữ liệu:** Tất cả hồ sơ Mentor được ghi chú minh bạch là *Dữ liệu trình diễn học thuật (Demonstration Data)*. Toàn bộ thông tin Bộ môn và Phòng thí nghiệm là dữ liệu được đối soát công khai từ cổng thông tin Khoa CNTT - UET.
- **Quyền riêng tư sinh viên:** Các yêu cầu đặt lịch Mentor và đánh dấu Bookmark được bảo vệ theo mã sinh viên, sinh viên chỉ có thể theo dõi và hủy các yêu cầu do chính mình khởi tạo.

---
*Chúc bạn có trải nghiệm tuyệt vời với hệ thống StudentHub UET Enhanced!*
