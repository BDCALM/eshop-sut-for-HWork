## 0. Assertion pattern là gì

**Assertion pattern (mẫu kiểm chứng)** là các quy chuẩn logic được lập trình trong kịch bản kiểm thử nhằm xác minh xem hệ thống có đang phản hồi đúng như thiết kế hay không. Trong mô hình viết test chuẩn **AAA (Arrange - Act - Assert)**, mẫu kiểm chứng chính là bước cuối cùng (Assert) — nơi kịch bản đưa ra phán quyết Pass (Đạt) hay Fail (Trượt) cho một test case bằng cách so sánh Trạng thái thực tế (Actual) với Kết quả mong đợi (Expected).

**Vai trò của Assertion Pattern trong Automation Test:**

* **Quyết định tính hợp lệ của kịch bản:** Kịch bản tự động có thể thực hiện hàng chục thao tác click hay gõ phím trơn tru, nhưng nếu thiếu assertion, bài test hoàn toàn vô giá trị vì hệ thống không có tiêu chí để đánh giá đúng/sai.
* **Hoạt động như "đôi mắt" của Tester:** Máy móc không thể tự nhìn thấy giao diện bị vỡ, thông báo lỗi hiện sai hay URL chưa chuyển hướng. Các pattern cung cấp phương pháp để kịch bản "đọc" và thẩm định chính xác từng thành phần trên giao diện.
* **Ngăn chặn False Positive (Thành công giả):** Sử dụng đa dạng các pattern giúp bắt chính xác lỗi ngầm. Ví dụ: Nếu API đăng nhập trả về HTTP 200 OK nhưng giao diện lại hiển thị "Lỗi máy chủ", việc chỉ dùng pattern kiểm tra Network mà thiếu pattern kiểm tra Text trên UI sẽ khiến bài test báo Pass một cách sai lệch.

**Các mẫu Assertion phổ biến (Thường dùng với Playwright hoặc Selenium):**

* **State / Visibility Assertion (Kiểm chứng trạng thái):** Xác nhận một phần tử DOM có đang hiển thị, bị ẩn, có sẵn sàng để tương tác, hoặc bị vô hiệu hóa (disabled) hay không.
* *Ví dụ:* Xác minh nút "Thanh toán" bị khóa (disabled) khi giỏ hàng đang trống (`await expect(button).toBeDisabled()`).


* **Content / Value Assertion (Kiểm chứng nội dung văn bản/giá trị):** So sánh chính xác chuỗi văn bản hoặc giá trị số hiển thị trên UI với dữ liệu chuẩn.
* *Ví dụ:* Sau khi nhập sai mật khẩu, cảnh báo lỗi chữ đỏ phải hiển thị đúng nguyên văn (`await expect(alert).toHaveText('Tài khoản bị khóa 30 giây')`).


* **Navigation / URL Assertion (Kiểm chứng điều hướng):** Xác minh hệ thống đã chuyển hướng người dùng đến đúng trang đích sau một chuỗi hành động.
* *Ví dụ:* Đăng nhập thành công phải thay đổi URL sang trang chủ thay vì kẹt lại ở form login (`await expect(page).toHaveURL(/.*dashboard/)`).


* **Count / Structure Assertion (Kiểm chứng số lượng/cấu trúc):** Đếm số lượng phần tử được render trên màn hình để kiểm tra logic hiển thị danh sách.
* *Ví dụ:* Khi thực hiện tìm kiếm từ khóa "Laptop", danh sách trả về phải render đúng số lượng thẻ sản phẩm khớp với database (`await expect(productCards).toHaveCount(5)`).


* **Attribute Assertion (Kiểm chứng thuộc tính HTML):** Kiểm tra các thuộc tính ẩn bên dưới thẻ HTML, thường dùng cho SEO, tính năng hỗ trợ tiếp cận (accessibility) hoặc hình ảnh.
* *Ví dụ:* Đảm bảo ảnh sản phẩm không bị lỗi hiển thị bằng cách kiểm tra thuộc tính thẻ alt (`await expect(image).toHaveAttribute('alt', 'Tên sản phẩm')`).



Việc áp dụng nhiều assertion patterns khác nhau trong cùng một kịch bản ép buộc quá trình kiểm thử phải đánh giá tính năng một cách toàn diện đa chiều — từ trạng thái phần tử, nội dung văn bản, cho đến luồng điều hướng — thay vì chỉ kiểm tra sự tồn tại của một nút bấm một cách hời hợt.


## 1. Nền tảng Playwright Framework & JavaScript/TypeScript (Ưu tiên Cao nhất)

Dù sử dụng Cursor hay bất kỳ AI nào, mã được sinh ra sẽ chạy trên Node.js bằng thư viện Playwright. Bạn cần nắm vững các khái niệm cơ bản sau để đọc hiểu và sửa mã do AI viết:

* **Cơ chế Async/Await:** Mọi hành động trên trình duyệt (click, điền text, lấy phần tử) trong Playwright đều là bất đồng bộ (trả về Promise). Bạn cần kiểm tra xem AI có quên từ khóa `await` trước các thao tác `page.locator(...).click()` hay không.
* **Locators (Định vị phần tử) - Điểm AI hay sai nhất:** AI rất lười và thường tự sinh ra các CSS Selector hoặc XPath dài dòng, dễ gãy (fragile selectors) như `page.locator('div > div:nth-child(2) > span')`. Bạn cần biết các locators hướng người dùng (User-facing locators) chuẩn của Playwright như `getByRole('button', { name: 'Đăng nhập' })`, `getByPlaceholder()`, hoặc `getByTestId()` để yêu cầu AI sửa lại hoặc tự sửa, sau đó ghi chú điều này vào phần AI Critique.


* **Assertions (Các mẫu kiểm chứng):** Bài tập yêu cầu 3 assertion patterns. Bạn cần biết cú pháp `expect` mặc định của Playwright (được tích hợp sẵn thư viện Jest mà bạn đã từng tìm hiểu):


* *State/Visibility:* `await expect(locator).toBeVisible()` hoặc `toBeEnabled()`.
* *Value/Text:* `await expect(locator).toHaveText('Đăng nhập thành công')`.
* *Navigation/URL:* `await expect(page).toHaveURL(/.*dashboard/)`.



## 2. Kỹ thuật Data-Driven Testing (DDT)

Bài tập cấm việc hardcode dữ liệu kiểm thử (inline arrays/objects). Bạn cần biết cách tổ chức vòng lặp trong Playwright:

* **Đọc file ngoại vi:** Sử dụng module `fs` (File System) của Node.js để đọc file `FR19-data.json` hoặc thư viện `csv-parse` để đọc file `.csv`.
* **Vòng lặp Test:** Sử dụng vòng lặp `for...of` hoặc `forEach` bao bọc bên ngoài hàm `test()` của Playwright để hệ thống tự động sinh ra 12 test cases tương ứng với 12 dòng dữ liệu.
```javascript
// Cấu trúc bạn cần nắm để kiểm tra code AI:
const testCases = JSON.parse(fs.readFileSync('data.json'));
test.describe('FR-19 User Management', () => {
  for (const data of testCases) {
    test(`Test case: ${data.scenario}`, async ({ page }) => {
       // Thực thi test với data.username, data.expectedResult
    });
  }
});

```



## 3. Xử lý tính chập chờn (Flakiness) trong UI Testing

EShop là một ứng dụng Single Page Application (SPA) viết bằng React, dữ liệu gọi qua REST API. Việc chuyển trang hoặc hiển thị thông báo không diễn ra ngay lập tức.

* **Auto-waiting:** Playwright mặc định tự động chờ phần tử xuất hiện (DOM attach) và sẵn sàng (có thể click) trước khi thực hiện hành động.
* **Explicit Waits (Chờ tường minh):** Đôi khi auto-waiting là không đủ (đặc biệt ở FR-11 Lịch sử đơn hàng khi load dữ liệu). Bạn cần biết hàm `page.waitForResponse()` để ép script chờ API trả về HTTP 200 trước khi kiểm tra (assert) giao diện.
* **Chống chỉ định `waitForTimeout`:** Nếu AI sinh ra mã `await page.waitForTimeout(3000)` (hard sleep), bạn phải xóa ngay và thay bằng lệnh chờ trạng thái (wait for state/response). Hard sleep là tối kỵ trong Automation.

## 4. Quản lý Trạng thái & Thiết lập (Setup & Teardown)

Cả 3 chức năng bạn chọn (FR-05, FR-11, FR-19) đều yêu cầu các trạng thái tiền quyết định (Preconditions):

* **Hooks (`beforeEach` / `beforeAll`):** FR-11 và FR-19 yêu cầu người dùng phải đăng nhập trước khi thực thi test. Bạn cần biết cách dùng `test.beforeEach` để viết luồng đăng nhập một lần, thay vì để AI sao chép mã đăng nhập lặp lại 12 lần trong 12 test cases.


* **Global Setup / Session Storage:** Để test chạy đa trình duyệt nhanh hơn, bạn có thể tìm hiểu cách Playwright lưu trạng thái đăng nhập (cookies/JWT) vào một file `.json` qua `Global Setup`, giúp các bài test sau không cần điền form đăng nhập qua UI nữa.

## 5. Cấu hình Playwright & Xuất báo cáo (HTML Report)

Bạn cần biết cách can thiệp vào file `playwright.config.ts`:

* **Cấu hình Đa trình duyệt (Multi-Browser):** Nắm rõ cấu trúc mảng `projects` trong file config để chỉ định chạy trên Chromium, Firefox, WebKit (hoặc Edge).


* **Metadata Báo cáo:** Playwright HTML Reporter hoặc Allure cho phép tiêm biến môi trường. Bạn cần biết cách đưa chuỗi *"Run by: 23120242"* vào file config để kết quả xuất ra hợp lệ với tiêu chí chấm điểm.



## 6. Hiểu biết về Kiến trúc SUT để "Gài bẫy" AI

Trọng tâm của môn học là Human Review. Để nhận xét AI tốt, bạn phải hiểu hệ thống EShop sâu hơn AI:

* Bạn cần nắm rõ đặc tả (FR-19 không cho admin tự xóa mình, hoặc khi truyền ID sai định dạng thì API vẫn trả về 200 False Success).


* Từ kiến thức này, bạn thiết kế các dữ liệu đầu vào trong file JSON (như nhập ID là chữ cái, ID là chính admin) và mớm cho AI viết test kiểm tra đúng các điểm này. Nếu AI ngây ngô chỉ viết test kiểm tra UI cơ bản mà bỏ qua luồng xử lý API ngầm, đó là lúc bạn sửa mã và báo cáo vào phần AI Critique.