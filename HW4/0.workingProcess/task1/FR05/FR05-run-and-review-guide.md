# FR-05 - Hướng dẫn chạy và review

## Phạm vi

FR-05 kiểm tra trang danh sách và tìm kiếm sản phẩm theo yêu cầu trong `README.md`. Bộ test dùng dữ liệu ngoài script tại `HW4/tests/data/FR05-data.json` và tạo đúng 12 test cases.

## Điều kiện trước khi chạy

Mở ba PowerShell riêng tại thư mục repository:

```powershell
cd H:\Source\src\eshop-sut-for-HWork\backend
node server.js
```

```powershell
cd H:\Source\src\eshop-sut-for-HWork\frontend-web
npm run dev -- --host 0.0.0.0 --port 5173
```

Kiểm tra nhanh:

```powershell
Invoke-WebRequest http://localhost:3000/api/products
Invoke-WebRequest http://localhost:5173
```

Nếu đã chạy server trước đó, sau khi sửa `.env.local` phải khởi động lại Vite. Web phải dùng `VITE_API_URL=http://localhost:3000/api`.

## Lệnh chạy

Từ thư mục `HW4`:

```powershell
npx playwright test tests/FR05.spec.js --project=chromium
```

Chạy đầy đủ trên ba browser:

```powershell
npx playwright test tests/FR05.spec.js
```

Mở HTML report:

```powershell
npx playwright show-report playwright-report
```

Chạy một ca cụ thể:

```powershell
npx playwright test tests/FR05.spec.js -g "FR05-TC10"
```

Tạo evidence khi review lỗi:

```powershell
npx playwright test tests/FR05.spec.js --project=chromium --trace=retain-on-failure --screenshot=on
```

## Cách đọc kết quả

- `FR05-TC01` kiểm tra số lượng sản phẩm ban đầu.
- `FR05-TC02` đến `FR05-TC05`, `FR05-TC08`, `FR05-TC09` kiểm tra tìm kiếm theo tên, một phần tên, hoa thường, Unicode và chuỗi số.
- `FR05-TC06`, `FR05-TC07`, `FR05-TC11` kiểm tra empty state và input biên.
- `FR05-TC12` kiểm tra ký tự SQL wildcard được xử lý như input literal, không làm mở rộng kết quả.
- `FR05-TC10` kiểm tra từ khóa HTML được hiển thị như text an toàn.

Các failure ở `TC06`, `TC07`, `TC11`, `TC12` có thể là lỗi SUT nếu không có thông báo empty state. Failure ở `TC10` có thể là lỗi SUT nếu query bị render như HTML. Không tự sửa SUT trong bước automation; ghi lại test, actual result, expected result, browser và screenshot/trace cho bug report.

## Những phần cần human review

1. **Locator:** ưu tiên `getByRole`, `getByPlaceholder` và locator theo nội dung người dùng. Không thay bằng XPath tuyệt đối hoặc `nth-child` nếu không cần.
2. **Wait:** kiểm tra test chờ đúng trạng thái sau khi bấm `Tìm`; không thêm `waitForTimeout` cố định. Nếu cần, chờ response `/api/products` hoặc assertion UI.
3. **Data-driven:** đảm bảo script đọc JSON, không thêm array/object test data inline vào `.spec.js`.
4. **Assertions:** xác nhận script có đủ visibility/state, URL/navigation và count/text/content assertions.
5. **Expected result:** đối chiếu từng case với FR-05 trong SRS, đặc biệt empty state, escape HTML, đúng một thẻ `h1`, loading state và alt text.
6. **Cross-browser:** chạy Chromium, Firefox và WebKit; nếu chỉ một browser fail, kiểm tra timing/locator trước khi kết luận lỗi SUT.
7. **Evidence:** giữ HTML report, screenshot và trace của failure; phân loại lỗi script hay lỗi SUT trước khi viết bug report.

## Ghi chú review hiện tại

Script cố ý dùng expected behavior theo SRS. Vì vậy các test có thể phát hiện các khác biệt hiện có của SUT như thiếu empty state, render query bằng `dangerouslySetInnerHTML`, alt text rỗng và trang có thể có nhiều hơn một `h1`. Đây là dữ liệu cho human review, không phải lý do để làm yếu assertion.

## Kết quả review lần đầu

Lệnh Chromium ngày 17/11/2026 chạy 12 test: **7 passed, 5 failed**.

- `FR05-TC06`, `FR05-TC07`, `FR05-TC11`: không tìm thấy text `Không tìm thấy sản phẩm`, phù hợp với lỗi thiếu empty state trong SUT.
- `FR05-TC12`: ký tự `%` trả về cả 5 sản phẩm, cho thấy backend đang truyền wildcard trực tiếp vào SQL `LIKE` thay vì xử lý như ký tự literal.
- `FR05-TC10`: query HTML không xuất hiện như text nguyên văn; cần kiểm tra lại việc render an toàn vì SUT đang dùng `dangerouslySetInnerHTML`.
- Lỗi ban đầu do script dùng ESM `import` trong project chưa khai báo ESM. Human review đã sửa sang CommonJS `require`; lượt chạy sau đó load được 12 tests và không còn lỗi loader.

Artifacts của lượt chạy được tạo trong `HW4/test-results/` và HTML report tại `HW4/playwright-report/`. Không kết luận bug chỉ từ một failure: cần đối chiếu SRS, screenshot/trace và chạy lại trên Firefox/WebKit ở giai đoạn execution.
