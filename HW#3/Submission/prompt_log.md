# Entry log 1 - 11h50 9/11/2026

**Model used:** gemini 3.1 pro medium
**Prompt:** "
```text
Bạn giúp tôi soạn những gì cần thiết còn lại cho task 2 nhé

- những gì đã có "Kịch bản đánh giá khả dụng (Task 2 - Usability Scenario)
Bạn sẽ in hoặc gửi đoạn kịch bản này cho 7 người tham gia (người dùng đóng vai nhân viên quản lý kho). Chú ý không hướng dẫn họ bấm nút nào.
Mục tiêu tình huống (Task Scenario):
"Bạn là nhân viên quản lý kho hàng của hệ thống EShop. Nhiệm vụ của bạn hôm nay gồm 3 việc:
1. Truy cập vào trang quản trị và tải lên một file dữ liệu (định dạng CSV) để nhập nhanh một lô sản phẩm mới vào kho.
2. Tìm kiếm một sản phẩm bạn vừa thêm, sau đó chỉnh sửa lại giá của nó vì thông tin ban đầu bị sai.
3. Cuối cùng, hãy dọn dẹp hệ thống bằng cách xóa một danh mục sản phẩm không còn được sử dụng nữa."
Tiêu chí thành công để bạn ghi nhận (Success Criteria):
- Hoàn thành Import CSV mà không bị lỗi định dạng file.   
- Tìm đúng sản phẩm và cập nhật giá thành số dương (>0).   
- Xóa thành công danh mục.   
- Thời gian hoàn thành dự kiến: < 4 phút.
"

1. những gì yêu cầu ban đầu: "**Lập kế hoạch & Chuẩn bị:**
- Viết kịch bản tác vụ (Task scenario) thực tế, hướng mục tiêu (không dẫn dắt từng nút bấm).
- Chuẩn bị thang đo SUS (hoặc UEQ-S) và các câu hỏi phỏng vấn mở (probe questions) về độ rõ ràng, tốc độ, mức độ tin tưởng.

2. **Tuyển dụng & Chạy thử nghiệm:**
- Tìm **7 người tham gia thực tế** (không học lớp này, tốt nhất là ngoài ngành IT). Thu thập danh sách kèm SĐT/Zalo (che 4 số giữa).
- Chạy 1 buổi pilot (nháp), sau đó chạy chính thức 7 phiên (yêu cầu người dùng Think-aloud, ghi âm/ghi hình có xin phép).

3. **Phân tích:**
- Chấm điểm SUS, tổng hợp các điểm ma sát (pain points), xếp hạng mức độ nghiêm trọng (severity).
"
```
"
**AI's Answer:** 3 files (moderator-script.md, report-task2.md and system-usability-scale.md, giúp người dùng tạo ra một bộ công cụ để thực hiện task 2) (vị trí 3 files: HW#3/Process/task2 )
**Rejected:** nothing
**Changed:** noting

# Entry log  2 - 12:06 - 10/11/2026

**Model used:** gemini 3.1 pro
**Prompt:** "vậy bạn hãy cho tôi một quy trình ngắn gọn phỏng vấn người dùng, từ lúc tôi chào người dùng đến khi họ thực hiện test xong và tôi phỏng vấn.
quy trình đó gồm những bước nào, mỗi bước tôi nên sử dụng công cụ/bộ tài liệu nào từ bạn đã cung cấp.
quy trình cần ngắn gọn, tự tôi sẽ tư duy để biết cần phải alfm gì"
**AI's Answer:** how-to-use.md file (HW#3/Process/task2/how-to-use.md. TÔi dùng file này để tận dụng nhanh bộ tài liệu mà AI đã gen, trong quá trình phỏng vấn sẽ dễ dàng và thuận tiện hơn cho tôi)
**Rejected:** nothing
**Changed:** nothing


# Entry log 3 - 12:13 - 10/11/2026

**Model used:** Gemini 3.1 pro medium
**Prompt:** "
```text
1. bây giờ tôi sẽ thực hiện task "**Thiết kế Checklist (Sử dụng AI):**
- Prompt AI tạo một checklist ban đầu.
- Rà soát và thêm các mục AI bỏ sót (VD: Accessibility, Dark mode, RTL layout, hoặc các logic nghiệp vụ đặc thù như format tiền tệ ₫).


- Yêu cầu đầu ra: **File Excel/Markdown Checklist với hơn 40 mục**, bao phủ 4 khía cạnh: Giao diện chung (IA-01), Form (IA-02), Điều hướng (IA-03), Trạng thái/Phản hồi (IA-04). Cần ghi rõ lý do vì sao AI bỏ sót các mục bạn tự thêm vào.

"
bạn hãy cho tôi câu prompt để coding agent của tôi tạo gui checklist nhé và bạn không nên gợi ý quá kỹ cho AI để có một số phần mà tôi có thể bổ sung cho AI nhé (chỉ nên prompt như thông thường)
- và tôi cũng dự định cho agent của tôi đọc file SKILL.md mà tôi đã gửi
```"
**AI's Answer:** "
```text
Tôi đang thực hiện kiểm thử giao diện (GUI Testing) cho hệ thống thương mại điện tử EShop. Phạm vi kiểm thử của tôi tập trung vào phân hệ Web Admin, cụ thể là màn hình "Quản lý Sản phẩm (FR-15)" và tính năng "Import Sản phẩm từ CSV (FR-16)".

Bạn hãy đọc file `SKILL.md` và các tài liệu tham chiếu liên quan trong thư mục của bạn để hiểu quy trình lập checklist. Sau đó, hãy tạo giúp tôi một Bảng kiểm (GUI Checklist) ban đầu cho các chức năng này.

Yêu cầu định dạng đầu ra:
- Trình bày dưới dạng bảng Markdown.
- Các cột trong bảng: Mã mục (ID), Tiêu chí kiểm tra (Test Condition), Khía cạnh giao diện, Môi trường test, Kết quả mong đợi, Kết quả thực tế (Pass/Fail), và Ghi chú.
- Phân loại các tiêu chí vào đúng 4 khía cạnh giao diện (Interface Aspects) sau:
  1. IA-01: General UI standards (Tiêu chuẩn UI chung)
  2. IA-02: Forms (Biểu mẫu nhập liệu)
  3. IA-03: Navigation (Điều hướng)
  4. IA-04: Feedback / state (Phản hồi và Trạng thái)

Hãy tạo ra khoảng 30 mục checklist cơ bản dựa trên các logic thông thường của việc thêm, sửa, xóa sản phẩm và tải file CSV.
```
"
**Rejected:** NO
**Changed:** Changed "30 mục checklist cơ bản" -> "40 mục checklist cơ bản" với mục tiêu càng nhiều mục càng tốt, sau đó tôi sẽ tự tìm thêm các mục khác

# Entry log 4 - 12:15 - 10/11/2026

**Model used:** Copilot
**Prompt:** "
```text

Tôi đang thực hiện kiểm thử giao diện (GUI Testing) cho hệ thống thương mại điện tử EShop. Phạm vi kiểm thử của tôi tập trung vào phân hệ Web Admin, cụ thể là màn hình "Quản lý Sản phẩm (FR-15)" và tính năng "Import Sản phẩm từ CSV (FR-16)".

Bạn hãy đọc file `SKILL.md` và các tài liệu tham chiếu liên quan trong thư mục của bạn để hiểu quy trình lập checklist. Sau đó, hãy tạo giúp tôi một Bảng kiểm (GUI Checklist) ban đầu cho các chức năng này.

Yêu cầu định dạng đầu ra:
- Trình bày dưới dạng bảng Markdown.
- Các cột trong bảng: Mã mục (ID), Tiêu chí kiểm tra (Test Condition), Khía cạnh giao diện, Môi trường test, Kết quả mong đợi, Kết quả thực tế (Pass/Fail), và Ghi chú.
- Phân loại các tiêu chí vào đúng 4 khía cạnh giao diện (Interface Aspects) sau:
  1. IA-01: General UI standards (Tiêu chuẩn UI chung)
  2. IA-02: Forms (Biểu mẫu nhập liệu)
  3. IA-03: Navigation (Điều hướng)
  4. IA-04: Feedback / state (Phản hồi và Trạng thái)

Hãy tạo ra khoảng 40 mục checklist cơ bản dựa trên các logic thông thường của việc thêm, sửa, xóa sản phẩm và tải file CSV.

---

ví trí đặt các file: ở folder task1
```"
**AI's Answer:**"
Đã tạo bảng kiểm GUI ban đầu tại GUI-checklist-FR15-FR16.md.

Checklist gồm 40 mục:

24 mục cho FR-15: thêm, sửa, xóa và hiển thị sản phẩm.
16 mục cho FR-16: chọn file, preview, validation, import và trạng thái lỗi.
IA-01: 10 mục.
IA-02: 17 mục.
IA-03: 6 mục.
IA-04: 7 mục.
Các mục chưa thực thi được ghi Not run, không tự suy đoán Pass/Fail. Đã kiểm tra không trùng ID và không có lỗi định dạng Markdown.
"
```
**Rejected:** No
**Changed:** No


# Entry log  5 - 12:20 - 10/11/2026

**Model used:** copilot
**Prompt:** "Bạn hãy tạo giúp tôi các git commit log trong file Git-Commit-Log.txt giúp tôi nhé.
các commit log sẽ bao gồm tóm tắt các mục bên dưới:
1. hoàn thành giai đoạn 1 ở todo.md "* **Task 1 (GUI Checklist):** Chọn **ít nhất 1 màn hình chính** (VD: Trang chủ, Giỏ hàng, hoặc Admin Dashboard). *Khuyến nghị chọn nhiều màn hình để dễ dàng tạo đủ 40+ items*.


* **Task 2 (Usability):** Chọn **1 luồng người dùng (end-to-end flow)** xuyên suốt. VD: *Đăng ký -> Tìm sản phẩm -> Thêm vào giỏ hàng -> Thanh toán bằng mã giảm giá*."
2. Thiết kế Checklist (chưa rà soát các mục AI bỏ sót và chưa kiểm tra đầu ra)

còn các file khác được thêm/sửa thì bạn chỉ cần nói chung chung là được"
**AI's Answer:** "
Updated todo list

Mình sẽ xem nội dung `Git-Commit-Log.txt` hiện tại và lịch sử commit thực tế để ghi log không mâu thuẫn với repository. Sau đó mình sẽ bổ sung hai mốc bạn yêu cầu: hoàn thành Giai đoạn 1 với phạm vi Task 1/Task 2, và thiết kế checklist ban đầu nhưng chưa rà soát điểm mù của AI/chưa kiểm tra đầu ra; các thay đổi khác sẽ được tổng hợp ngắn gọn.

Ran terminal command:  printf '%s\n' '--- recent commits ---'; git --no-pager log --oneline --decorate -12; printf '%s\n' '--- status ---'; git status --short

Read 

File log hiện đang trống; repository đã có các commit gần đây nhưng chưa có commit riêng cho hai mốc HW#3 mà bạn nêu. Mình sẽ kiểm tra nhanh phạm vi của hai commit gần nhất để ghi phần lịch sử hiện có chính xác, sau đó thêm các mục HW#3 dưới dạng mốc tài liệu, không bịa hash commit chưa tồn tại.

Ran terminal command:  git --no-pager show --stat --oneline --summary 04cb0e1 && printf '%s\n' '---' && git --no-pager show --stat --oneline --summary fa79b36

Phạm vi ghi log sẽ gồm lịch sử commit đã có và hai mốc HW#3 đang thực hiện. Mốc Giai đoạn 1 sẽ ghi rõ phạm vi đã chọn nhưng chưa đồng nghĩa đã chạy test; mốc checklist sẽ ghi đúng trạng thái “bản nháp ban đầu, chưa rà soát điểm mù AI và chưa kiểm tra đầu ra”. Mình sẽ tạo nội dung vào file đang trống.

Created 

File log đã được tạo với lịch sử commit thực tế và hai mốc HW#3 chưa có hash commit. Mình sẽ kiểm tra nhanh các mục bắt buộc, trạng thái “chưa rà soát/chưa kiểm tra đầu ra” và định dạng file trước khi kết thúc.

Ran terminal command:  FILE='HW#3/Submission/Git-Commit-Log.txt'; printf '%s\n' '--- required entries ---'; grep -n -E 'Giai doan 1|Task 1|Task 2|Thiet ke checklist|chua ra soat|chua kiem tra dau ra' "$FILE"; printf '%s\n' '--- file check ---'; wc -l "$FILE"; git status --short -- "$FILE"

Đã cập nhật Git-Commit-Log.txt với:

- Lịch sử 3 commit thực tế gần nhất.
- Giai đoạn 1:
  - Task 1: Web Admin FR-15 và FR-16.
  - Task 2: Luồng đăng ký/đăng nhập → tìm sản phẩm → thêm giỏ hàng → thanh toán bằng coupon.
- Mốc thiết kế checklist GUI 40 mục.
- Ghi rõ checklist hiện mới là bản ban đầu, chưa rà soát điểm AI bỏ sót và chưa kiểm tra đầu ra.
- Ghi chú rằng hai mốc HW#3 chưa có hash vì chưa được commit thực tế.

Đã kiểm tra file có đầy đủ các mục bắt buộc.

Created 2 todos

Made changes."

**Rejected:** No
**Changed:** No

# Entry log 6 - 10/11/2026

**Model used:**
**Prompt:**
**AI's Answer:**
**Rejected:**
**Changed:**

# Entry log  - 10/11/2026

**Model used:**
**Prompt:**
**AI's Answer:**
**Rejected:**
**Changed:**

# Entry log  - 10/11/2026

**Model used:**
**Prompt:**
**AI's Answer:**
**Rejected:**
**Changed:**

# Entry log  - 10/11/2026

**Model used:**
**Prompt:**
**AI's Answer:**
**Rejected:**
**Changed:**

# Entry log  - 10/11/2026

**Model used:**
**Prompt:**
**AI's Answer:**
**Rejected:**
**Changed:**

# Entry log  - 10/11/2026

**Model used:**
**Prompt:**
**AI's Answer:**
**Rejected:**
**Changed:**

# Entry log  - 10/11/2026

**Model used:**
**Prompt:**
**AI's Answer:**
**Rejected:**
**Changed:**

# Entry log  - 10/11/2026

**Model used:**
**Prompt:**
**AI's Answer:**
**Rejected:**
**Changed:**

LAST
# Entry log  

**Model used:**
**Prompt:**
**AI's Answer:**
**Rejected:**
**Changed:**