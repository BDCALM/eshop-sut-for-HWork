### [Bug]: <Nhập tiêu đề lỗi ngắn gọn, mô tả trực tiếp vấn đề và vị trí>

**Bug ID:** <VD: BUG-001>
**Loại lỗi:** <GUI / Functional / Usability / Compatibility>

#### 1. Môi trường kiểm thử
- **Hệ điều hành:** <VD: Windows 11 / iOS 17>
- **Trình duyệt / Phiên bản:** <VD: Chrome 120 / Safari (WebKit)>
- **Thiết bị:** Môi trường máy ảo - Github Codespace
- **Kích thước Viewport:** <VD: 1366x768 / 390x844>

#### 2. Điều kiện tiên quyết (Preconditions)
- <Liệt kê trạng thái hoặc dữ liệu cần có trước khi thực hiện test. VD: Người dùng đã có tài khoản và đang ở trang Đăng nhập>

#### 3. Các bước tái hiện (Steps to Reproduce)
1. Đi tới <URL hoặc Tên màn hình>
2. Thực hiện hành động <VD: Để trống ô Email>
3. Nhập dữ liệu <VD: Nhập "123456" vào ô Mật khẩu>
4. Nhấn nút <VD: "Đăng nhập">

#### 4. Kết quả thực tế (Actual Result)
- <Mô tả chính xác những gì đã xảy ra, bao gồm cả thông báo lỗi hệ thống nếu có. VD: Màn hình không hiện thông báo lỗi, form bị treo không phản hồi>

#### 5. Kết quả mong đợi (Expected Result)
- <Mô tả ứng xử đúng theo đặc tả. VD: Dưới ô Email hiện thông báo "Vui lòng nhập email", ô Email đổi viền đỏ và được focus>

#### 6. Đánh giá mức độ
- **Tần suất xuất hiện (Frequency):** <VD: 5/5 lần (100%) / Thỉnh thoảng>
- **Mức độ nghiêm trọng (Severity):** <VD: Critical / Major / Minor / Trivial>

#### 7. Bằng chứng (Attachments)
- **Ảnh chụp màn hình (Screenshot):** *(Đính kèm ảnh có khoanh đỏ vị trí lỗi)*
- **Video / Log file:** *(Nếu có)*