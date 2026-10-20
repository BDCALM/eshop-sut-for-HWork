## Script kiểm tra được gì?

### Tự động kiểm tra qua API

- `TC-FR20-MOB-001`: Empty search.
- `TC-FR20-MOB-002`: One-character search.
- `TC-FR20-MOB-003`: Zero-result search.
- `TC-FR20-MOB-004`: Exactly one result.
- `TC-FR20-MOB-005`: Multiple results.
- `TC-FR20-MOB-008`: User có zero orders.
- `TC-FR20-MOB-009`: User có exactly one order.
- `TC-FR20-MOB-010`: User có multiple orders.
- `TC-FR20-MOB-011`: Kiểm tra ownership isolation giữa User A và User B.

Script tự động tìm search term tạo ra đúng `1` và `2+` kết quả từ dữ liệu hiện tại, không thay đổi database.

### Các case cần quan sát UI thủ công

Hai case sau không thể chứng minh hoàn toàn bằng `curl`/API:

- `TC-FR20-MOB-006`: Hiển thị `Đang tải...`.
- `TC-FR20-MOB-007`: Hiển thị error state khi API lỗi.

Script sẽ ghi hai case này là `MANUAL`, để bạn chạy trên mobile UI và chụp evidence.

## Cách chạy với backend local

```bash
USER_EMAIL="test@eshop.com" \
USER_PASSWORD="Test1234!" \
OTHER_USER_EMAIL="user-b@example.com" \
OTHER_USER_PASSWORD="UserBPassword" \
node scripts/fr20-mobile-api-check.cjs
```

Nếu chỉ có một user:

```bash
USER_EMAIL="test@eshop.com" \
USER_PASSWORD="Test1234!" \
node scripts/fr20-mobile-api-check.cjs
```

Khi đó ownership case sẽ có trạng thái `BLOCKED` vì chưa có thông tin User B.

## Cách chạy với backend Codespaces

```bash
API_URL="https://orange-disco-9775gp4r5rv6c757g-3000.app.github.dev/api" \
USER_EMAIL="test@eshop.com" \
USER_PASSWORD="Test1234!" \
OTHER_USER_EMAIL="user-b@example.com" \
OTHER_USER_PASSWORD="UserBPassword" \
node scripts/fr20-mobile-api-check.cjs
```

Lưu ý:

- `API_URL` phải trỏ tới backend và có hậu tố `/api`.
- Không ghi token hoặc password trực tiếp vào file script.
- Script không tự cập nhật `test-case-report.md`; kết quả cần được bạn review rồi mới ghi vào report.
- Đã kiểm tra cú pháp bằng `node --check`; script hợp lệ.
- Không thêm package dependency mới.