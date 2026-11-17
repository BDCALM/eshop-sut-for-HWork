# BÁO CÁO HW04 – AUTOMATION TESTING

**Thông tin sinh viên:**
- Họ và tên: <Nhập họ tên của bạn>
- MSSV: <Nhập MSSV>
- Demo Video (Unlisted YouTube): [Link Video](<Nhập link YouTube>)
- Public GitHub Repository: [Link GitHub](<Nhập link repo>)

---

## 1. Tóm tắt Kiểm thử (Test Summary Report)

| Hạng mục | Số lượng / Chi tiết |
| :--- | :--- |
| Số tính năng (Features) được tự động hóa | 3 (FR-05, FR-11, FR-19) |
| Tổng số Test Cases tự động hóa | 36 (12 cases / feature) |
| Tổng số Test Cases thực thi | 36 |
| Số Test Cases Passed | <Nhập số lượng> |
| Số Test Cases Failed | <Nhập số lượng> |
| Tổng số lần chạy trình duyệt (Browser runs) | 9 (3 tính năng x 3 trình duyệt: Chromium, Firefox, WebKit) |
| Tổng số Bugs tìm thấy qua Automation | <Nhập số lượng bugs> |

---

## 2. Chi tiết Tự động hóa & Đánh giá AI (Gap Analysis)

### 2.1. Feature 1: FR-05 (Tìm kiếm sản phẩm)
- **Data-driven file:** `FR05-data.json`
- **3 Assertion Patterns đã dùng:**
  1. *Visibility:* `<VD: expect(locator).toBeVisible()>`
  2. *Text/Value:* `<VD: expect(locator).toHaveText(...)>`
  3. *State/Count:* `<VD: expect(locator).toHaveCount(...)>`
- **Human Review & AI Gap Analysis:** 
  - *AI đã làm sai/bỏ sót gì?* <VD: AI sử dụng CSS selector tuyệt đối dễ gãy, quên mất trường hợp tìm kiếm ra kết quả trống (empty state).>
  - *Tôi đã sửa như thế nào?* <VD: Mình đã thay bằng `getByPlaceholder('Tìm kiếm')` và thêm hàm `waitForResponse` để đợi API trả về trước khi assert.>

### 2.2. Feature 2: FR-11 (Lịch sử đơn hàng cá nhân)
- **Data-driven file:** `FR11-data.json`
- **3 Assertion Patterns đã dùng:**
  1. *Visibility:* `<VD: expect(locator).toBeVisible()>`
  2. *Text/Value:* `<VD: expect(locator).toHaveText(...)>`
  3. *Navigation/URL:* `<VD: expect(page).toHaveURL(/.*history/)>`
- **Human Review & AI Gap Analysis:** 
  - *AI đã làm sai/bỏ sót gì?* <VD: AI lặp lại code đăng nhập ở cả 12 test cases thay vì dùng `beforeEach`. AI click vào tab lịch sử nhưng không chờ dữ liệu render.>
  - *Tôi đã sửa như thế nào?* <VD: Cấu trúc lại code dùng Hook `beforeEach` và ép chờ trạng thái DOM tải xong.>

### 2.3. Feature 3: FR-19 (Quản lý người dùng - Admin)
- **Data-driven file:** `FR19-data.json`
- **3 Assertion Patterns đã dùng:**
  1. *Visibility:* `<VD: expect(locator).toBeVisible()>`
  2. *Text/Value:* `<VD: expect(locator).toHaveText(...)>`
  3. *Actionability:* `<VD: expect(locator).toBeEnabled()>`
- **Human Review & AI Gap Analysis:** 
  - *AI đã làm sai/bỏ sót gì?* <VD: AI không biết đến lỗi False Success (HTTP 200) của endpoint xóa user khi nhập sai định dạng ID, nên viết assertion sai kỳ vọng thực tế.>
  - *Tôi đã sửa như thế nào?* <VD: Mình đã viết lại test case bắt lỗi logic này và xuất Bug Report số BUG-001.>

---

## 3. Danh sách Bugs phát hiện (Bug Reports)

*Chi tiết bug xem tại tab Issues trên GitHub hoặc file PDF đính kèm.*

1. **BUG-001:** [FR-19] Admin có thể tự xóa chính tài khoản của mình. ([Link Issue GitHub](#))
2. **BUG-002:** [FR-19] API trả về 200 OK khi xóa User ID không tồn tại. ([Link Issue GitHub](#))

---

## 4. Phê bình AI (AI Critique)
*(Viết 200 - 300 từ trả lời các câu hỏi: AI sai/bias/thiếu sót ở đâu? Tại sao nó trượt lỗi? Bài học khi hợp tác với AI?)*

<Nhập đoạn văn phê bình AI của bạn vào đây. VD: "Trong quá trình hợp tác, mình nhận thấy AI (Cursor/ChatGPT) rất xuất sắc trong việc tạo ra boilerplate code và cấu trúc data-driven nhanh chóng. Tuy nhiên, nó bị một "điểm mù" lớn (bias) là luôn giả định SUT hoạt động hoàn hảo và phản hồi ngay lập tức (zero latency)... Bài học rút ra là AI chỉ là một người thợ gõ code nhanh, còn kỹ sư kiểm thử (con người) vẫn phải là người giữ vai trò thiết kế kịch bản bẫy lỗi và rà soát độ ổn định của locator.">

---

## 5. Bảng Tự Đánh Giá (Self-Assessment Table)

| No. | Criteria | Grade | Self-Assessed Grade |
| :--- | :--- | :--- | :--- |
| 1 | Task 1 - Feature FR-05 | 25 | <Nhập điểm tự chấm, vd: 25> |
| 1 | Task 1 - Feature FR-11 | 25 | <Nhập điểm tự chấm, vd: 25> |
| 1 | Task 1 - Feature FR-19 | 25 | <Nhập điểm tự chấm, vd: 25> |
| 2 | Task 2 — Demo video | 15 | <Nhập điểm tự chấm, vd: 15> |
| 3 | Agent Skills (File SKILLS.md) | 10 | <Nhập điểm tự chấm, vd: 10> |
| | **Total** | **100** | **<Tổng điểm>** |