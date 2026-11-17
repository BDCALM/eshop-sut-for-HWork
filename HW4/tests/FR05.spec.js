const { test, expect } = require('@playwright/test');
const testCases = require('./data/FR05-data.json');

for (const testCase of testCases) {
  test(`${testCase.id}: ${testCase.title}`, async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const searchInput = page.getByPlaceholder('Tìm kiếm...');
    const searchButton = page.getByRole('button', { name: 'Tìm' });

    // Assertion Pattern 1: Visibility/state assertion.
    await expect(searchInput).toBeVisible();
    await expect(searchButton).toBeVisible();

    if (testCase.query) {
      await searchInput.fill(testCase.query);
      await searchButton.click();
    }

    // Assertion Pattern 2: Navigation/URL assertion.
    await expect(page).toHaveURL(/http:\/\/localhost:5173\/?$/);

    const productTitles = page.locator('h2');
    switch (testCase.assertion) {
      case 'productCount':
        // Assertion Pattern 3: Count/value assertion.
        await expect(productTitles).toHaveCount(testCase.expectedProductCount);
        break;
      case 'productVisible':
        // Assertion Pattern 3: Text/content assertion.
        await expect(productTitles.filter({ hasText: testCase.expectedProduct })).toBeVisible();
        break;
      case 'emptyState':
        // Expected by the SRS; this exposes the missing empty-state implementation.
        await expect(page.getByText(testCase.expectedEmptyText)).toBeVisible();
        break;
      case 'safeQuery':
        // Expected by the SRS; this exposes unsafe query rendering if it occurs.
        await expect(page.locator('body')).toContainText(testCase.expectedDisplayedQuery);
        break;
      default:
        throw new Error(`Unknown FR-05 assertion type: ${testCase.assertion}`);
    }
  });
}
