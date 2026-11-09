---
name: gui-usability-testing
description: "Thiết kế, thực thi và báo cáo kiểm thử GUI (giao diện), Usability (khả dụng) và Compatibility (tương thích trình duyệt/thiết bị) cho web, mobile, desktop: checklist GUI theo từng control (ô nhập, dropdown, nút, checkbox, radio, liên kết, lưới, ngày), heuristic Nielsen/Norman/Shneiderman, usability test theo Rubin & Chisnell (kế hoạch 9 phần, tác vụ, think-aloud, SUS, SEQ, Likert), accessibility WCAG 2.2, responsive, ma trận trình duyệt × HĐH × thiết bị, hồi quy hình ảnh, emulator/simulator/thiết bị thực, AI trong kiểm thử GUI. Dùng skill này bất cứ khi nào người dùng nhắc đến test giao diện, GUI/UI testing, usability, UX review, kiểm thử khả dụng, tương thích/cross-browser/responsive, heuristic evaluation, cognitive walkthrough, accessibility, visual regression, hoặc nhờ rà soát một màn hình/luồng người dùng, kể cả khi họ không gọi đúng tên kỹ thuật."
---

# Kiểm thử GUI, Usability & Compatibility

Ba nửa của chất lượng giao diện, ba câu hỏi khác nhau:

- **GUI:** giao diện hiển thị và hoạt động **đúng như đặc tả** không? (kiểm chứng; oracle là spec, mockup, tiêu chuẩn)
- **Usability:** người dùng thật có **hoàn thành việc của họ** dễ dàng không? (xác nhận; oracle là hành vi quan sát được)
- **Compatibility:** giao diện có chạy **khắp nơi** (trình duyệt × hệ điều hành × thiết bị) không?

GUI và Compatibility có oracle khá rõ; Usability dựa trên quan sát và phán đoán có hệ thống, nên mọi kết luận phải kèm bằng chứng (ảnh, video, số liệu, câu nói của người dùng). Nghĩ như người dùng, không phải người kiểm thử: giao diện gây bối rối thì người dùng không quay lại.

Skill này bổ sung cho `test-design-istqb`: chọn kỹ thuật cho ô nhập/quy tắc/luồng (EP, BVA, decision table, state transition), định dạng test case, bug report và Test Summary dùng lại từ đó. Ở đây chỉ nói phần đặc thù của giao diện, khả dụng và tương thích.

> Nếu khoá học/đội có quy định riêng về việc AI được làm gì (ví dụ AI không được nháp bug report hay gợi ý edge case), quy định đó thắng skill này; chỉ dùng phần kiến thức. Với bài CS423, xem thêm skill `cs423-ai-first-homework` cho các form AI-02→AI-06.

## 1. Thu thập đầu vào (hỏi nếu thiếu)

- **Đối tượng test:** URL/build, màn hình hoặc luồng; nền tảng (web/mobile/desktop), trình duyệt và thiết bị, kích thước màn hình, ngôn ngữ.
- **Nguồn đối chiếu:** mockup/Figma, design system, spec, acceptance criteria. Không có thì ghi "đối chiếu theo chuẩn chung" vào Giả định.
- **Người dùng và mục tiêu:** ai dùng (persona, mức kinh nghiệm, ngữ cảnh: một tay, ngoài trời, mạng chậm) và 3–7 **task quan trọng nhất**.
- **Dữ liệu phân tích thực** (analytics: trình duyệt, thiết bị, hệ điều hành người dùng đang dùng) để dựng ma trận tương thích.
- **Mục tiêu đo:** chỉ cần tìm lỗi giao diện, hay cần số liệu khả dụng (tỉ lệ hoàn thành, thời gian, SUS)?
- **Ràng buộc:** thời gian, có người dùng thật không, công cụ (Playwright, Lighthouse, axe), ngân sách thiết bị/đám mây.
- **Tên chính xác** của nút, nhãn, thông báo như đang hiển thị. Tên bịa hoặc cũ là lỗi AI hay mắc nhất.

Chỗ spec im lặng: hỏi; nếu không hỏi được, đặt giả định hợp lý và **ghi vào danh sách Giả định**.

## 2. Chọn phương pháp

| Mục tiêu | Phương pháp | Cần người dùng thật? | Chi tiết |
|---|---|---|---|
| Giao diện đúng spec, nhất quán, không vỡ | **GUI checklist theo control + test case** | Không | `references/gui-checklist.md` |
| Phát hiện vấn đề khả dụng nhanh, rẻ | **Heuristic evaluation** (Nielsen 10, Norman 6, Shneiderman 8) | Không (1–3 chuyên gia) | `references/usability-methods.md` §1 |
| Người mới học dùng có dễ không | **Cognitive walkthrough** | Không | `references/usability-methods.md` §2 |
| Bằng chứng hành vi thật, đo được | **Usability test theo task** (think-aloud, SEQ, SUS, Likert) | Có, ~5 người mỗi nhóm | `references/usability-methods.md` §3–9 |
| Truy cập được cho người khuyết tật | **Accessibility check** (WCAG 2.2 AA) | Không | `references/gui-checklist.md` §6 |
| Chạy đúng trên mọi trình duyệt/thiết bị | **Ma trận tương thích + hồi quy hình ảnh** | Không | `references/compatibility-testing.md` |
| Không có spec, cần khám phá | **Exploratory theo charter** + checklist | Không | §4 dưới đây |

Mặc định khi người dùng không nói rõ: **GUI checklist + heuristic evaluation** cho cùng màn hình, kèm kiểm tương thích ở vài tổ hợp P1, rồi **đề xuất** usability test theo task nếu có điều kiện. Heuristic evaluation rẻ nhưng có thể báo nhầm; chỉ usability test với người thật mới xác nhận một vấn đề có làm người dùng vướng thật hay không.

Bốn loại usability test theo vòng đời (Rubin): **thăm dò** (sớm, trên phác thảo), **đánh giá** (giữa, thu số đo), **xác nhận** (muộn, trước phát hành, đối chiếu benchmark), **so sánh** (bất kỳ lúc nào, các thiết kế thay thế).

## 3. Quy trình

1. **Xác định phạm vi và rủi ro:** màn hình/luồng nào quan trọng nhất với người dùng và doanh thu (đăng nhập, thanh toán, đặt hàng…). Xếp ưu tiên theo rủi ro, không rà đều mọi màn.
2. **Chọn phương pháp** theo §2 và nói rõ cho người dùng đã chọn gì, vì sao.
3. **Thiết kế:**
   - GUI: chọn nhóm liên quan trong `gui-checklist.md` (§10 theo control, §11 kiểm hợp lệ, §4 trạng thái), chuyển thành test case theo anatomy của `test-design-istqb` với Expected **định lượng** (không "hiển thị đẹp", "căn đều").
   - Form/ô nhập: domain testing + BVA ở `test-design-istqb` §3.1, rồi kiểm thêm cách giao diện **phản hồi** (thông báo lỗi, đưa focus về trường sai, giữ lại dữ liệu đã nhập).
   - Usability: viết kế hoạch 9 phần, **task scenario** và tiêu chí thành công cho từng task **trước khi chạy** (`usability-methods.md` §3, §7).
   - Tương thích: dựng ma trận từ analytics, chọn bậc công cụ (`compatibility-testing.md` §2, §4–5).
4. **Thực thi** và ghi bằng chứng ngay khi gặp: ảnh có đánh dấu, video, viewport, trình duyệt/phiên bản, thiết bị. Test không chạy được thì ghi Not run/Blocked, không ghi Fail.
5. **Cô lập nguyên nhân** trước khi kết luận: thử lại ở trình duyệt/viewport khác, xoá cache, tắt extension; phân biệt lỗi giao diện thật với lỗi dữ liệu/API. Lỗi chỉ thấy trên giả lập thì xác nhận trên **engine/thiết bị thật**. Với usability, một người vướng chưa đủ kết luận; tìm **mẫu lặp lại**.
6. **Ghi nhận** theo mẫu trong `references/report-templates.md`: lỗi GUI/tương thích dùng bug report của `test-design-istqb` §5; usability issue dùng mẫu riêng có heuristic vi phạm, severity 0–4 và khuyến nghị.
7. **Tổng kết** theo mẫu, gồm cả những gì **không** test và vì sao. Số liệu tổng hợp (tỉ lệ pass, SUS, thời gian trung bình) tính bằng script/công thức, không gõ tay.

## 4. Exploratory cho giao diện (khi không có spec)

Viết charter ngắn rồi timebox 30–60 phút: *"Khám phá [màn hình/luồng] bằng [persona/thiết bị] để tìm [vấn đề khả dụng/lỗi hiển thị]"*. Các "tour" hay lộ lỗi:

- **Tour người mới:** làm theo trực giác, không đọc hướng dẫn; ghi mọi chỗ khựng lại.
- **Tour phá luồng:** nút Back của trình duyệt, tải lại giữa chừng, mở hai tab, nhấn đúp nút Submit, bỏ trống rồi quay lại sửa.
- **Tour môi trường:** thu nhỏ/phóng to cửa sổ, zoom 200%, xoay màn hình, mạng chậm, tắt JavaScript hoặc ảnh, chế độ tối.
- **Tour bàn phím:** chỉ dùng Tab/Shift+Tab/Enter/Space/Esc, không chạm chuột.
- **Tour nội dung cực đoan:** tên rất dài, không có ảnh, ký tự Unicode/tiếng Việt có dấu, danh sách rỗng và danh sách hàng nghìn mục.
- **Tour quản lý cửa sổ:** di chuyển, đổi cỡ, phóng to/thu nhỏ, đóng giữa chừng một thao tác.

## 5. Mức nghiêm trọng của usability issue

Thang Nielsen 0–4 (tính theo **ảnh hưởng đến người dùng**, khác severity của bug chức năng):

| Mức | Ý nghĩa |
|---|---|
| 0 | Không phải vấn đề khả dụng |
| 1 | Thẩm mỹ: chỉ sửa nếu còn thời gian |
| 2 | Nhỏ: ưu tiên thấp |
| 3 | Lớn: nên sửa, ưu tiên cao |
| 4 | Thảm hoạ: phải sửa trước khi phát hành |

Cân ba yếu tố: **tần suất** (bao nhiêu người gặp), **tác động** (vượt qua dễ hay khó), **tính dai dẳng** (gặp một lần là biết hay lần nào cũng vướng). Theo Rubin, **mức tới hạn = mức nghiêm trọng × xác suất gặp**; sửa vấn đề tới hạn cao trước. Một issue chặn hoàn thành task chính thường là 3–4.

## 6. Lỗi AI và người mới hay mắc

- **Phán quyết thẩm mỹ mơ hồ:** "giao diện đẹp", "bố cục hợp lý". Thay bằng đo được: "khoảng cách giữa các thẻ đều 16 px", "tương phản ≥ 4,5:1".
- **Bịa giao diện:** mô tả nút/trường không có thật. Chỉ nhắc thứ đã thấy hoặc có trong spec/ảnh chụp.
- **Chỉ test ở một viewport/trình duyệt** rồi kết luận chung. Ghi rõ đã test ở đâu; nhớ Safari/WebKit và thiết bị thật.
- **Tin giả lập là đủ:** chế độ "iPhone" của DevTools vẫn là engine Chrome, không phải Safari.
- **Lẫn "tôi không thích" với "người dùng vướng":** mỗi usability issue phải chỉ ra **hành vi quan sát được** hoặc **heuristic cụ thể bị vi phạm**.
- **Báo cáo chỉ liệt kê lỗi:** nêu thêm khuyến nghị và điểm làm tốt để đội không phá nó khi sửa.
- **Dùng 1–2 người rồi tổng quát hoá:** nhóm nhỏ phát hiện vấn đề, không cho số liệu thống kê.
- **Bỏ qua trạng thái:** rỗng, đang tải, lỗi, ngoại tuyến, quá dài; đây là chỗ giao diện hay vỡ nhất.
- **Tin tự phục hồi/AI visual mà không kiểm:** self-healing có thể che lỗi hồi quy thật; tác nhân AI bất định, tốt để khám phá, yếu làm cổng hồi quy (`gui-checklist.md` §14).

## 7. Red flags

- Task usability không có tiêu chí thành công đo được trước khi chạy.
- Hướng dẫn người tham gia từng bước (lộ đáp án) hoặc hỏi dẫn dắt.
- Báo cáo kết luận khả dụng mà không có bằng chứng.
- Chỉ kiểm happy path và màn hình có dữ liệu mẫu đẹp.
- Ma trận tương thích không dựa trên dữ liệu thực, hoặc tuyên bố "chạy tốt mọi nơi".
- Số liệu SUS/thời gian gõ tay, không tính lại được.
- Bỏ qua accessibility vì "người dùng của mình không khuyết tật".

## 8. Tệp tham chiếu (đọc khi cần)

- `references/gui-checklist.md`: checklist GUI theo nhóm (§1–7), chuyển thành test case (§8), công cụ (§9), **checklist theo từng control** (§10), kiểm hợp lệ nhập liệu (§11), vì sao GUI khó và chiến lược bốn giai đoạn (§12), tự động hoá (§13), AI trong kiểm thử GUI (§14).
- `references/usability-methods.md`: Nielsen 10, Norman 6, Shneiderman 8 (§1), cognitive walkthrough (§2), usability test và điều phối (§3), chỉ số, SUS, SEQ (§4), phân tích (§5), khung Rubin & Chisnell (§6), kế hoạch 9 phần và chọn tác vụ (§7), bảng hỏi sở thích (§8), công cụ (§9).
- `references/compatibility-testing.md`: các chiều tương thích, ba engine, dựng ma trận, emulator/simulator/thiết bị thực, bốn bậc công cụ, kiểm tra liên kết, AI, test case tương thích.
- `references/report-templates.md`: test case GUI, nhật ký usability issue, kịch bản điều phối, bảng quan sát, báo cáo tổng kết, phiếu đánh giá GUI, kế hoạch 9 phần, ma trận và báo cáo tương thích.

Nguồn nội dung: slide "Kiểm thử GUI, Khả dụng & Tương thích" (Waghmare 2009, Gerrard/EuroSTAR, Guru99, WalkMe, Rubin & Chisnell) kết hợp heuristic Nielsen và WCAG 2.2.
