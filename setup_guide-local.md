# Hướng dẫn chạy EShop trên máy local (Windows)

Hướng dẫn này dành cho máy Windows dùng PowerShell, không dùng GitHub Codespaces. Backend chạy tại `http://localhost:3000`, web tại `http://localhost:5173` và admin tại `http://localhost:5174`.

## Yêu cầu

- Node.js `20.19+` hoặc `22.12+` và npm (các phiên bản Vite/Expo hiện tại cần Node mới hơn 18).
- (Mobile) Android Studio/Android Emulator hoặc điện thoại cài Expo Go.
- Điện thoại thật và máy tính cần kết nối cùng mạng Wi-Fi.

Mở PowerShell tại thư mục dự án `eshop-sut-for-HWork`:

```powershell
cd D:\Downloads\cuaDuong\eshop-sut-for-HWork
```

## 1. Cấu hình và chạy backend

Tạo file cấu hình local từ mẫu:

```powershell
if (-not (Test-Path backend\.env)) { Copy-Item backend\.env.example backend\.env }
```

Backend `.env` có các biến:

```dotenv
PORT=3000
FRONTEND_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:8081,http://localhost:19006
```

`FRONTEND_ORIGINS` là danh sách origin được phép gọi API từ trình duyệt. Nếu đổi cổng frontend, cập nhật danh sách này rồi khởi động lại backend. Trường hợp mở web/admin bằng địa chỉ IP LAN, hãy thêm origin tương ứng, ví dụ `http://192.168.1.25:5173`.

Trong một cửa sổ PowerShell:

```powershell
cd D:\Downloads\cuaDuong\eshop-sut-for-HWork\backend
npm install
node server.js
```

Giữ cửa sổ này mở. Backend sẽ báo đang chạy trên cổng 3000.

> `backend\database.js` khởi tạo và seed lại SQLite khi backend được nạp. Không cần chạy `node database.js` riêng; việc seed lại sẽ xóa dữ liệu hiện có trong database.

## 2. Cấu hình và chạy web

Mở một cửa sổ PowerShell mới, tại thư mục dự án:

```powershell
if (-not (Test-Path frontend-web\.env.local)) { Copy-Item frontend-web\.env.example frontend-web\.env.local }
cd frontend-web
npm install
npm run dev
```

`frontend-web\.env.local` mặc định dùng:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

Mở URL Vite hiển thị trên terminal (mặc định `http://localhost:5173/`).

## 3. Cấu hình và chạy admin

Mở cửa sổ PowerShell mới:

```powershell
cd D:\Downloads\cuaDuong\eshop-sut-for-HWork
if (-not (Test-Path frontend-admin\.env.local)) { Copy-Item frontend-admin\.env.example frontend-admin\.env.local }
cd frontend-admin
npm install
npm run dev
```

`frontend-admin\.env.local` cũng dùng `VITE_API_URL=http://localhost:3000/api`. Mở `http://localhost:5174/`.

Tài khoản admin có sẵn trong seed database:

- Email: `admin@eshop.com`
- Mật khẩu: `Admin123!`

## 4. Cấu hình và chạy mobile (Expo)

Tạo file môi trường:

```powershell
cd D:\Downloads\cuaDuong\eshop-sut-for-HWork
if (-not (Test-Path frontend-mobile\.env.local)) { Copy-Item frontend-mobile\.env.example frontend-mobile\.env.local }
```

Sửa `frontend-mobile\.env.local` theo cách chạy app:

- **Android Emulator:** `EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api` (mặc định trong mẫu; `10.0.2.2` trỏ từ emulator về máy tính).
- **Điện thoại thật / Expo Go:** thay `10.0.2.2` bằng IPv4 LAN của máy tính, ví dụ `http://192.168.1.25:3000/api`. Lấy địa chỉ bằng `ipconfig` (dòng IPv4 Address của adapter Wi-Fi). Không dùng `localhost` hoặc `127.0.0.1` trên điện thoại vì khi đó chúng trỏ về chính điện thoại.
- **iOS Simulator trên macOS:** thường dùng `http://localhost:3000/api`.

Sau đó chạy:

```powershell
cd D:\Downloads\cuaDuong\eshop-sut-for-HWork\frontend-mobile
npm install
npx expo start
```

Quét QR bằng Expo Go trên điện thoại hoặc nhấn `a` khi Android Emulator đang chạy. Nếu điện thoại không kết nối được, kiểm tra cùng Wi-Fi, địa chỉ IPv4 và cho phép Node.js qua Windows Firewall trên mạng Private.

## Khởi chạy lại sau khi đã cài đặt

Mỗi ứng dụng chạy trong một terminal riêng; giữ terminal mở khi sử dụng:

| Ứng dụng | Lệnh (chạy tại thư mục ứng dụng) | Địa chỉ |
|---|---|---|
| Backend | `node server.js` | `http://localhost:3000` |
| Web | `npm run dev` | `http://localhost:5173/` |
| Admin | `npm run dev` | `http://localhost:5174/` |
| Mobile | `npx expo start` | Expo Go / Emulator |

Các file `.env`, `.env.local` không nên đưa lên Git. Mẫu `.env.example` được lưu trong dự án để tham khảo và tạo lại cấu hình local khi cần.
