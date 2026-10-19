# 🎓 KỊCH BẢN THUYẾT TRÌNH & DEMO SẢN PHẨM: CÁC TÍNH NĂNG ĐỔI MỚI
## HỆ THỐNG STUDENTHUB UET (ENHANCED ACADEMIC PROTOTYPE)

> **Mục đích tài liệu:** Hướng dẫn chi tiết từng bước (Step-by-step) cách thức thuyết trình kết hợp thao tác trực tiếp (Live Demo) trên hệ thống web thực tế cho buổi báo cáo tiến độ / nghiệm thu đồ án.  
> **Thời lượng chuẩn:** 8 – 10 phút (có thể rút gọn 5 phút hoặc mở rộng 15 phút tùy hội đồng).  
> **Môi trường chạy Demo:** `http://localhost:8080` (Mở sẵn trình duyệt và phóng to 100% hoặc 110% để hội đồng dễ quan sát).

---

## 📌 BẢNG ĐIỀU PHỐI THỜI GIAN & THAO TÁC (QUICK CUE SHEET)

| STT | Phân đoạn | Thời lượng | Thao tác trên màn hình (Screen Actions) | Thông điệp cốt lõi (Key Takeaways) |
| :---: | :--- | :---: | :--- | :--- |
| **01** | **Mở đầu & Đặt vấn đề** | **1.5 phút** | Mở trang chủ `http://localhost:8080`, lướt thanh Sidebar. | Nêu bật thực trạng phân mảnh 4-5 cổng web; giải thích vì sao chọn giải pháp "Hệ sinh thái Một cửa" (Phương án B). |
| **02** | **Demo P1: Định hướng học tập & Nghề nghiệp** | **2.5 phút** | Mở `/career-guidance` ➔ Xem vai trò Full-stack ➔ Bản đồ môn học UET ➔ Trắc nghiệm 20 câu ➔ Gap Analysis. | Gắn trực tiếp kỹ năng tuyển dụng với mã học phần chính khóa UET (`INT2204`, `INT2211`, `INT3306`...). |
| **03** | **Demo P2: Trợ lý sinh viên AI UET** | **2.0 phút** | Bấm Floating Widget góc phải ➔ Hỏi điều kiện tốt nghiệp ➔ Hỏi địa chỉ phòng ban ➔ Rê chuột xem nguồn trích dẫn. | Kiến trúc Hybrid AI (Google Gemini LLM + UET Semantic RAG), luôn có nguồn trích dẫn văn bản, có fallback offline an toàn. |
| **04** | **Demo P3: Danh bạ CLB, Bộ môn & Lab** | **1.5 phút** | Mở `/organizations` ➔ Lọc giảng viên theo Bộ môn & Học vị (TS, GS) ➔ Xem phòng làm việc (E3, G2) ➔ Lưu Bookmark. | Số hóa 22 đơn vị và 73 giảng viên/nhà khoa học crawl trực tiếp từ fit.uet.vnu.edu.vn, không còn tình trạng mù mờ thông tin. |
| **05** | **Demo P4: Mạng lưới Cố vấn Mentorship** | **1.5 phút** | Mở `/mentorship` ➔ Xem mentor tiêu biểu ➔ Đặt lịch tư vấn 1-on-1 ➔ Tab "Yêu cầu của tôi" ➔ Hủy lịch thử nghiệm. | Kết nối cựu sinh viên UET tại các tập đoàn lớn; quản lý vòng đời yêu cầu minh bạch, bảo vệ quyền riêng tư theo MSSV. |
| **06** | **Tổng kết & Báo cáo kỹ thuật** | **1.0 phút** | Chiếu Terminal chạy `py test_suite.py` đạt `41 PASSED, 0 FAILED`. | Zero-dependency backend, bảo mật API Key trong `.env`, độ sẵn sàng thực tế 100%. |

---

## 🎬 KỊCH BẢN CHI TIẾT LỜI THOẠI & THAO TÁC LIVE DEMO

---

### PHẦN 1: MỞ ĐẦU — BỐI CẢNH VÀ LÝ DO ĐỔI MỚI (1.5 PHÚT)

#### 🖥️ Thao tác chuẩn bị:
- Mở sẵn trình duyệt ở tab `http://localhost:8080` (trang Dashboard tổng quan).
- Đứng phong thái tự tin, mắt hướng về Hội đồng, tay cầm chuột/bút trình chiếu.

#### 🗣️ Lời dẫn người thuyết trình:
> *"Kính thưa Quý Thầy/Cô trong Hội đồng và toàn thể các bạn,*
>
> *Trước khi bước vào phần demo sản phẩm, em xin phép đặt ra một câu hỏi mà hầu như sinh viên UET nào cũng từng trải qua: **'Tại sao sinh viên chúng ta phải vào quá nhiều hệ thống web khác nhau chỉ để phục vụ việc học?'**.*
>
> *Hiện nay, sinh viên UET xem điểm ở StudentHub, tra cứu quy chế ở uet.edu.vn, đăng ký môn ở dangkyhoc.vnu.edu.vn, rồi lại lên các nhóm Facebook/Zalo không chính thống để hỏi về cơ hội việc làm hay liên hệ thầy cô nghiên cứu.*
>
> *Để giải quyết triệt để sự phân mảnh trải nghiệm này, nhóm chúng em không phát triển một website bên ngoài làm sinh viên phải nhớ thêm tài khoản, mà lựa chọn **tích hợp mở rộng trực tiếp vào cổng StudentHub quen thuộc**, biến nó thành một **Hệ sinh thái dịch vụ Một cửa (One-Stop Hub)** với **4 nhóm chức năng đổi mới đột phá (P1 đến P4)**. Ngay sau đây, em xin kính mời Thầy/Cô cùng trải nghiệm trực tiếp sản phẩm."*

---

### PHẦN 2: DEMO TÍNH NĂNG P1 — ĐỊNH HƯỚNG NGHỀ NGHIỆP & PHÂN TÍCH KHOẢNG CÁCH KỸ NĂNG (2.5 PHÚT)

#### 🖥️ Thao tác trực tiếp trên màn hình:
1. Nhấp vào mục **"Định hướng nghề nghiệp"** trên thanh Sidebar trái (URL: `/career-guidance`).
2. Cuộn nhẹ màn hình qua 6 thẻ vị trí: *Full-stack Engineer, AI/Data Engineer, Cybersecurity, DevOps/Cloud, Embedded & IoT, Tech Product Manager*.
3. Bấm vào vai trò **"Kỹ sư Phát triển Phần mềm (Full-stack Software Engineer)"**.
4. Dừng chuột tại khung **"Bản đồ ánh xạ Kỹ năng – Môn học chính khóa UET"**.
5. Bấm chuyển sang tab **"Trắc nghiệm định hướng"** (20 câu hỏi).
6. Bấm xem biểu đồ **"Phân tích khoảng cách kỹ năng (Skill Gap Analysis)"**.

#### 🗣️ Lời dẫn người thuyết trình:
> *"Điểm đổi mới đầu tiên chính là **Phân hệ P1: Định hướng nghề nghiệp cá nhân hóa**.*
>
> *Trên mạng không thiếu các bài trắc nghiệm hướng nghiệp, nhưng điểm khác biệt mang tính cốt lõi của StudentHub UET là: **Sự liên kết mật thiết với Chương trình đào tạo của Nhà trường**.*
>
> *Như Thầy/Cô đang thấy trên màn hình:*
> - *Hệ thống đã chuẩn hóa **6 nhóm vai trò nghề nghiệp CNTT phổ biến nhất**. Khi chọn một ngành — ví dụ như Full-stack Engineer — hệ thống không chỉ liệt kê các kỹ năng chung chung, mà **ánh xạ chính xác từng kỹ năng vào từng môn học có trong CTĐT UET**.*
>   - *Muốn nắm vững kiến trúc backend? Hệ thống chỉ rõ sinh viên cần học tốt `INT2204 - Lập trình nâng cao` và `INT2211 - Hệ điều hành`.*
>   - *Muốn làm ứng dụng mạng an toàn? Cần hoàn thành `INT3306 - Phát triển ứng dụng Web` và `INT3202 - An toàn mạng`.*
> - *Tiếp theo, hệ thống cung cấp **Bài trắc nghiệm khoa học gồm 20 câu hỏi** chia làm 5 nhóm năng lực. Thuật toán vector nội bộ sẽ phân tích và xếp hạng độ phù hợp của sinh viên với từng nghề nghiệp, kèm đường link tra cứu khung chương trình đào tạo chính thức.*
> - *Cuối cùng, tính năng **Skill Gap Analysis** cho phép sinh viên tự đánh giá mức độ thuần thục của mình so với chuẩn doanh nghiệp, trực quan hóa khoảng cách còn thiếu bằng biểu đồ và **cho phép lưu trữ lộ trình học tập cá nhân hóa vào CSDL** để đồng hành cùng sinh viên qua từng kỳ học."*

---

### PHẦN 3: DEMO TÍNH NĂNG P2 — TRỢ LÝ SINH VIÊN AI UET (HYBRID RAG + CLOUD LLM) (2.0 PHÚT)

#### 🖥️ Thao tác trực tiếp trên màn hình:
1. Nhấp chuột vào biểu tượng **Floating Chatbot Widget 🤖** ở góc dưới cùng bên phải màn hình (cửa sổ chat mở lên mượt mà).
2. Tại thanh nhập liệu, bấm nút gợi ý nhanh: `"Điều kiện tốt nghiệp?"` hoặc gõ câu: *"Điều kiện tốt nghiệp ngành CNTT UET là gì?"* rồi nhấn Enter.
3. Đợi 1-2 giây cho câu trả lời hiển thị định dạng Markdown đẹp mắt.
4. Rê chuột và chỉ rõ vào dòng **Nguồn trích dẫn (Sources)** ở cuối tin nhắn: *"Quy chế Đào tạo ĐHQGHN & Sổ tay sinh viên UET"*.
5. Gõ tiếp câu hỏi kiểm chứng địa chỉ phòng ban: *"Phòng Đào tạo ở nhà nào, làm việc giờ nào?"*.

#### 🗣️ Lời dẫn người thuyết trình:
> *"Điểm đổi mới thứ hai là **Phân hệ P2: Trợ lý sinh viên AI UET**.*
>
> *Nỗi sợ lớn nhất khi sử dụng AI trong môi trường học thuật là hiện tượng **'bịa đặt' (Hallucination)** — trả lời quy chế sai lệch gây hậu quả cho sinh viên. Nhóm đã giải quyết triệt để thách thức này bằng **Kiến trúc Hybrid AI 2 tầng** kết hợp giữa **Mô hình ngôn ngữ lớn Google Gemini** và **Bộ máy truy xuất tri thức nội bộ UET Semantic RAG**:*
> - *Trợ lý hiện diện tiện lợi: vừa có dạng **Widget nổi trên mọi trang**, vừa có trang chuyên sâu `/student-assistant`.*
> - *Thầy/Cô có thể thấy câu trả lời cho câu hỏi về 'Điều kiện tốt nghiệp': Bot phản hồi đầy đủ và chính xác 6 điều kiện thực tế (tín chỉ 128–135, GPA từ 2.0, chuẩn tiếng Anh VSTEP bậc 3, chứng chỉ GDTC, GDQP-AN).*
> - *Đặc biệt, **mọi phản hồi đều đính kèm nguồn tham chiếu chính thức**, giúp sinh viên có thể kiểm chứng ngay lập tức.*
> - *Bên cạnh đó, nếu máy chủ mất kết nối Internet hoặc không có API Key, hệ thống sở hữu **Cơ chế Fallback an toàn**, tự động dùng dữ liệu quy chế nội bộ để trả lời địa chỉ các phòng ban như Phòng Đào tạo (105-E3) hay Phòng CTSV (104-E3) mà không gặp lỗi gián đoạn."*

---

### PHẦN 4: DEMO TÍNH NĂNG P3 — DANH BẠ CLB, BỘ MÔN & PHÒNG THÍ NGHIỆM UET (1.5 PHÚT)

#### 🖥️ Thao tác trực tiếp trên màn hình:
1. Nhấp vào mục **"CLB & Đơn vị đào tạo"** trên thanh Sidebar trái (URL: `/organizations`).
2. Chỉ vào Banner xanh ngọc giới thiệu Cổng thông tin Khoa CNTT.
3. Tại tab **"Danh sách Giảng viên"**, thao tác thử bộ lọc:
   - Chọn dropdown Bộ môn: *"Bộ môn Công nghệ Phần mềm"*.
   - Chọn dropdown Học vị: *"Tiến sĩ (TS)"*.
   - Gõ từ khóa tìm kiếm: *"Nguyễn"*.
4. Bấm nút **"Chi tiết"** của một giảng viên để mở Modal thông tin liên hệ, phòng làm việc và email.
5. Chuyển sang tab **"CLB & Phòng thí nghiệm"**, thử bấm icon **Lưu vào mục yêu thích (Bookmark)** trên thẻ CLB Tin học.

#### 🗣️ Lời dẫn người thuyết trình:
> *"Điểm đổi mới thứ ba là **Phân hệ P3: Danh bạ tập trung CLB, Bộ môn & Phòng thí nghiệm UET**.*
>
> *Trước đây, sinh viên muốn tìm hiểu hướng nghiên cứu của các thầy cô để đăng ký khóa luận hay xin vào Lab nghiên cứu thường phải lục lọi nhiều trang web cũ rất vất vả. Phân hệ này giải quyết trọn vẹn bài toán đó:*
> - *Hệ thống đã cào và chuẩn hóa cơ sở dữ liệu của **toàn bộ 5 Bộ môn chuyên môn, 10 Phòng thí nghiệm nghiên cứu trực thuộc Khoa CNTT** cùng các CLB sinh viên lớn.*
> - *Cung cấp danh bạ số của **73 cán bộ, giảng viên và nhà khoa học**. Sinh viên có thể lọc theo từng Bộ môn, lọc theo học hàm Giáo sư, Phó Giáo sư, Tiến sĩ, hiển thị chính xác địa chỉ phòng làm việc tại Nhà E3, G2, G3 và kênh email liên hệ `@vnu.edu.vn`.*
> - *Sinh viên cũng có thể **đánh dấu Bookmark** các câu lạc bộ hoặc Lab nghiên cứu mình quan tâm để lưu lại trên hồ sơ cá nhân của hệ thống."*

---

### PHẦN 5: DEMO TÍNH NĂNG P4 — MẠNG LƯỚI CỐ VẤN NGHỀ NGHIỆP 1-ON-1 (MENTORSHIP) (1.5 PHÚT)

#### 🖥️ Thao tác trực tiếp trên màn hình:
1. Nhấp vào mục **"Cố vấn nghề nghiệp"** trên Sidebar (URL: `/mentorship`).
2. Giới thiệu Banner màu xanh hoàng gia UET (`#3C50E0`) với 2 nút chuyển đổi thanh thoát: *"Danh sách Cố vấn"* và *"Yêu cầu của tôi"*.
3. Cuộn xem các thẻ cố vấn là Cựu sinh viên UET đang làm việc tại FPT, Viettel, VNPT, MoMo...
4. Bấm nút **"📩 Đặt lịch / Gửi yêu cầu tư vấn"** trên thẻ một Mentor.
5. Modal hiện lên: Chọn chủ đề *"Review CV & Phỏng vấn"*, nhập lý do, bấm gửi.
6. Hệ thống báo thành công và tự động chuyển sang tab **"Yêu cầu của tôi"**.
7. Chỉ vào bảng quản lý trạng thái (`PENDING`), sau đó bấm nút **"Hủy yêu cầu"** để chứng minh tính năng quản trị.

#### 🗣️ Lời dẫn người thuyết trình:
> *"Điểm đổi mới thứ tư và cũng là tính năng mang tính gắn kết cộng đồng mạnh mẽ nhất là **Phân hệ P4: Mạng lưới Cố vấn nghề nghiệp 1-on-1 & Alumni Connection**.*
>
> *Đây là cầu nối thực tế giúp sinh viên nhận được sự dìu dắt từ những người đi trước:*
> - *Danh bạ quy tụ các anh chị Cựu sinh viên tiêu biểu đang công tác tại các doanh nghiệp hàng đầu.*
> - *Sinh viên có thể đặt lịch hẹn tư vấn 1-on-1 với các chủ đề thiết thực: từ góp ý CV, định hướng phỏng vấn kỹ thuật đến tư vấn đồ án tốt nghiệp, dưới hình thức trực tuyến hoặc trực tiếp tại khuôn viên trường.*
> - *Mọi yêu cầu được quản lý minh bạch qua 4 trạng thái: **Chờ phản hồi (PENDING), Chấp nhận, Từ chối và Đã hủy**.*
> - *Về mặt bảo mật dữ liệu, hệ thống áp dụng cơ chế **Kiểm soát truy cập dựa trên vai trò (RBAC)**: sinh viên chỉ có thể theo dõi và thao tác trên đúng các yêu cầu do chính mã sinh viên của mình tạo ra, bảo vệ tuyệt đối thông tin riêng tư của người học."*

---

### PHẦN 6: TỔNG KẾT & MINH CHỨNG THỰC NGHIỆM (1.0 PHÚT)

#### 🖥️ Thao tác trực tiếp trên màn hình:
- Chuyển sang màn hình Terminal / PowerShell và hiển thị kết quả chạy test tự động:
  ```text
  ============================================================
  TEST RESULTS: 41 PASSED, 0 FAILED
  ============================================================
  ```
- Quay lại Slide kết luận.

#### 🗣️ Lời dẫn người thuyết trình:
> *"Kính thưa Hội đồng,*
>
> *Bên cạnh các tính năng nghiệp vụ trực quan, điểm mạnh lớn nhất của giải pháp nằm ở **Chất lượng kỹ thuật và Tính khả thi triển khai thực tiễn**:*
> 1. *Hệ thống tuân thủ nguyên tắc **Zero External Dependencies** ở phía backend, sử dụng 100% thư viện chuẩn tích hợp sẵn của Python 3, giúp ứng dụng có thể vận hành nhẹ nhàng, an toàn và độc lập trên mọi hạ tầng máy chủ của Nhà trường.*
> 2. *Khóa API và cấu hình nhạy cảm được cô lập qua biến môi trường `.env`, tuân thủ nghiêm ngặt chuẩn an toàn thông tin.*
> 3. *Đặc biệt, toàn bộ 4 phân hệ đã vượt qua **100% bộ kiểm thử tự động gồm 41 test cases** bao phủ toàn diện từ API, logic tính điểm đến định tuyến SPA.*
>
> *Với 4 chức năng đổi mới này, StudentHub UET không còn là một cổng tra cứu điểm thụ động, mà đã thực sự chuyển mình thành một **Trợ lý học vụ toàn diện**, đồng hành cùng sinh viên UET trên suốt chặng đường học tập và lập nghiệp.*
>
> *Em xin trân trọng cảm ơn Quý Thầy/Cô và các bạn đã chú ý lắng nghe! Nhóm chúng em rất mong nhận được những câu hỏi và ý kiến đóng góp từ Hội đồng."*

---

## 🛡️ BỘ CÂU HỎI & ĐÁP ÁN BẢO VỆ PHẢN BIỆN (DEFENSE Q&A)

Dưới đây là các câu hỏi Thầy/Cô Hội đồng thường đặt ra và cách trả lời thuyết phục nhất dựa trên tài liệu kiến trúc kỹ thuật:

### ❓ Câu 1: Tại sao không dùng mạng xã hội (Facebook/Zalo) hay Google Form cho nhanh mà phải code thêm vào StudentHub?
> **Trả lời:**  
> *"Dạ thưa Thầy/Cô, việc dùng Facebook hay Google Form chính là **Phương án C** đã được nhóm đưa vào ma trận so sánh ở Mục 6.3. Cách làm đó tuy nhanh ban đầu nhưng có 3 nhược điểm chí mạng:  
> 1. Hoàn toàn không thể cá nhân hóa vì không liên kết được với tiến độ học tập và tín chỉ của sinh viên;  
> 2. Dữ liệu bị trôi và câu trả lời của bot mạng xã hội không kiểm soát được tính chuẩn xác;  
> 3. Tiềm ẩn nguy cơ rò rỉ thông tin cá nhân của sinh viên khi lưu trữ trên dịch vụ bên thứ ba.  
> Do đó, tích hợp thẳng vào StudentHub (Phương án B) là giải pháp tối ưu và bền vững nhất."*

### ❓ Câu 2: Trợ lý AI dựa trên công nghệ gì và làm sao để đảm bảo bot không trả lời sai quy chế?
> **Trả lời:**  
> *"Dạ, nhóm sử dụng kiến trúc **Hybrid RAG 2 tầng**: Tầng 1 là kho tri thức vector chuẩn hóa nội bộ trích xuất từ Quy chế Đào tạo ĐHQGHN và Sổ tay sinh viên UET; Tầng 2 là mô hình ngôn ngữ lớn Google Gemini. Hệ thống áp dụng kỹ thuật Prompt Engineering nghiêm ngặt: yêu cầu bot chỉ được tổng hợp câu trả lời từ dữ liệu quy chế được cung cấp và bắt buộc phải dẫn nguồn. Nếu câu hỏi nằm ngoài phạm vi văn bản, bot sẽ từ chối suy diễn và hướng dẫn sinh viên đến trực tiếp Phòng Đào tạo (105-E3) hoặc Phòng CTSV (104-E3)."*

### ❓ Câu 3: Dữ liệu của 73 Giảng viên và 22 đơn vị có được cập nhật tự động không?
> **Trả lời:**  
> *"Dạ, dữ liệu hiện tại được cào chính thức từ Cổng thông tin Khoa CNTT `fit.uet.vnu.edu.vn`. Để đảm bảo tính bền vững, nhóm đã thiết kế cấu trúc CSDL dạng bảng quan hệ chuẩn (`organizations`, `lecturers`) kèm RESTful API hỗ trợ phân trang và tìm kiếm. Khi Nhà trường có thay đổi nhân sự hoặc bổ sung Lab mới, quản trị viên chỉ cần cập nhật qua API hoặc chạy script đồng bộ định kỳ mà không cần can thiệp vào giao diện người dùng."*

### ❓ Câu 4: Nhóm đã kiểm thử hệ thống như thế nào để đảm bảo không phát sinh lỗi khi tích hợp?
> **Trả lời:**  
> *"Dạ, nhóm đã xây dựng bộ kiểm thử hồi quy tự động độc lập gồm **41 test cases** trong file `test_suite.py` và `test_career.py`. Bộ test kiểm tra 100% các endpoint API: từ tính toán điểm trắc nghiệm, lưu trữ lộ trình học tập, gửi nhận tin nhắn AI, lọc dữ liệu giảng viên đến kiểm tra phân quyền hủy lịch hẹn theo mã sinh viên. Toàn bộ 41/41 test case đều đạt kết quả PASS tuyệt đối."*

---

> [!TIP]
> **Mẹo nhỏ khi thuyết trình:**  
> - Luôn nhấn mạnh cụm từ **"Học phần UET"**, **"Nhà E3, G2"**, **"Quy chế ĐHQGHN"** để chứng minh sản phẩm được "may đo" riêng cho UET chứ không phải là đồ án mẫu tải trên mạng.  
> - Trong lúc demo chat AI, hãy gõ câu hỏi đã được kiểm thử mượt mà trước (*"Điều kiện tốt nghiệp ngành CNTT UET là gì?"*).
