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