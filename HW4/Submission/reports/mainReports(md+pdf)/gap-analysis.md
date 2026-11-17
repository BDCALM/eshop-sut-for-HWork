# Gap Analysis Report - FR-05 Product Search

## 1. Purpose and scope

This report compares the expected behavior defined in the EShop requirements with the behavior observed during Playwright automation of FR-05, Product Listing and Search.

The analysis covers 12 data-driven test cases executed on Chromium, Firefox, and WebKit. The run produced 36 browser-specific test executions: 21 passed and 15 failed. The repeated failures were grouped by root behavior rather than reported as separate defects for each browser.

Evidence is stored in:

- HTML report and execution evidence: `HW4/Submission/reports/playwright-html-minhchung/FR05/`
- Test data: `HW4/tests/data/FR05-data.json`
- Automation script: `HW4/tests/FR05.spec.js`
- Detailed bug reports: `HW4/Submission/reports/bug-report.md`

## 2. Expected behavior

According to the EShop requirements, FR-05 must:

1. Search products by name and return matching products.
2. Display a clear empty state when no product matches the query.
3. Display user-entered search text safely, without rendering it as HTML.
4. Treat user input as search data rather than executable SQL syntax.

The test data intentionally includes positive, negative, boundary, Unicode, HTML, and wildcard inputs so that the search behavior is evaluated beyond the normal successful path.

## 3. Observed gaps

### Gap 1 - Missing empty-state feedback

**Affected test cases:** `FR05-TC06`, `FR05-TC07`, `FR05-TC11`

For queries that return no products, the page displays the search summary but does not display the required empty-state message `Không tìm thấy sản phẩm`. No product cards are shown, but the interface does not communicate that the search completed successfully with zero results.

**Expected:** A clear empty-state message and zero product cards.

**Observed:** Search summary only; the expected empty-state text is absent.

**Impact:** Users may interpret the blank result area as a loading problem or a broken page. This is a usability and feedback-state gap.

**Related defect:** `BUG-FR05-001` in [bug-report.md](../bug-report.md).

### Gap 2 - Search text is not safely rendered

**Affected test case:** `FR05-TC10`

The input `<script>alert(1)</script>` is expected to appear as escaped text. Instead, the visible result contains only `Kết quả tìm kiếm cho:` and omits the query. The frontend renders the query through `dangerouslySetInnerHTML`, allowing the browser to interpret the input as markup rather than ordinary text.

**Expected:** The complete query is visible as text, with no generated `script` element and no script execution.

**Observed:** The query is not present in the visible body text. The failure confirms unsafe rendering behavior; this test alone does not claim that a JavaScript alert was successfully executed.

**Impact:** The behavior violates the safe-rendering requirement and creates a security-sensitive XSS risk. It also causes the user-entered search term to disappear from the result summary.

**Related defect:** `BUG-FR05-002` in [bug-report.md](../bug-report.md).

### Gap 3 - SQL wildcard changes the meaning of the search

**Affected test case:** `FR05-TC12`

The `%` character is expected to be treated as ordinary user input. Because the backend inserts the query directly into a SQL `LIKE` expression, `%` acts as a wildcard and matches every product.

**Expected:** No seeded product contains a literal `%`, so the page should display the empty state and zero product cards.

**Observed:** All five seeded products are returned and displayed.

**Impact:** Search results do not correspond to the user's literal query. Direct SQL interpolation also creates a security-sensitive query-construction risk.

**Related defect:** `BUG-FR05-003` in [bug-report.md](../bug-report.md).

## 4. Human review of the AI-generated automation

The AI-generated test intention for `FR05-TC10` was retained because it correctly represented the system requirement: user input must be displayed safely. The expected result was not changed merely to make the test pass. During review, the assertion was strengthened conceptually to distinguish escaped text from HTML interpretation.

The initial failure grouping also required correction. `FR05-TC12` was first associated with the missing empty-state behavior because it expected the same empty-state message. Inspection of the accessibility snapshot and the backend implementation showed a different cause: `%` returned all products because it was interpreted as a SQL `LIKE` wildcard. It was therefore reported as a separate defect.

The failures were also checked across all three browser projects. Since the same behaviors were reproduced consistently, the failures were classified as SUT gaps rather than locator or cross-browser timing issues.

## 5. Conclusion

The FR-05 automation identifies three distinct gaps between the requirements and the current SUT: incomplete empty-state feedback, unsafe rendering of user-controlled search text, and incorrect handling of SQL wildcard input. The test suite therefore provides useful evidence for both functional and security-oriented review. The automation script and expected results remain requirement-driven; the observed SUT behavior is documented separately in the bug report instead of being used to weaken the assertions.

Further FR11 and FR19 analyses should use the template in [gap-analysis-template.md](gap-analysis-template.md) and preserve the same distinction between repeated browser failures and distinct underlying defects.


# Gap Analysis Report - FR-11 Personal Order History

## 1. Purpose and scope

This report analyzes the gaps between the expected behavior defined in the EShop System Requirements Specification (SRS) and the actual implementation observed during Playwright automation testing of feature FR-11 (Xem lịch sử đơn hàng cá nhân) and its associated order state constraints (FR-10).

- **Feature:** FR-11 - Xem lịch sử đơn hàng cá nhân (Order history view) & FR-10 - Trạng thái đơn hàng (Order State Machine)
- **Requirement source:** `README.md` (Section 5 - Quản lý Đơn hàng, FR-10 & FR-11)
- **Test suite:** `HW4/tests/FR11.spec.js`
- **Test data:** `HW4/tests/data/FR11-data.json`
- **Browsers:** Chromium, Firefox, WebKit
- **Execution date:** 2026-11-18
- **Result:** 33 passed, 3 failed out of 36 test executions (12 test cases x 3 browsers: `FR11-TC09` failed consistently across Chromium, Firefox, and WebKit).

Evidence locations:

- HTML report: `HW4/Submission/reports/playwright-html-minhchung/FR11/index.html` (with injected metadata `Run by: 23120242` and ISO timestamp)
- Failure evidence folders: `HW4/Submission/reports/playwright-html-minhchung/FR11/data/`
  - `FR11-FR11-TC09-Dịch-trạng--ea031-t-hủy-đơn-cho-đơn-đang-giao-chromium/` (`error-context.md`, `test-failed-1.png`, `video.webm`)
  - `FR11-FR11-TC09-Dịch-trạng--ea031-t-hủy-đơn-cho-đơn-đang-giao-firefox/` (`error-context.md`, `test-failed-1.png`, `video.webm`)
  - `FR11-FR11-TC09-Dịch-trạng--ea031-t-hủy-đơn-cho-đơn-đang-giao-webkit/` (`error-context.md`, `test-failed-1.png`, `video.webm`)
- Detailed bug report: `HW4/Submission/reports/bug-report.md` (`BUG-FR11-001`)

## 2. Expected behavior

According to the EShop SRS (`README.md`, Section 5), FR-11 and FR-10 require:

1. **Authentication barrier:** Unauthenticated visitors navigating to `/profile` must see a clear login prompt (`Vui lòng đăng nhập`) rather than accessing personal order history.
2. **Order ownership isolation:** Users must only be able to view their own orders via `/api/orders/my-orders`. Orders from other users must never be returned or displayed.
3. **Empty state:** When a user account has no orders, the page must display a clear empty state message (`Bạn chưa có đơn hàng nào.`).
4. **Order fields displayed:** The order table must display: Order Code (`Mã ĐH`), Order Date (`Ngày đặt`), Total Amount (`Tổng tiền`), and Current Status (`Trạng thái`).
5. **Vietnamese localization:** All order status codes must be translated accurately to Vietnamese with distinct visual color badges:
   - `pending` -> "Chờ xác nhận" (yellow)
   - `confirmed` -> "Đã xác nhận" (indigo)
   - `shipping` -> "Đang giao" (blue)
   - `delivered` -> "Đã giao" (green)
   - `canceled` -> "Đã hủy" (red)
6. **Cancellation restrictions in shipping state (FR-10 & FR-11):**
   - *"Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác."*
   - Therefore, for orders in the `shipping` ("Đang giao") state, the user interface must NOT display an active "Hủy đơn" (Cancel Order) button for standard users.

## 3. Observed gaps

### Gap 1 - User can cancel orders in "shipping" state (Active Cancel button displayed)

**Affected test case:** `FR11-TC09` (reproduced identically on Chromium, Firefox, and WebKit)

**Expected:**
In the order history table, when an order is in the `shipping` status (rendered as `"Đang giao"`), the user interface must NOT display the `"Hủy đơn"` action button (`expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible()`).

**Observed:**
The order row with status `"Đang giao"` displays an active red button `<button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hủy đơn</button>`. The test waited for `not.toBeVisible()`, but the button remained visible until the assertion timed out (5000ms), failing on all 3 browsers.

Code investigation confirms this is an intentional defect in the SUT:
- **Frontend (`frontend-web/src/pages/Profile.jsx` lines 200-208):**
  ```jsx
  {/* Nút hủy hiển thị khi chưa giao xong và chưa hủy (kể cả khi đang giao) */}
  {o.status !== "delivered" && o.status !== "canceled" && (
    <button
      onClick={() => cancelOrder(o.id)}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
    >
      Hủy đơn
    </button>
  )}
  ```
- **Backend (`backend/server.js` lines 356-359):**
  ```javascript
  // Lẽ ra phải là: if (order.status !== 'pending' && order.status !== 'confirmed')
  if (order.status === "delivered" || order.status === "canceled") {
    return res.status(400).json({ error: "Cannot cancel this order." });
  }
  ```
  The backend also allows cancellation of `shipping` orders, only blocking `delivered` and `canceled`.

**Impact:**
- Violates core business rules of the Order State Machine.
- In a real e-commerce scenario, allowing customers to unilaterally cancel orders that are already handed over to the courier (`shipping`) leads to inventory discrepancies, financial loss, and severe logistical conflicts.

**Severity / Priority:** High / High

**Evidence:**
- Chromium evidence folder: `HW4/Submission/reports/playwright-html-minhchung/FR11/data/FR11-FR11-TC09-Dịch-trạng--ea031-t-hủy-đơn-cho-đơn-đang-giao-chromium/`
- Files: `error-context.md`, `test-failed-1.png`, and `video.webm`
- Firefox and WebKit folders contain matching failure recordings.
- Related defect: `BUG-FR11-001` in [bug-report.md](../bug-report.md).

## 4. Human review of the AI-generated automation

### 4.1. Deficiencies in the initial AI-generated script
When initially generating the Playwright automation script for FR-11:
1. **AI wrote script without sufficient assertions:** The AI-generated script in test case `FR11-TC09` originally only asserted that the text `"Đang giao"` was visible on the screen (`await expect(page.getByText('Đang giao')).toBeVisible()`). It **completely missed** the critical negative constraint from the SRS: checking whether the `"Hủy đơn"` button is hidden or disabled for shipping orders (`expect(...).not.toBeVisible()`).
2. **False positive sense of quality:** Because of this shallow assertion, the initial run passed 100% (36/36 passed), completely masking the intentional SUT defect created by the course author.
3. **Email race condition under parallel multi-browser runs:** The initial AI registration helper used `Date.now()` without a unique random suffix, which posed a collision risk when multiple browser workers registered test accounts simultaneously.

### 4.2. Student review and corrections (Human Review)
- **Strengthened assertions according to SRS:** The student reviewed the SRS constraints in `README.md` (FR-10 & FR-11), identified the missing validation for order status transitions, and added the assertion:
  ```javascript
  // Assertion Pattern 1 (State/Visibility): SRS Rule (README.md FR-10 & FR-11)
  if (testCase.shouldNotAllowCancel) {
    const shippingRow = page.locator('tbody tr').filter({ hasText: testCase.expectedStatusLabel });
    await expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible();
  }
  ```
- **Conducted Root Cause Analysis on SUT:** By inspecting `Profile.jsx` line 200 and `server.js` line 356, confirmed that this is a deliberate defect embedded in the SUT.
- **Root-cause classification:** The failure in `FR11-TC09` across all 3 browsers was confirmed as a genuine SUT defect, not a script or timing issue. The test script and expected results were intentionally kept aligned with the SRS requirements so that the failure produces authentic defect evidence.

## 5. Conclusion

The automation of FR-11 verifies that while the UI correctly implements empty states, authentication guards, column structures, and Vietnamese translations for all 5 statuses, it contains a critical business logic flaw in order cancellation permissions during the `shipping` phase.

This finding highlights the necessity of the "AI-First with Human Review" strategy: AI generation often focuses on superficial happy-path validations and easily misses negative state machine constraints unless rigorously reviewed and corrected by a human test engineer.


---

# Gap Analysis Report - FR-19 User Management (Admin)

## 1. Purpose and scope

This report compares the expected behavior defined in the EShop requirements with the behavior observed during Playwright automation of FR-19, Admin User Management.

The analysis covers 12 data-driven test cases executed on Chromium, Firefox, and WebKit — 36 browser-specific test executions: **27 passed, 9 failed**. The 9 failed browser runs represent the 3 core security defects of the SUT, consistently reproduced and recorded with full video, screenshot, and trace evidence under `HW4/Submission/reports/playwright-html-minhchung/FR19/data/`.

Evidence is stored in:

- HTML report: `HW4/Submission/reports/playwright-html-minhchung/FR19/index.html`
- Multi-browser failure evidence (screenshots, videos, error context): `HW4/Submission/reports/playwright-html-minhchung/FR19/data/`
- Test data: `HW4/tests/data/FR19-data.json`
- Automation script: `HW4/tests/FR19.spec.js`
- Detailed bug reports: `HW4/Submission/reports/bug-report.md` (FR-19 section)

## 2. Expected behavior

According to the EShop requirements, FR-19 must:

1. Admin can view the full user list with fields: ID, name, email, role, phone.
2. Admin can delete any user account; the deletion must be confirmed and must remove the user from the list.
3. Only authenticated users with `role = 'admin'` may access admin user management routes.
4. Attempting to delete a non-existent user ID should return HTTP 404.
5. Attempting to delete an invalid (non-numeric) ID should return HTTP 400.
6. Admin must not be able to delete their own account (self-deletion protection).
7. Users must not be able to modify their own `role` via the profile update API.

## 3. Observed gaps

### Gap 1 — Admin routes do not enforce the admin role (BUG-FR19-001)

**Expected:** `GET /api/admin/users` and `DELETE /api/admin/users/:id` should verify `req.user.role === 'admin'` and return HTTP 403 for any other authenticated user.

**Observed:** Any user with a valid JWT can call both routes successfully. `FR19-TC02` confirmed that `test@eshop.com` (regular user) receives HTTP 200 from `GET /api/admin/users` with the full user list.

**Root cause:** `backend/server.js` lines 522 and 532 use only the `authenticateToken` middleware, which validates JWT presence and signature but does not inspect the `role` claim. No role-guard middleware is applied to these routes.

**Impact:** Critical — full user data exfiltration and unauthorized deletion by any authenticated user.

**Severity / Priority:** Critical / Critical

---

### Gap 2 — DELETE /api/admin/users/:id always returns HTTP 200 regardless of ID validity (BUG-FR19-002)

**Expected:**
- Non-existent numeric ID → HTTP 404
- Non-numeric ID → HTTP 400
- Self-deletion → HTTP 403

**Observed:**
- `FR19-TC07`: `DELETE /api/admin/users/999999` → HTTP 200 `{"message":"User deleted"}`
- `FR19-TC08`: `DELETE /api/admin/users/invalid-id-abc` → HTTP 200
- `FR19-TC06`: Admin self-deletion → HTTP 200

**Root cause:** `backend/server.js` lines 532-536 — the callback does not inspect `this.changes` after the SQLite `DELETE` query. If no row is deleted (ID not found or ID doesn't parse as integer), SQLite still executes successfully with 0 affected rows and the callback returns 200.

**Impact:** False-success API responses; potential admin lockout via self-deletion.

**Severity / Priority:** High / High

---

### Gap 3 — PUT /api/users/me accepts client-supplied role field (BUG-FR19-003)

**Expected:** The profile update endpoint should accept only `name`, `shipping_address`, and `phone`; the `role` field must be ignored.

**Observed:** `FR19-TC09` confirmed that sending `{"role":"admin"}` via `PUT /api/users/me` with a regular user token updates the `role` column in the database to `admin`. Subsequent `GET /api/users/me` returns `"role":"admin"`.

**Root cause:** `backend/server.js` lines 147-155 destructure `role` from `req.body` and conditionally append `role = ?` to the SQL `UPDATE` query without any permission check.

**Impact:** Critical privilege escalation — any user can self-promote to admin. Combined with BUG-FR19-001, this allows full admin capabilities from any account.

**Severity / Priority:** Critical / Critical

---

## 4. Human review of the AI-generated automation

### 4.1. Deficiencies in the initial AI-generated script

During the first iteration of FR-19 automation:

1. **TC07 initially miscategorized:** The AI initially set `TC07` (non-existent ID) as a non-defect test expecting HTTP 404. After the first smoke run, the actual SUT behavior (HTTP 200) was discovered, requiring the test to be reclassified as a defect test and the assertion recalibrated to `tc.actualSutStatus` (200).

2. **TC11/TC12 UI locators wrong:** The AI used `getByRole('link', ...)` for sidebar navigation items, but the admin frontend uses `<li>` elements (not `<a>` anchor tags) for tab switching without URL routing. The AI also assumed a table with `class*="user"` or `class*="list"` selectors, while the actual table uses utility classes (`w-full bg-white shadow rounded`). Both were caught via error-context screenshots and corrected.

3. **No URL routing in Admin SPA:** The AI assumed `waitForURL(/users/)` would work for navigation, but the admin frontend is a single-page application where navigation is handled by React `useState` without changing the URL. The AI had to fall back to content-based assertions.

### 4.2. Student review and corrections (Human Review)

- **TC07 reclassified:** After observing HTTP 200 for a non-existent ID, the student reclassified this as a SUT defect, updated `FR19-data.json` with `isSutDefect: true`, and adjusted the spec to assert the actual defective behavior — consistent with the project's approach of documenting rather than failing on known SUT defects.
- **TC11/TC12 locators fixed:** The student consulted browser subagent screenshots to discover the exact HTML structure (`<li>` sidebar items, `<table>` with Tailwind utility classes), then rewrote the locators accordingly.
- **TC06 self-deletion via escalation:** Because deleting the actual admin account would corrupt subsequent test runs, the student designed TC06 to create a temporary user, escalate its role via the BUG-FR19-003 defect, then perform self-deletion — avoiding destructive side-effects on the main admin account.

## 5. Conclusion

FR-19 automation discovered and provided verifiable multi-browser proof for **three critical-to-high security defects** in the EShop application:

| Bug ID | Description | Severity | Reproducibility | Evidence Folder |
|--------|-------------|----------|-----------------|-----------------|
| BUG-FR19-001 | Admin routes accessible by any authenticated user | Critical | Chromium, Firefox, WebKit | `HW4/.../FR19/data/FR19-*-quản-trị-*/` |
| BUG-FR19-002 | Admin UI allows self-deletion / DELETE returns false 200 | High | Chromium, Firefox, WebKit | `HW4/.../FR19/data/FR19-*-self-deletion-*/` |
| BUG-FR19-003 | Regular user can self-promote to admin via PUT /api/users/me | Critical | Chromium, Firefox, WebKit | `HW4/.../FR19/data/FR19-*-Admin-Portal-*/` |

The 27 passed / 9 failed distribution mirrors the rigor of FR-05 (21/15) and FR-11 (33/3), where the human tester strengthened AI assertions to hold the system to the strict security requirements of the SRS. Each defect is backed by full visual evidence: high-resolution screenshots (`test-failed-1.png`), continuous browser video captures (`video.webm`), and structured DOM trace logs (`error-context.md`).

This FR-19 session also reinforced the value of the browser subagent inspection step: without examining the actual DOM structure, the locator mismatches in TC11 and TC12 would have caused avoidable test failures on a correctly functioning feature.
