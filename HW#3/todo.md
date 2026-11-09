# LỘ TRÌNH THỰC HIỆN ĐỒ ÁN HW#03 (ROADMAP)

## Giai đoạn 1: Chuẩn bị Môi trường & Xác định Phạm vi (Scope Selection)

1. **Khởi chạy Hệ thống (SUT):** Chạy Backend (`localhost:3000`) và Frontend Web (`localhost:5173`) hoặc Web Admin (`localhost:5174`) theo hướng dẫn trong `setup_guide.md`.


2. **Chọn phạm vi test:**
* **Task 1 (GUI Checklist):** Chọn **ít nhất 1 màn hình chính** (VD: Trang chủ, Giỏ hàng, hoặc Admin Dashboard). *Khuyến nghị chọn nhiều màn hình để dễ dàng tạo đủ 40+ items*.


* **Task 2 (Usability):** Chọn **1 luồng người dùng (end-to-end flow)** xuyên suốt. VD: *Đăng ký -> Tìm sản phẩm -> Thêm vào giỏ hàng -> Thanh toán bằng mã giảm giá*.


* *Lưu ý: Nếu làm nhóm, các thành viên không được chọn trùng màn hình hoặc luồng với nhau*.





## Giai đoạn 2: Task 1 & Task 3 – GUI Checklist & Cross-Platform

1. **Thiết kế Checklist (Sử dụng AI):**
* Prompt AI tạo một checklist ban đầu.
* Rà soát và thêm các mục AI bỏ sót (VD: Accessibility, Dark mode, RTL layout, hoặc các logic nghiệp vụ đặc thù như format tiền tệ ₫).


* Yêu cầu đầu ra: **File Excel/Markdown Checklist với hơn 40 mục**, bao phủ 4 khía cạnh: Giao diện chung (IA-01), Form (IA-02), Điều hướng (IA-03), Trạng thái/Phản hồi (IA-04). Cần ghi rõ lý do vì sao AI bỏ sót các mục bạn tự thêm vào.




2. **Thực thi trên 3 nền tảng (Cross-Browser/Platform):**
* Sử dụng BrowserStack, LambdaTest, hoặc thiết bị thực/Expo Go để test trên ít nhất 3 môi trường (VD: Chrome Windows, Firefox Ubuntu, Safari iOS).


* **Bắt buộc:** Mỗi ảnh chụp màn hình minh chứng phải có watermark/overlay **email sinh viên của bạn**.




3. **Ghi nhận lỗi:** Ghi log các mục "Failed", phân tích nguyên nhân và đính kèm ảnh chụp. Tạo issue trên GitHub và tổng hợp vào file Bug Report.



## Giai đoạn 3: Task 2 – Đánh giá Khả dụng (Usability Evaluation)

1. **Lập kế hoạch & Chuẩn bị:**
* Viết kịch bản tác vụ (Task scenario) thực tế, hướng mục tiêu (không dẫn dắt từng nút bấm).


* Chuẩn bị thang đo SUS (hoặc UEQ-S) và các câu hỏi phỏng vấn mở (probe questions) về độ rõ ràng, tốc độ, mức độ tin tưởng.




2. **Tuyển dụng & Chạy thử nghiệm:**
* Tìm **7 người tham gia thực tế** (không học lớp này, tốt nhất là ngoài ngành IT). Thu thập danh sách kèm SĐT/Zalo (che 4 số giữa).


* Chạy 1 buổi pilot (nháp), sau đó chạy chính thức 7 phiên (yêu cầu người dùng Think-aloud, ghi âm/ghi hình có xin phép).




3. **Phân tích:**
* Chấm điểm SUS, tổng hợp các điểm ma sát (pain points), xếp hạng mức độ nghiêm trọng (severity).





## Giai đoạn 4: Tạo Agent Skill & Ghi log AI

1. **Agent Skill:** Đóng gói các prompt/quy trình bạn đã dùng thành các Agent Skill (như hướng dẫn trong `SKILL.md`) để có thể tái sử dụng cho các màn hình khác. Quay video demo (YouTube) cách dùng skill này.


2. **Quản lý Git:** Nhớ commit code và tài liệu liên tục theo từng bước (Design checklist, Execution, Usability session 1-7...). Cuối cùng xuất log commit ra file text.



---

# DANH SÁCH CÁC FILE TÀI LIỆU CẦN NỘP (DELIVERABLES)

Dựa trên yêu cầu đóng gói file `.zip` cuối cùng, đây là cấu trúc các file bạn cần tạo:

### 1. Báo cáo Chuyên môn (Testing Reports)

* 📄 `GUI-checklist.xlsx` (hoặc `.csv`/`.md`): Chứa > 40 mục kiểm tra, kết quả Pass/Fail, Note cho các mục Fail.


* 📄 `Main-Report.md` (và bản xuất `.pdf`): Gồm 2 phần chính:
* **GUI Checklist Report:** Quá trình thiết kế checklist, phân tích điểm mù của AI, test summary, và kết quả Cross-platform (kèm ảnh chụp có watermark email).


* **Usability-evaluation-report:** Kịch bản tác vụ, danh sách 7 người tham gia (che 4 số giữa), ghi chú quan sát, kết quả chấm điểm SUS/UEQ-S, phân tích pain points theo severity.




* 📄 `Bug-report.md`: Báo cáo chi tiết các lỗi GUI và Usability tìm thấy. **Bắt buộc** kèm ảnh chụp màn hình và link dẫn đến GitHub Issues tương ứng.



### 2. Hồ sơ Minh bạch AI (AI Documentation)

* 📄 `AI-Audit-Report.md` (và bản `.pdf`): Ghi chép toàn bộ lịch sử dùng AI (Có thể gom chung `prompt_log.md` vào đây). Phải nêu rõ: Tên tool AI, Ngày giờ, Prompt của bạn, và Kết quả AI trả về. *(Sử dụng các mẫu AI-02 đến AI-06 từ file `cs423-ai-first-homework` nếu có)*.


* 📄 `AI-Critique.md` (và bản `.pdf`): Đoạn văn 200–300 chữ phân tích phản biện AI: AI đã làm sai/thiên kiến/thiếu sót ở đâu? Vì sao nó không phát hiện được lỗi? Bài học rút ra khi hợp tác với AI là gì?.



### 3. File Hệ thống & Quản lý

* 📄 `Git-Commit-Log.txt`: Lịch sử các lệnh commit minh chứng cho từng giai đoạn làm việc (ví dụ: commit khi xong checklist, commit sau mỗi phiên đánh giá người dùng).


* 📄 `README.md`: Nằm ở thư mục gốc, chứa:
* Bảng tự đánh giá điểm (Self-assessment table).


* Báo cáo Tóm tắt (Test Summary Report): Số màn hình/luồng đã test; Số checklist được tạo/Pass/Fail; Số lượng bug; Số người tham gia.


* Link YouTube video demo Agent Skill.





**Tên file nộp bài chuẩn:** `23120242_HW03_AI_GUIUsability_<SelfAssessedGrade>.zip` (Vì MSSV của bạn là 23120242, hãy thay điểm tự đánh giá bằng 3 chữ số vào cuối, ví dụ: 095).

Bạn muốn chúng ta bắt đầu bằng việc **Tạo Agent Skill** để tự động hóa việc sinh Checklist, hay muốn tôi **Phân tích một màn hình cụ thể của EShop** để nháp ngay Checklist đầu tiên?