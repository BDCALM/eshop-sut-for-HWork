# GitHub Issue Template: BUG-FR11-001

Sử dụng nội dung dưới đây để tạo Issue thủ công trên GitHub repository:
- **Repository:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/new
- **Title:** `[FR-11] User can cancel order while in shipping state via Profile UI`

---

## Copy phần nội dung dưới đây vào ô Body của GitHub Issue:

```markdown
## Summary

Confirmed FR-11 / FR-10 SUT defect: **BUG-FR11-001**.
The user profile order history view displays an active "Hủy đơn" (Cancel Order) button for orders that are currently in the `shipping` ("Đang giao") state, allowing standard users to cancel orders during transit in direct violation of the System Requirements Specification.

## Environment

- Backend API: `http://localhost:3000`
- Web Frontend: `http://localhost:5173`
- Browsers reproduced: Chromium, Firefox, WebKit
- Test suite: `HW4/tests/FR11.spec.js` (Test case `FR11-TC09`)
- Student ID: 23120242

## Preconditions

1. Backend API and Web frontend are running locally.
2. User is registered, authenticated, and has placed an order.
3. Order status has been transitioned to `shipping` ("Đang giao") by Admin.
4. User navigates to `http://localhost:5173/profile`.

## Steps to Reproduce

1. Log in with a standard customer account at `http://localhost:5173/login`.
2. Navigate to `/profile` (or click user greeting on the top navigation bar).
3. In the "Lịch sử đơn hàng" table, locate the order having status badge `Đang giao`.
4. Observe the `Thao tác` column.
5. Click the red `Hủy đơn` button.

## Expected Result

According to `README.md` (Section 5 - Quản lý Đơn hàng, FR-10 & FR-11):
> *"Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác."*

The user interface must **NOT display the `Hủy đơn` button** for orders in the `shipping` state (or must disable it with an informative tooltip).

## Actual Result

The order row displays an active red button `<button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hủy đơn</button>`. The user can click it to cancel the in-transit order.

## Suspected Implementation Area

1. **Frontend (`frontend-web/src/pages/Profile.jsx` lines 200-208):**
   ```jsx
   {/* Nút hủy hiển thị khi chưa giao xong và chưa hủy (kể cả khi đang giao) */}
   {o.status !== "delivered" && o.status !== "canceled" && (
     <button onClick={() => cancelOrder(o.id)} className="...">Hủy đơn</button>
   )}
   ```
2. **Backend (`backend/server.js` lines 356-359):**
   ```javascript
   // Lẽ ra phải là: if (order.status !== 'pending' && order.status !== 'confirmed')
   if (order.status === "delivered" || order.status === "canceled") {
     return res.status(400).json({ error: "Cannot cancel this order." });
   }
   ```

## Evidence to Upload

Kéo thả (drag-and-drop) ảnh minh chứng sau vào ô Issue:
- Đường dẫn file ảnh: `HW4/Submission/reports/playwright-html-minhchung/FR11/data/FR11-FR11-TC09-Dịch-trạng--ea031-t-hủy-đơn-cho-đơn-đang-giao-chromium/test-failed-1.png`

## Student Attribution

- **Student ID:** 23120242
- **Course:** Software Testing (CS423 / CSC13003) - HCMUS
```

---

## Hướng dẫn sau khi tạo Issue xong:

1. Copy URL của issue vừa tạo (ví dụ: `https://github.com/BDCALM/eshop-sut-for-HWork/issues/24`).
2. Mở file [bug-report.md](../../Submission/reports/bug-report.md) và thay thế placeholder:
   ```markdown
   **GitHub Issue:** [BUG-FR11-001 - GitHub issue URL to be filled after creation](https://github.com/BDCALM/eshop-sut-for-HWork/issues/REPLACE-BUG-FR11-001)
   ```
   thành link issue thật.
