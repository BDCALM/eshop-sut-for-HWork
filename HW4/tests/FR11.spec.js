const { test, expect } = require('@playwright/test');
const testCases = require('./data/FR11-data.json');

const API_URL = process.env.API_URL || 'http://localhost:3000/api';
const PASSWORD = 'Test1234!';
const ADMIN_EMAIL = 'admin@eshop.com';
const ADMIN_PASSWORD = 'Admin123!';

async function registerAccount(request, testCase) {
  const email = `fr11.${testCase.id.toLowerCase()}.${Date.now()}.${Math.floor(Math.random() * 100000)}@example.com`;
  const response = await request.post(`${API_URL}/register`, {
    data: {
      name: `FR11 ${testCase.id}`,
      email,
      password: PASSWORD,
    },
  });
  expect(response.ok()).toBeTruthy();
  return { email, password: PASSWORD };
}

async function loginByApi(request, account) {
  const response = await request.post(`${API_URL}/login`, { data: account });
  expect(response.ok()).toBeTruthy();
  return response.json();
}

async function createOrders(request, token, statuses) {
  const orderIds = [];
  for (const status of statuses) {
    const checkoutResponse = await request.post(`${API_URL}/checkout`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        total_amount: 100000,
        shipping_address: 'FR11 automated test address',
      },
    });
    expect(checkoutResponse.ok()).toBeTruthy();
    const checkout = await checkoutResponse.json();
    orderIds.push(checkout.orderId);

    if (status !== 'pending') {
      const adminLogin = await loginByApi(request, {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });
      const transitions = status === 'confirmed'
        ? ['confirmed']
        : status === 'shipping'
          ? ['confirmed', 'shipping']
          : status === 'delivered'
            ? ['confirmed', 'shipping', 'delivered']
            : ['canceled'];
      for (const nextStatus of transitions) {
        const statusResponse = await request.put(`${API_URL}/admin/orders/${checkout.orderId}/status`, {
          headers: { Authorization: `Bearer ${adminLogin.token}` },
          data: { status: nextStatus },
        });
        expect(statusResponse.ok()).toBeTruthy();
      }
    }
  }
  return orderIds;
}

async function loginInUi(page, account) {
  await page.goto('http://localhost:5173/login');
  const inputs = page.locator('input');
  await inputs.nth(0).fill(account.email);
  await inputs.nth(1).fill(account.password);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('http://localhost:5173/');
  await expect(page.getByRole('link', { name: /Chào,/ })).toBeVisible();
}

for (const testCase of testCases) {
  test(`${testCase.id}: ${testCase.title}`, async ({ page, request }) => {
    await page.goto('http://localhost:5173/');

    if (testCase.mode === 'unauthenticated') {
      await page.goto('http://localhost:5173/profile');

      // Assertion Pattern 1: Visibility/state assertion.
      await expect(page.getByText('Vui lòng đăng nhập')).toBeVisible();
      return;
    }

    if (testCase.mode === 'invalidLogin') {
      await page.goto('http://localhost:5173/login');
      const inputs = page.locator('input');
      await inputs.nth(0).fill('fr11-invalid@example.com');
      await inputs.nth(1).fill('WrongPassword!');
      await page.getByRole('button', { name: 'Sign In' }).click();

      // Assertion Pattern 2: Text/content assertion.
      await expect(page.getByText('Đăng nhập thất bại. Vui lòng kiểm tra lại.')).toBeVisible();
      return;
    }

    const account = await registerAccount(request, testCase);
    const loginData = await loginByApi(request, account);
    const expectedOrderIds = await createOrders(request, loginData.token, testCase.orderStatuses || []);

    await loginInUi(page, account);
    await page.getByRole('link', { name: /Chào,/ }).click();
    await expect(page).toHaveURL('http://localhost:5173/profile');

    // Assertion Pattern 1: Visibility/state assertion.
    await expect(page.getByRole('heading', { name: 'Lịch sử đơn hàng' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hồ sơ của bạn' })).toBeVisible();

    // Assertion Pattern 2: Navigation/URL assertion.
    await expect(page).toHaveURL('http://localhost:5173/profile');

    if (testCase.mode === 'ownership') {
      const historyResponse = await request.get(`${API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${loginData.token}` },
      });
      expect(historyResponse.status()).toBe(200);
      const orders = await historyResponse.json();

      // Assertion Pattern 3: API status and collection/value assertion.
      expect(orders.map((order) => order.id)).toEqual(expectedOrderIds);
      expect(orders.every((order) => order.user_id === loginData.user.id)).toBeTruthy();
      return;
    }

    if (testCase.orderStatuses.length === 0) {
      // Assertion Pattern 3: Empty-state text assertion.
      await expect(page.getByText('Bạn chưa có đơn hàng nào.')).toBeVisible();
      return;
    }

    // Assertion Pattern 3: Count/text/value assertion.
    await expect(page.locator('tbody tr')).toHaveCount(testCase.orderStatuses.length);
    if (testCase.expectedStatusLabel) {
      await expect(page.getByText(testCase.expectedStatusLabel, { exact: true })).toBeVisible();
    }

    // Assertion Pattern 1: Visibility/state assertion (SRS Constraint - README.md FR-10 & FR-11)
    // "Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác."
    if (testCase.shouldNotAllowCancel) {
      const shippingRow = page.locator('tbody tr').filter({ hasText: testCase.expectedStatusLabel });
      await expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible();
    }
  });
}
