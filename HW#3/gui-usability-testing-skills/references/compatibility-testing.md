# Kiểm thử tương thích (trình duyệt, hệ điều hành, thiết bị)

Cùng một mã hiển thị khác nhau theo engine, hệ điều hành, thiết bị, viewport, phiên bản và mạng. Câu "chạy tốt trên máy tôi" không có nghĩa là chạy tốt trên trình duyệt của người dùng: khác biệt nằm ở bố cục, phông chữ, sự kiện và API.

Mục lục: 1 Các chiều tương thích · 2 Dựng ma trận · 3 Emulator, simulator, thiết bị thực · 4 Bốn bậc công cụ · 5 Chọn bậc · 6 Kiểm tra liên kết và mã · 7 AI trong kiểm thử tương thích · 8 Thiết kế test case

## 1. Các chiều tương thích

Phần cứng · hệ điều hành · phần mềm (kèm phiên bản) · mạng · trình duyệt · thiết bị · di động · phiên bản. Với web, nhớ ba engine kết xuất đứng sau mọi trình duyệt:

| Engine | Trình duyệt | Ghi chú |
|---|---|---|
| Blink | Chrome, Edge, Opera | Phổ biến nhất; kiểm chéo Chrome với Edge ít lộ khác biệt |
| WebKit | Safari, và **mọi trình duyệt trên iOS** | iOS bắt buộc dùng WebKit; lỗi WebKit thường không tái hiện được trên Chrome desktop |
| Gecko | Firefox | Khác biệt về form control, cuộn, một số CSS/API |

Safari di động là nơi lệch nhiều nhất: luôn kiểm nó. Tính năng web mới có thể tra tình trạng hỗ trợ ở trạng thái "Baseline" (kiểm tra lại trên nguồn chính thức web.dev/baseline hoặc MDN khi dùng); tính năng "Widely available" thường dùng được mà không cần dự phòng.

## 2. Dựng ma trận

- Dựng ma trận **từ dữ liệu phân tích thực** (analytics của sản phẩm, thị phần theo khu vực), không đoán.
- Không thể test tất cả tổ hợp: chọn khoảng **10–15 tổ hợp phổ biến nhất** của người dùng thực, và chạy tổ hợp ưu tiên cao nhất (P1) ở mỗi lần phát hành.
- Cột thông thường: trình duyệt + phiên bản · hệ điều hành · thiết bị/viewport · mức ưu tiên (P1/P2/P3) · phương pháp (bậc công cụ §4) · kết quả.
- Thêm tổ hợp rủi ro dù ít người dùng nếu có lý do (trình duyệt bắt buộc của khách hàng doanh nghiệp, thiết bị kiosk).
- Ghi rõ ma trận đã test trong báo cáo; đừng tuyên bố "chạy tốt mọi nơi".

## 3. Emulator, simulator, thiết bị thực

Độ chính xác tăng từ trái sang phải; chi phí và công sức cũng tăng theo.

| Loại | Mô phỏng gì | Điểm mạnh | Điểm yếu |
|---|---|---|---|
| **Emulator** (vd Android Emulator) | Hệ điều hành **và** phần cứng/CPU của thiết bị | Chính xác hơn simulator | Nặng, chậm hơn khi chạy |
| **Simulator** (vd iOS Simulator) | Chỉ môi trường phần mềm, dùng tài nguyên máy chủ | Nhanh; có WebKit thật | Không có GPU/cảm biến/mạng di động thật |
| **Thiết bị thực** | Không mô phỏng | Chuẩn vàng: GPU, cảm ứng, tai thỏ, mạng, giảm xung do nhiệt | Đắt nhất, khó mở rộng |

Đánh đổi: emulator/simulator thắng về tốc độ và quy mô CI; thiết bị thực thắng về độ trung thực. Trang trại thiết bị đám mây cho thiết bị thực mà không cần sở hữu. Chế độ giả lập "iPhone" của DevTools trên Chrome vẫn là engine Blink, không phải Safari.

## 4. Bốn bậc công cụ

Dùng cả bốn; mỗi bậc bắt loại lỗi khác nhau. Miễn phí và nhanh ở bậc thấp cho mỗi commit; thiết bị thực và trả phí ở bậc cao trước khi phát hành. Các công cụ dưới đây theo tài liệu môn học (khảo sát 2024–2026); công cụ và gói miễn phí thay đổi nhanh, kiểm tra lại trước khi dựa vào.

### Bậc 1: chụp ảnh offline và hồi quy hình ảnh

Chạy trên máy bạn hoặc CI, không cần tài khoản đám mây; tự động bắt hồi quy CSS và phông. Cách hoạt động: chạy baseline, chụp hiện tại, so pixel/AI, báo lỗi khi lệch vượt ngưỡng.

Công cụ: Playwright `toHaveScreenshot`, BackstopJS, Lost Pixel, reg-suit (lưu baseline trên S3 để repo nhẹ).

```ts
// playwright.config.ts: chạy cùng test trên ba engine
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});

// trong test
await expect(page).toHaveScreenshot('home.png', { maxDiffPixelRatio: 0.01 });
```

Hạn chế: nội dung động (khử răng cưa, ngày giờ) làm ảnh không ổn định, nên khoá/che phần động; chỉ có engine cục bộ; baseline phải tạo **cùng môi trường** (cùng OS/container) với nơi chạy so sánh vì kết xuất phông khác nhau giữa môi trường. WebKit trong Playwright là engine Safari nhưng không phải Safari thật.

### Bậc 2: giả lập cục bộ (tương tác, trên máy bạn)

Kiểm responsive nhanh ở các breakpoint thực, nhưng không phải lúc nào cũng là engine di động thật.

```ts
const context = await browser.newContext({ ...devices['iPhone 14'] }); // viewport, UA, DPR, touch
```

Công cụ: Chrome DevTools / Firefox Responsive Design Mode (thanh thiết bị, bóp băng thông mạng, cảm ứng, miễn phí), Responsively App (nhiều viewport cùng lúc, đồng bộ cuộn/nhấp; tốt cho 360/768/1024/1440), Android Emulator, iOS Simulator (macOS). Tốt cho vòng lặp nội bộ; xác nhận phát hiện trên engine thật (bậc 4) trước khi tin.

### Bậc 3: sinh ảnh chụp trực tuyến (không tương tác)

Trỏ vào một URL, chọn môi trường, nhận ảnh chụp về: phủ rộng nhanh. Công cụ: BrowserStack Screenshots, Percy (kiểm thử hình ảnh trong CI qua nhiều bề rộng và trình duyệt), SmartUI của TestMu AI (trước đây LambdaTest). Ví dụ: dán URL, chọn 20 trình duyệt, Generate, nhận 20 ảnh để mắt kiểm bố cục.

### Bậc 4: thiết bị thực đám mây (tương tác hoặc tự động)

Điều khiển Safari/Chrome thật hoặc điện thoại thật, thủ công hoặc qua tự động hoá.

- Web: BrowserStack Live và Automate, TestMu AI, Sauce Labs. Kiểm bản build nội bộ qua tunnel (BrowserStack Local, SecureTunnel).
- Ứng dụng di động trên thiết bị thực: BrowserStack App Live/App Automate, AWS Device Farm (thiết bị thực chạy song song), Firebase Test Lab (có gói miễn phí), Sauce Labs RDC, Kobiton, pCloudy.
- Ví dụ: mở Safari trên iPhone thật và bấm qua quy trình thanh toán; chạy bộ Appium trên nhiều thiết bị thực song song.

## 5. Chọn bậc

| Cách tiếp cận | Ví dụ | Tương tác? | Engine thật? | Phù hợp nhất |
|---|---|---|---|---|
| Hồi quy hình ảnh offline | Playwright, BackstopJS | Không | Engine cục bộ | Hồi quy CSS, miễn phí, mỗi commit |
| Giả lập cục bộ | DevTools, Responsively | Có | Một phần | Kiểm responsive nhanh |
| Sinh ảnh trực tuyến | BrowserStack, Percy | Không | Có | Một URL, nhiều môi trường |
| Web trực tiếp đám mây | BrowserStack Live, Sauce | Có | Có | Tái hiện lỗi Safari |
| Di động thiết bị thực | AWS Device Farm, Firebase | Có + tự động | Chuẩn vàng | Độ trung thực app native |

Cho sinh viên (miễn phí): Playwright (3 engine + `toHaveScreenshot`), BackstopJS/Lost Pixel, Responsively App, gói miễn phí của Percy, bản dùng thử đám mây.

## 6. Kiểm tra liên kết và mã

- **Trình kiểm tra liên kết** thu thập toàn site và phân loại: hoạt động / chưa xác minh / hỏng. Công cụ: W3C Link Validator, LinkResearchTools Link Checker, Xenu's Link Sleuth, Dr. Link Check, Sitechecker, ahrefs.
- Kiểm HTML và CSS bằng trình xác thực (W3C validator): lỗi cú pháp hay gây khác biệt giữa trình duyệt.
- Liên kết nội bộ phải phân giải được ở mọi môi trường; liên kết ngoài hỏng nên được báo, không bỏ qua.

## 7. AI trong kiểm thử tương thích

AI tấn công hai điểm nghẽn: viết test × N cấu hình, và duyệt × N ảnh chụp.

- **Visual review agent** (Percy): chỉ khoanh các thay đổi có ý nghĩa kèm tóm tắt dễ hiểu, lọc nhiễu khử răng cưa, duyệt nhanh hơn.
- **Visual AI** (Applitools Eyes): khớp theo bố cục, bỏ qua nội dung động, cảnh báo cấu trúc; có tính năng đối sánh động cho ngày/email/số thẻ.
- **TestMu AI (KaneAI + SmartUI):** viết test bằng ngôn ngữ tự nhiên trên nhiều cấu hình; so sánh bố cục.
- **Phát hiện test không ổn định (flaky)** từ lịch sử chạy.

AI giúp duyệt và lọc, không thay con người quyết định "đây là lỗi": giữ người trong vòng lặp cho kết luận.

## 8. Thiết kế test case tương thích

Dùng **data matrix**: một quy trình chung, mỗi dòng một tổ hợp.

| Covers | Trình duyệt/phiên bản | HĐH/thiết bị | Viewport | Ưu tiên | Expected |
|---|---|---|---|---|---|
| Engine Blink | Chrome (bản mục tiêu) | Windows 11 | 1366×768 | P1 | Luồng thanh toán hoàn tất; bố cục khớp baseline |
| Engine WebKit di động | Safari iOS | iPhone thật | 390×844 | P1 | Bàn phím ảo không che nút "Đặt hàng"; form gửi được |
| Engine Gecko | Firefox | Ubuntu | 1280×800 | P2 | Ô chọn ngày hiển thị và nhập được |

Với mỗi tổ hợp, chạy cùng bộ kiểm tra: bố cục, phông, form control, sự kiện (cảm ứng/chuột/bàn phím), chức năng chính và các API trình duyệt mà sản phẩm dùng. Ghi lỗi kèm engine, phiên bản, thiết bị và ảnh chụp; kiểm tra lại trên **engine thật** trước khi kết luận, vì giả lập có thể cho kết quả khác.
