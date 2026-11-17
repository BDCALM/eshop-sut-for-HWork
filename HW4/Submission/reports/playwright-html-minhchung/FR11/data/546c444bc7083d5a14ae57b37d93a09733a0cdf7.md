# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR11.spec.js >> FR11-TC09: Dịch trạng thái shipping sang tiếng Việt và không hiển thị nút hủy đơn cho đơn đang giao
- Location: tests\FR11.spec.js:77:3

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('tbody tr').filter({ hasText: 'Đang giao' }).getByRole('button', { name: 'Hủy đơn' })
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" locator('tbody tr').filter({ hasText: 'Đang giao' }).getByRole('button', { name: 'Hủy đơn' }) with timeout 5000ms
  - waiting for locator('tbody tr').filter({ hasText: 'Đang giao' }).getByRole('button', { name: 'Hủy đơn' })
    14 × locator resolved to <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hủy đơn</button>
       - unexpected value "visible"

```

```yaml
- button "Hủy đơn"
```

# Test source

```ts
  44  |         email: ADMIN_EMAIL,
  45  |         password: ADMIN_PASSWORD,
  46  |       });
  47  |       const transitions = status === 'confirmed'
  48  |         ? ['confirmed']
  49  |         : status === 'shipping'
  50  |           ? ['confirmed', 'shipping']
  51  |           : status === 'delivered'
  52  |             ? ['confirmed', 'shipping', 'delivered']
  53  |             : ['canceled'];
  54  |       for (const nextStatus of transitions) {
  55  |         const statusResponse = await request.put(`${API_URL}/admin/orders/${checkout.orderId}/status`, {
  56  |           headers: { Authorization: `Bearer ${adminLogin.token}` },
  57  |           data: { status: nextStatus },
  58  |         });
  59  |         expect(statusResponse.ok()).toBeTruthy();
  60  |       }
  61  |     }
  62  |   }
  63  |   return orderIds;
  64  | }
  65  | 
  66  | async function loginInUi(page, account) {
  67  |   await page.goto('http://localhost:5173/login');
  68  |   const inputs = page.locator('input');
  69  |   await inputs.nth(0).fill(account.email);
  70  |   await inputs.nth(1).fill(account.password);
  71  |   await page.getByRole('button', { name: 'Sign In' }).click();
  72  |   await expect(page).toHaveURL('http://localhost:5173/');
  73  |   await expect(page.getByRole('link', { name: /Chào,/ })).toBeVisible();
  74  | }
  75  | 
  76  | for (const testCase of testCases) {
  77  |   test(`${testCase.id}: ${testCase.title}`, async ({ page, request }) => {
  78  |     await page.goto('http://localhost:5173/');
  79  | 
  80  |     if (testCase.mode === 'unauthenticated') {
  81  |       await page.goto('http://localhost:5173/profile');
  82  | 
  83  |       // Assertion Pattern 1: Visibility/state assertion.
  84  |       await expect(page.getByText('Vui lòng đăng nhập')).toBeVisible();
  85  |       return;
  86  |     }
  87  | 
  88  |     if (testCase.mode === 'invalidLogin') {
  89  |       await page.goto('http://localhost:5173/login');
  90  |       const inputs = page.locator('input');
  91  |       await inputs.nth(0).fill('fr11-invalid@example.com');
  92  |       await inputs.nth(1).fill('WrongPassword!');
  93  |       await page.getByRole('button', { name: 'Sign In' }).click();
  94  | 
  95  |       // Assertion Pattern 2: Text/content assertion.
  96  |       await expect(page.getByText('Đăng nhập thất bại. Vui lòng kiểm tra lại.')).toBeVisible();
  97  |       return;
  98  |     }
  99  | 
  100 |     const account = await registerAccount(request, testCase);
  101 |     const loginData = await loginByApi(request, account);
  102 |     const expectedOrderIds = await createOrders(request, loginData.token, testCase.orderStatuses || []);
  103 | 
  104 |     await loginInUi(page, account);
  105 |     await page.getByRole('link', { name: /Chào,/ }).click();
  106 |     await expect(page).toHaveURL('http://localhost:5173/profile');
  107 | 
  108 |     // Assertion Pattern 1: Visibility/state assertion.
  109 |     await expect(page.getByRole('heading', { name: 'Lịch sử đơn hàng' })).toBeVisible();
  110 |     await expect(page.getByRole('heading', { name: 'Hồ sơ của bạn' })).toBeVisible();
  111 | 
  112 |     // Assertion Pattern 2: Navigation/URL assertion.
  113 |     await expect(page).toHaveURL('http://localhost:5173/profile');
  114 | 
  115 |     if (testCase.mode === 'ownership') {
  116 |       const historyResponse = await request.get(`${API_URL}/orders/my-orders`, {
  117 |         headers: { Authorization: `Bearer ${loginData.token}` },
  118 |       });
  119 |       expect(historyResponse.status()).toBe(200);
  120 |       const orders = await historyResponse.json();
  121 | 
  122 |       // Assertion Pattern 3: API status and collection/value assertion.
  123 |       expect(orders.map((order) => order.id)).toEqual(expectedOrderIds);
  124 |       expect(orders.every((order) => order.user_id === loginData.user.id)).toBeTruthy();
  125 |       return;
  126 |     }
  127 | 
  128 |     if (testCase.orderStatuses.length === 0) {
  129 |       // Assertion Pattern 3: Empty-state text assertion.
  130 |       await expect(page.getByText('Bạn chưa có đơn hàng nào.')).toBeVisible();
  131 |       return;
  132 |     }
  133 | 
  134 |     // Assertion Pattern 3: Count/text/value assertion.
  135 |     await expect(page.locator('tbody tr')).toHaveCount(testCase.orderStatuses.length);
  136 |     if (testCase.expectedStatusLabel) {
  137 |       await expect(page.getByText(testCase.expectedStatusLabel, { exact: true })).toBeVisible();
  138 |     }
  139 | 
  140 |     // Assertion Pattern 1: Visibility/state assertion (SRS Constraint - README.md FR-10 & FR-11)
  141 |     // "Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác."
  142 |     if (testCase.shouldNotAllowCancel) {
  143 |       const shippingRow = page.locator('tbody tr').filter({ hasText: testCase.expectedStatusLabel });
> 144 |       await expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible();
      |                                                                              ^ Error: expect(locator).not.toBeVisible() failed
  145 |     }
  146 |   });
  147 | }
  148 | 
```