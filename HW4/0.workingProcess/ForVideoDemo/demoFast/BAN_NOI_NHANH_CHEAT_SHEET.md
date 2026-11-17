# BẢN NHẮC THOẠI NHANH (CHEAT SHEET CHO VIDEO DEMO)
*(Bạn có thể mở file này trên điện thoại hoặc màn hình phụ để vừa nhìn vừa nói tự nhiên khi quay)*

---

## ⏱️ PHÂN ĐOẠN 1: MỞ ĐẦU & ĐỊNH DANH (0:00 - 0:45)
- **Hành động:** Terminal gõ `whoami; hostname; git branch`.
- **Ý chính cần nói:**
  - Chào thầy cô và các bạn TA.
  - Tên: **[Họ tên của bạn]** - MSSV: **23120242**.
  - Đề tài: **HW04 - AI-First Automation Testing & Human Review**.
  - Xác nhận máy cá nhân qua terminal, nhánh Git `main`.
  - Giới thiệu nội dung: Demo End-to-End tính năng **FR-11 (Lịch sử đơn hàng)** và vạch trần lỗi của AI.

---

## ⏱️ PHÂN ĐOẠN 2: DỮ LIỆU DDT & 3 ASSERTION PATTERNS (0:45 - 2:00)
- **Hành động:** Mở `FR11-data.json`, sau đó mở `FR11.spec.js`.
- **Ý chính cần nói:**
  - Áp dụng mô hình **Data-Driven Testing (DDT)**: dữ liệu tách biệt 100% khỏi code trong file JSON (12 test cases).
  - Trong `FR11.spec.js`, áp dụng chuẩn **3 Assertion Patterns** của Playwright:
    1. *Visibility / State:* `toBeVisible()` và `not.toBeVisible()` (kiểm tra phần tử UI).
    2. *Navigation / URL:* `toHaveURL('/profile')` (kiểm tra định tuyến trang).
    3. *Count / Value:* `toHaveCount()` và `toEqual()` (kiểm tra số dòng bảng và mã đơn hàng).

---

## ⏱️ PHÂN ĐOẠN 3: NARRATE HUMAN REVIEW - CHỈ LỖI CỦA AI (2:00 - 3:30)
*(Điểm ăn trọn rubric: Nói chậm, tự tin, nhấn mạnh)*
- **Hành động:** 
  1. Mở `README.md` mục 5 (FR-10 & FR-11): chỉ vào câu cấm hủy đơn khi đang `shipping`.
  2. Mở `FR11.spec.js` dòng 140-145: chỉ vào đoạn code sinh viên thêm vào.
  3. Mở `Profile.jsx` dòng 200: chỉ vào câu `if` bị lỗi của SUT.
- **Ý chính cần nói:**
  - **Lỗi của AI:** Mắc bẫy **Shallow Assertion** (khẳng định nông cạn). Ở ca `FR11-TC09`, AI ban đầu chỉ assert xem chữ 'Đang giao' có hiện hay không (`expect(...).toBeVisible()`).
  - **Hậu quả:** Bài test pass 100% ảo (False-Pass), hoàn toàn bỏ sót quy tắc cốt lõi trong SRS: *"Đơn hàng ở trạng thái shipping thì User KHÔNG được phép hủy"*.
  - **Sinh viên can thiệp (Human Review):** Không hạ chuẩn Test Oracle; bổ sung assertion ràng buộc phủ định: `expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible()`.
  - **Bóc trần bug của SUT:** Frontend `Profile.jsx` (dòng 200) và `server.js` (dòng 356) viết điều kiện sai nên vẫn hiển thị nút 'Hủy đơn' màu đỏ!

---

## ⏱️ PHÂN ĐOẠN 4: CHẠY PLAYWRIGHT ĐA TRÌNH DUYỆT (3:30 - 4:30)
- **Hành động:** Mở Terminal gõ lệnh:
  ```powershell
  cd HW4
  npx playwright test tests/FR11.spec.js --project=chromium --project=firefox --project=webkit
  ```
- **Ý chính cần nói:**
  - Chạy song song trên **3 trình duyệt**: Chromium, Firefox và WebKit (Safari).
  - Thuyết minh diễn tiến: Worker gọi API tạo đơn hàng, đăng nhập UI, tick xanh liên tục.
  - Tại `FR11-TC09`, Playwright đợi 5 giây vì nút Hủy đơn vẫn hiện -> báo FAIL có chủ đích.
  - Kết quả in ra: **33 passed, 3 failed** (tương ứng 1 bug duy nhất lặp lại trên 3 trình duyệt).

---

## ⏱️ PHÂN ĐOẠN 5: HTML REPORT & MINH CHỨNG LỖI (4:30 - 5:30+)
- **Hành động:** 
  1. Gõ: `npx playwright show-report --port 0 Submission/reports/playwright-html-minhchung/FR11`
  2. Rê chuột vào tiêu đề: **"Run by: 23120242 | [Timestamp]"**.
  3. Bấm vào ca Failed -> Mở ảnh **`test-failed-1.png`** (thấy nút Hủy đơn đỏ).
  4. Bấm chạy video **`video.webm`** vài giây.
  5. Mở file **`bug-report.md`** mã lỗi `BUG-FR11-001`.
- **Ý chính cần nói:**
  - Báo cáo HTML được tự động cấu hình chèn mã sinh viên **23120242**.
  - Minh chứng lỗi trực quan: ảnh chụp màn hình độ phân giải cao và video ghi hình từng thao tác.
  - Đã xuất thành báo cáo lỗi chính thức `BUG-FR11-001` và tạo GitHub Issue #25.
  - **Kết luận:** Khẳng định giá trị của Human-in-the-loop: AI viết code nhanh nhưng con người mới là người nắm vững nghiệp vụ và kiểm soát chất lượng phần mềm.
  - Cảm ơn và chào kết thúc.
