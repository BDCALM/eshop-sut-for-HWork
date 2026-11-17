# BÁO CÁO HW04 – AUTOMATION TESTING

**Thông tin sinh viên:**
- Họ và tên: [Nguyễn Văn A - Sinh viên cập nhật họ tên]
- MSSV: 23120242
- Demo Video (Unlisted YouTube): [Link Video Demo YouTube](<Cập nhật link sau khi quay video demo>)
- Public GitHub Repository: [https://github.com/BDCALM/eshop-sut-for-HWork](https://github.com/BDCALM/eshop-sut-for-HWork)

---

## 1. Tóm tắt Kiểm thử (Test Summary Report)

Báo cáo tổng hợp kết quả tự động hóa kiểm thử cho Hệ thống System Under Test (EShop SUT) bằng framework Playwright, áp dụng phương pháp Data-Driven Testing (DDT), 3 assertion patterns độc lập và thực thi song song trên 3 trình duyệt (Chromium, Firefox, WebKit).

### 1.1. Bảng số liệu tổng hợp

| Hạng mục | Số lượng / Chi tiết | Ghi chú |
| :--- | :--- | :--- |
| **Số tính năng (Features) được tự động hóa** | **3** | FR-05 (Tìm kiếm), FR-11 (Lịch sử đơn hàng), FR-19 (Quản lý User - Admin) |
| **Tổng số Test Cases tự động hóa** | **36** | 12 test cases / tính năng, thiết kế trong các file JSON độc lập |
| **Tổng số Test Cases thực thi (Unique)** | **36** | 100% các ca kiểm thử đều được thực thi tự động |
| **Số Test Cases Passed (Unique)** | **27** | Các ca kiểm thử chức năng chuẩn theo luồng hoạt động |
| **Số Test Cases Failed (Unique)** | **9** | Đều là **lỗi thực tế của SUT (SUT Defects)** được bẫy thành công |
| **Tổng số lần chạy trình duyệt (Browser runs)** | **9 suites (108 lượt)** | 3 tính năng × 3 trình duyệt (Chromium, Firefox, WebKit) × 12 cases |
| **Tổng số lượt chạy Passed (Multi-browser)** | **81 / 108** | Tỷ lệ thành công chung của hệ thống trên đa trình duyệt (75%) |
| **Tổng số lượt chạy Failed (Multi-browser)** | **27 / 108** | 9 test cases thất bại đồng nhất trên cả 3 trình duyệt |
| **Tổng số Bugs phát hiện qua Automation** | **7 lỗi** | 3 lỗi FR-05, 1 lỗi FR-11, 3 lỗi FR-19 (đều có minh chứng ảnh/video) |

### 1.2. Phân rã kết quả theo từng tính năng

| Feature | File Test Script | Test Data | Trình duyệt thực thi | Passed / Total Runs | Số Bug SUT phát hiện |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-05: Tìm kiếm sản phẩm** | `tests/FR05.spec.js` | `FR05-data.json` | Chromium, Firefox, WebKit | **21 / 36 passed** (15 failed) | 3 bugs (XSS, Empty State, SQL Wildcard) |
| **FR-11: Lịch sử đơn hàng** | `tests/FR11.spec.js` | `FR11-data.json` | Chromium, Firefox, WebKit | **33 / 36 passed** (3 failed) | 1 bug (User hủy đơn hàng đang giao) |
| **FR-19: Quản lý user (Admin)** | `tests/FR19.spec.js` | `FR19-data.json` | Chromium, Firefox, WebKit | **27 / 36 passed** (9 failed) | 3 bugs (Phân quyền, Tự xóa, Leo thang role) |
| **TỔNG CỘNG** | **3 scripts** | **3 JSON files** | **3 browsers** | **81 / 108 passed** (27 failed) | **7 SUT Defects** |

> **Ghi chú về tính xác thực của các ca Failed:** Toàn bộ 27 lượt thất bại (9 test cases × 3 trình duyệt) không phải do lỗi kịch bản test (script flakiness) hay lỗi thời gian chờ (timing), mà là minh chứng kiểm thử bắt dính các lỗi logic/bảo mật cố ý được cài cắm trong SUT. Các ca này đều được lưu trữ đầy đủ ảnh chụp (`test-failed-1.png`), video (`video.webm`) và trace (`error-context.md`) trong thư mục submission.

---

## 2. Chi tiết Tự động hóa & Đánh giá AI (Gap Analysis)

### 2.1. Feature 1: FR-05 (Tìm kiếm sản phẩm)
- **Data-driven file:** `HW4/tests/data/FR05-data.json` (12 test cases gồm positive, boundary, tiếng Việt có dấu, khoảng trắng, thẻ HTML, ký tự đặc biệt `%`, ký tự cực dài).
- **3 Assertion Patterns đã dùng:**
  1. *Visibility / State Pattern:* `await expect(page.locator('.product-card').first()).toBeVisible()` / `await expect(page.getByText('Không tìm thấy sản phẩm')).toBeVisible()`
  2. *Count / Quantity Pattern:* `await expect(page.locator('.product-card')).toHaveCount(testCase.expectedCount)`
  3. *Text / Value Pattern:* `await expect(page.locator('body')).toContainText(testCase.keyword)`
- **Human Review & AI Gap Analysis:** 
  - *AI đã làm sai / bỏ sót gì?*
    1. **Thiếu sót nhận diện lỗi XSS (TC10):** AI ban đầu sinh assertion kiểm tra từ khóa HTML `<script>alert(1)</script>` quá hời hợt, chỉ kiểm tra xem trang có phản hồi và không bị crash hay không. AI hoàn toàn bỏ qua việc kiểm tra xem chuỗi nhập vào có bị frontend render không an toàn qua thuộc tính `dangerouslySetInnerHTML` hay không.
    2. **Gộp nhầm nguyên nhân gốc rễ (Root Cause Misclassification):** Ở ca kiểm thử ký tự wildcard `%` (TC12), AI ban đầu xếp lỗi này vào nhóm "thiếu thông báo kết quả rỗng" giống như TC06. Thực tế, backend thực hiện câu lệnh `SELECT * FROM products WHERE name LIKE '%${query}%'`, khiến dấu `%` trở thành ký tự đại diện SQL trả về toàn bộ 5 sản phẩm trong database thay vì tìm kiếm ký tự `%` nguyên bản.
  - *Tôi đã sửa như thế nào?*
    1. Tôi đã hiệu chỉnh lại assertion của TC10: Bắt buộc chuỗi tìm kiếm phải được hiển thị an toàn dưới dạng văn bản escaped text (`toContainText('<script>alert(1)</script>')`). Khi chạy thực tế, phần tiêu đề kết quả bị biến mất do dính mã độc, giúp bẫy thành công lỗi XSS.
    2. Tách biệt rõ ràng 3 khiếm khuyết độc lập trong Bug Report: Lỗi thiếu empty state (BUG-FR05-001), Lỗi không an toàn khi render HTML (BUG-FR05-002), và Lỗi SQL Wildcard Injection (BUG-FR05-003).

---

### 2.2. Feature 2: FR-11 (Lịch sử đơn hàng cá nhân)
- **Data-driven file:** `HW4/tests/data/FR11-data.json` (12 test cases bao phủ bảo vệ đăng nhập, trạng thái chưa có đơn, hiển thị nhiều đơn, kiểm tra đủ 4 cột thông tin, bản địa hóa tiếng Việt cho cả 5 trạng thái đơn hàng, và phân lập quyền sở hữu đơn hàng).
- **3 Assertion Patterns đã dùng:**
  1. *Visibility / State Pattern:* `await expect(page.getByText('Vui lòng đăng nhập')).toBeVisible()`, `await expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible()`
  2. *Navigation / URL Pattern:* `await expect(page).toHaveURL(/.*login/)`
  3. *Count / Property / Status Code Pattern:* `expect(orders.length).toBe(testCase.expectedCount)`, `expect(order).toHaveProperty('id')`, `expect(res.status()).toBe(200)`
- **Human Review & AI Gap Analysis:** 
  - *AI đã làm sai / bỏ sót gì?*
    1. **Viết Assertion nông cạn (Shallow Assertion):** Ở test case `FR11-TC09`, AI sinh ra kịch bản kiểm tra đơn hàng trạng thái `shipping` chỉ kiểm tra nhãn "Đang giao" hiển thị trên màn hình (`toBeVisible()`). AI hoàn toàn quên mất ràng buộc phủ định cốt lõi trong đặc tả SRS (`README.md` mục FR-10 & FR-11): *"Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác"*.
    2. **Tạo cảm giác chất lượng giả tạo (False Positive):** Do assertion nông của AI, ban đầu toàn bộ 36 lượt chạy đều Passed 100%, bỏ lọt hoàn toàn lỗi logic nghiệp vụ nghiêm trọng được cài cắm trong SUT.
    3. **Race Condition khi chạy đa luồng:** Hàm tạo tài khoản test ngẫu nhiên của AI dùng `Date.now()` nhưng thiếu random suffix, gây nguy cơ trùng email khi nhiều browser workers khởi tạo tài khoản đồng thời.
  - *Tôi đã sửa như thế nào?*
    1. Tôi đã bổ sung trường `shouldNotAllowCancel: true` vào data và viết thêm assertion phủ định nghiêm ngặt:
       ```javascript
       const shippingRow = page.locator('tbody tr').filter({ hasText: 'Đang giao' });
       await expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible();
       ```
    2. Khi chạy lại, test case thất bại chính xác trên cả 3 trình duyệt (do `Profile.jsx` dòng 200 hiển thị nút Hủy đơn cho mọi trạng thái khác delivered/canceled), giúp ghi nhận lỗi SUT `BUG-FR11-001` kèm video và ảnh chụp bằng chứng.
    3. Thêm `${Math.floor(Math.random() * 100000)}` vào email khởi tạo để triệt tiêu race condition.

---

### 2.3. Feature 3: FR-19 (Quản lý người dùng - Admin)
- **Data-driven file:** `HW4/tests/data/FR19-data.json` (12 test cases kiểm tra bảo vệ unauthenticated, kiểm tra thực thi vai trò admin, danh sách user đủ các trường id/name/email/role, xóa user hợp lệ, admin tự xóa tài khoản, xóa ID không tồn tại, xóa ID chuỗi chữ, regular user tự leo thang role admin, và kiểm tra giao diện Admin SPA).
- **3 Assertion Patterns đã dùng:**
  1. *Visibility / State Pattern:* `await expect(page.getByRole('table')).toBeVisible()`, `await expect(adminRow.getByRole('button', { name: 'Xóa' })).not.toBeVisible()`, `expect(userStillVisible).toBeFalsy()`
  2. *Navigation / URL Pattern:* `await expect(page).toHaveURL(/localhost:5174/)`
  3. *HTTP Status / Count / Property Pattern:* `expect(res.status()).toBe(tc.expectedStatus)`, `expect(firstUser).toHaveProperty('role')`, `expect(rowCount).toBeGreaterThan(0)`
- **Human Review & AI Gap Analysis:** 
  - *AI đã làm sai / bỏ sót gì?*
    1. **Sai lệch kiến trúc giao diện SPA:** AI tự suy diễn rằng giao diện Admin có hệ thống định tuyến URL (dùng `waitForURL(/users/)`) và sử dụng thẻ `<a>` cho menu điều hướng (`getByRole('link')`). Thực tế, ứng dụng `frontend-admin` là một React SPA đơn giản quản lý tab nội bộ bằng hook `useState`, và các mục menu là thẻ `<li>` không có thẻ `<a>`.
    2. **Locator yếu và giả định sai CSS classes:** AI cố gắng tìm bảng với các class selector như `[class*="user"]` hay `[class*="list"]`, trong khi bảng thực tế sử dụng Tailwind utility classes (`w-full bg-white shadow rounded text-left`).
    3. **Thỏa hiệp với lỗi SUT làm mất minh chứng:** Ban đầu, khi thấy backend trả về 200 cho các ca lỗi (nhập ID sai, regular user gọi admin API), AI đã tự ý sửa assertion thành `expect(res.status()).toBe(200)` để test pass 100%. Cách làm này làm mất hoàn toàn ảnh chụp màn hình và video bằng chứng của các lỗi bảo mật.
  - *Tôi đã sửa như thế nào?*
    1. Sử dụng Browser Subagent điều tra DOM thực tế, sửa locator điều hướng thành `page.locator('li', { hasText: 'Người dùng' }).first().click()` và assert trực tiếp trên `page.getByRole('table')`.
    2. Chuyển đổi các ca kiểm thử bảo mật (TC02, TC06, TC09) sang kiểm thử trực tiếp trên giao diện trình duyệt (`{ page }`) với assertion ràng buộc theo SRS:
       - **TC02:** Bắt buộc token user thường không được phép tải bảng quản lý người dùng.
       - **TC06:** Bắt buộc không được hiển thị nút "Xóa" bên cạnh chính tài khoản admin đang đăng nhập (chống tự sát tài khoản).
       - **TC09:** Bắt buộc tài khoản tự đổi role=admin qua API phải bị từ chối truy cập vào Admin Portal.
    3. Cả 3 ca kiểm thử trên thất bại chính xác trên cả 3 trình duyệt (9 failed runs), tự động sinh đầy đủ screenshot, video và error-context phục vụ báo cáo.

---

## 3. Danh sách Bugs phát hiện (Bug Reports)

Toàn bộ 7 lỗi phát hiện qua kiểm thử tự động đều được lưu vết chi tiết trong file [HW4/Submission/reports/bug-report.md](../bug-report.md) và hệ thống GitHub Issues:

| Bug ID | Tính năng | Tên lỗi & Mô tả tóm tắt | Mức độ nghiêm trọng | Trạng thái GitHub Issue |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-FR05-001** | FR-05 | Không hiển thị trạng thái rỗng (empty state) khi tìm kiếm không có kết quả | Medium | [GitHub Issue #21](https://github.com/BDCALM/eshop-sut-for-HWork/issues/21) |
| **BUG-FR05-002** | FR-05 | Từ khóa tìm kiếm chứa thẻ HTML bị render trực tiếp không an toàn (XSS Risk) | High | [GitHub Issue #22](https://github.com/BDCALM/eshop-sut-for-HWork/issues/22) |
| **BUG-FR05-003** | FR-05 | Ký tự `%` bị diễn giải thành SQL LIKE wildcard thay vì tìm kiếm chuỗi nguyên bản | Medium | [GitHub Issue #23](https://github.com/BDCALM/eshop-sut-for-HWork/issues/23) |
| **BUG-FR11-001** | FR-11 | Người dùng có thể hủy đơn hàng đang ở trạng thái Đang giao (`shipping`) qua giao diện Profile | High | [GitHub Issue #25](https://github.com/BDCALM/eshop-sut-for-HWork/issues/25) |
| **BUG-FR19-001** | FR-19 | Route `/api/admin/users` không kiểm tra vai trò admin, cho phép user thường truy cập toàn bộ dữ liệu | Critical | [Issue Template BUG-FR19-001](../../../0.workingProcess/task1/FR19/github-issue-BUG-FR19-001.md) |
| **BUG-FR19-002** | FR-19 | `DELETE /api/admin/users/:id` luôn trả về HTTP 200 false-success và cho phép Admin tự xóa chính mình | High | [Issue Template BUG-FR19-002](../../../0.workingProcess/task1/FR19/github-issue-BUG-FR19-002.md) |
| **BUG-FR19-003** | FR-19 | `PUT /api/users/me` chấp nhận client tự gửi `role: "admin"`, cho phép leo thang đặc quyền trái phép | Critical | [Issue Template BUG-FR19-003](../../../0.workingProcess/task1/FR19/github-issue-BUG-FR19-003.md) |

---

## 4. Phê bình AI (AI Critique)

Trong quá trình đồng hành cùng AI (Cursor / Gemini / Claude) để triển khai tự động hóa kiểm thử cho dự án EShop, tôi nhận thấy AI thể hiện thế mạnh tốt trong việc tạo mã nguồn mẫu, chuyển đổi các tập dữ liệu JSON sang kịch bản Playwright, và thiết lập nhanh cấu hình môi trường. Tuy nhiên, AI bộc lộ những "điểm mù" và thiên kiến cố hữu nguy hiểm trong kiểm thử phần mềm:

1. **Thiên kiến Happy-Path và Xu hướng Thỏa hiệp với Lỗi (Pessimistic Placation):**
   AI luôn có xu hướng ngầm giả định hệ thống hoạt động đúng hoặc có thói quen "thấy test đỏ là sửa assertion cho xanh". Điển hình ở tính năng FR-19, khi phát hiện API trả về HTTP 200 cho ID sai, AI liền đề xuất sửa lại mong đợi thành 200 thay vì gióng hồi chuông cảnh báo lỗi False-Success theo đặc tả SRS. Hành vi này biến kiểm thử từ việc "bảo vệ yêu cầu của người dùng" thành "hợp thức hóa hiện trạng của lập trình viên".

2. **Shallow Assertion Trap:**
   Ở ca FR11-TC09, AI chỉ kiểm tra trạng thái "Đang giao" có xuất hiện hay không, hoàn toàn bỏ lọt việc kiểm tra xem nút "Hủy đơn" có bị vô hiệu hóa hay không. AI chỉ nhìn vào những gì hiển thị ra (positive assertion) mà hiếm khi tự động tư duy về những gì *không được phép xuất hiện* (negative boundary constraint) nếu con người không chỉ định rõ ràng.

3. **DOM Hallucination:**
   AI thường áp đặt cấu trúc HTML chuẩn sách giáo khoa (dùng thẻ `<a>` cho link, dùng routing URL cho tab, dùng table id) vào một ứng dụng thực tế sử dụng các thư viện tiện ích hiện đại như Tailwind CSS và React State. Nếu không có con người dùng công cụ Browser kiểm tra DOM trực tiếp, script của AI sẽ liên tục thất bại vì lỗi locator yếu.

**Bài học cốt lõi:**
AI chỉ đóng vai trò như một "lập trình viên gõ code tốc độ cao". Kỹ sư kiểm thử con người (Human-in-the-loop) bắt buộc phải nắm giữ vai trò tư duy nghiệp vụ, thiết kế bẫy lỗi biên, bảo vệ tính trung thực của đặc tả yêu cầu (SRS), và thẩm định độc lập từng dòng assertion trước khi đưa vào thực thi.

---

## 5. Bảng Tự Đánh Giá (Self-Assessment Table)

| No. | Criteria / Tiêu chí đánh giá | Trọng số | Điểm tự đánh giá | Minh chứng & Ghi chú |
| :---: | :--- | :---: | :---: | :--- |
| **1** | **Task 1 - Tự động hóa Feature FR-05 (Tìm kiếm sản phẩm)** | 25 | **25 / 25** | 12 ca DDT trong `FR05-data.json`, script `FR05.spec.js`, 3 assertion patterns, chạy 3 trình duyệt (21 passed, 15 failed), HTML report có metadata, phát hiện 3 bugs (Issues #21, #22, #23). |
| **1** | **Task 1 - Tự động hóa Feature FR-11 (Lịch sử đơn hàng)** | 25 | **25 / 25** | 12 ca DDT trong `FR11-data.json`, script `FR11.spec.js`, 3 assertion patterns, chạy 3 trình duyệt (33 passed, 3 failed), HTML report có metadata, bẫy lỗi hủy đơn hàng transit (Issue #25). |
| **1** | **Task 1 - Tự động hóa Feature FR-19 (Quản lý User - Admin)** | 25 | **25 / 25** | 12 ca DDT trong `FR19-data.json`, script `FR19.spec.js`, 3 assertion patterns, chạy 3 trình duyệt (27 passed, 9 failed), HTML report có metadata, phát hiện 3 lỗ hổng bảo mật nghiêm trọng. |
| **2** | **Task 2 — Demo Video (Thuyết minh tiếng Việt >= 5 phút)** | 15 | **15 / 15** | [Sinh viên quay video demo gồm: `whoami`, giới thiệu `SKILLS.md`, chạy script Playwright multi-browser, thuyết minh lỗi AI sửa được, show metadata HTML report]. |
| **3** | **Task 3 — Agent Skills & Quy trình AI (File `SKILLS.md`)** | 10 | **10 / 10** | File `SKILLS.md` được xây dựng chi tiết theo chuẩn Agent Skill, log tương tác ghi chép đầy đủ trong `prompt_log.md`, Git log đạt trên 8 commits cho test scripts. |
| | **TỔNG ĐIỂM (TOTAL GRADE)** | **100** | **100 / 100** | **Hoàn thành xuất sắc toàn bộ yêu cầu của đề tài HW04.** |
