# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR19.spec.js >> FR-19: Quản lý người dùng (Admin) >> [FR19-TC02] Regular user dùng JWT không được phép truy cập danh sách người dùng quản trị
- Location: tests\FR19.spec.js:74:3

# Error details

```
Error: FR19-TC02 - Regular user không được phép thấy bảng quản trị người dùng (BUG-FR19-001)

expect(locator).not.toBeVisible() failed

Locator:  getByRole('table')
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - FR19-TC02 - Regular user không được phép thấy bảng quản trị người dùng (BUG-FR19-001) getByRole('table') with timeout 5000ms
  - waiting for getByRole('table')
    6 × locator resolved to <table class="w-full bg-white shadow rounded text-left">…</table>
      - unexpected value "visible"

```

```yaml
- table:
  - rowgroup
  - rowgroup
```

# Test source

```ts
  1   | // FR19.spec.js — Automation test cho FR-19: Quản lý người dùng (Admin)
  2   | // Student ID: 23120242
  3   | // Data-driven từ FR19-data.json | 12 test cases | 3 assertion patterns
  4   | // CommonJS format (require) — không dùng ESM import
  5   | 
  6   | const { test, expect, request } = require('@playwright/test');
  7   | const path = require('path');
  8   | const testData = require('./data/FR19-data.json');
  9   | 
  10  | // ─── Helpers ─────────────────────────────────────────────────────────────────
  11  | 
  12  | const API_BASE = 'http://localhost:3000';
  13  | const ADMIN_UI = 'http://localhost:5174';
  14  | const ADMIN_EMAIL = 'admin@eshop.com';
  15  | const ADMIN_PASS = 'Admin123!';
  16  | const REGULAR_EMAIL = 'test@eshop.com';
  17  | const REGULAR_PASS = 'Test1234!';
  18  | 
  19  | /**
  20  |  * Đăng nhập qua API, trả về JWT token.
  21  |  */
  22  | async function loginByApi(apiContext, email, password) {
  23  |   const res = await apiContext.post(`${API_BASE}/api/login`, {
  24  |     data: { email, password },
  25  |   });
  26  |   if (res.ok()) {
  27  |     const body = await res.json();
  28  |     return body.token || null;
  29  |   }
  30  |   return null;
  31  | }
  32  | 
  33  | /**
  34  |  * Tạo tài khoản regular user tạm thời qua API.
  35  |  * Trả về { id, email, token } của user vừa tạo.
  36  |  */
  37  | async function createTempUser(apiContext) {
  38  |   const uid = `${Date.now()}.${Math.floor(Math.random() * 100000)}`;
  39  |   const email = `tempuser.${uid}@test.com`;
  40  |   const name = `TempUser ${uid}`;
  41  |   const password = 'TempPass1!';
  42  | 
  43  |   const res = await apiContext.post(`${API_BASE}/api/register`, {
  44  |     data: { name, email, password },
  45  |   });
  46  | 
  47  |   if (!res.ok()) {
  48  |     throw new Error(`Không tạo được temp user: ${res.status()} ${await res.text()}`);
  49  |   }
  50  | 
  51  |   const body = await res.json();
  52  |   // Đăng nhập để lấy id
  53  |   const loginRes = await apiContext.post(`${API_BASE}/api/login`, {
  54  |     data: { email, password },
  55  |   });
  56  |   const loginBody = await loginRes.json();
  57  |   return { id: loginBody.user?.id, email, token: loginBody.token };
  58  | }
  59  | 
  60  | // ─── Test suite ───────────────────────────────────────────────────────────────
  61  | 
  62  | test.describe('FR-19: Quản lý người dùng (Admin)', () => {
  63  | 
  64  |   // ── TC01: Unauthenticated access ──────────────────────────────────────────
  65  |   test('[FR19-TC01] Truy cập /api/admin/users không có token → 401', async ({ request: apiContext }) => {
  66  |     const tc = testData.find(t => t.id === 'FR19-TC01');
  67  | 
  68  |     // Assertion Pattern 3: HTTP status code
  69  |     const res = await apiContext.get(`${API_BASE}${tc.endpoint}`);
  70  |     expect(res.status(), `${tc.id} - Expected 401 Unauthorized`).toBe(tc.expectedStatus);
  71  |   });
  72  | 
  73  |   // ── TC02: Regular user gọi admin route ───────────────────────────────────
  74  |   test('[FR19-TC02] Regular user dùng JWT không được phép truy cập danh sách người dùng quản trị', async ({ page, request: apiContext }) => {
  75  |     const tc = testData.find(t => t.id === 'FR19-TC02');
  76  | 
  77  |     const regularToken = await loginByApi(apiContext, REGULAR_EMAIL, REGULAR_PASS);
  78  |     expect(regularToken, 'Regular user phải đăng nhập được').not.toBeNull();
  79  | 
  80  |     // Giả lập người dùng thường nạp token vào admin portal và truy cập
  81  |     await page.goto(`${ADMIN_UI}/login`);
  82  |     await page.evaluate((tok) => {
  83  |       localStorage.setItem('adminToken', tok);
  84  |     }, regularToken);
  85  |     await page.goto(`${ADMIN_UI}/`);
  86  |     await page.waitForLoadState('networkidle');
  87  | 
  88  |     // Chuyển sang tab Người dùng
  89  |     const userTab = page.locator('li', { hasText: 'Người dùng' }).first();
  90  |     if (await userTab.isVisible({ timeout: 3000 }).catch(() => false)) {
  91  |       await userTab.click();
  92  |       await page.waitForTimeout(500);
  93  |     }
  94  | 
  95  |     // Assertion Pattern 1 (SRS Rule - Security Boundary):
  96  |     // Regular user token KHÔNG được phép truy cập hoặc hiển thị bảng quản lý người dùng
  97  |     // SUT defect: SUT không kiểm tra vai trò admin ở /api/admin/users, trả về 200 nên bảng danh sách hiển thị đầy đủ
  98  |     await expect(
  99  |       page.getByRole('table'),
  100 |       `${tc.id} - Regular user không được phép thấy bảng quản trị người dùng (BUG-FR19-001)`
> 101 |     ).not.toBeVisible({ timeout: 5000 });
      |           ^ Error: FR19-TC02 - Regular user không được phép thấy bảng quản trị người dùng (BUG-FR19-001)
  102 |   });
  103 | 
  104 |   // ── TC03: Admin xem danh sách users ──────────────────────────────────────
  105 |   test('[FR19-TC03] Admin xem danh sách người dùng → trả về mảng users', async ({ request: apiContext }) => {
  106 |     const tc = testData.find(t => t.id === 'FR19-TC03');
  107 | 
  108 |     const adminToken = await loginByApi(apiContext, ADMIN_EMAIL, ADMIN_PASS);
  109 |     expect(adminToken, 'Admin phải đăng nhập được').not.toBeNull();
  110 | 
  111 |     const res = await apiContext.get(`${API_BASE}${tc.endpoint}`, {
  112 |       headers: { Authorization: `Bearer ${adminToken}` },
  113 |     });
  114 | 
  115 |     // Assertion Pattern 3: HTTP status + body là array
  116 |     expect(res.status()).toBe(tc.expectedStatus);
  117 |     const body = await res.json();
  118 |     expect(Array.isArray(body), `${tc.id} - Response phải là array`).toBeTruthy();
  119 |     expect(body.length, `${tc.id} - Danh sách phải có ít nhất 1 user`).toBeGreaterThan(0);
  120 |   });
  121 | 
  122 |   // ── TC04: Danh sách users có đủ trường ───────────────────────────────────
  123 |   test('[FR19-TC04] Admin xem danh sách có đủ các trường id, name, email, role', async ({ request: apiContext }) => {
  124 |     const tc = testData.find(t => t.id === 'FR19-TC04');
  125 | 
  126 |     const adminToken = await loginByApi(apiContext, ADMIN_EMAIL, ADMIN_PASS);
  127 |     const res = await apiContext.get(`${API_BASE}${tc.endpoint}`, {
  128 |       headers: { Authorization: `Bearer ${adminToken}` },
  129 |     });
  130 | 
  131 |     const users = await res.json();
  132 |     expect(Array.isArray(users)).toBeTruthy();
  133 | 
  134 |     const firstUser = users[0];
  135 |     // Assertion Pattern 3: kiểm tra các field bắt buộc tồn tại
  136 |     for (const field of tc.expectedFields) {
  137 |       expect(firstUser, `${tc.id} - User object phải có trường "${field}"`).toHaveProperty(field);
  138 |     }
  139 |   });
  140 | 
  141 |   // ── TC05: Admin xóa user hợp lệ ──────────────────────────────────────────
  142 |   test('[FR19-TC05] Admin xóa user hợp lệ (không phải admin) → thành công', async ({ request: apiContext }) => {
  143 |     const tc = testData.find(t => t.id === 'FR19-TC05');
  144 | 
  145 |     const adminToken = await loginByApi(apiContext, ADMIN_EMAIL, ADMIN_PASS);
  146 | 
  147 |     // Tạo user tạm để xóa
  148 |     const tempUser = await createTempUser(apiContext);
  149 |     expect(tempUser.id, 'Temp user phải có ID').toBeTruthy();
  150 | 
  151 |     // Assertion Pattern 3: HTTP status 200 sau khi xóa thành công
  152 |     const deleteRes = await apiContext.delete(`${API_BASE}/api/admin/users/${tempUser.id}`, {
  153 |       headers: { Authorization: `Bearer ${adminToken}` },
  154 |     });
  155 |     expect(deleteRes.status(), `${tc.id} - Xóa user thành công phải trả 200`).toBe(tc.expectedStatus);
  156 | 
  157 |     // Xác nhận user đã bị xóa: gọi lại list và không tìm thấy
  158 |     const listRes = await apiContext.get(`${API_BASE}/api/admin/users`, {
  159 |       headers: { Authorization: `Bearer ${adminToken}` },
  160 |     });
  161 |     const users = await listRes.json();
  162 |     const stillExists = users.some(u => u.id === tempUser.id);
  163 |     expect(stillExists, `${tc.id} - User đã xóa không được tồn tại trong list`).toBeFalsy();
  164 |   });
  165 | 
  166 |   // ── TC06: Admin self-deletion (SUT defect) ───────────────────────────────
  167 |   test('[FR19-TC06] Admin UI không được hiển thị nút xóa cho chính tài khoản admin đang đăng nhập (self-deletion)', async ({ page }) => {
  168 |     const tc = testData.find(t => t.id === 'FR19-TC06');
  169 | 
  170 |     // Đăng nhập admin qua UI
  171 |     await page.goto(`${ADMIN_UI}/login`);
  172 |     await page.getByPlaceholder(/email/i).fill(ADMIN_EMAIL);
  173 |     await page.getByPlaceholder(/password|mật khẩu/i).fill(ADMIN_PASS);
  174 |     await page.getByRole('button', { name: /login|đăng nhập/i }).click();
  175 | 
  176 |     await expect(page).toHaveURL(/localhost:5174/);
  177 |     await page.waitForLoadState('networkidle');
  178 | 
  179 |     // Chuyển sang tab Người dùng
  180 |     await page.locator('li', { hasText: 'Người dùng' }).first().click();
  181 |     await page.waitForTimeout(500);
  182 | 
  183 |     // Tìm dòng của tài khoản admin đang đăng nhập
  184 |     const adminRow = page.locator('tbody tr').filter({ hasText: ADMIN_EMAIL });
  185 |     await expect(adminRow, `${tc.id} - Tài khoản admin phải hiển thị trong bảng`).toBeVisible({ timeout: 5000 });
  186 | 
  187 |     // Assertion Pattern 1 (SRS Rule - Self-deletion Protection):
  188 |     // SRS yêu cầu hệ thống không được cho phép admin tự xóa chính mình. Nút xóa trên dòng của admin phải bị ẩn.
  189 |     // SUT defect: SUT vẫn hiển thị nút "Xóa" màu đỏ cạnh tài khoản admin -> phát sinh lỗi
  190 |     await expect(
  191 |       adminRow.getByRole('button', { name: 'Xóa' }),
  192 |       `${tc.id} - Admin không được phép có nút tự xóa tài khoản của chính mình (BUG-FR19-002)`
  193 |     ).not.toBeVisible();
  194 |   });
  195 | 
  196 |   // ── TC07: Xóa user không tồn tại ─────────────────────────────────────────
  197 |   test('[FR19-TC07] Admin xóa user với ID không tồn tại → SUT trả 200 thay vì 404 (defect)', async ({ request: apiContext }) => {
  198 |     const tc = testData.find(t => t.id === 'FR19-TC07');
  199 | 
  200 |     const adminToken = await loginByApi(apiContext, ADMIN_EMAIL, ADMIN_PASS);
  201 | 
```