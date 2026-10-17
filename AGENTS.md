# Agent Boundary & Security Rules (Quy Tắc An Toàn & Phạm Vi Của AI)

## 1. Phạm Vi Quyền Hạn (Allowed Scope)
- **Thư mục được cấp quyền (Workspace Root):** `d:\GitHub\Studenthub_UET\` (và tất cả thư mục con bên trong).
- **Quyền hạn trong thư mục dự án:** AI có **TOÀN QUYỀN (Full Permissions)** để:
  - Đọc, tìm kiếm nội dung file và thư mục.
  - Tạo mới, sửa đổi, cập nhật hoặc refactor mã nguồn.
  - Thực thi các lệnh phát triển (chạy server `python`, cài đặt gói phụ thuộc, quản lý build, v.v.).
  - Xoá hoặc thay thế các file mã nguồn/tạm thời **nội bộ** dự án khi cần thiết để phục vụ công việc.

---

## 2. Giới Hạn Nghiêm Ngặt Ngoài Dự Án (Strict External Isolation)
- **TUYỆT ĐỐI CẤM (STRICTLY PROHIBITED):**
  1. **Không truy cập/sửa đổi bên ngoài:** Không được ghi, sửa đổi, di chuyển hoặc xoá bất kỳ file/folder nào nằm ngoài thư mục `d:\GitHub\Studenthub_UET\`.
  2. **Bảo vệ hệ thống và người dùng:** Nghiêm cấm đụng đến các thư mục ngoài dự án, bao gồm:
     - Ổ đĩa hệ thống `C:\` (ví dụ: `C:\Windows`, `C:\Program Files`, v.v.).
     - Thư mục cá nhân của người dùng: `C:\Users\ADMIN\` (Desktop, Documents, Downloads, v.v.).
     - Các thư mục/project khác nằm trên ổ `D:\`.
     - *Ngoại lệ đọc (Read-only):* AI được phép ĐỌC (Read-only) các tài nguyên cấu hình hệ thống, IDE Built-in Skills (như hướng dẫn UI design trong `.gemini/antigravity-ide/builtin/skills/...`) để học và áp dụng kỹ năng vào dự án. Tuyệt đối không sửa hay xoá các file này.
  3. **Cấm rò rỉ dữ liệu hoặc thay đổi hệ thống:** Không sửa đổi Registry Windows, không can thiệp các thiết lập hệ thống hoặc biến môi trường toàn cục (System Environment Variables).

---

## 3. Quy Tắc Chạy Lệnh Shell & Terminal (Execution Guardrails)
- **Thư mục thực thi (`cwd`):** Mọi lệnh chạy trên Terminal (`powershell`, `cmd`, `bash`) PHẢI luôn có thư mục làm việc (`cwd`) nằm bên trong `d:\GitHub\Studenthub_UET\`.
- **Cấm Path Traversal:** Tuyệt đối không dùng đường dẫn tương đối trỏ ngược ra ngoài thư mục dự án (ví dụ: `..\..\`, `cd ..`).
- **An toàn đối với lệnh xoá (Destructive Commands):**
  - Tuyệt đối cấm các lệnh xoá huỷ diệt diện rộng hoặc nhắm ra ngoài phạm vi như: `rmdir /s /q`, `del /f /s /q`, `Remove-Item -Recurse -Force`, `git clean -fdx` trừ khi chỉ định rõ ràng đường dẫn con nội bộ của dự án.
  - Trong nội bộ dự án: Tuyệt đối không tự ý xoá thư mục quản lý phiên bản `.git` trừ khi có yêu cầu bằng văn bản rõ ràng từ người dùng.

---

## 4. Xử Lý Khi Có Yêu Cầu Vượt Phạm Vi (Fallback Protocol)
- Nếu một tác vụ hoặc thư viện yêu cầu đọc/ghi dữ liệu bên ngoài `d:\GitHub\Studenthub_UET\`:
  - AI phải dừng thao tác ngay lập tức.
  - Báo cáo rõ lý do và đường dẫn liên quan cho người dùng.
  - Chỉ được thực hiện khi người dùng chấp thuận bằng lệnh cụ thể.
