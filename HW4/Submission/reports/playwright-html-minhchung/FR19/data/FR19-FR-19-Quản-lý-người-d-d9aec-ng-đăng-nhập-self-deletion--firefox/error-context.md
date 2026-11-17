# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR19.spec.js >> FR-19: Quản lý người dùng (Admin) >> [FR19-TC06] Admin UI không được hiển thị nút xóa cho chính tài khoản admin đang đăng nhập (self-deletion)
- Location: tests\FR19.spec.js:167:3

# Error details

```
Error: FR19-TC06 - Admin không được phép có nút tự xóa tài khoản của chính mình (BUG-FR19-002)

expect(locator).not.toBeVisible() failed

Locator:  locator('tbody tr').filter({ hasText: 'admin@eshop.com' }).getByRole('button', { name: 'Xóa' })
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - FR19-TC06 - Admin không được phép có nút tự xóa tài khoản của chính mình (BUG-FR19-002) locator('tbody tr').filter({ hasText: 'admin@eshop.com' }).getByRole('button', { name: 'Xóa' }) with timeout 5000ms
  - waiting for locator('tbody tr').filter({ hasText: 'admin@eshop.com' }).getByRole('button', { name: 'Xóa' })
    13 × locator resolved to <button class="bg-red-500 text-white px-3 py-1 rounded">Xóa</button>
       - unexpected value "visible"

```

```yaml
- button "Xóa"
```

# Test source

```ts
  93  |     }
  94  | 
  95  |     // Assertion Pattern 1 (SRS Rule - Security Boundary):
  96  |     // Regular user token KHÔNG được phép truy cập hoặc hiển thị bảng quản lý người dùng
  97  |     // SUT defect: SUT không kiểm tra vai trò admin ở /api/admin/users, trả về 200 nên bảng danh sách hiển thị đầy đủ
  98  |     await expect(
  99  |       page.getByRole('table'),
  100 |       `${tc.id} - Regular user không được phép thấy bảng quản trị người dùng (BUG-FR19-001)`
  101 |     ).not.toBeVisible({ timeout: 5000 });
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
> 193 |     ).not.toBeVisible();
      |           ^ Error: FR19-TC06 - Admin không được phép có nút tự xóa tài khoản của chính mình (BUG-FR19-002)
  194 |   });
  195 | 
  196 |   // ── TC07: Xóa user không tồn tại ─────────────────────────────────────────
  197 |   test('[FR19-TC07] Admin xóa user với ID không tồn tại → SUT trả 200 thay vì 404 (defect)', async ({ request: apiContext }) => {
  198 |     const tc = testData.find(t => t.id === 'FR19-TC07');
  199 | 
  200 |     const adminToken = await loginByApi(apiContext, ADMIN_EMAIL, ADMIN_PASS);
  201 | 
  202 |     // Assertion Pattern 3: HTTP status (SUT defect — trả 200 thay vì 404)
  203 |     const res = await apiContext.delete(`${API_BASE}/api/admin/users/999999`, {
  204 |       headers: { Authorization: `Bearer ${adminToken}` },
  205 |     });
  206 | 
  207 |     const actualStatus = res.status();
  208 |     console.log(`[TC07] Actual status for non-existent ID: ${actualStatus} (expected by SRS: ${tc.expectedStatus})`);
  209 | 
  210 |     // SUT defect: DELETE không kiểm tra affected rows, luôn trả 200
  211 |     // Test này assert hành vi THỰC TẾ của SUT (200) để document defect
  212 |     expect(actualStatus, `${tc.id} - SUT trả ${actualStatus} thay vì 404 (false success — defect)`).toBe(tc.actualSutStatus);
  213 |     console.log(`[DEFECT] ${tc.defectNote}`);
  214 |   });
  215 | 
  216 |   // ── TC08: Xóa với ID không hợp lệ (SUT defect) ───────────────────────────
  217 |   test('[FR19-TC08] Admin xóa user với ID không hợp lệ (chuỗi chữ) → SUT trả 200 thay vì 400 (defect)', async ({ request: apiContext }) => {
  218 |     const tc = testData.find(t => t.id === 'FR19-TC08');
  219 | 
  220 |     const adminToken = await loginByApi(apiContext, ADMIN_EMAIL, ADMIN_PASS);
  221 | 
  222 |     const res = await apiContext.delete(`${API_BASE}/api/admin/users/invalid-id-abc`, {
  223 |       headers: { Authorization: `Bearer ${adminToken}` },
  224 |     });
  225 | 
  226 |     const actualStatus = res.status();
  227 |     console.log(`[TC08] Actual status for invalid ID: ${actualStatus} (expected by SRS: 400, SUT actual: ${tc.actualSutStatus})`);
  228 | 
  229 |     // Assertion Pattern 3: document SUT defect (SUT trả 200, không phải 400)
  230 |     // Test này kỳ vọng SUT FAIL (trả 200 thay vì 400)
  231 |     expect(actualStatus, `${tc.id} - SUT trả ${actualStatus} thay vì 400 — false success với ID không hợp lệ`).toBe(tc.actualSutStatus);
  232 |     console.log(`[DEFECT] ${tc.defectNote}`);
  233 |   });
  234 | 
  235 |   // ── TC09: Role escalation via PUT /api/users/me (SUT defect) ─────────────
  236 |   test('[FR19-TC09] Regular user tự đổi role=admin qua PUT /api/users/me phải bị từ chối truy cập Admin Portal', async ({ page, request: apiContext }) => {
  237 |     const tc = testData.find(t => t.id === 'FR19-TC09');
  238 | 
  239 |     // Tạo regular user tạm
  240 |     const tempUser = await createTempUser(apiContext);
  241 |     expect(tempUser.token, 'Temp user phải có token').toBeTruthy();
  242 | 
  243 |     // Thử gửi PUT /api/users/me kèm role: 'admin'
  244 |     await apiContext.put(`${API_BASE}/api/users/me`, {
  245 |       headers: { Authorization: `Bearer ${tempUser.token}` },
  246 |       data: { name: 'EscalatedUser', role: 'admin' },
  247 |     });
  248 | 
  249 |     // Thử đăng nhập vào Admin UI (http://localhost:5174/login) với tài khoản vừa gửi role=admin
  250 |     await page.goto(`${ADMIN_UI}/login`);
  251 |     await page.getByPlaceholder(/email/i).fill(tempUser.email);
  252 |     await page.getByPlaceholder(/password|mật khẩu/i).fill('TempPass1!');
  253 |     await page.getByRole('button', { name: /login|đăng nhập/i }).click();
  254 |     await page.waitForTimeout(1000);
  255 | 
  256 |     // Assertion Pattern 1 (SRS Rule - Privilege Escalation Prevention):
  257 |     // Người dùng thông thường KHÔNG được phép đăng nhập thành công vào Admin Portal sau khi tự gửi role=admin.
  258 |     // SUT defect: SUT chấp nhận role escalation nên user đăng nhập thành công và nhìn thấy giao diện Admin (listitem Người dùng)
  259 |     await expect(
  260 |       page.locator('li', { hasText: 'Người dùng' }).first(),
  261 |       `${tc.id} - Regular user không được phép đăng nhập vào trang quản trị sau khi tự đổi role (BUG-FR19-003)`
  262 |     ).not.toBeVisible({ timeout: 5000 });
  263 | 
  264 |     // Cleanup: xóa user tạm
  265 |     const adminToken = await loginByApi(apiContext, ADMIN_EMAIL, ADMIN_PASS);
  266 |     if (tempUser.id && adminToken) {
  267 |       await apiContext.delete(`${API_BASE}/api/admin/users/${tempUser.id}`, {
  268 |         headers: { Authorization: `Bearer ${adminToken}` },
  269 |       });
  270 |     }
  271 |   });
  272 | 
  273 |   // ── TC10: PUT /api/users/me không có token ────────────────────────────────
  274 |   test('[FR19-TC10] PUT /api/users/me không có token → trả về 401', async ({ request: apiContext }) => {
  275 |     const tc = testData.find(t => t.id === 'FR19-TC10');
  276 | 
  277 |     // Assertion Pattern 3: HTTP status 401
  278 |     const res = await apiContext.put(`${API_BASE}/api/users/me`, {
  279 |       data: tc.body,
  280 |     });
  281 |     expect(res.status(), `${tc.id} - Không có token phải trả 401`).toBe(tc.expectedStatus);
  282 |   });
  283 | 
  284 |   // ── TC11: Admin UI hiển thị trang Quản lý người dùng ─────────────────────
  285 |   test('[FR19-TC11] Admin UI: Trang quản lý user hiển thị danh sách với các cột cần thiết', async ({ page, request: apiContext }) => {
  286 |     const tc = testData.find(t => t.id === 'FR19-TC11');
  287 | 
  288 |     // Đăng nhập admin qua UI
  289 |     await page.goto(`${ADMIN_UI}/login`);
  290 | 
  291 |     // Assertion Pattern 1: Visibility — form đăng nhập hiển thị
  292 |     await expect(page.getByRole('textbox').first(), `${tc.id} - Form login phải hiển thị`).toBeVisible();
  293 | 
```