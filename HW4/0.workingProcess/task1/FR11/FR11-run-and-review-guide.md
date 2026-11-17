# FR-11 - Hướng dẫn chạy và review

## Phạm vi

FR-11 kiểm tra lịch sử đơn hàng cá nhân tại `/profile`, gồm authentication, trạng thái rỗng, số lượng order, dịch status và ownership. Data nằm tại `HW4/tests/data/FR11-data.json`; script tại `HW4/tests/FR11.spec.js`.

## Điều kiện trước khi chạy

```powershell
cd H:\Source\src\eshop-sut-for-HWork\backend
node server.js
```

```powershell
cd H:\Source\src\eshop-sut-for-HWork\frontend-web
npm run dev -- --host 0.0.0.0 --port 5173
```

## Lệnh chạy

Từ thư mục `HW4`:

```powershell
npx playwright test tests/FR11.spec.js --project=chromium --reporter=line
npx playwright test tests/FR11.spec.js
```

Chạy một ca:

```powershell
npx playwright test tests/FR11.spec.js -g "FR11-TC12"
```

Mở report FR11 sau khi cấu hình output folder tương ứng:

```powershell
npx playwright show-report Submission/reports/playwright-html-minhchung/FR11
```

## Cách đọc 12 test cases

- `TC01`: người chưa đăng nhập không được xem lịch sử.
- `TC02`: login sai hiển thị lỗi.
- `TC03-TC04`: login hợp lệ và trạng thái không có order.
- `TC05-TC06`: một/nhiều order.
- `TC07-TC11`: nhãn tiếng Việt cho năm trạng thái.
- `TC12`: API chỉ trả order của user hiện tại.

Mỗi test account được tạo riêng để tránh phụ thuộc dữ liệu order từ test khác. Script dùng API setup để tạo order, nhưng phần login và hiển thị lịch sử được kiểm tra qua giao diện web.

## Human review cần thực hiện

1. Kiểm tra `beforeEach`/setup không làm test phụ thuộc dữ liệu cũ.
2. Xác nhận token được gửi đúng tới `/api/orders/my-orders`.
3. Kiểm tra locator `getByRole`, `getByLabel`, `getByText` có ổn định.
4. Kiểm tra assertion gồm visibility/state, URL, API collection/status, count và text.
5. Xác nhận status mapping: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`.
6. Kiểm tra ownership bằng hai tài khoản nếu test fail hoặc backend trả dữ liệu bất thường.
7. Không coi lỗi setup API là lỗi UI/SUT; phân loại rõ test script, môi trường và SUT.
8. Lưu screenshot, video và `error-context.md` vào `HW4/Submission/reports/playwright-html-minhchung/FR11/data/`.

## Sau khi chạy

Nếu có lỗi thực sự của SUT:

1. Ghi bug vào `HW4/Submission/reports/bug-report.md` hoặc report FR11 riêng.
2. Thu thập evidence theo từng browser.
3. Tạo GitHub Issue bằng CLI.
4. Sau khi xác định bug, **nhắc người thực hiện tạo prompt riêng để AI sinh GitHub Issue cho FR-11**, nếu cần hỗ trợ AI.
5. Upload screenshot vào issue và thay placeholder URL trong bug report.
