# Chạy phần Hướng nghiệp mới

Mở terminal tại thư mục `Studenthub_UET/studenthub.uet.edu.vn`, sau đó chạy:

```powershell
python server.py
```

Truy cập <http://localhost:8080/career-guidance>.

Phần Hướng nghiệp cần chạy bằng máy chủ Python của dự án để lưu và đọc dữ liệu. Các bảng bổ sung được tạo tự động khi khởi động; không cần cài thêm thư viện.

Các thay đổi gồm trang tổng quan, khảo sát 3 bước, gợi ý cho 6 nghề hiện có, chi tiết nghề, lưu nghề, so sánh nghề, lộ trình có lưu tiến độ theo từng nghề, và danh sách việc làm/thực tập minh họa. Trong trang kết quả có nút **In / Lưu PDF** sử dụng hộp thoại in của trình duyệt.

Tin việc làm hiện là dữ liệu minh họa, có nhãn trên giao diện; chưa kết nối nguồn tuyển dụng trực tiếp. Các mục khác của cổng thông tin giữ nguyên phần giao diện và xử lý hiện có.

Mã nguồn mới: `career-guidance.js`, `career-guidance.css`, `career_backend.py`. Hình minh họa: `images/career-hero.png`.

Kiểm thử:

```powershell
python -B test_career.py
```

Bộ kiểm thử sử dụng cơ sở dữ liệu tạm riêng, gồm 15 kiểm thử Hướng nghiệp và chạy lại 23 kiểm thử API hiện có. Hai tập kiểm thử này đã chạy đạt. Giao diện chưa được xác nhận trực quan trong trình duyệt do quyền truy cập bản chạy thử bị từ chối.

Hình minh họa banner được tạo bằng ImageGen tích hợp, dựa trên bộ UI đã thiết kế. Prompt: Create a clean wide landscape digital illustration for a Vietnamese UET career guidance website. A friendly Vietnamese male student in a royal blue hoodie and backpack holds a laptop on the right, with a blue university campus, trees and soft clouds. Keep pale blue negative space on the left for HTML text. Three blank dark blue career direction signboards, no lettering, no logos, no website UI, no frame or watermark.
