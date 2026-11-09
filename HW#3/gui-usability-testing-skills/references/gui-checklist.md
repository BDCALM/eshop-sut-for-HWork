# Checklist kiểm thử GUI

Dùng làm nguồn **test condition**, không phải danh sách để tích bừa. Chọn nhóm liên quan tới màn hình đang test, rồi chuyển mỗi mục thành test case có Expected đo được (xem cuối file). Ghi rõ trình duyệt, thiết bị, viewport đã test.

Mục lục: 1 Bố cục và hình ảnh · 2 Điều khiển · 3 Form và nhập liệu · 4 Trạng thái và phản hồi · 5 Responsive và cross-browser · 6 Accessibility · 7 Nội dung và ngôn ngữ · 8 Chuyển checklist thành test case · 9 Công cụ · 10 Checklist theo từng control · 11 Kiểm hợp lệ trường nhập liệu · 12 Vì sao GUI khó, phân loại lỗi, chiến lược bốn giai đoạn · 13 Tự động hoá đúng thứ cần · 14 AI trong kiểm thử GUI

Nguồn của các mục 10–14 là slide môn học (Waghmare 2009, Gerrard/EuroSTAR, Guru99, WalkMe). Phần tương thích trình duyệt/thiết bị chi tiết nằm ở `compatibility-testing.md`; bộ nguyên tắc Nielsen, Norman, Shneiderman ở `usability-methods.md` §1.

## 1. Bố cục và hình ảnh

- Khớp mockup/design system: màu, font, cỡ chữ, khoảng cách, bo góc, biểu tượng (so bằng thước/overlay hoặc DevTools, không bằng mắt).
- Căn lề và lưới nhất quán; không phần tử bị che, đè hoặc tràn khỏi vùng chứa.
- Không xuất hiện thanh cuộn ngang ngoài ý muốn; cuộn dọc mượt, tiêu đề cố định không che nội dung.
- Ảnh/icon không vỡ, không méo tỉ lệ, có ảnh thay thế khi tải lỗi; ảnh sắc nét trên màn hình mật độ cao.
- Thứ tự thị giác phản ánh mức quan trọng: hành động chính nổi bật hơn hành động phụ.
- Chế độ tối/sáng (nếu có): không còn chữ đen trên nền đen, ảnh/biểu đồ vẫn đọc được.

## 2. Điều khiển (nút, liên kết, menu, tab, modal…)

- Mỗi điều khiển có đủ trạng thái: mặc định, hover, focus, active/pressed, disabled, loading; trạng thái nhìn khác nhau rõ.
- Nút disabled thật sự không kích hoạt được và có lý do dễ hiểu (nhãn, tooltip) khi cần.
- Nhấn đúp/nhanh liên tiếp vào nút gửi không tạo hai bản ghi hoặc hai yêu cầu.
- Liên kết đi đúng đích; liên kết ngoài có dấu hiệu nhận biết nếu mở tab mới; không có liên kết chết (404).
- Menu/dropdown/modal: mở, đóng bằng nút, Esc và nhấp nền (nếu thiết kế cho phép); focus trở về điều khiển đã mở nó; cuộn nền bị khoá khi modal mở.
- Nút Back/Forward của trình duyệt và tải lại không làm hỏng trạng thái; URL phản ánh trang hiện tại khi đáng lẽ vậy.
- Kích thước vùng chạm trên mobile đủ lớn (xem §6), các điều khiển không quá sát nhau.

## 3. Form và nhập liệu

Giá trị cần thử chọn bằng domain testing + BVA (`test-design-istqb` §3.1). Phần dưới là cách **giao diện** phải ứng xử:

- Nhãn gắn với ô nhập (bấm nhãn thì focus vào ô); trường bắt buộc được đánh dấu nhất quán.
- Placeholder không thay thế nhãn; ví dụ định dạng hiển thị ở nơi người dùng thấy được.
- Kiểu bàn phím đúng trên mobile (email, số, điện thoại); gợi ý autofill hoạt động.
- Thông báo lỗi: nêu **lỗi gì** và **cách sửa**, đặt cạnh trường lỗi, không chỉ dùng màu; focus chuyển tới lỗi đầu tiên khi gửi; dữ liệu đã nhập **được giữ lại** sau khi báo lỗi.
- Thời điểm xác thực nhất quán (khi rời ô, khi gửi); không hiện lỗi ngay khi người dùng mới gõ ký tự đầu.
- Giới hạn độ dài có bộ đếm hoặc chặn gõ rõ ràng; dán văn bản dài, khoảng trắng đầu/cuối, ký tự đặc biệt, emoji, tiếng Việt có dấu được xử lý đúng.
- Chọn ngày, tải tệp, ô mật khẩu (hiện/ẩn), chọn nhiều mục: thao tác bằng chuột, bàn phím và cảm ứng đều làm được.
- Gửi thành công có xác nhận rõ ràng và người dùng biết bước tiếp theo; chống gửi trùng.

## 4. Trạng thái và phản hồi

Đây là nơi giao diện hay vỡ nhất, thường không có trong mockup. Kiểm từng màn hình ở:

| Trạng thái | Cần kiểm |
|---|---|
| Rỗng | Có thông điệp và hành động gợi ý, không phải trang trắng |
| Đang tải | Có chỉ báo; bố cục không nhảy khi dữ liệu về |
| Lỗi (mạng, 4xx, 5xx, hết phiên) | Thông báo dễ hiểu, có cách thử lại, không lộ chi tiết kỹ thuật |
| Ngoại tuyến/mạng chậm | Không treo vô hạn; không mất dữ liệu đang nhập |
| Một phần dữ liệu | Thiếu ảnh, thiếu trường tuỳ chọn vẫn hiển thị gọn |
| Quá nhiều | Danh sách dài, tên rất dài: cắt, xuống dòng hoặc phân trang có chủ ý |
| Quyền hạn | Vai trò khác nhau thấy đúng nút/mục của mình |

Thao tác kéo dài (>1 s) cần chỉ báo tiến trình; hành động không hoàn tác được cần xác nhận hoặc cho phép hoàn tác.

## 5. Responsive và cross-browser

- Viewport tối thiểu nên thử: 320 px (điện thoại nhỏ), 375–414 px, 768 px (máy tính bảng), 1280 px, 1920 px; xoay ngang/dọc.
- Điểm gãy (breakpoint): đứng ngay trước và sau điểm gãy, bố cục phải chuyển mượt, không có "vùng chết" nơi mọi thứ vỡ.
- Zoom trình duyệt 200% vẫn dùng được; chữ không bị cắt (xem cả §6 Reflow).
- Trình duyệt: ít nhất hai engine (Chromium và Firefox hoặc WebKit/Safari) và phiên bản mục tiêu của đội; thiết bị thật cho các luồng quan trọng vì giả lập không tái hiện hết (bàn phím ảo che ô nhập, thanh địa chỉ co giãn, safe area).
- Lỗi cross-browser thường gặp: font thay thế, `100vh` trên mobile, kiểu ô nhập ngày, cuộn quán tính, hỗ trợ CSS mới.
- Ghi rõ ma trận đã test (trình duyệt × viewport × hệ điều hành), đừng tuyên bố "chạy tốt mọi nơi".

## 6. Accessibility (WCAG 2.2, mức AA)

Kiểm cơ bản; đây không thay thế kiểm toán chuyên sâu với người dùng công nghệ hỗ trợ.

- **Bàn phím (2.1.1, 2.1.2, 2.4.3, 2.4.7):** mọi chức năng làm được chỉ bằng bàn phím; thứ tự Tab theo thứ tự đọc; không bị kẹt trong một thành phần; dấu focus luôn nhìn thấy.
- **Tương phản (1.4.3, 1.4.11):** chữ thường ≥ 4,5:1; chữ lớn (≥ 24 px, hoặc ≥ 18,66 px đậm) và thành phần giao diện/đồ hoạ cần thiết ≥ 3:1. Đo bằng công cụ, không bằng mắt.
- **Không chỉ dựa vào màu (1.4.1):** lỗi/trạng thái có thêm chữ hoặc biểu tượng.
- **Văn bản thay thế (1.1.1):** ảnh có nghĩa có alt mô tả; ảnh trang trí có alt rỗng; nút chỉ có biểu tượng có tên truy cập được.
- **Cấu trúc (1.3.1, 2.4.6):** tiêu đề phân cấp hợp lý (một h1, không nhảy cấp), vùng (landmark), nhãn form, bảng có tiêu đề cột/hàng.
- **Reflow và cỡ chữ (1.4.4, 1.4.10, 1.4.12):** zoom 200% không mất chức năng; ở rộng 320 CSS px không cần cuộn ngang (trừ bảng, bản đồ…); tăng giãn dòng/chữ không làm mất nội dung.
- **Kích thước vùng chạm (2.5.8):** tối thiểu 24×24 CSS px (hoặc đủ khoảng cách quanh); nên hướng tới 44×44 px (Apple) hay 48×48 dp (Material) trên mobile.
- **Thông báo động (4.1.3):** lỗi, thành công, cập nhật nội dung được đọc bởi trình đọc màn hình (vùng live/role phù hợp).
- **Chuyển động và thời gian (2.2.1, 2.2.2, 2.3.1):** nội dung tự chuyển động có thể dừng; không nhấp nháy quá 3 lần/giây; phiên hết hạn có cảnh báo.
- **Ngôn ngữ trang (3.1.1):** thuộc tính `lang` đúng (vd `vi`).
- Thử nhanh với trình đọc màn hình (NVDA/VoiceOver) cho luồng chính: có đọc ra tên, vai trò, trạng thái của điều khiển không.

## 7. Nội dung và ngôn ngữ

- Chính tả, thuật ngữ nhất quán một nơi một cách gọi ("Đăng nhập" không lúc "Login" lúc "Sign in").
- Không còn văn bản mẫu (lorem ipsum, "TODO", khoá i18n trần như `error.required`).
- Định dạng ngày, giờ, số, tiền tệ theo địa phương (vd 1.234.567 ₫; ngày dd/mm/yyyy nếu thiết kế vậy).
- Chuỗi dài hơn khi dịch (tiếng Đức, tiếng Việt thường dài hơn tiếng Anh) vẫn vừa nút và nhãn.
- Giọng điệu thông báo lỗi lịch sự, không đổ lỗi cho người dùng, không thuật ngữ kỹ thuật.

## 8. Chuyển checklist thành test case

Một mục checklist chưa phải test case. Biến thành test case bằng cách: gắn **màn hình/thành phần cụ thể**, **điều kiện môi trường** (trình duyệt, viewport), và **Expected đo được**.

| Mơ hồ (tránh) | Cụ thể (dùng) |
|---|---|
| "Nút Gửi hiển thị đẹp" | "Nút Gửi ở 375 px rộng: nền #1A73E8, chữ trắng, cao 48 px, bo góc 8 px, không bị cắt chữ" |
| "Responsive tốt" | "Ở viewport 320×640, trang Giỏ hàng không có thanh cuộn ngang; nút 'Thanh toán' nhìn thấy mà không cần cuộn ngang" |
| "Thông báo lỗi hợp lý" | "Bỏ trống Email rồi nhấn Gửi: dưới ô Email hiện 'Vui lòng nhập email', ô có viền đỏ, focus ở ô Email, các ô khác giữ nguyên dữ liệu" |
| "Dùng được bằng bàn phím" | "Từ đầu trang, nhấn Tab tối đa 12 lần tới được nút 'Đặt hàng'; dấu focus nhìn thấy ở mỗi lần; Enter kích hoạt nút" |

Với cùng quy trình, chỉ khác dữ liệu/viewport, dùng **data matrix** (ma trận trình duyệt × viewport, hoặc danh sách trường) thay vì lặp từng test case.

## 9. Công cụ hỗ trợ

Công cụ bắt phần máy kiểm được; phần phán đoán vẫn là của người test.

- **Trình duyệt DevTools:** thiết bị giả lập, đo khoảng cách/font, giả lập mạng chậm, Lighthouse.
- **Accessibility:** axe DevTools / axe-core, Lighthouse, WAVE, Accessibility Insights; công cụ tính tương phản; NVDA, VoiceOver.
- **Tự động hoá giao diện:** Playwright hoặc Cypress cho luồng hồi quy; ảnh chụp so sánh (visual regression: Playwright `toHaveScreenshot`, Percy, Chromatic). Khoá phần động (ngày, quảng cáo) để tránh báo sai.
- **Đa thiết bị:** BrowserStack, LambdaTest hoặc thiết bị thật.

Ứng viên tự động hoá: luồng ổn định, giá trị cao, chạy lặp nhiều (đăng nhập, thanh toán, điều hướng chính, kiểm tra axe trên từng trang). Đánh giá "dễ dùng" và "đẹp" thì không tự động hoá được.

Bảng nhu cầu → công cụ (theo slide môn học, miễn phí hoặc có gói miễn phí): tự động hoá GUI E2E: Playwright, Selenium, Cypress · hồi quy hình ảnh bằng AI: Applitools Eyes, Percy, BackstopJS · trang trại thiết bị đa trình duyệt: BrowserStack, LambdaTest/TestMu AI, CrossBrowserTesting · khả năng truy cập: axe DevTools, WAVE, Lighthouse · kiểm thử GUI bằng tác nhân: Playwright MCP + một client LLM · test ngôn ngữ tự nhiên: testRigor, mabl · checklist: Waghmare theo control, WCAG 2.2, Front-End Checklist.

## 10. Checklist theo từng control

Mỗi widget có bộ kiểm riêng. Dùng làm test condition, rồi chuyển thành test case có Expected đo được (§8). Phiếu chấm: mỗi mục ghi Có / Không / N/A, kèm **ưu tiên** (Bắt buộc / Tùy chọn) và **mức nghiêm trọng** (mẫu trong `report-templates.md` §6).

**Ô nhập văn bản (Text box)**
- Trạng thái: bật/tắt theo đặc tả (tắt = xám mờ, không con trỏ, không sửa được); điền sẵn đúng hoặc để trống; con trỏ nhấp nháy khi focus; dấu sao đỏ ở trường bắt buộc.
- Độ rộng: dừng ở độ rộng tối đa (thử bằng chữ W hoa, ký tự rộng nhất), độ rộng theo đặc tả; có thanh cuộn khi nội dung vượt quá ô.
- Đầu vào: từ chối chỉ toàn khoảng trắng; khoảng trắng + ký tự; số, ký tự đặc biệt (1 $ # + −), chữ-số + dấu; mặt nạ định dạng hiển thị đúng (vd SSN XXX-XX-XXXX) và từ chối nhập thiếu.
- Giao diện: nhãn đúng; căn lề nhất quán với các ô cùng nhóm; nhấp đúp chọn toàn bộ; con trỏ đổi hình khi rê trên ô sửa được.

**Dropdown / Combo box**
- Chỉ chọn: có mũi tên; giá trị mặc định hoặc trống (trường bắt buộc có chấp nhận trống?); từ chối giá trị ngoài danh sách; danh sách không rỗng; có thanh cuộn cho danh sách dài; gõ chữ cái đầu chọn mục tương ứng; sắp xếp (mặc định theo chữ cái), tên không bị cắt; mục đã chọn hiện ở đầu khi mở lại.
- Combo sửa được: nhập được chữ-số/ký tự đặc biệt; xoá được lựa chọn; chuyển giữa nhập tay và danh sách; giá trị gõ trùng giá trị trong danh sách không bị coi là khác; dropdown thuần không gõ được văn bản tự do; Alt+Down / Ctrl+F4 mở danh sách; mục trống/none nằm ở đầu hoặc cuối một cách nhất quán.

**Nút (Button)**
- Hành vi: bật/tắt; Tab đến đúng thứ tự; hình đổi khi nhấp; nhấp đơn, nhấp đúp, nhấp nhiều lần đều xử lý đúng; rê chuột làm nổi bật và hiện tooltip.
- Bàn phím: một nút mặc định (viền đậm) kích hoạt bằng Enter; Cancel bằng Esc; Alt + chữ gạch chân kích hoạt; Space kích hoạt nút đang focus; không trùng phím tắt trên cùng màn hình.
- Nhãn và quy ước: nhãn có nghĩa, không viết tắt, có "…" nếu mở màn hình khác; thao tác không thể sửa → xác nhận Yes/No; mọi nút cùng cỡ, hình dạng, phông; Cancel đóng vai trò Close khi không thể hoàn tác.
- Nhất quán: Search/Reset và Add/Delete cùng cỡ, phông, khoảng cách; màu báo hiệu ý định (xanh = tiến hành, đỏ = phá huỷ).

**Checkbox và nút Radio**
- Checkbox: bật/tắt; mặc định chọn/bỏ chọn đúng; nhãn phù hợp; Tab theo thứ tự; chuột, Space, Enter, Alt + chữ đều đảo trạng thái; nhấp nhãn cũng đảo; sự kiện đúng khi thay đổi; căn lề hợp lý.
- Radio: mặc định đúng; mỗi nhóm **chỉ** chọn được một; phím mũi tên di chuyển lựa chọn trong nhóm; chuột, Space, Enter, Alt + chữ đổi lựa chọn; xử lý giá trị trống từ cơ sở dữ liệu với tập cố định.

**Liên kết (Hyperlink):** màu chuẩn; gạch chân trọn mọi ký tự; mở bằng nhấp / Enter / Ctrl+nhấp; Tab đến được; dẫn đúng trang.

**Hình ảnh:** không mờ; đúng kích thước; xoay/phóng nếu có; không ảnh hỏng; căn lề đúng.

**Lưới (Grid):** có tiêu đề cột và đường lưới; nhấp tiêu đề sắp tăng/giảm kèm tín hiệu thị giác; cuộn bằng phím, con lăn, nút; nhấp đúp kích hoạt sự kiện của dòng.

**Hộp danh sách (List box):** chọn đơn bằng chuột/mũi tên; gõ chữ nhảy tới mục khớp; nhấp đúp = chọn + mở; có thanh cuộn khi cần.

**Trường ngày (Date):** năm nhuận (29/02); loại tháng 00/13, ngày 00/32, 30/02; chuyển thế kỷ; đúng định dạng nhập.

**Nút duyệt (Browse):** điền vào ô văn bản liên kết; đổi màu khi rê chuột; Space/Enter/Alt kích hoạt; khi tắt thì không nhấp được.

## 11. Kiểm hợp lệ trường nhập liệu

Nơi phần lớn lỗi GUI thực sự nằm. Chọn giá trị bằng domain testing + BVA (`test-design-istqb` §3.1); phần dưới nói giao diện phải ứng xử thế nào.

- **Số:** nhỏ nhất / lớn nhất / trong khoảng / vượt trên và dưới khoảng; xử lý trống ở đầu và cuối; cả dấu + và −; không chia cho 0; quyết định có cho số âm không; có chấp nhận số 0 không.
- **Chữ:** trống / không trống; ký tự và ký hiệu không hợp lệ; ký tự hợp lệ.
- **Quy tắc và thông báo:** mỗi quy tắc bị vi phạm có một thông báo rõ, người dùng phải sửa trước khi tiếp tục; trường bắt buộc khi cột cơ sở dữ liệu là NOT NULL và hiển thị dấu sao; giới hạn ký tự bằng kích thước cột cơ sở dữ liệu, có thông báo "giới hạn N ký tự" khi chạm mức; không báo lỗi với trường tùy chọn để trống; kiểm mọi trường với ký tự đặc biệt.
- **Quy tắc vàng:** khi có lỗi, đưa focus về trường sai và làm nổi bật nó, kể cả khi người dùng nhấp OK mà chưa rời trường.

## 12. Vì sao GUI khó, phân loại lỗi, chiến lược bốn giai đoạn

**Vì sao khó (Gerrard):** GUI là thế giới hướng sự kiện và miền đầu vào gần như vô hạn.

| Đặc điểm | Hệ quả khi test |
|---|---|
| Hướng sự kiện | Người dùng có thể nhấp bất kỳ điểm nào theo thứ tự bất kỳ; không có luồng điều khiển duy nhất |
| Sự kiện bất chợt | Sự kiện của hệ điều hành (pin, mạng, thông báo) chen vào bất cứ lúc nào |
| Phụ thuộc ẩn | Một cú nhấp kéo theo nhiều quy tắc và trạng thái của đối tượng/cửa sổ |
| Miền đầu vào "vô hạn" | Riêng thứ tự nhập các trường đã cho n! chuỗi; thêm nhấp, phím tắt, thiết bị |
| Nhiều lối vào/ra | Menu, thanh công cụ, phím tắt, menu ngữ cảnh đều phải hành xử như nhau |
| Quản lý cửa sổ | Di chuyển, đổi cỡ, phóng to/thu nhỏ, đóng đều có thể làm hỏng bố cục hoặc trạng thái |

**Các loại lỗi GUI thường gặp:** kiểm hợp lệ dữ liệu sai; mặc định trường sai; không ép buộc trường bắt buộc; truy vấn lấy sai trường hoặc trả nhiều dòng; dữ liệu trên màn hình cũ, lệch giữa đối tượng cửa sổ và cơ sở dữ liệu; sai chế độ modal của cửa sổ; lệnh hệ thống hỏng; trạng thái của control/menu không khớp trạng thái dữ liệu.

**Ví dụ lỗi điển hình trên ứng dụng thực:**
- Nút bị lớp phủ che: lỗi z-index che mất "Sign in", người dùng âm thầm không đăng nhập được.
- `NaN` trong ô giá: trạng thái chưa xử lý hiển thị "NaN ₫", mất niềm tin tức thì.
- Gửi trùng khi nhấp đúp: thiếu debounce nên đơn hàng bị nhân đôi ở backend.
- Vỡ bố cục khi đổi kích thước: phần tử chồng lấn hoặc bị cắt ở độ phân giải khác.
- Trang lỗi (vd 503) là dump thô của máy chủ: phải đọc được, đúng thương hiệu và có lối quay lại.

**Chiến lược bốn giai đoạn:**
1. Mức thấp: checklist và điều hướng.
2. Ứng dụng: lớp tương đương, giá trị biên, bảng quyết định, chuyển trạng thái.
3. Tích hợp: desktop, client/server, đồng bộ.
4. Phi chức năng: chịu tải kéo dài, tương thích, nền tảng.

Nên kiểm tra thêm câu hỏi thực tế ở mỗi màn hình: bố cục có ổn ở 1366×768 và 1920×1080 không, thao tác được bằng bàn phím không, phông/màu tiêu đề/căn lề cột có nhất quán không, hàng bị tắt có làm xám không, có phân trang không.

## 13. Tự động hoá đúng thứ cần

Nguyên tắc Pareto: khoảng 80% lợi ích đến từ 20% test.

| Nên tự động | Giữ thủ công |
|---|---|
| Kiểm thử điều hướng và checklist; số lượng lớn ca EP/BVA/bảng quyết định; chạy chịu tải, tương thích, nền tảng | Kiểm thử đồng bộ và tương tác phức tạp; những gì rất nhạy với thay đổi UI |

- **Viết mã tốt hơn ghi lại:** script viết tay theo Page Object Model trụ được khi UI đổi; script ghi lại thì dễ vỡ.
- **Kết hợp là bình thường:** trộn hồi quy tự động với kiểm thử thăm dò thủ công; riêng lẻ đều không đủ.

## 14. AI trong kiểm thử GUI

Theo slide môn học (xu hướng 2024–2026). Công cụ đổi rất nhanh: kiểm tra lại tên và tính năng trước khi dùng.

- **Visual AI** (Applitools Eyes, Percy): mô hình học máy so sánh màn hình đã render, bỏ qua nhiều chấp nhận được nhưng bắt được sai lệch bố cục thực, ít báo động giả hơn nhiều so với so pixel.
- **Bộ định vị tự phục hồi (self-healing):** khi selector chính hỏng, công cụ định vị lại phần tử. Hãy **ghi log mọi lần phục hồi**: tự phục hồi có thể che một lỗi hồi quy thật, nên giữ khẳng định tất định cho luồng quan trọng.
- **Test bằng ngôn ngữ tự nhiên** (testRigor, mabl): viết test bằng tiếng Anh thường, bền vì không có bộ định vị cứng.
- **Tác nhân trình duyệt** (Playwright MCP): một LLM điều khiển trình duyệt thực qua cây khả truy cập (vai trò + tên, không phải pixel), khám phá GUI từ ý định mức cao. Tác nhân AI là bất định: tốt để khám phá, yếu khi làm cổng hồi quy.
- **Kiểm thử giao diện do AI sinh** (v0, Lovable, Bolt, Cursor): DOM thay đổi và khác nhau giữa các lần chạy. Dùng bộ định vị theo vai trò/nhãn kèm baseline visual-AI; coi mã sinh ra là không đáng tin; với màn hình do LLM sinh, khẳng định theo cấu trúc/schema thay vì văn bản chính xác; quét khả năng truy cập (axe-core) mỗi lần sinh lại.
- **Giữ con người trong vòng lặp:** review các thành phần được sinh và kết luận lỗi.
