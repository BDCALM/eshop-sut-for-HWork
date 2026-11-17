# Gap Analysis Report - FR-05 Product Search

## 1. Purpose and scope

This report compares the expected behavior defined in the EShop requirements with the behavior observed during Playwright automation of FR-05, Product Listing and Search.

The analysis covers 12 data-driven test cases executed on Chromium, Firefox, and WebKit. The run produced 36 browser-specific test executions: 21 passed and 15 failed. The repeated failures were grouped by root behavior rather than reported as separate defects for each browser.

Evidence is stored in:

- HTML reports: `HW4/Submission/reports/playwright-html/FR05/`
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