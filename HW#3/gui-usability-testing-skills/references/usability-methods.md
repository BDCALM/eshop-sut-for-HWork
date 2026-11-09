# Phương pháp kiểm thử khả dụng (Usability)

Mục lục: 1 Heuristic evaluation (Nielsen, Norman, Shneiderman) · 2 Cognitive walkthrough · 3 Usability test theo task · 4 Chỉ số và công thức · 5 Phân tích và báo cáo · 6 Khung Rubin & Chisnell: sáu thành phần, bốn loại, cách tổ chức · 7 Kế hoạch 9 phần và chọn tác vụ · 8 Bảng hỏi sở thích · 9 Công cụ

## 1. Heuristic evaluation (Nielsen)

Chuyên gia duyệt giao diện đối chiếu 10 nguyên tắc chung. Rẻ, nhanh, không cần người dùng, nhưng cho **giả thuyết** về vấn đề, có thể có báo nhầm. Một người đánh giá chỉ bắt được phần nhỏ vấn đề; tốt nhất 3–5 người làm độc lập rồi gộp. Nếu chỉ có một người (hoặc AI), ghi rõ giới hạn này trong báo cáo.

Cách làm: duyệt từng màn hình của luồng chính **ít nhất hai lượt**, lượt đầu để nắm luồng, lượt sau để soi từng phần tử theo heuristic. Mỗi phát hiện ghi: vị trí, heuristic bị vi phạm, mô tả, severity 0–4, khuyến nghị.

| # | Heuristic | Hỏi khi kiểm | Dấu hiệu vi phạm |
|---|---|---|---|
| 1 | Hiển thị trạng thái hệ thống | Người dùng có biết chuyện gì đang xảy ra, đang ở đâu? | Bấm nút không thấy phản hồi; không có chỉ báo tải; không biết đang ở bước mấy |
| 2 | Khớp với thế giới thực | Ngôn ngữ, biểu tượng, thứ tự có theo cách người dùng nghĩ? | Thuật ngữ nội bộ ("Entity", mã lỗi); biểu tượng khó hiểu; thứ tự phi tự nhiên |
| 3 | Kiểm soát và tự do cho người dùng | Có lối thoát khi lỡ tay (hoàn tác, huỷ, quay lại)? | Không huỷ được giữa chừng; xoá không hoàn tác; không có "Đóng" |
| 4 | Nhất quán và tuân theo chuẩn | Cùng việc có cùng cách làm/cách gọi? Theo quy ước nền tảng? | Hai nút khác tên cùng chức năng; "Lưu" ở nơi này một kiểu, nơi kia một kiểu |
| 5 | Ngăn ngừa lỗi | Thiết kế có chặn lỗi từ trước, thay vì chỉ báo lỗi sau? | Cho nhập ngày quá khứ vào ô "ngày giao"; nút nguy hiểm sát nút thường dùng; không xác nhận hành động xoá |
| 6 | Nhận ra hơn là nhớ lại | Thông tin cần thiết có hiển thị, không bắt nhớ giữa các màn? | Bắt nhớ mã từ trang trước; tuỳ chọn ẩn sâu; nhãn chỉ có trong placeholder |
| 7 | Linh hoạt và hiệu quả | Người mới và người quen đều có đường đi tốt? | Không có phím tắt/tìm kiếm/lọc cho người dùng thường xuyên; bắt lặp thao tác nhập lại |
| 8 | Thẩm mỹ và tối giản | Thông tin thừa có che thông tin quan trọng không? | Màn hình nhồi nhiều lựa chọn ngang hàng; trang trí cạnh tranh sự chú ý với nội dung chính |
| 9 | Giúp nhận biết, chẩn đoán, khắc phục lỗi | Thông báo lỗi nói rõ lỗi gì và cách sửa? | "Đã xảy ra lỗi"; mã lỗi trần; lỗi không chỉ ra trường nào |
| 10 | Trợ giúp và tài liệu | Có trợ giúp đúng lúc, dễ tìm, ngắn gọn, theo task? | Không có trợ giúp ngữ cảnh; tài liệu dài, không tìm được |

Mẹo: một vấn đề thường vi phạm nhiều heuristic; chọn heuristic **chính** để nhóm các phát hiện. Đừng bịa vấn đề cho đủ 10 mục: nếu heuristic nào không có phát hiện, ghi "không thấy vấn đề".

### Bộ nguyên tắc bổ sung: Norman và Shneiderman

Ba bộ này là nguồn của checklist GUI (đầu vào: yêu cầu và đặc tả UI, Nielsen 10, Norman 6, Shneiderman 8, hướng dẫn nền tảng và W3C WCAG, checklist theo control). Biến nguyên tắc thành phiếu đánh giá cụ thể, chấm được.

**6 nguyên tắc của Norman:** mỗi nguyên tắc là một câu người dùng thầm đặt cho giao diện.

| Nguyên tắc | Câu hỏi |
|---|---|
| Khả kiến (Visibility) | "Tôi có thấy nó không?" |
| Phản hồi (Feedback) | "Nó đang làm gì?" |
| Gợi ý sử dụng (Affordance) | "Tôi dùng nó thế nào?" |
| Ánh xạ (Mapping) | "Tôi đang ở đâu, đi đâu được?" |
| Ràng buộc (Constraints) | "Sao tôi không làm được điều đó?" |
| Nhất quán (Consistency) | "Hình như tôi đã gặp cái này rồi" |

**8 quy tắc vàng của Shneiderman:** (1) hướng tới sự nhất quán; (2) cho người dùng thường xuyên dùng phím tắt; (3) cung cấp phản hồi giàu thông tin; (4) thiết kế hộp thoại có điểm kết thúc rõ; (5) xử lý lỗi đơn giản; (6) cho phép dễ dàng hoàn tác thao tác; (7) hỗ trợ người dùng làm chủ thao tác (internal locus of control); (8) giảm tải trí nhớ ngắn hạn.

## 2. Cognitive walkthrough

Đóng vai người dùng **mới, lần đầu**, đi qua từng bước của một task và trả lời bốn câu cho mỗi bước:

1. Người dùng có biết cần làm gì ở bước này (mục tiêu con) không?
2. Họ có **nhìn thấy** điều khiển đúng để làm không?
3. Họ có **liên hệ** được điều khiển đó với mục tiêu (nhãn/biểu tượng có gợi ý đúng) không?
4. Sau khi làm, họ có nhận được **phản hồi** cho thấy tiến triển không?

Một câu trả lời "không" là một vấn đề cần ghi (bước nào, câu nào, vì sao). Phù hợp với giao diện cho người dùng thỉnh thoảng/lần đầu (cổng thông tin, thanh toán, kiosk).

## 3. Usability test theo task

Quan sát người dùng thật làm các task thật, để thấy chỗ họ vướng. Mục tiêu chính của mẫu nhỏ là **phát hiện vấn đề**, không phải đo thống kê.

### 3.1 Chuẩn bị

- **Mục tiêu và câu hỏi nghiên cứu:** ví dụ "Người mới có đặt được bàn trong 3 phút mà không cần trợ giúp không?"
- **Người tham gia:** tuyển theo persona thật của sản phẩm (không phải đồng nghiệp trong nhóm dev). Khoảng 5 người mỗi nhóm người dùng khác biệt thường lộ phần lớn vấn đề lớn; thêm nhóm nếu có nhiều loại người dùng khác hẳn nhau (khách và quản trị, chẳng hạn). Sau 5 người, vòng sửa-rồi-test-lại hiệu quả hơn tăng mẫu.
- **Task scenario:** viết như tình huống đời thực, **không lộ tên nút/đường đi**.
  - Tốt: "Bạn muốn ăn tối cùng 4 bạn vào thứ Sáu tuần này lúc 19:00. Hãy đặt một bàn."
  - Tệ: "Bấm vào 'Đặt bàn' rồi chọn số người 4."
- **Tiêu chí thành công cho từng task, viết trước khi chạy:** hoàn thành/không, trong bao lâu, số lỗi cho phép, có cần trợ giúp không. Ví dụ: "Thành công = đặt bàn đúng ngày giờ và số người, ≤ 3 phút, không cần gợi ý."
- **Môi trường và dữ liệu:** build ổn định, dữ liệu thử đã dựng, ghi màn hình + tiếng (xin phép trước). Chạy thử một lượt (pilot) để sửa kịch bản.
- **Đạo đức:** người tham gia biết mình **đang test sản phẩm chứ không phải test họ**, có thể dừng bất cứ lúc nào, đồng ý ghi hình, dữ liệu cá nhân được bảo vệ.

### 3.2 Điều phối (moderate)

Kịch bản gợi ý (mẫu đầy đủ trong `report-templates.md`):

1. **Mở đầu (2–3 phút):** giới thiệu, nhấn mạnh "không có đúng sai, chúng tôi test sản phẩm", xin phép ghi hình.
2. **Câu hỏi nền:** kinh nghiệm với loại sản phẩm tương tự.
3. **Hướng dẫn think-aloud:** "Xin hãy nói to điều bạn đang nghĩ, đang tìm gì, đang bối rối ở đâu."
4. **Các task** theo thứ tự đã định (xoay thứ tự nếu có nhiều người để tránh hiệu ứng học tập). Mỗi task: đưa kịch bản bằng giấy/chat, **im lặng quan sát**.
5. **Sau mỗi task:** hỏi SEQ (xem §4) và 1–2 câu mở ("Điều gì khiến việc này dễ/khó?").
6. **Cuối buổi:** hỏi SUS, cảm nhận chung, điều thích/không thích nhất.

Nguyên tắc điều phối:

- **Im lặng là công cụ.** Đừng cứu người tham gia ngay khi họ khựng; để họ tự xoay xở rồi ghi lại.
- Khi họ im lâu: "Bạn đang nghĩ gì vậy?"; khi họ hỏi bạn: "Bạn sẽ làm gì nếu tôi không ở đây?", "Theo bạn thì nó sẽ làm gì?".
- **Không dẫn dắt, không bảo vệ sản phẩm**, không giải thích thiết kế trong lúc test.
- Chỉ can thiệp khi họ kẹt hoàn toàn hoặc hết thời gian: ghi nhận "task thất bại/cần trợ giúp" rồi gợi ý để đi tiếp.
- Ghi chú **hành vi** (nhấn vào đâu, lùi lại mấy lần, nói gì) tách khỏi **diễn giải** của người quan sát.

### 3.3 Từ xa hay tại chỗ

Test tại chỗ (có điều phối) cho nhiều chi tiết; test từ xa có điều phối tiện và rẻ; test từ xa không điều phối (nền tảng tự động) cho mẫu lớn nhưng ít chiều sâu. Chọn theo câu hỏi nghiên cứu và ngân sách; ghi rõ hình thức đã dùng.

## 4. Chỉ số và công thức

Với mẫu nhỏ, báo số tuyệt đối ("4/5 hoàn thành") rõ hơn phần trăm ("80%"), và nêu rõ cỡ mẫu.

| Chỉ số | Cách đo | Ghi chú |
|---|---|---|
| **Tỉ lệ hoàn thành task** | số người hoàn thành đúng tiêu chí / số người thử | Chia: thành công không trợ giúp, thành công có trợ giúp, thất bại |
| **Thời gian hoàn thành** | từ lúc bắt đầu đến lúc xong (chỉ với task thành công) | Dùng trung vị nếu có ngoại lai; thời gian think-aloud dài hơn bình thường |
| **Số lỗi/số bước thừa** | đếm thao tác sai, quay lại, bấm nhầm | So với đường đi tối ưu |
| **SEQ (Single Ease Question)** | sau mỗi task: "Nhìn chung, task này dễ hay khó?" thang 1 (rất khó) – 7 (rất dễ) | Trung bình thường quanh 5,5 |
| **SUS (System Usability Scale)** | 10 câu, thang 1–5, cuối buổi | Công thức dưới |
| **Hài lòng / ý định giới thiệu** | câu hỏi mở hoặc thang | Phụ trợ, không thay cho hành vi |

**SUS:** 10 câu xen kẽ tích cực (lẻ) và tiêu cực (chẵn). Với mỗi người:

- câu lẻ (1,3,5,7,9): điểm − 1
- câu chẵn (2,4,6,8,10): 5 − điểm
- tổng 10 giá trị × 2,5 → điểm 0–100

Điểm SUS **không phải phần trăm**; trung bình ngành khoảng 68. Dưới ~51 thường là kém, trên ~80 là tốt. Điểm SUS chỉ đáng tin khi có cỡ mẫu đủ (thường ≥ 12–15); với 5 người chỉ nên dùng như dấu hiệu tham khảo. Tính bằng script:

```python
def sus(answers):  # answers: danh sách 10 số, mỗi số 1..5
    odd = sum(a - 1 for a in answers[0::2])
    even = sum(5 - a for a in answers[1::2])
    return (odd + even) * 2.5
```

Mười câu SUS (bản tiếng Việt gợi ý): (1) Tôi nghĩ mình sẽ muốn dùng hệ thống này thường xuyên. (2) Tôi thấy hệ thống phức tạp không cần thiết. (3) Tôi thấy hệ thống dễ dùng. (4) Tôi nghĩ mình cần sự hỗ trợ của người có kỹ thuật để dùng được hệ thống. (5) Tôi thấy các chức năng được tích hợp tốt. (6) Tôi thấy hệ thống có quá nhiều điểm không nhất quán. (7) Tôi nghĩ hầu hết mọi người sẽ học cách dùng hệ thống này rất nhanh. (8) Tôi thấy hệ thống rất rườm rà khi dùng. (9) Tôi cảm thấy rất tự tin khi dùng hệ thống. (10) Tôi cần học nhiều thứ trước khi có thể dùng hệ thống này.

## 5. Phân tích và báo cáo

1. **Gom quan sát** theo task và theo màn hình: ghi ai gặp, ở bước nào, hành vi gì.
2. **Nhóm thành vấn đề** khi ≥ 2 người gặp cùng chỗ hoặc một người gặp chỗ chặn hoàn toàn; vấn đề chỉ một người, nhẹ, ghi ở mức "quan sát" thay vì kết luận.
3. **Gán severity 0–4** (SKILL.md §5), liên kết heuristic vi phạm, đính bằng chứng (clip, trích lời, ảnh).
4. **Đề xuất sửa** cụ thể, kèm cách kiểm lại (task nào, tiêu chí nào sẽ chứng minh đã sửa).
5. **Nêu cả điểm làm tốt** để đội giữ lại khi thiết kế lại.
6. Sau khi sửa, **test lại** các task bị ảnh hưởng và chạy regression giao diện ở vùng liên quan.

Giới hạn cần nêu trong báo cáo: cỡ mẫu, cách tuyển, môi trường, những gì không test (thiết bị, nhóm người dùng, tính năng).

Theo Rubin, **mức tới hạn của vấn đề = mức nghiêm trọng × xác suất (tần suất) gặp**; sửa vấn đề tới hạn cao trước. Bắt đầu phân tích từ các **tác vụ thất bại**, xác định từng lỗi người dùng gặp và nguồn gốc của nó.

## 6. Khung Rubin & Chisnell (Handbook of Usability Testing)

Nguồn: Jeffrey Rubin & Dana Chisnell, *Handbook of Usability Testing* (Wiley). Kiểm thử khả dụng không bảo đảm thành công, nhưng một buổi tốt phơi bày các vấn đề then chốt trước khi người dùng gặp. Chạy đúng chức năng không có nghĩa là khả dụng: mọi nút có thể chạy mà người dùng vẫn không hoàn thành tác vụ. Quan sát, đừng chỉ hỏi: cái "vì sao" đằng sau thất bại quan trọng ngang tỷ lệ thành công. Chưa phải kiểm thử nếu bằng chứng chưa làm thay đổi sản phẩm.

**Sáu thành phần bắt buộc** (thiếu thành phần nào cũng chưa phải kiểm thử khả dụng):
1. **Mục tiêu cụ thể:** phát biểu vấn đề và kế hoạch kiểm thử; cần trả lời câu hỏi gì.
2. **Người dùng đại diện:** mẫu thực của nhóm đối tượng, tuyển theo hồ sơ định sẵn.
3. **Môi trường thực:** phản ánh điều kiện sử dụng thực, không phải mặc định lý tưởng hoá.
4. **Quan sát:** xem người dùng làm việc và rà sản phẩm khi họ thao tác.
5. **Dữ liệu định lượng và định tính:** thu số đo và cảm nhận cùng lúc.
6. **Phân tích và khuyến nghị:** biến quan sát thành các bản sửa được ưu tiên.

**Bốn loại kiểm thử xuyên suốt vòng đời:**

| Loại | Khi nào | Đặc điểm |
|---|---|---|
| Thăm dò (exploratory) | Sớm | Trên phác thảo/wireframe; đánh giá ý tưởng cơ bản bằng tác vụ nông; phi chính thức, người tham gia tương tác nhiều |
| Đánh giá (assessment) | Giữa | Sau khi ý tưởng cố định; tác vụ rõ ràng, ít can thiệp, thu số đo định lượng |
| Xác nhận (validation) | Muộn | Gần phát hành, "bảo hiểm thảm hoạ": kiểm cả sản phẩm gồm trợ giúp và tài liệu, đối chiếu benchmark định trước |
| So sánh (comparison) | Bất kỳ lúc nào | So các thiết kế thay thế bằng số đo khách quan; kết hợp ưu điểm của mỗi bên |

**Cách tổ chức (chọn theo ngân sách, giai đoạn, câu hỏi):**
- Có điều phối viên: có người dẫn, truy vấn "vì sao?", insight định tính giàu nhưng chậm, tốn hơn. Không điều phối: tự làm từ xa, rẻ và dễ mở rộng, không hỏi thêm được.
- Định tính: nghĩ thành lời, phỏng vấn, quan sát, giải thích hành vi. Định lượng: độ đo tác vụ, benchmark, SUS, đo lường hành vi.
- Địa điểm: tại phòng lab · từ xa đồng bộ · từ xa bất đồng bộ · guerrilla/hành lang; mỗi cách đánh đổi mức kiểm soát lấy độ phủ.

**Môi trường kiểm thử:** phòng đơn giản (người quan sát ngồi gần hoặc tách khỏi người đánh giá, rẻ nhất) · phòng quan sát điện tử (kính một chiều hoặc camera truyền sang phòng quan sát riêng) · lab khả dụng cổ điển (vùng Quan sát, Đánh giá, Điều khiển, có thiết bị ghi hình) · lab di động (bộ kit mang tới môi trường thực của người dùng).

## 7. Kế hoạch 9 phần và chọn tác vụ

Lập kế hoạch **trước khi tuyển**: kế hoạch là bản cam kết của nghiên cứu.

1. Mục đích
2. Phát biểu vấn đề (câu hỏi cụ thể)
3. Mục tiêu và tác vụ kiểm thử
4. Hồ sơ người dùng
5. Phương pháp và thiết kế kiểm thử
6. Môi trường / thiết bị
7. Vai trò người điều phối
8. Số đo đánh giá và dữ liệu cần thu
9. Nội dung báo cáo

**Chọn tác vụ.** Tác vụ là điều người dùng muốn làm (góc nhìn người dùng, không phải hiện thực), cụ thể và đo được. Tác vụ tốt:
- là mục tiêu thực ("tạo và lưu tài liệu", "tìm đúng tài liệu");
- không chỉ cách làm mà bộc lộ lỗi một cách gián tiếp;
- bao phủ các hành trình chính, thường xuyên;
- có tiêu chí thành công và benchmark rõ ràng.

Mỗi tác vụ gồm: **Tác vụ · Trạng thái (trạng thái bắt đầu) · Thành công · Benchmark.** Ví dụ: Tác vụ = nạp giấy vào máy photo; Trạng thái = khay giấy trống; Thành công = giấy được nạp đúng; Benchmark = xong trong 1 phút. Ví dụ khác: tạo máy ảo bằng wizard, trạng thái = phần mềm vừa cài, thành công = máy ảo chạy được, benchmark = 30 giây.

**Người đánh giá:** đại diện cho người dùng mục tiêu; thiết kế nhóm độc lập hoặc trong-đối-tượng (tránh lệch do lặp lại); đủ số lượng; có động viên/thưởng.

## 8. Bảng hỏi sở thích

**Đo gì: hiệu năng và sở thích.** Thu cả hai, rồi gắn mỗi chỉ số về một phát biểu vấn đề.

| Dữ liệu hiệu năng (khách quan) | Dữ liệu sở thích (chủ quan) |
|---|---|
| Thời gian mỗi tác vụ; % tác vụ hoàn thành (có/không trợ giúp); thời gian truy cập thông tin; số lần chọn sai; số lỗi; số lần truy cập trợ giúp; thời gian đáp ứng hệ thống | Xếp hạng và ý kiến qua bảng hỏi; thang Likert; thang phân biệt ngữ nghĩa; câu điền tự do (mở); câu chọn hộp; câu hỏi phân nhánh; bình luận tự do |

**Định dạng bảng hỏi:**
- **Thang Likert:** "Tôi thấy GUI dễ dùng." Rất không đồng ý (−2) · Không đồng ý (−1) · Trung lập (0) · Đồng ý (+1) · Rất đồng ý (+2).
- **Phân biệt ngữ nghĩa:** "Menu File → Open thì…" Đơn giản 3 2 1 0 1 2 3 Phức tạp.
- **Chấm điểm:** neo thang đối xứng để tính trung bình; giữ câu chữ trung tính để không dẫn dắt người tham gia.
- **Điền tự do (mở):** "Liệt kê 0–4 điểm bạn thấy đặc biệt dễ dùng." Bắt tín hiệu định tính không gợi ý.
- **Chọn hộp:** "Bạn dùng kiểm chính tả bao lâu một lần?" Không bao giờ / Đôi khi / Thường / Luôn luôn. Dữ liệu phân loại nhanh.
- **Phân nhánh:** "Bạn có dùng Tìm kiếm nâng cao?" nếu có thì hỏi tiếp "Chế độ Boolean hay Relevance?"; dẫn người dùng tới câu hỏi phù hợp.
- **Mẹo thiết kế:** luôn thu dữ liệu sở thích trong ngữ cảnh tác vụ cụ thể người dùng vừa thực hiện, không hỏi trừu tượng.

**Nên khảo sát gì (luôn trong ngữ cảnh một tác vụ):** bố cục và thông tin (có khớp tác vụ, lượng thông tin vừa đủ) · chữ và màu sắc (tiêu đề, trợ giúp, cảnh báo, màu có dễ tiếp cận) · nhóm và điều hướng (thông tin liên quan có được gom, có bị lạc) · biểu tượng và nhất quán (có tự giải thích, hành vi nhất quán giữa các màn).

**Tổng hợp kết quả.** Hiệu năng: thời gian hoàn thành (trung bình, trung vị, khoảng, độ lệch chuẩn), thống kê thời gian đáp ứng hệ thống, độ chính xác tác vụ (% hoàn thành trong thời gian / bất kể thời gian / có trợ giúp), tỷ lệ lỗi trung bình mỗi tác vụ. Sở thích: số lượng và % theo mỗi lựa chọn, điểm Likert trung bình, phân loại câu trả lời tự do (tích cực/tiêu cực), gom bình luận tương tự thành chủ đề.

**So sánh nhóm (A/B).** Ví dụ "hướng dẫn có hiệu quả không?": nhóm A nhập ảnh không có hướng dẫn, nhóm B có; hiệu năng so tỷ lệ lỗi của hai nhóm; sở thích bằng điểm Likert cộng bình luận tự do về hướng dẫn. Kết thúc mỗi nghiên cứu bằng khuyến nghị cụ thể, có ưu tiên.

## 9. Công cụ

Bảng công cụ trong slide đã cũ; cột "Dùng hôm nay" theo khảo sát 2024–2026 của tài liệu. Công cụ đổi nhanh (một số dừng hoạt động), kiểm tra lại trước khi dùng.

| Công việc | Trong slide gốc | Dùng hôm nay |
|---|---|---|
| Từ xa không điều phối | Loop11, FiveSecondTest | Maze, Lyssna, Useberry (Loop11 vẫn còn) |
| Phiên người dùng được ghi lại | UserTesting, Userfly | UserTesting, Lookback (Userfly ngừng) |
| Heatmap / phát lại phiên | ClickTale | Microsoft Clarity (miễn phí), Hotjar, FullStory |
| Bộ so sánh | Hotjar, CrazyEgg, Mouseflow… | + Clarity, Contentsquare |
| Khả năng truy cập | Etre (mô phỏng mù màu), Toptal ColorFilter | axe DevTools, WAVE, Lighthouse |
| AI khả dụng (mới) | — | Attention Insight, Maze AI, Synthetic Users |
| Ghi có điều phối (guerrilla) | Silverback | Công cụ ghi màn hình + webcam bất kỳ |

Heatmap cuộn/nhấp, phân tích biểu mẫu (trường nào gây bỏ dở) và phát lại phiên của từng lượt truy cập cho thấy điều người dùng **không nói ra**, ở quy mô lớn. Khả năng truy cập là một phần của khả dụng: khoảng 8% nam giới có khiếm khuyết thị giác màu, nên đừng bao giờ chỉ dựa vào màu để truyền tải ý nghĩa; dùng trình mô phỏng mù màu để kiểm tra.

Công cụ AI/tổng hợp người dùng ("synthetic users", AI chấm khả dụng) chỉ cho giả thuyết nhanh; chúng không thay quan sát người dùng thật.
