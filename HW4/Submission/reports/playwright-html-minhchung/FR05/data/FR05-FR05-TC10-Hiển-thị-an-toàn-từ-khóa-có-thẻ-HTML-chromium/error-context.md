# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR05.spec.js >> FR05-TC10: Hiển thị an toàn từ khóa có thẻ HTML
- Location: tests\FR05.spec.js:5:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('body')
Timeout: 5000ms
- Expected substring  - 1
+ Received string     + 6

- <script>alert(1)</script>
+
+     EShopGiỏ hàngĐăng nhậpĐăng kýDanh sách sản phẩmTìmKết quả tìm kiếm cho: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
+     
+   
+
+

Call log:
  - Expect "toContainText" locator('body') with timeout 5000ms
  - waiting for locator('body')
    14 × locator resolved to <body>…</body>
       - unexpected value "
    EShopGiỏ hàngĐăng nhậpĐăng kýDanh sách sản phẩmTìmKết quả tìm kiếm cho: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
    
  

"

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Danh sách sản phẩm" [level=1]
  - textbox "Tìm kiếm...": <script>alert(1)</script>
  - button "Tìm"
  - text: "Kết quả tìm kiếm cho:"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const testCases = require('./data/FR05-data.json');
  3  | 
  4  | for (const testCase of testCases) {
  5  |   test(`${testCase.id}: ${testCase.title}`, async ({ page }) => {
  6  |     await page.goto('http://localhost:5173/');
  7  | 
  8  |     const searchInput = page.getByPlaceholder('Tìm kiếm...');
  9  |     const searchButton = page.getByRole('button', { name: 'Tìm' });
  10 | 
  11 |     // Assertion Pattern 1: Visibility/state assertion.
  12 |     await expect(searchInput).toBeVisible();
  13 |     await expect(searchButton).toBeVisible();
  14 | 
  15 |     if (testCase.query) {
  16 |       await searchInput.fill(testCase.query);
  17 |       await searchButton.click();
  18 |     }
  19 | 
  20 |     // Assertion Pattern 2: Navigation/URL assertion.
  21 |     await expect(page).toHaveURL(/http:\/\/localhost:5173\/?$/);
  22 | 
  23 |     const productTitles = page.locator('h2');
  24 |     switch (testCase.assertion) {
  25 |       case 'productCount':
  26 |         // Assertion Pattern 3: Count/value assertion.
  27 |         await expect(productTitles).toHaveCount(testCase.expectedProductCount);
  28 |         break;
  29 |       case 'productVisible':
  30 |         // Assertion Pattern 3: Text/content assertion.
  31 |         await expect(productTitles.filter({ hasText: testCase.expectedProduct })).toBeVisible();
  32 |         break;
  33 |       case 'emptyState':
  34 |         // Expected by the SRS; this exposes the missing empty-state implementation.
  35 |         await expect(page.getByText(testCase.expectedEmptyText)).toBeVisible();
  36 |         break;
  37 |       case 'safeQuery':
  38 |         // Expected by the SRS; this exposes unsafe query rendering if it occurs.
> 39 |         await expect(page.locator('body')).toContainText(testCase.expectedDisplayedQuery);
     |                                            ^ Error: expect(locator).toContainText(expected) failed
  40 |         break;
  41 |       default:
  42 |         throw new Error(`Unknown FR-05 assertion type: ${testCase.assertion}`);
  43 |     }
  44 |   });
  45 | }
  46 | 
```