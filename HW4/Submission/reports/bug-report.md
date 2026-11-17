# FR-05 Bug Reports - Product Search

## Test execution summary

- Feature: FR-05 - Product listing and search
- Test suite: `HW4/tests/FR05.spec.js`
- Browsers: Chromium, Firefox, WebKit
- Result: 21 passed, 15 failed
- Failure distribution: the same three SUT defects reproduced across the three browsers
- Test date: 2026-11-17
- Student ID: 23120242

The 15 failed browser runs are reported as three distinct defects, not 15 separate bugs. The failures were reproduced with Playwright and supported by screenshots and error contexts under `HW4/test-results/FR05/`.

---

## BUG-FR05-001 - Missing empty state for zero search results

**GitHub Issue:** [BUG-FR05-001 - GitHub issue URL to be filled after creation](https://github.com/BDCALM/eshop-sut-for-HWork/issues/REPLACE-BUG-FR05-001)

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

- Chromium screenshot: `HW4/test-results/FR05/FR05-FR05-TC06-Hiển-thị-empty-state-khi-không-có-kết-quả-chromium/test-failed-1.png`
- Chromium error context: `HW4/test-results/FR05/FR05-FR05-TC06-Hiển-thị-empty-state-khi-không-có-kết-quả-chromium/error-context.md`
- Firefox and WebKit produced the same failure for TC06, TC07 and TC11.

### Suspected implementation area

`frontend-web/src/pages/Home.jsx` renders the product grid but has no branch for `products.length === 0` when the request succeeds.

---

## BUG-FR05-002 - Search query is rendered as HTML instead of escaped text

**GitHub Issue:** [BUG-FR05-002 - GitHub issue URL to be filled after creation](https://github.com/BDCALM/eshop-sut-for-HWork/issues/REPLACE-BUG-FR05-002)

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

- Chromium screenshot: `HW4/test-results/FR05/FR05-FR05-TC10-Hiển-thị-an-toàn-từ-khóa-có-thẻ-HTML-chromium/test-failed-1.png`
- Chromium error context: `HW4/test-results/FR05/FR05-FR05-TC10-Hiển-thị-an-toàn-từ-khóa-có-thẻ-HTML-chromium/error-context.md`
- Firefox and WebKit produced the same failure.

### Suspected implementation area

`frontend-web/src/pages/Home.jsx` uses `dangerouslySetInnerHTML={{ __html: search }}` for the query summary. Render `{search}` as normal React text instead.

---

## BUG-FR05-003 - SQL wildcard is not treated as a literal search character

**GitHub Issue:** [BUG-FR05-003 - GitHub issue URL to be filled after creation](https://github.com/BDCALM/eshop-sut-for-HWork/issues/REPLACE-BUG-FR05-003)

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

- Chromium screenshot: `HW4/test-results/FR05/FR05-FR05-TC12-Xử-lý-ký-tự-39676-hư-một-từ-khóa-thông-thường-chromium/test-failed-1.png`
- Chromium error context: `HW4/test-results/FR05/FR05-FR05-TC12-Xử-lý-ký-tự-39676-hư-một-từ-khóa-thông-thường-chromium/error-context.md`
- Firefox and WebKit produced the same failure.

### Suspected implementation area

`backend/server.js` builds `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`. Use a parameterized query and escape `LIKE` wildcard characters when literal matching is required.

---

## Notes for GitHub issue screenshots

The local evidence paths above are preserved for traceability. After each issue is created, upload the corresponding `test-failed-1.png` to that GitHub Issue by drag-and-drop or GitHub's image attachment flow, then replace the issue URL placeholders above with the actual URLs.