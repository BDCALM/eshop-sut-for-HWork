# FR-19 - Hướng dẫn chạy và review (Quản lý người dùng - Admin)

## Phạm vi

FR-19 kiểm tra tính năng Quản lý người dùng dành cho Admin tại `http://localhost:5174` và các endpoints API liên quan (`/api/admin/users`, `/api/users/me`), bao gồm authentication, kiểm tra role enforcement, xem danh sách user, xóa user hợp lệ, và các ca kiểm thử bảo mật / lỗi cố ý của SUT. Data nằm tại `HW4/tests/data/FR19-data.json`; script tại `HW4/tests/FR19.spec.js`.

## Điều kiện trước khi chạy

Cần chạy 3 service cùng lúc trên các terminal riêng biệt:

1. **Backend API (port 3000):**
```powershell
cd H:\Source\src\eshop-sut-for-HWork\backend
node server.js
```

2. **Frontend Admin (port 5174):**
```powershell
cd H:\Source\src\eshop-sut-for-HWork\frontend-admin
npm run dev
```

3. **Frontend Web (port 5173 - nếu cần):**
```powershell
cd H:\Source\src\eshop-sut-for-HWork\frontend-web
npm run dev
```

## Lệnh chạy

Từ thư mục `HW4`:

```powershell
# Smoke test trên Chromium
npx playwright test tests/FR19.spec.js --project=chromium --reporter=line

# Chạy đầy đủ 3 trình duyệt (Chromium, Firefox, WebKit)
$env:PLAYWRIGHT_FEATURE = 'FR19'
npx playwright test tests/FR19.spec.js
```

Chạy một ca đơn lẻ:
```powershell
npx playwright test tests/FR19.spec.js -g "FR19-TC11"
```

Xem HTML Report đã tạo:
```powershell
npx playwright show-report Submission/reports/playwright-html-minhchung/FR19
```

## Cách đọc 12 test cases

- `FR19-TC01`: Chưa đăng nhập gọi GET /api/admin/users → 401 Unauthorized.
- `FR19-TC02`: Regular user JWT gọi GET /api/admin/users → SUT không enforce role, trả 200 (Defect: BUG-FR19-001).
- `FR19-TC03`: Admin xem danh sách người dùng → trả về mảng users hợp lệ.
- `FR19-TC04`: Danh sách user trả về đầy đủ các trường id, name, email, role.
- `FR19-TC05`: Admin xóa user hợp lệ (không phải admin) → thành công (200) và user biến mất khỏi danh sách.
- `FR19-TC06`: Admin tự xóa bản thân (self-deletion) → SUT cho phép (Defect: BUG-FR19-002, SRS cấm self-deletion).
- `FR19-TC07`: Admin xóa user với ID không tồn tại → SUT trả 200 false success (Defect: BUG-FR19-002, SRS kỳ vọng 404).
- `FR19-TC08`: Admin xóa user với ID chuỗi chữ không hợp lệ → SUT trả 200 false success (Defect: BUG-FR19-002, SRS kỳ vọng 400).
- `FR19-TC09`: Regular user leo thang quyền qua PUT /api/users/me với role=admin → SUT chấp nhận (Defect: BUG-FR19-003).
- `FR19-TC10`: PUT /api/users/me không có token → trả về 401 Unauthorized.
- `FR19-TC11`: Admin UI: Đăng nhập admin và xem trang Quản lý người dùng, bảng dữ liệu hiển thị đúng.
- `FR19-TC12`: Admin UI: Thao tác xóa user trên giao diện → user biến mất khỏi bảng danh sách.

## 3 Assertion Patterns được áp dụng

1. **Assertion Pattern 1 (Visibility/State):**
   - `await expect(page.getByRole('textbox').first()).toBeVisible()`
   - `await expect(page.getByRole('table')).toBeVisible()`
   - `expect(userStillVisible).toBeFalsy()`
2. **Assertion Pattern 2 (Navigation/URL):**
   - `await expect(page).toHaveURL(/localhost:5174/)`
3. **Assertion Pattern 3 (HTTP Status / Property / Count):**
   - `expect(res.status()).toBe(tc.expectedStatus)`
   - `expect(firstUser).toHaveProperty(field)`
   - `expect(rowCount).toBeGreaterThan(0)`
