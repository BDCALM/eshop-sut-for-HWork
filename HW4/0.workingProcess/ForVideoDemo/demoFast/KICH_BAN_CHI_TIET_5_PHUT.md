# KỊCH BẢN QUAY VIDEO DEMO KIỂM THỬ TỰ ĐỘNG (PLAYWRIGHT END-TO-END)
> **Yêu cầu bài tập (Task 2):** Video Unlisted trên YouTube thời lượng tối thiểu 5 phút, thuyết minh bằng tiếng Việt, trình diễn toàn diện quá trình thực thi kịch bản kiểm thử tự động đa trình duyệt (Multi-browser), báo cáo HTML Report có mã sinh viên, và phân tích chi tiết ít nhất một can thiệp kỹ thuật (Human Review & Fix) sửa lỗi của AI.
> 
> **Thông tin sinh viên:**
> - MSSV: `23120242`
> - Đề tài: HW04 - AI-First Automation Testing & Human Review
> - Tính năng trình diễn chính: **FR-11 (Xem lịch sử đơn hàng cá nhân & Ràng buộc trạng thái đơn hàng)** *(Kèm phương án bổ trợ FR-19 nếu cần)*.
> - Tổng thời lượng dự kiến: **05 phút 30 giây - 06 phút 00 giây**.

---

## TỔNG QUAN TIMELINE & TIẾN TRÌNH VIDEO

| Mốc thời gian | Phân đoạn | Mục tiêu chính |
| :--- | :--- | :--- |
| **00:00 - 00:45** | **Phần 1: Định danh & Giới thiệu tổng quan** | Xác thực danh tính sinh viên (`whoami`, `hostname`, MSSV `23120242`), giới thiệu bài tập và cấu trúc thư mục HW4. |
| **00:45 - 02:00** | **Phần 2: Kiến trúc kịch bản kiểm thử & Dữ liệu DDT** | Trình bày file dữ liệu `FR11-data.json`, file mã nguồn `FR11.spec.js`, và 3 Assertion Patterns. |
| **02:00 - 03:30** | **Phần 3: Trọng tâm Human Review - Vạch trần lỗi của AI** | Soi chiếu mã nguồn, chỉ rõ điểm sai sót/nông cạn của AI, và giải thích chi tiết cách sinh viên đã sửa lỗi (Code Fix). |
| **03:30 - 04:30** | **Phần 4: Chạy Automation Suite đa trình duyệt (End-to-End)** | Chạy lệnh thực thi Playwright trên 3 trình duyệt song song (Chromium, Firefox, WebKit). |
| **04:30 - 05:40+**| **Phần 5: Trình chiếu HTML Report & Minh chứng Bug SUT** | Mở Playwright HTML Report có tiêu đề `Run by: 23120242`, soi bằng chứng lỗi (screenshot, video, error-context), và kết luận. |

---

## KỊCH BẢN CHI TIẾT TỪNG PHÚT (HÀNH ĐỘNG & LỜI THOẠI)

### PHẦN 1: ĐỊNH DANH SINH VIÊN & KHỞI TẠO (00:00 - 00:45)

* **Thao tác màn hình:**
  1. Mở cửa sổ **PowerShell** hoặc **Command Prompt** toàn màn hình (hoặc chia nửa màn hình với VS Code).
  2. Gõ lệnh:
     ```powershell
     whoami
     hostname
     git branch
     ```
  3. Mở cửa sổ **VS Code** đang mở dự án `eshop-sut-for-HWork`.
  4. Trỏ chuột vào cây thư mục `HW4/`: mở rộng thư mục `HW4/tests`, `HW4/tests/data`, và `HW4/Submission/reports`.

* **Lời thoại tiếng Việt (Voice Narration):**
  > *"Xin chào thầy cô và các bạn trợ giảng. Em tên là [Họ và tên của bạn], có mã số sinh viên là **23120242**. 
  > 
  > Đây là video báo cáo và minh chứng kỹ thuật cho bài tập thực hành số 4 (HW04) môn Kiểm thử phần mềm, với chủ đề: **Kiểm thử tự động hóa theo phương pháp AI-First kết hợp với quy trình đánh giá của con người (Human-in-the-loop Review)**.
  > 
  > Để bắt đầu, em xin xác thực môi trường thực thi cục bộ trên máy tính của mình. Như quý thầy cô có thể thấy trên màn hình PowerShell: lệnh `whoami` và `hostname` xác nhận máy cá nhân của em, và nhánh Git hiện tại đang là nhánh `main` của repository `eshop-sut-for-HWork`.
  > 
  > Trong bài tập HW04, nhóm em đã hoàn thiện tự động hóa cho 3 tính năng lớn: FR-05 Tìm kiếm sản phẩm, FR-11 Lịch sử đơn hàng, và FR-19 Quản lý người dùng. Trong video hôm nay, em sẽ trình diễn kịch bản kiểm thử End-to-End của tính năng **FR-11: Xem lịch sử đơn hàng cá nhân**, đồng thời phân tích một lỗi logic cực kỳ quan trọng mà AI đã mắc phải và cách em đã can thiệp chỉnh sửa."*

---

### PHẦN 2: CẤU TRÚC KỊCH BẢN KIỂM THỬ & 3 ASSERTION PATTERNS (00:45 - 02:00)

* **Thao tác màn hình:**
  1. Trên VS Code, mở file `HW4/tests/data/FR11-data.json`.
  2. Cuộn chuột lướt qua cấu trúc các ca kiểm thử: ca unauthenticated, invalid login, empty state, và các trạng thái đơn hàng (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`).
  3. Mở file `HW4/tests/FR11.spec.js`.
  4. Bôi đen (Highlight) các hàm trợ giúp ở đầu file: `registerAccount`, `createOrders`, `loginInUi`.
  5. Cuộn xuống vòng lặp data-driven `for (const testCase of testCases)`.
  6. Lần lượt trỏ chuột và bôi đen **3 Assertion Patterns**:
     - *Pattern 1 (Visibility/State):* Dòng 84 (`toBeVisible`) và dòng 144 (`not.toBeVisible`).
     - *Pattern 2 (Navigation/URL):* Dòng 72 và dòng 113 (`toHaveURL('http://localhost:5173/profile')`).
     - *Pattern 3 (Count/Text/Value):* Dòng 135 (`toHaveCount`) và dòng 123 (`toEqual(expectedOrderIds)`).

* **Lời thoại tiếng Việt (Voice Narration):**
  > *"Trước tiên, em xin giới thiệu cấu trúc kịch bản kiểm thử. Toàn bộ kịch bản được xây dựng theo mô hình **Kiểm thử hướng dữ liệu (Data-Driven Testing - DDT)**.
  > 
  > Mọi dữ liệu test case được tách biệt hoàn toàn trong file `FR11-data.json`. Bộ dữ liệu bao gồm 12 ca kiểm thử bao quát từ các trường hợp biên, chưa đăng nhập, tài khoản rỗng, kiểm tra quyền sở hữu dữ liệu đơn hàng (Data Isolation), cho đến chuyển đổi trạng thái của 5 giai đoạn đơn hàng theo vòng đời nghiệp vụ.
  > 
  > Chuyển sang file thực thi `FR11.spec.js`, kịch bản đọc dữ liệu từ JSON và áp dụng đầy đủ **3 mẫu Assertion (3 Assertion Patterns)** theo đúng chuẩn của Playwright:
  > - **Mẫu thứ nhất - Visibility and State Assertion:** Dùng để kiểm tra sự xuất hiện hoặc ẩn đi của các thành phần giao diện, ví dụ như kiểm tra thông báo đăng nhập hoặc kiểm tra nút bấm.
  > - **Mẫu thứ hai - Navigation and URL Assertion:** Xác thực người dùng được điều hướng chính xác về đường dẫn `/profile`.
  > - **Mẫu thứ ba - Count, Text, and Value Assertion:** Dùng để kiểm tra số lượng dòng trong bảng đơn hàng bằng `toHaveCount()`, và so khớp chính xác mã trạng thái tiếng Việt."*

---

### PHẦN 3: TRỌNG TÂM HUMAN REVIEW - PHÂN TÍCH LỖI CỦA AI VÀ BẢN FIX (02:00 - 03:30)
> *(Phần quan trọng nhất để lấy trọn điểm "Narrate at least one fix you made to the AI-generated script during your review")*

* **Thao tác màn hình:**
  1. Mở file đặc tả `README.md` (hoặc mở song song màn hình), cuộn đến **Mục 5 - Quản lý đơn hàng (FR-10 & FR-11)**.
  2. Bôi đen dòng yêu cầu nghiệp vụ: *"Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác."*
  3. Quay lại file `HW4/tests/FR11.spec.js`, cuộn xuống dòng 136 - 145:
     ```javascript
     // Assertion Pattern 3: Count/text/value assertion.
     await expect(page.locator('tbody tr')).toHaveCount(testCase.orderStatuses.length);
     if (testCase.expectedStatusLabel) {
       await expect(page.getByText(testCase.expectedStatusLabel, { exact: true })).toBeVisible();
     }

     // Assertion Pattern 1: Visibility/state assertion (SRS Constraint - README.md FR-10 & FR-11)
     // "Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác."
     if (testCase.shouldNotAllowCancel) {
       const shippingRow = page.locator('tbody tr').filter({ hasText: testCase.expectedStatusLabel });
       await expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible();
     }
     ```
  4. Mở file mã nguồn SUT `frontend-web/src/pages/Profile.jsx`, cuộn đến dòng 200 - 208 để chỉ ra bug thực tế trong code frontend:
     ```jsx
     {/* Nút hủy hiển thị khi chưa giao xong và chưa hủy (kể cả khi đang giao) */}
     {o.status !== "delivered" && o.status !== "canceled" && (
       <button onClick={() => cancelOrder(o.id)} className="...">Hủy đơn</button>
     )}
     ```
  5. Mở file `backend/server.js`, chỉ vào dòng 356 để chứng minh backend cũng cho phép hủy đơn `shipping`.

* **Lời thoại tiếng Việt (Voice Narration):**
  > *"Bây giờ, em xin trình bày phân đoạn cốt lõi nhất của bài tập: **Phân tích lỗi của script do AI tạo ra và quá trình can thiệp của sinh viên (Human Review)**.
  > 
  > Khi em yêu cầu AI sinh script tự động cho tính năng FR-11, AI đã mắc phải một lỗi kinh điển trong kiểm thử: **Lỗi khẳng định nông cạn (Shallow Assertion Trap)** và **bỏ quên ràng buộc phủ định (Negative Constraint)**.
  > 
  > Cụ thể, ở ca kiểm thử `FR11-TC09` kiểm tra đơn hàng đang giao (`shipping`), AI ban đầu chỉ viết duy nhất một dòng assert: kiểm tra nhãn chữ 'Đang giao' có hiển thị trên màn hình hay không (`await expect(page.getByText('Đang giao')).toBeVisible()`).
  > 
  > Nếu chỉ kiểm tra như vậy, bài test đã **PASS 100% (36/36 runs)**. Điều này tạo ra một cảm giác an toàn giả tạo (False Sense of Security), bởi vì AI đã bỏ qua một nguyên tắc bảo mật và nghiệp vụ sống còn được ghi rất rõ trong tài liệu SRS ở `README.md`:
  > **'Khi đơn hàng đã ở trạng thái shipping (Đang giao), khách hàng KHÔNG được phép tự hủy đơn — chỉ có Admin mới có quyền thao tác'**.
  > 
  > Trong quá trình Human Review, em đã phát hiện ra lỗ hổng này. Em đã kiên quyết **không hạ chuẩn kiểm thử**, mà sửa lại code test bằng cách bổ sung một assertion ràng buộc phủ định nghiêm ngặt:
  > Với các đơn hàng đang giao, em lọc ra hàng chứa trạng thái đó và bắt buộc nút 'Hủy đơn' KHÔNG ĐƯỢC PHÉP XUẤT HIỆN:
  > `await expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible();`
  > 
  > Khi đào sâu vào mã nguồn của hệ thống (White-box Root Cause Analysis), em phát hiện đây là một bug cố ý của tác giả đề tài:
  > - Ở `Profile.jsx` dòng 200, frontend viết điều kiện hiển thị nút Hủy đơn là `khác delivered và khác canceled`, nghĩa là trạng thái `shipping` vẫn hiện nút đỏ 'Hủy đơn'!
  > - Tương tự ở `backend/server.js` dòng 356, API cũng chỉ chặn hủy đơn khi đã giao hoặc đã hủy.
  > 
  > Nhờ sự can thiệp của Human Review, bài test đã bắt đúng lỗi thực tế của phần mềm thay vì dễ dãi cho qua như AI ban đầu!"*

---

### PHẦN 4: THỰC THI KIỂM THỬ ĐA TRÌNH DUYỆT (MULTI-BROWSER RUN) (03:30 - 04:30)

* **Thao tác màn hình:**
  1. Mở cửa sổ Terminal trong VS Code (hoặc chuyển sang cửa sổ PowerShell).
  2. Đảm bảo Backend (port 3000) và Frontend Web (port 5173) đang chạy bình thường.
  3. Gõ hoặc dán lệnh chạy kiểm thử:
     ```powershell
     cd HW4
     npx playwright test tests/FR11.spec.js --project=chromium --project=firefox --project=webkit
     ```
  4. Để terminal chạy và quay rõ nét:
     - Các worker song song bắt đầu khởi chạy.
     - Playwright chạy lần lượt qua cả 3 trình duyệt: **Chromium**, **Firefox**, và **WebKit**.
     - Các dấu tick xanh xuất hiện liên tục cho các ca pass.
     - Khi chạy đến `FR11-TC09`, terminal dừng lại chờ timeout (5000ms) vì nút "Hủy đơn" vẫn lù lù trên màn hình, sau đó in ra thông báo lỗi màu đỏ thất bại cho TC09 trên cả 3 trình duyệt.
     - Kết quả tổng kết in ra: **33 passed, 3 failed (36 tests)**.

* **Lời thoại tiếng Việt (Voice Narration):**
  > *"Ngay bây giờ, em sẽ tiến hành chạy trực tiếp kịch bản kiểm thử trên cả 3 trình duyệt: Chromium, Firefox và WebKit (đại diện cho Safari).
  > 
  > [Thao tác gõ lệnh và bấm Enter]
  > 
  > Như thầy cô đang thấy trên terminal, Playwright đang phân phối các worker chạy song song. Kịch bản tự động gọi API tạo tài khoản, sinh các đơn hàng với các trạng thái tương ứng, sau đó mở giao diện web storefront ở cổng 5173 để kiểm tra trực quan.
  > 
  > Các ca kiểm thử từ TC01 đến TC08 đều đã vượt qua thành công trên cả 3 trình duyệt.
  > 
  > Và ở ca kiểm thử `FR11-TC09`, hệ thống đang chờ assertion kiểm tra xem nút 'Hủy đơn' có ẩn đi hay không. Vì phần mềm SUT đang bị lỗi và vẫn hiển thị nút 'Hủy đơn' đỏ rực, bài test đã timeout sau 5 giây và báo thất bại có chủ đích.
  > 
  > Kết quả cuối cùng là: **33 passed và 3 failed**. Ba lượt thất bại này tương ứng chính xác với 1 lỗi SUT duy nhất xuất hiện đồng nhất trên cả 3 engine trình duyệt Chromium, Firefox và WebKit."*

---

### PHẦN 5: BÁO CÁO HTML REPORT & MINH CHỨNG LỖI (04:30 - 05:40+)

* **Thao tác màn hình:**
  1. Chạy lệnh mở báo cáo HTML (dùng `--port 0` để luôn chọn port trống, tránh lỗi EADDRINUSE):
     ```powershell
     npx playwright show-report --port 0 Submission/reports/playwright-html-minhchung/FR11
     ```
     *(Hoặc mở file `HW4/Submission/reports/playwright-html-minhchung/FR11/index.html`)*.
  2. Trên trang HTML Report:
     - Trỏ chuột vào tiêu đề góc trên cùng bên trái: phóng to hoặc rê chuột vào dòng chữ **"Run by: 23120242 | [ISO Timestamp]"**.
     - Nhấp vào tab **Failed** (hiển thị 3 ca lỗi của `FR11-TC09` trên chromium, firefox, webkit).
     - Nhấp mở chi tiết của ca thất bại trên Chromium:
       - Xem dòng lỗi: `Error: Timed out 5000ms waiting for expect(locator).not.toBeVisible()`.
       - Mở xem ảnh chụp màn hình lỗi **`test-failed-1.png`**: chỉ chuột vào chiếc nút màu đỏ có chữ **"Hủy đơn"** đang xuất hiện cạnh đơn hàng "Đang giao".
       - Bấm Play video **`video.webm`** chạy lại vài giây thao tác của trình duyệt.
  3. Mở file báo cáo lỗi **`HW4/Submission/reports/bug-report.md`**, cuộn đến mục **`BUG-FR11-001`**.
  4. Trỏ vào link GitHub Issue đã được tạo trên repository: `[GitHub Issue #25]`.

* **Lời thoại tiếng Việt (Voice Narration):**
  > *"Tiếp theo, em mở báo cáo tương tác **Playwright HTML Report**.
  > 
  > Điểm đặc biệt quan trọng: Tiêu đề của báo cáo được cấu hình tự động chèn metadata mã số sinh viên của em: **Run by: 23120242** cùng dấu mốc thời gian ISO thực thi.
  > 
  > Trong danh sách kết quả, chúng ta thấy rõ 3 lượt fail của ca `FR11-TC09` trên 3 trình duyệt khác nhau.
  > 
  > Khi nhấp vào chi tiết của ca Chromium:
  > - Báo cáo ghi nhận thông báo lỗi chính xác: Chờ nút 'Hủy đơn' ẩn đi nhưng nút vẫn hiển thị.
  > - Ở phần bằng chứng đính kèm (Attachments), Playwright đã tự động chụp lại ảnh màn hình `test-failed-1.png`. Em xin phóng to ảnh: quý thầy cô có thể thấy đơn hàng đang có nhãn màu xanh 'Đang giao', nhưng bên cạnh lại có nút màu đỏ 'Hủy đơn'.
  > - Video ghi hình `video.webm` cũng ghi lại trọn vẹn toàn bộ phiên tương tác của người dùng.
  > 
  > Tất cả các bằng chứng này đã được em trích xuất và tổng hợp vào tài liệu `bug-report.md` với mã lỗi **`BUG-FR11-001`**, đồng thời đã được tạo thành một Issue chính thức trên GitHub của dự án (Issue #25).
  > 
  > Tóm lại, video demo này đã chứng minh:
  > 1. Quy trình kiểm thử tự động hóa End-to-End vận hành trơn tru và hoàn toàn độc lập trên môi trường đa trình duyệt.
  > 2. Vai trò không thể thay thế của con người (Human-in-the-loop): AI có thể viết code rất nhanh, nhưng chỉ có con người với tư duy phản biện và hiểu sâu đặc tả nghiệp vụ mới có thể phát hiện các lỗi nông cạn của AI, kiên quyết giữ vững Test Oracle và tìm ra các lỗi nghiệp vụ nghiêm trọng của phần mềm.
  > 
  > Em xin chân thành cảm ơn quý thầy cô đã theo dõi video báo cáo của em. Em xin kết thúc tại đây."*

---

## PHƯƠNG ÁN DỰ PHÒNG: NẾU BẠN MUỐN DEMO THÊM HOẶC CHỌN FR-19 (QUẢN LÝ USER ADMIN)

Nếu bạn muốn chọn tính năng **FR-19 (Admin User Management)** thay vì FR-11:
1. **Lệnh chạy:**
   ```powershell
   cd HW4
   npx playwright test tests/FR19.spec.js --project=chromium --project=firefox --project=webkit
   ```
2. **Lỗi của AI cần thuyết minh (Human Review Fix):**
   - **Lỗi 1 (Sai lệch kiến trúc SPA):** AI tự suy diễn giao diện Admin có URL routing (`waitForURL(/users/)`) và dùng thẻ `<a>` (`getByRole('link')`). Thực tế giao diện Admin là React SPA quản lý tab bằng `useState`, menu là thẻ `<li>`. Sinh viên đã dùng Browser Subagent soi DOM và sửa lại locator.
   - **Lỗi 2 (Thỏa hiệp Test Oracle):** Khi backend trả về HTTP 200 cho các ca xóa ID sai hoặc regular user gọi API, AI ban đầu đã tự ý sửa assertion thành `toBe(200)` để ép test pass. Sinh viên đã bác bỏ sự dễ dãi này, chuyển đổi thành các ca kiểm thử bảo mật UI nghiêm ngặt (`TC02`, `TC06`, `TC09`), bắt buộc test phải FAIL để chụp ảnh màn hình và video bằng chứng (27 passed, 9 failed).
3. **Mở báo cáo FR-19:**
   ```powershell
   npx playwright show-report --port 0 Submission/reports/playwright-html-minhchung/FR19
   ```

---

## BẢNG TỔNG KẾT CHECKLIST TRƯỚC KHI NỘP VIDEO

- [ ] Video có thời lượng **>= 5 phút** (Ví dụ: 5 phút 20 giây).
- [ ] Giọng thuyết minh to, rõ ràng, hoàn toàn bằng **tiếng Việt**.
- [ ] Có thao tác chứng minh MSSV `23120242` trên terminal hoặc đầu video.
- [ ] Chạy thành công lệnh test Playwright trên **3 trình duyệt** (Chromium, Firefox, WebKit).
- [ ] Mở HTML Report có hiển thị dòng chữ **`Run by: 23120242`**.
- [ ] Có phân tích rõ ràng lỗi của AI và cách sinh viên sửa lỗi (Human Review & Fix).
- [ ] Video được xuất bản lên YouTube ở chế độ **Unlisted (Không công khai)**.
