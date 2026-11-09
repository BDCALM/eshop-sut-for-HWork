# NGỮ CẢNH HỆ THỐNG & MÃ NGUỒN: ESHOP (SUT)

## 1. Tổng quan Dự án & Tech Stack
* **Repository**: `https://github.com/ttbhanh/eshop-sut`
* **Mô tả**: Ứng dụng web thương mại điện tử demo phục vụ thực hành Kiểm thử Phần mềm (Software Testing).
* **Kiến trúc công nghệ**:
  - **Backend**: Node.js với Express.js REST API.
  - **Database**: SQLite (dùng `sqlite3` / file CSDL quan hệ `backend/database.js`), khóa chính tự tăng (Integer Primary Key).
  - **Frontend Client & Admin**: React / Vite SPA (`frontend-admin/src/App.jsx`).
  - **Xác thực (Authentication)**: JSON Web Token (JWT) theo mô hình Stateless Bearer Token (`Authorization: Bearer <token>`). Payload chứa `{ id, role, iat }`.

---

## 2. Cấu trúc File & Điểm nút Quan trọng (Key Files)
* `backend/server.js`: Định nghĩa toàn bộ endpoint REST API của hệ thống, middleware xác thực JWT và xử lý route quản trị/người dùng.
* `backend/database.js`: Khởi tạo schema CSDL SQLite, bảng `users`, `products`, `orders`, `coupons` và script nạp dữ liệu mẫu (seed data).
* `frontend-admin/src/App.jsx`: Giao diện Admin quản lý người dùng, sản phẩm, danh mục, gửi request API bằng Axios/fetch kèm token.

---

## 3. Lược đồ Dữ liệu (Database Schema) & Seed Data
### Bảng `users`:
* Các trường: `id` (INTEGER PK), `name` (TEXT), `email` (TEXT UNIQUE), `password` (TEXT hash), `role` (TEXT: `'admin'` | `'user'`), `login_attempts` (INTEGER), `locked_until` (DATETIME), `shipping_address` (TEXT).
* Dữ liệu khởi tạo (Seed data):
  - ID 1: Tài khoản Quản trị viên (`role: "admin"`).
  - ID 2+: Các tài khoản khách hàng thông thường (`role: "user"`, ví dụ: `test@eshop.com`).

### Bảng `orders`:
* Trạng thái đơn hàng hỗ trợ: `pending` -> `confirmed` -> `shipping` -> `delivered` | `canceled`.

---

## 4. Phân nhóm Chức năng Hệ thống (Feature Pools)
* **Pool A (Xác thực, Danh mục & Sản phẩm)**: FR-01 Đăng ký; FR-02 Đăng nhập & Khóa tài khoản; FR-03 Quên & Đặt lại mật khẩu; FR-04 Quản lý hồ sơ cá nhân; FR-05 Tìm kiếm & Danh sách sản phẩm; FR-06 Xem chi tiết sản phẩm.
* **Pool B (Giỏ hàng & Đơn hàng)**: FR-07 Giỏ hàng; FR-08 Thanh toán (Checkout); FR-09 Mã giảm giá (Coupons); FR-10 Máy trạng thái đơn hàng (Order state machine); FR-11 Xem lịch sử đơn hàng cá nhân.
* **Pool C (Web Admin)**: FR-12 Kiểm soát truy cập; FR-13 Dashboard; FR-14 Quản lý danh mục (CRUD); FR-15 Quản lý sản phẩm (CRUD); FR-16 Import sản phẩm từ CSV; FR-17 Quản lý mã giảm giá (CRUD); FR-18 Quản trị đơn hàng; FR-19 Quản lý người dùng (Xem danh sách, Xóa).
* **Pool D**: Ứng dụng di động (Mobile App).

---

## 5. Các Endpoint API Chính đã Xác minh
* `GET /api/admin/users`: Lấy danh sách toàn bộ người dùng (đã ẩn trường `password`). Yêu cầu token admin.
* `DELETE /api/admin/users/:id`: Xóa người dùng theo ID URL. Yêu cầu token admin.
* `GET /api/orders/history`: Lấy danh sách lịch sử đơn hàng của người dùng đang đăng nhập.

---

## 6. Các Khiếm khuyết Kiến trúc & Lỗi Thực tế đã Phát hiện (Known Defects)
1. **Lỗ hổng Tự xóa Admin (FR-19 Root Cause)**:
   - Endpoint `DELETE /api/admin/users/:id` chỉ giải mã chữ ký JWT mà **không kiểm tra** `target user ID === req.user.id`, cũng không kiểm tra quyền `req.user.role`.
   - Admin đang đăng nhập có thể gửi request tự xóa chính mình khỏi database.
2. **Lỗ hổng Token Stateless mồ côi (JWT Session Invalidation)**:
   - Khi tài khoản admin đã bị xóa khỏi bảng `users`, token JWT cũ vẫn tiếp tục được hệ thống chấp nhận trong các request tiếp theo vì middleware chỉ verify chữ ký mật mã của token mà không truy vấn lại DB xem user có còn tồn tại hay không.
3. **Lỗi Không Xác thực Dữ liệu Đầu vào & False Success (HTTP 200 on Invalid ID)**:
   - Endpoint `DELETE /api/admin/users/:id` không kiểm tra `req.params.id` có phải số nguyên hợp lệ hay không.
   - Khi truyền ID không tồn tại (`999999`) hoặc ID sai định dạng (`abc`, `1abc`), câu lệnh `DELETE FROM users WHERE id = ?` chạy nhưng không ảnh hưởng bản ghi nào (`this.changes === 0`).
   - Backend bỏ qua lỗi, không kiểm tra `this.changes`, mặc định luôn trả về `HTTP 200 OK` với body `{"message":"User deleted"}` (False Positive / False Success).
4. **Lỗ hổng Thiếu Middleware Bảo vệ Endpoint Đơn hàng (FR-11)**:
   - Endpoint chi tiết đơn hàng thiếu middleware xác thực, tạo nguy cơ lộ dữ liệu đơn hàng giữa các người dùng (IDOR / Ownership violation).