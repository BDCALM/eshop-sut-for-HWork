# FR-05 Bug Reports - Product Search

## Test execution summary

- Feature: FR-05 - Product listing and search
- Test suite: `HW4/tests/FR05.spec.js`
- Browsers: Chromium, Firefox, WebKit
- Result: 21 passed, 15 failed
- Failure distribution: the same three SUT defects reproduced across the three browsers
- Test date: 2026-11-17
- Student ID: 23120242

The 15 failed browser runs are reported as three distinct defects, not 15 separate bugs. The failures were reproduced with Playwright and supported by screenshots, videos, and error contexts under `HW4/Submission/reports/playwright-html-minhchung/FR05/data/`, organized by test case and browser.

---

## BUG-FR05-001 - Missing empty state for zero search results

**GitHub Issue:** [#21 - [FR-05] Missing empty state when product search returns zero results](https://github.com/BDCALM/eshop-sut-for-HWork/issues/21)

### Summary

The product search page does not display the required empty-state message when a valid search returns no products.

### Environment

- Backend: `http://localhost:3000`
- Web frontend: `http://localhost:5173`
- Browsers reproduced: Chromium, Firefox, WebKit

### Preconditions

1. Backend and frontend web are running locally.
2. Open `http://localhost:5173/`.

### Steps to reproduce

1. Enter `san pham khong ton tai` in `Tìm kiếm...`.
2. Click `Tìm`.
3. Repeat with a whitespace-only query and a long query with no matching product.

### Test cases

- `FR05-TC06`: `san pham khong ton tai`
- `FR05-TC07`: whitespace-only query
- `FR05-TC11`: long non-matching query

### Expected result

The page displays a clear empty-state message such as `Không tìm thấy sản phẩm`, with no product cards.

### Actual result

The page displays the search summary but no empty-state message. The accessibility snapshot contains the search controls and `Kết quả tìm kiếm cho: san pham khong ton tai`, but no `Không tìm thấy sản phẩm` text.

### Impact

Users cannot clearly distinguish a completed search with zero results from a broken or still-loading page.

### Severity / Priority

- Severity: Medium
- Priority: Medium

### Evidence

- Chromium evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR05/data/FR05-FR05-TC06-Hiển-thị-empty-state-khi-không-có-kết-quả-chromium/`
- Files: `error-context.md`, `test-failed-1.png`, and `video.webm`
- Firefox and WebKit produced the same failure for TC06, TC07 and TC11.

### Suspected implementation area

`frontend-web/src/pages/Home.jsx` renders the product grid but has no branch for `products.length === 0` when the request succeeds.

---

## BUG-FR05-002 - Search query is rendered as HTML instead of escaped text

**GitHub Issue:** [#22 - [FR-05] Search query is rendered as HTML instead of escaped text](https://github.com/BDCALM/eshop-sut-for-HWork/issues/22)

### Summary

The search query is inserted into the page with `dangerouslySetInnerHTML`, so an HTML/script payload is not displayed as literal text.

### Environment

- Backend: `http://localhost:3000`
- Web frontend: `http://localhost:5173`
- Browsers reproduced: Chromium, Firefox, WebKit

### Preconditions

1. Backend and frontend web are running locally.
2. Open `http://localhost:5173/`.

### Steps to reproduce

1. Enter `<script>alert(1)</script>` in `Tìm kiếm...`.
2. Click `Tìm`.
3. Inspect the search summary and the rendered DOM.

### Test case

- `FR05-TC10`: HTML/script query

### Expected result

The complete query is shown as escaped text:

```text
Kết quả tìm kiếm cho: <script>alert(1)</script>
```

No new `script` element should be created and no script should execute. This is required by the SRS/SEC-04 rule that user input must be escaped and must not be rendered with raw `innerHTML`.

### Actual result

The body text contains only `Kết quả tìm kiếm cho:`. The `<script>` element is interpreted as markup rather than displayed as text, so the query is not visible as entered. This execution confirms unsafe HTML rendering; the screenshot does not by itself prove JavaScript execution.

### Impact

User input is inserted into the DOM through an unsafe rendering path. Depending on browser and payload, this can create an XSS risk and causes the UI to lose the entered query.

### Severity / Priority

- Severity: High (security-sensitive rendering path; confirm exploitability separately)
- Priority: High

### Evidence

- Chromium evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR05/data/FR05-FR05-TC10-Hiển-thị-an-toàn-từ-khóa-có-thẻ-HTML-chromium/`
- Files: `error-context.md`, `test-failed-1.png`, and `video.webm`
- Firefox and WebKit produced the same failure.

### Suspected implementation area

`frontend-web/src/pages/Home.jsx` uses `dangerouslySetInnerHTML={{ __html: search }}` for the query summary. Render `{search}` as normal React text instead.

---

## BUG-FR05-003 - SQL wildcard is not treated as a literal search character

**GitHub Issue:** [#23 - [FR-05] Percent wildcard returns all products instead of literal search](https://github.com/BDCALM/eshop-sut-for-HWork/issues/23)

### Summary

A search query containing `%` is passed into a SQL `LIKE` expression without escaping wildcard characters, so `%` matches every product instead of being treated as a literal user search character.

### Environment

- Backend: `http://localhost:3000`
- Web frontend: `http://localhost:5173`
- Browsers reproduced: Chromium, Firefox, WebKit

### Preconditions

1. Backend and frontend web are running locally.
2. Open `http://localhost:5173/`.

### Steps to reproduce

1. Enter `%` in `Tìm kiếm...`.
2. Click `Tìm`.
3. Observe the product cards and result count.

### Test case

- `FR05-TC12`: `%`

### Expected result

The `%` character is treated as ordinary input. Since no seeded product contains `%`, the page displays the empty state and zero product cards.

### Actual result

The page displays all five seeded products and `Hiển thị 5 sản phẩm`.

### Impact

Search results do not represent the user's literal query. The same implementation pattern also creates a SQL injection risk because the query string is interpolated directly into SQL.

### Severity / Priority

- Severity: High (data-access/security-sensitive query construction)
- Priority: High

### Evidence

- Chromium evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR05/data/FR05-FR05-TC12-Xử-lý-ký-tự-39676-hư-một-từ-khóa-thông-thường-chromium/`
- Files: `error-context.md`, `test-failed-1.png`, and `video.webm`
- Firefox and WebKit produced the same failure.

### Suspected implementation area

`backend/server.js` builds `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`. Use a parameterized query and escape `LIKE` wildcard characters when literal matching is required.

---

## BUG-FR11-001 - User can cancel order while in shipping state via Profile UI

**GitHub Issue:** [BUG-FR11-001 - GitHub issue URL to be filled after creation](https://github.com/BDCALM/eshop-sut-for-HWork/issues/25)

### Summary

The user profile order history view displays an active "Hủy đơn" (Cancel Order) button for orders that are currently in the `shipping` ("Đang giao") state, allowing standard users to cancel orders during transit in direct violation of the System Requirements Specification.

### Environment

- Backend: `http://localhost:3000`
- Web frontend: `http://localhost:5173`
- Browsers reproduced: Chromium, Firefox, WebKit
- Test date: 2026-11-18
- Student ID: 23120242

### Preconditions

1. Backend API and Web frontend are running locally.
2. User is registered, authenticated, and has placed an order.
3. Order status has been transitioned to `shipping` ("Đang giao") by Admin.
4. User navigates to `http://localhost:5173/profile`.

### Steps to reproduce

1. Log in with a standard customer account.
2. Navigate to `/profile` (or click user greeting).
3. Locate the order having status badge `Đang giao`.
4. Observe the `Thao tác` column.
5. Click the `Hủy đơn` button.

### Test cases

- `FR11-TC09`: `Dịch trạng thái shipping sang tiếng Việt và không hiển thị nút hủy đơn cho đơn đang giao`

### Expected result

According to `README.md` (FR-10 & FR-11):
*"Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác."*
The user interface must NOT display the `Hủy đơn` button for orders in the `shipping` state (or must disable it with an informative tooltip).

### Actual result

The order row displays an active red button `<button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hủy đơn</button>`. The user can click it to send a cancel request.

### Impact

- Violates core business rules and state machine integrity.
- Customers can cancel orders that are already handed over to delivery partners, resulting in lost inventory, return shipping fees, and logistics chaos.

### Severity / Priority

- Severity: High (Business logic violation / financial & logistic risk)
- Priority: High

### Evidence

- Chromium evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR11/data/FR11-FR11-TC09-Dịch-trạng--ea031-t-hủy-đơn-cho-đơn-đang-giao-chromium/`
- Files: `error-context.md`, `test-failed-1.png`, and `video.webm`
- Firefox evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR11/data/FR11-FR11-TC09-Dịch-trạng--ea031-t-hủy-đơn-cho-đơn-đang-giao-firefox/`
- WebKit evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR11/data/FR11-FR11-TC09-Dịch-trạng--ea031-t-hủy-đơn-cho-đơn-đang-giao-webkit/`

### Suspected implementation area

1. **Frontend (`frontend-web/src/pages/Profile.jsx` lines 200-208):**
   Condition `{o.status !== "delivered" && o.status !== "canceled" && ( <button onClick={() => cancelOrder(o.id)}>Hủy đơn</button> )}` erroneously permits cancellation for `shipping`.
   Fix: Condition should be `{o.status === "pending" || o.status === "confirmed"}`.
2. **Backend (`backend/server.js` lines 356-359):**
   `if (order.status === "delivered" || order.status === "canceled")` fails to reject cancellations when `order.status === "shipping"`.

---

## Notes for GitHub issue screenshots

The evidence folders above are preserved for traceability. After each issue is created, upload the corresponding `test-failed-1.png` to that GitHub Issue by drag-and-drop or GitHub's image attachment flow, then replace the issue URL placeholders above with the actual URLs.

---

# FR-19 Bug Reports - User Management (Admin)

## Test execution summary

- Feature: FR-19 - Quản lý người dùng (Admin)
- Test suite: `HW4/tests/FR19.spec.js`
- Browsers: Chromium, Firefox, WebKit
- Result: **27 passed, 9 failed**
- Failure distribution: 3 SUT defects reproduced consistently across all 3 browsers (Chromium, Firefox, WebKit).
- Multi-browser evidence: Full failure recordings (error-context.md, test-failed-1.png, video.webm) preserved under `HW4/Submission/reports/playwright-html-minhchung/FR19/data/`
- Test date: 2026-11-18
- Student ID: 23120242

---

## BUG-FR19-001 - Admin route /api/admin/users does not enforce admin role

**GitHub Issue:** [REPLACE-BUG-FR19-001]

### Summary

`GET /api/admin/users` and `DELETE /api/admin/users/:id` only verify a valid JWT exists via `authenticateToken` middleware but do not check that the authenticated user holds the `admin` role. Any authenticated regular user can retrieve the full user list and delete any account.

### Environment

- Backend: `http://localhost:3000`
- Admin UI: `http://localhost:5174`
- Browsers reproduced: Chromium, Firefox, WebKit
- Test date: 2026-11-18
- Student ID: 23120242

### Preconditions

1. Backend is running locally.
2. A regular user account exists (`test@eshop.com` / `Test1234!`).

### Steps to reproduce

1. `POST /api/login` with regular user credentials → capture JWT token.
2. `GET /api/admin/users` with `Authorization: Bearer <token>` → observe HTTP 200 and full user list.
3. In browser, inject token via `localStorage.setItem('adminToken', token)` at `http://localhost:5174/` → navigate to tab "Người dùng" → observe full user management table rendered with sensitive customer data.

### Test cases

- `FR19-TC02`: Regular user dùng JWT không được phép truy cập danh sách người dùng quản trị

### Expected result

HTTP 403 Forbidden — route must verify `req.user.role === 'admin'` before returning data. In UI, table must not be visible.

### Actual result

HTTP 200 with the complete user list including emails, roles, login attempts, and shipping addresses of all users. Table rendered completely in UI.

### Evidence

- Chromium evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR19/data/FR19-FR-19-Quản-lý-người-d-3cd77-nh-sách-người-dùng-quản-trị-chromium/`
- Firefox evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR19/data/FR19-FR-19-Quản-lý-người-d-3cd77-nh-sách-người-dùng-quản-trị-firefox/`
- WebKit evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR19/data/FR19-FR-19-Quản-lý-người-d-3cd77-nh-sách-người-dùng-quản-trị-webkit/`
- Files: `error-context.md`, `test-failed-1.png`, and `video.webm`

### Impact

- **Critical** privilege escalation: any authenticated user gains admin read access to all user data.
- Enables unauthorized data exfiltration and mass account deletion by regular users.

### Severity / Priority

- Severity: Critical
- Priority: Critical

### Suspected implementation area

`backend/server.js` line 522: `app.get("/api/admin/users", authenticateToken, ...)` — missing role guard.
Fix: Add middleware `(req, res, next) => { if (req.user.role !== 'admin') return res.status(403).json({error:'Forbidden'}); next(); }` after `authenticateToken`.

---

## BUG-FR19-002 - DELETE /api/admin/users/:id always returns HTTP 200 regardless of ID validity & Admin self-deletion allowed

**GitHub Issue:** [REPLACE-BUG-FR19-002]

### Summary

The endpoint `DELETE /api/admin/users/:id` returns HTTP 200 `{"message":"User deleted"}` for any input: non-existent numeric IDs, non-numeric string IDs, and self-deletion. In the Admin UI, the user table actively renders a red "Xóa" button on the logged-in admin's own row, allowing self-deletion.

### Environment

- Backend: `http://localhost:3000`
- Admin UI: `http://localhost:5174`
- Browsers reproduced: Chromium, Firefox, WebKit
- Test date: 2026-11-18
- Student ID: 23120242

### Preconditions

1. Backend is running locally.
2. Admin JWT token available.
3. Admin logged into `http://localhost:5174`.

### Steps to reproduce

**Case A — Self-deletion on Admin UI:**
1. Log into admin UI at `http://localhost:5174/login` with `admin@eshop.com`.
2. Click "Người dùng" in the sidebar navigation.
3. Locate the row for `admin@eshop.com`.
4. Observe the red button `<button class="bg-red-500 ...">Xóa</button>` is active on the admin's own row.

**Case B — Non-existent ID:**
1. `DELETE /api/admin/users/999999` with admin token → observe HTTP 200.

**Case C — Invalid (non-numeric) ID:**
1. `DELETE /api/admin/users/invalid-id-abc` with admin token → observe HTTP 200.

### Test cases

- `FR19-TC06`: Admin UI không được hiển thị nút xóa cho chính tài khoản admin đang đăng nhập (self-deletion)
- `FR19-TC07`: Admin xóa user với ID không tồn tại → SUT trả 200 (kỳ vọng 404)
- `FR19-TC08`: Admin xóa user với ID không hợp lệ (chuỗi chữ) → SUT trả 200 thay vì 400

### Expected result

- Self-deletion → UI must hide the "Xóa" button for the logged-in admin; API must return HTTP 403 `{"error":"Cannot delete your own account"}`
- Non-existent ID → HTTP 404 `{"error":"User not found"}`
- Invalid ID format → HTTP 400 `{"error":"Invalid ID"}`

### Actual result

UI displays active "Xóa" button for the admin account. All three API cases return HTTP 200 `{"message":"User deleted"}`.

### Evidence

- Chromium evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR19/data/FR19-FR-19-Quản-lý-người-d-d9aec-ng-đăng-nhập-self-deletion--chromium/`
- Firefox evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR19/data/FR19-FR-19-Quản-lý-người-d-d9aec-ng-đăng-nhập-self-deletion--firefox/`
- WebKit evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR19/data/FR19-FR-19-Quản-lý-người-d-d9aec-ng-đăng-nhập-self-deletion--webkit/`
- Files: `error-context.md`, `test-failed-1.png`, and `video.webm`

### Impact

- False positive responses mislead API clients.
- Self-deletion locks administrators out of the system.
- Clients cannot distinguish successful vs. failed deletes.

### Severity / Priority

- Severity: High
- Priority: High

### Suspected implementation area

1. **Frontend (`frontend-admin/src/App.jsx`):**
   The user table renders `<button onClick={() => deleteUser(u.id)} ...>Xóa</button>` unconditionally for all rows, lacking `{u.email !== loggedInUserEmail && ...}`.
2. **Backend (`backend/server.js` line 532-536):**
   `db.run("DELETE FROM users WHERE id = ?", ...)` never checks `this.changes === 0` or validates `req.params.id == req.user.id`.

---

## BUG-FR19-003 - PUT /api/users/me accepts client-supplied role field (privilege escalation)

**GitHub Issue:** [REPLACE-BUG-FR19-003]

> **Architectural & Scope Note:** While `PUT /api/users/me` functionally belongs to **FR-04 (User Profile)** and security requirement **SEC-06 (Role-Based Access Control)**, this defect is analyzed and reported under FR-19 as a chained privilege escalation vulnerability (precondition attack vector) allowing standard users to breach the Admin Portal security perimeter.

### Summary

The `PUT /api/users/me` endpoint reads a `role` field from the request body and writes it directly to the database. Any authenticated user can escalate their own role to `admin` without any authorization check, allowing them to log into the Admin Portal.

### Environment

- Backend: `http://localhost:3000`
- Admin UI: `http://localhost:5174`
- Browsers reproduced: Chromium, Firefox, WebKit
- Test date: 2026-11-18
- Student ID: 23120242

### Preconditions

1. Backend is running locally.
2. Regular user account exists and is authenticated.

### Steps to reproduce

1. `POST /api/login` with regular user credentials → capture JWT.
2. `PUT /api/users/me` with body `{"name":"Hacker","role":"admin"}` and `Authorization: Bearer <token>`.
3. Open `http://localhost:5174/login` and log in with the regular user's email and password.
4. Observe successful entry into Admin Dashboard and full access to admin functions.

### Test cases

- `FR19-TC09`: Regular user tự đổi role=admin qua PUT /api/users/me phải bị từ chối truy cập Admin Portal

### Expected result

HTTP 200 but `role` field must be ignored. Login attempt on Admin Portal should be rejected with "Bạn không phải là admin!".

### Actual result

HTTP 200, role is updated to `admin` in database, and the regular user successfully logs into the Admin Portal.

### Evidence

- Chromium evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR19/data/FR19-FR-19-Quản-lý-người-d-21b44--chối-truy-cập-Admin-Portal-chromium/`
- Firefox evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR19/data/FR19-FR-19-Quản-lý-người-d-21b44--chối-truy-cập-Admin-Portal-firefox/`
- WebKit evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR19/data/FR19-FR-19-Quản-lý-người-d-21b44--chối-truy-cập-Admin-Portal-webkit/`
- Files: `error-context.md`, `test-failed-1.png`, and `video.webm`

### Impact

- **Critical** privilege escalation: any authenticated user can grant themselves admin access.
- Combining with BUG-FR19-001, an escalated user can delete other accounts or view sensitive data.

### Severity / Priority

- Severity: Critical
- Priority: Critical

### Suspected implementation area

`backend/server.js` lines 146-163: `const { name, shipping_address, phone, role } = req.body;` followed by `if (role) { query += ", role = ?"; params.push(role); }`.
Fix: Remove the `role` extraction from `req.body` entirely in this route.