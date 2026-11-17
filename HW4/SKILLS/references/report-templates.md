# Mẫu tài liệu cho GUI & Usability testing

Mục lục: 1 Test case GUI · 2 Nhật ký usability issue · 3 Kịch bản điều phối · 4 Bảng ghi quan sát · 5 Báo cáo tổng kết · 6 Phiếu đánh giá GUI (checklist) · 7 Kế hoạch usability 9 phần · 8 Ma trận tương thích và báo cáo ngắn

Bug report cho lỗi giao diện/chức năng dùng mẫu ở `test-design-istqb` §5; thêm vào đó **viewport, trình duyệt/phiên bản, thiết bị, ảnh chụp có đánh dấu** và tần suất.

## 1. Test case GUI

Cột: **ID · Tiêu đề · Thành phần/Màn hình · Checklist (mục nguồn) · Môi trường (trình duyệt, viewport) · Precondition · Steps · Expected · Actual · Verdict · Bằng chứng · Bug ID**.

Ví dụ (dạng step-by-step):

| Trường | Giá trị |
|---|---|
| ID | TC-GUI-12 |
| Tiêu đề | Kiểm tra hiển thị lỗi khi gửi form Đăng nhập với Email bỏ trống |
| Thành phần | Trang Đăng nhập |
| Checklist | gui-checklist §3 (thông báo lỗi) |
| Môi trường | Chrome (bản mục tiêu), viewport 375×812 |
| Precondition | Đã mở trang Đăng nhập, chưa đăng nhập |
| Steps | 1. Để trống ô Email. 2. Nhập "Abc@12345" vào ô Mật khẩu. 3. Nhấn nút "Đăng nhập". |
| Expected | Dưới ô Email hiện "Vui lòng nhập email"; ô Email có viền đỏ; con trỏ nằm ở ô Email; ô Mật khẩu vẫn giữ giá trị đã nhập; không chuyển trang |
| Dọn dẹp | Không cần |

Ví dụ (dạng data matrix cho responsive): quy trình chung "Mở trang Giỏ hàng có 3 sản phẩm, quan sát bố cục", mỗi dòng một viewport:

| Covers | Viewport | Expected |
|---|---|---|
| Điện thoại nhỏ | 320×640 | Không có thanh cuộn ngang; nút "Thanh toán" thấy được; giá không bị cắt |
| Điện thoại | 390×844 | Sản phẩm xếp 1 cột; ảnh giữ tỉ lệ 1:1 |
| Máy tính bảng | 768×1024 | Sản phẩm 2 cột; tóm tắt đơn hàng nằm dưới danh sách |
| Máy tính | 1280×800 | Tóm tắt đơn hàng cố định bên phải |

## 2. Nhật ký usability issue

Mỗi dòng/thẻ một vấn đề:

| Trường | Nội dung |
|---|---|
| ID | UX-01 |
| Tiêu đề | Ngắn, nêu vấn đề + vị trí: "Người dùng không tìm thấy nút Đặt bàn trên trang chủ" |
| Vị trí | Màn hình / bước task |
| Phương pháp phát hiện | Heuristic / Walkthrough / Usability test (ai, bao nhiêu người) |
| Heuristic vi phạm | Heuristic chính (và phụ nếu có) |
| Mô tả và bằng chứng | Hành vi quan sát được, trích lời, mốc thời gian video, ảnh |
| Tần suất | vd 4/5 người gặp |
| Ảnh hưởng đến task | Chặn / làm chậm / khó chịu |
| Severity (0–4) | Kèm lý do ngắn (tần suất, tác động, tính dai dẳng) |
| Khuyến nghị | Cách sửa cụ thể; phương án thay thế nếu có |
| Cách kiểm lại | Task + tiêu chí chứng minh đã sửa |
| Trạng thái | New / Assigned / Fixed / Retest / Closed |

Ví dụ ngắn: UX-03 · "Thông báo lỗi thanh toán không nói thẻ bị từ chối vì lý do gì" · Heuristic 9 · 3/5 người thử lại cùng thẻ 2–3 lần rồi bỏ cuộc · Severity 3 · Khuyến nghị: nêu lý do (thiếu số dư/sai CVV/thẻ hết hạn) và gợi ý hành động; hiển thị ngay trên form thay vì toast tự tắt sau 3 s · Kiểm lại: task "Thanh toán đơn hàng" với thẻ test bị từ chối, 5/5 người xác định được cách sửa trong ≤ 1 phút.

## 3. Kịch bản điều phối (moderator script)

```
1. Mở đầu (2–3 phút)
   "Cảm ơn bạn đã tham gia. Hôm nay chúng tôi thử nghiệm [sản phẩm], không phải thử nghiệm bạn.
   Không có câu trả lời đúng hay sai. Nếu thấy khó, đó là lỗi của sản phẩm và rất hữu ích cho chúng tôi.
   Bạn có thể dừng bất cứ lúc nào. Chúng tôi xin ghi màn hình và giọng nói chỉ để phân tích nội bộ. Bạn đồng ý chứ?"

2. Câu hỏi nền (2 phút)
   - Bạn thường dùng [loại sản phẩm tương tự] bao lâu một lần? Trên thiết bị nào?

3. Hướng dẫn think-aloud (1 phút)
   "Khi làm, xin hãy nói to điều bạn đang nghĩ, đang tìm gì, hoặc thấy bối rối ở đâu. Mình sẽ không trả lời câu hỏi
   về cách dùng trong lúc bạn làm, vì mình muốn xem bạn sẽ làm gì nếu một mình."

4. Task 1..N (mỗi task đưa thẻ kịch bản, rồi im lặng quan sát)
   Task: [kịch bản tình huống, không lộ tên nút]
   Dừng khi: người dùng báo xong, hoặc quá [X] phút, hoặc kẹt hoàn toàn (ghi "cần trợ giúp").
   Sau mỗi task:
   - SEQ: "Từ 1 (rất khó) đến 7 (rất dễ), bạn thấy task này thế nào?"
   - "Điều gì khiến nó dễ/khó?"

5. Kết thúc (5 phút)
   - SUS (10 câu)
   - "Điều bạn thích nhất / khó chịu nhất là gì?"
   - "Nếu có một cây đũa thần, bạn sẽ đổi điều gì?"
   - Cảm ơn, giải thích bước tiếp theo, (nếu có) quà cảm ơn.
```

Câu gợi mở trung tính khi cần: "Bạn đang nghĩ gì?", "Bạn mong đợi điều gì xảy ra khi bấm vào đó?", "Bạn sẽ làm gì tiếp?". Tránh: "Có phải nút này dễ thấy không?", "Bạn nên bấm vào Menu".

## 4. Bảng ghi quan sát (mỗi người tham gia, mỗi task)

| P# | Task | Kết quả (Thành công / Có trợ giúp / Thất bại) | Thời gian | Số lỗi | SEQ | Quan sát (hành vi) | Trích lời | Mốc video |
|---|---|---|---|---|---|---|---|---|
| P1 | T1 | Thành công | 02:10 | 1 | 6 | Bấm "Menu" thay vì "Đặt bàn", rồi quay lại | "Mình tưởng nó nằm trong menu" | 03:42 |

Ghi **hành vi** ở một cột, **diễn giải** ở chỗ khác khi phân tích.

## 5. Báo cáo tổng kết Usability / GUI

Theo khung Test Summary của `test-design-istqb` §6, điều chỉnh như sau.

1. **Tóm tắt điều hành (≤ 1 trang):** kết luận chính, 3–5 vấn đề ưu tiên cao nhất, khuyến nghị Go/No-Go có lý do.
2. **Phạm vi và phương pháp:** màn hình/luồng đã test; phương pháp (checklist GUI, heuristic, walkthrough, usability test); **không test gì và vì sao**.
3. **Môi trường và người tham gia:** trình duyệt, thiết bị, viewport; người đánh giá/tham gia (số lượng, hồ sơ, cách tuyển); build/commit.
4. **Kết quả GUI:** tổng TC · Executed · Passed · Failed · Blocked/Not run; lỗi theo nhóm (bố cục, trạng thái, responsive, accessibility…) và severity.
5. **Kết quả khả dụng:** bảng theo task: tỉ lệ hoàn thành (không trợ giúp / có trợ giúp / thất bại), thời gian trung vị, số lỗi, SEQ trung bình; SUS (kèm cỡ mẫu và lưu ý độ tin cậy).
6. **Danh sách usability issue** xếp theo severity (UX-ID, tiêu đề, heuristic, tần suất, severity, khuyến nghị).
7. **Điểm làm tốt** cần giữ.
8. **Rủi ro còn lại và giới hạn:** cỡ mẫu nhỏ, nhóm người dùng/thiết bị chưa phủ, vấn đề chưa xác nhận.
9. **Khuyến nghị và bước tiếp theo:** sửa gì trước, test lại gì, vòng sau cần mở rộng gì.
10. **Phụ lục:** kịch bản task, bảng quan sát, clip/ảnh chụp, bảng điểm SUS từng người.

Số liệu tổng hợp tính bằng script hoặc công thức từ dữ liệu quan sát; không gõ tay.

## 6. Phiếu đánh giá GUI (checklist có chấm)

Biến heuristic và checklist theo control thành phiếu cụ thể, chấm được. Phần đầu phiếu: Mã dự án · Phiên bản sản phẩm · Người đánh giá · Ngày · Quy mô sản phẩm · Công sức (người-giờ).

| # | Câu hỏi | Có | Không | N/A | Ghi chú | Ưu tiên | Mức nghiêm trọng |
|---|---|---|---|---|---|---|---|
| 1 | Thiết kế đồ hoạ GUI đã được review/chấp thuận bởi khách hàng chưa? | | | | | Bắt buộc | |
| 2 | Các nhãn có căn lề thống nhất không? | | | | | Tùy chọn | |
| 3 | Thứ tự Tab có đúng không? | | | | | Bắt buộc | |
| 4 | Con trỏ có đổi thành đồng hồ cát khi xử lý nền không? | | | | | Tùy chọn | |
| 5 | Các ô nhập có chấp nhận đúng độ dài chuỗi theo đặc tả không? | | | | | Tùy chọn | |

Quy ước: **Ưu tiên** = Bắt buộc / Tùy chọn; **Mức nghiêm trọng** theo thang thống nhất của dự án (vd 1–4). Mỗi dòng "Không" kèm Ghi chú và bằng chứng; mục "Không" ở ưu tiên Bắt buộc sinh một bug report. Nguồn câu hỏi: `gui-checklist.md` §10 và §11 và các bộ nguyên tắc ở `usability-methods.md` §1.

Sản phẩm điển hình của một buổi đánh giá GUI thực tế (bài tập môn học): một phiếu đánh giá đã điền kèm mỗi sai lệch có ưu tiên và mức nghiêm trọng, cộng ghi chú một trang so sánh những gì **thủ công, checklist và AI** bắt được. Dùng màn hình đăng nhập và một biểu mẫu mẫu làm đối tượng.

## 7. Kế hoạch usability test 9 phần (khung)

```
1. Mục đích
2. Phát biểu vấn đề (câu hỏi cụ thể, trả lời được bằng dữ liệu)
3. Mục tiêu và tác vụ kiểm thử
   | Tác vụ | Trạng thái bắt đầu | Tiêu chí thành công | Benchmark |
4. Hồ sơ người dùng (nhóm, tiêu chí tuyển, số lượng)
5. Phương pháp và thiết kế (loại kiểm thử, có/không điều phối, định tính/định lượng,
   nhóm độc lập hay trong-đối-tượng, thứ tự tác vụ)
6. Môi trường / thiết bị (địa điểm, thiết bị, build, dữ liệu thử, công cụ ghi)
7. Vai trò người điều phối (điều phối, ghi chép, quan sát)
8. Số đo đánh giá và dữ liệu cần thu
   (hiệu năng: thời gian, % hoàn thành, số lỗi, lần truy cập trợ giúp;
    sở thích: Likert/SEQ/SUS, câu hỏi mở)
9. Nội dung báo cáo (cấu trúc §5, kèm khuyến nghị có ưu tiên và một ảnh/clip làm bằng chứng)
```

Bài tập thu nhỏ điển hình: viết kế hoạch rút gọn cho một sản phẩm, định nghĩa 3 tác vụ thực mỗi tác vụ có tiêu chí thành công và benchmark thời gian; chạy think-aloud với 3 người dùng; thu hiệu năng (thời gian, lỗi, % hoàn thành) và sở thích (Likert ngắn + SEQ); xếp hạng vấn đề theo nghiêm trọng × xác suất; thêm một công cụ miễn phí (heatmap Clarity hoặc axe-core) để xem nó lộ ra điều người dùng không nói. Sản phẩm: báo cáo một trang gồm phát hiện chính, khuyến nghị có ưu tiên và một ảnh chụp bằng chứng.

## 8. Ma trận tương thích và báo cáo ngắn

Ma trận (dựng từ dữ liệu phân tích thực, xem `compatibility-testing.md` §2):

| Tổ hợp | Trình duyệt + phiên bản | HĐH / thiết bị | Viewport | Ưu tiên | Bậc công cụ | Kết quả | Bug ID |
|---|---|---|---|---|---|---|---|
| C-01 | Chrome (bản mục tiêu) | Windows 11 | 1366×768 | P1 | 1 + 4 | Pass | |
| C-02 | Safari iOS | iPhone thật | 390×844 | P1 | 4 | Fail | BUG-07 |
| C-03 | Firefox | Ubuntu | 1280×800 | P2 | 1 | Pass | |

Báo cáo tương thích ngắn: (1) ma trận đã test và **lý do chọn** (số liệu analytics nào); (2) tổ hợp chưa test và vì sao; (3) kết quả theo tổ hợp và theo bậc công cụ; (4) lỗi theo engine (Blink/WebKit/Gecko) kèm ảnh chụp; (5) lỗi chỉ tái hiện trên thiết bị thực; (6) rủi ro còn lại và khuyến nghị.
