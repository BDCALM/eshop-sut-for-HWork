**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM (HCMUS)**

# **Báo cáo Kiểm toán AI (AI Audit Report) — HW#03**

## **1. Thông tin Sinh viên (Student Information)**
| Trường thông tin (Field) | Giá trị (Value) |
| --- | --- |
| **Họ và tên sinh viên (Student name):** | NGUYEN VAN BINH DUONG |
| **Mã số sinh viên (Student ID):** | 23120242 |
| **Lớp / Khóa (Class / Cohort):** | Software Testing CQ2023/3 |
| **Mã bài tập (Assignment ID):** | HW#03 |
| **Ngày thực hiện (Assignment date):** | 11/11/2026 |
| **Công cụ AI sử dụng (AI tool(s) used):** | Gemini 3.1 Pro (medium / không ghi mức); Copilot/Auto Copilot theo nhãn trong prompt log; Copilot SDK trong VS Code cho bản nháp hiện tại |
| **Có sử dụng AI (AI tool(s) used):** | [x] Có (Yes)  [ ] Không (No) |

## **2. Hướng dẫn (Instructions)**
* Thêm một dòng cho mỗi chế tác do AI tạo ra (test case, script, checklist, file kỹ năng, báo cáo phân tích...).
* Dán nguyên văn câu lệnh (prompt) kèm thời gian và công cụ sử dụng từ nhật ký `prompt_log.md`.
* Tóm tắt kết quả đầu ra của AI và gán nhãn đánh giá: `VALID` (Hợp lệ) / `INVALID` (Không hợp lệ) / `INCOMPLETE` (Chưa hoàn chỉnh).
* Lý giải dựa trên nguyên lý ISTQB hoặc tài liệu bài giảng và nêu rõ nội dung sinh viên đã chỉnh sửa/bổ sung.

## **3. Bảng Kiểm toán (Audit Table — one row per artifact)**
| Artifact group | (1) Prompt + công cụ + thời gian | (2) Kết quả đầu ra của AI | (3) Verdict | (4) Lý giải | (5) Chỉnh sửa / xác minh của sinh viên |
|---|---|---|---|---|---|
| Task 2 preparation pack: `moderator-script.md`, `report-task2.md`, `system-usability-scale.md` | **Công cụ:** Gemini 3.1 Pro (medium). **Thời gian:** 11:50, 09/11/2026 (Entry Log 1). **Prompt (trích nguyên văn):** “Bạn giúp tôi soạn những gì cần thiết còn lại cho task 2 nhé” — kèm kịch bản usability và yêu cầu chuẩn bị SUS/probe questions, tuyển người tham gia và phân tích pain points. | Tạo bộ tài liệu ban đầu để điều phối usability session, thu SUS và ghi nhận kết quả. | `INCOMPLETE` | Bộ khung và câu hỏi có ích cho việc chuẩn bị, nhưng không thể thay thế phiên kiểm thử thực tế hay bằng chứng từ người tham gia. Theo ISTQB FL v4.0 §4.4.2, exploratory testing cần được thực hiện trên sản phẩm thực tế; kết quả không thể suy ra chỉ từ mẫu biểu. | Sinh viên tuyển và phỏng vấn người tham gia, ghi dữ liệu trong hồ sơ P1–P7, rồi tổng hợp và rà soát các điểm còn thiếu trong `report-task2.md`. |
| Interview quick guide: `how-to-use.md` | **Công cụ:** Gemini 3.1 Pro. **Thời gian:** 12:06, 10/11/2026 (Entry Log 2). **Prompt (trích nguyên văn):** “vậy bạn hãy cho tôi một quy trình ngắn gọn phỏng vấn người dùng, từ lúc tôi chào người dùng đến khi họ thực hiện test xong và tôi phỏng vấn.” | Tạo hướng dẫn ngắn để sử dụng bộ tài liệu khi điều phối phỏng vấn. | `INCOMPLETE` | Hướng dẫn hỗ trợ trình tự công việc, nhưng tính nhất quán, sự đồng thuận ghi hình và cách hỏi không dẫn dắt vẫn phụ thuộc vào người điều phối. | Sinh viên sử dụng tài liệu để hỗ trợ quy trình, trực tiếp thực hiện các phiên và thu thập câu trả lời thật; không dùng AI để tạo dữ liệu người tham gia. |
| Initial GUI checklist: `GUI-checklist-FR15-FR16.md` | **Công cụ:** Copilot (Entry Log 4). **Thời gian:** 12:15, 10/11/2026. **Prompt (trích nguyên văn):** “Sau đó, hãy tạo giúp tôi một Bảng kiểm (GUI Checklist) ban đầu cho các chức năng này.” Prompt xác định FR-15/FR-16 và yêu cầu khoảng 40 mục. | Tạo checklist ban đầu cho quản lý sản phẩm và import CSV. | `INCOMPLETE` | Checklist được tạo từ yêu cầu và logic UI phổ biến, nên cần được chạy trên giao diện thật. ISTQB FL v4.0 §4.4.3 mô tả checklist-based testing là kỹ thuật dựa trên checklist; độ bao phủ phụ thuộc nội dung checklist và quan sát của người kiểm thử. | Sinh viên điều chỉnh viewport theo thiết bị thực tế, chạy kiểm thử, ghi Pass/Fail và bổ sung phát hiện UX mà bản nháp chưa bao quát. |
| Executed GUI checklist and summary report | **Công cụ:** Copilot (Entry Log 6–7; nhãn “Copilit/Auto copilt” trong log). **Thời gian:** 12:24, 10/11/2026 và 00:55, 11/11/2026. **Prompt (trích nguyên văn):** “Bạn hãy giúp tôi điền file ‘GUI-checklist-FR15-FR16.md’ dựa theo những gì tôi đã ghi chú trong task1.txt nhé.”; “Bạn hãy giúp tôi viết ‘GUI-checklist-report.md’ dựa theo ‘GUI-checklist-FR15-FR16.md’ nhé.” | Điền kết quả checklist theo ghi chú của người thực hiện và tạo báo cáo tổng hợp GUI. | `INCOMPLETE` | Kết quả Pass/Fail cần dựa trên quan sát có thật. Một số giả thuyết AI suy ra từ mã nguồn chỉ trở thành phát hiện sau khi người thực hiện retest; suy luận tĩnh không thay thế bằng chứng thực thi. | Sinh viên cung cấp ghi chú, kiểm tra lại giả thuyết, thực hiện thao tác trên giao diện và bổ sung phát hiện về thao tác xóa, ô giá, khả năng tìm nút và cách bố trí. |
| Usability data and evaluation reports: `report-task2.md`, `usability-evaluation-report.md` | **Công cụ:** Copilot / Auto Copilot (Entry Log 7). **Thời gian:** 00:55, 11/11/2026. **Prompt (trích nguyên văn):** “Bạn hãy giúp tôi viết ‘report-task2.md’ bằng cách lấy thông tin từ 7 người ở ‘7-users’. Cũng như là đánh giá thông tin còn thiếu để viết ‘usability-evaluation-report.md’.” | Tổng hợp điểm SUS, câu trả lời phỏng vấn, pain points, giới hạn dữ liệu và báo cáo đánh giá. | `INCOMPLETE` | Phép tính SUS và tổng hợp nội dung hỗ trợ phân tích, nhưng nguồn có giới hạn: hồ sơ không có task log/timecode đầy đủ và không nên suy rộng từ mẫu 7 người. Theo ISTQB FL v4.0 §4.4.2, quan sát trực tiếp cần thiết để đánh giá hành vi trong phiên; báo cáo phải phân biệt dữ liệu quan sát với dữ liệu chưa xác minh. | Sinh viên đối chiếu hồ sơ P1–P7, giữ cảnh báo về nguồn và giới hạn, cập nhật link video phỏng vấn và ghi rõ chưa xác nhận video bao gồm toàn bộ task. |
| Video links in both usability reports | **Công cụ:** Copilot (Entry Log 8). **Thời gian:** 11:36, 11/11/2026. **Prompt (nguyên văn):** “Tôi đã cập nhật link video phỏng vấn ở trong 4 users trong folder 7-users. Bạn hãy cập nhật file report-task2.md sau đó cập nhật trong file usability-evaluation-report.md nữa nhé” | Thêm link video P1, P5, P6, P7 và ghi chú giới hạn timecode/task video. | `VALID` | Các link trong hai báo cáo được đối chiếu với hồ sơ người tham gia; nội dung phân biệt video phỏng vấn với bằng chứng ghi toàn bộ thao tác task. | Sinh viên kiểm tra liên kết với bốn hồ sơ nguồn và xác nhận đủ sáu URL trong cả hai báo cáo. |
| Cross-browser evidence naming and report updates | **Công cụ:** Copilot SDK trong VS Code. **Thời gian:** khoảng 12:15, 11/11/2026. **Prompt (trích nguyên văn):** “Ngoại trừ file README.md của chúng, hãy thêm các ký tự ‘GUI-FR’ ở đầu mỗi file.”; “ghi chú rõ ràng rằng trình duyệt fire fox lẫn google chrome cũng đã được test và minh chứng ở trong folder ... assets\\task3”. | Đổi tên 41 tệp minh chứng và cập nhật hai báo cáo để trỏ đến các thư mục Firefox/Google Chrome, ghi viewport 1200x600 theo README. | `INCOMPLETE` | Đổi tên và cập nhật đường dẫn có thể kiểm tra tĩnh; việc ảnh thực sự chứng minh trình duyệt/phiên bản/môi trường nêu trong README cần con người xác nhận bằng cách xem evidence và đối chiếu phiên test. | Sinh viên cung cấp thư mục minh chứng và README; cần duyệt nội dung ảnh và xác nhận kết quả kiểm thử đa trình duyệt trước khi nộp. |
| AI audit and critique drafts: `AI-Audit-Report.md`, `AI-Critique.md` | **Công cụ:** Copilot SDK trong VS Code (phiên hiện tại; model cụ thể không được cung cấp). **Thời gian:** 12:26, 11/11/2026. **Prompt (trích nguyên văn):** “Cập nhật file AI Audit Report dựa theo các thông tin báo cáo mà tôi nhờ bạn thực hiện.” và yêu cầu viết AI Critique về điểm mạnh/yếu của AI trong bài tập. | Tạo bản nháp kiểm toán các artifact trong prompt log, kết luận sử dụng AI và critique 200–300 từ. | `INCOMPLETE` | Đây là bản nháp AI, không phải tự chứng thực độc lập về quá trình học tập. Sinh viên cần xác nhận công cụ, thời gian, mô tả artifact và sửa mọi nội dung không khớp trải nghiệm thực tế. | Sinh viên là người rà soát, chỉnh sửa và hoàn thiện hai file trước khi nộp; Mục 6 phản ánh vai trò AI tạo bản nháp và con người chịu trách nhiệm nội dung cuối. |

## **4. Tổng hợp Độ chính xác của AI (Summary of AI Accuracy)**
Tổng hợp 8 nhóm artifact đã kiểm toán ở Mục 3. `VALID` nghĩa là đầu ra được xác minh và dùng được cho mục đích đã nêu; `INCOMPLETE` cần con người xác minh, bổ sung hoặc chỉnh sửa.
| Chỉ số (Metric) | Số lượng (Count) | Tỷ lệ (Percentage) |
| --- | --- | --- |
| **Tổng số nhóm artifact AI tạo đã được kiểm toán** | 8 | 100% |
| **VALID (Được xác minh và dùng cho mục đích đã nêu)** | 1 | 12.5% |
| **INVALID (Sai hoàn toàn; bị loại bỏ)** | 0 | 0% |
| **INCOMPLETE (Cần con người xác minh/chỉnh sửa/bổ sung)** | 7 | 87.5% |

## **5. Kết luận — Khi nào nên (hoặc không nên) sử dụng AI? (Conclusion — 80–150 words)**

AI hữu ích trong việc phác thảo các bảng checklist có cấu trúc, tài liệu phỏng vấn, mẫu báo cáo chuyên nghiệp, cũng như tóm tắt các ghi chú được cung cấp và phát hiện các rủi ro logic giao diện (UI) phổ biến. Nhưng, AI nên được xem như một người trợ lý thay vì một nguồn đáp án tuyệt đối. Trong bài tập này, việc thực hiện các cuộc phỏng vấn với người dùng thực tế, quan sát tác vụ, thao tác trên trình duyệt và đối chiếu ảnh chụp màn hình vẫn là trách nhiệm của con người. AI kém tin cậy hơn khi đánh giá hệ thống phân cấp thị giác và tính khả dụng phụ thuộc vào ngữ cảnh, chẳng hạn như liệu một bảng dữ liệu có dễ nhìn lướt qua không, hai nút điều khiển có khoảng cách hợp lý chưa, hay  nút "Import" có dễ dàng được nhìn thấy ngay từ cái nhìn đầu tiên hay không. Hãy sử dụng AI để chuẩn bị và phân tích; tuyệt đối không dùng nó để bịa đặt người tham gia, câu trả lời phỏng vấn, kết quả thực thi hay bằng chứng. Con người phải luôn là người xác thực kết quả báo cáo cuối cùng dựa trên giao diện thực tế và các bản ghi chép gốc.

## **6. Tuyên bố Bắt buộc (Mandatory Disclosure — paste verbatim)**
*"The initial templates/drafts of AI-Audit-Report.md and AI-Critique.md were generated with AI; I, the human student, reviewed, edited, and take responsibility for the final versions. AI also assisted with the initial usability materials, GUI checklist, and report drafts as documented in the audit table. I conducted the participant sessions and supplied the raw user responses and test observations; I reviewed the summaries and updated the reports with verified interview-video links. I did not use AI to generate or fabricate participant identities or contact details, interview responses, screenshots, cross-platform execution evidence, or other artifacts in the assignment's prohibited category. The detailed AI Audit Report is attached as Appendix A."*

## **Chữ ký Xác nhận (Signature)**
| Họ và tên sinh viên (Student name - printed): | NGUYEN VAN BINH DUONG |
| --- | --- |
| **Mã số sinh viên (Student ID):** | 23120242 |
| **Lớp / Khóa (Class / Cohort):** | Software Testing CQ2023/3 |
| **Môn học (Course):** | CS423 / CSC13003 – Software Testing |
| **Giảng viên (Instructor):** | TS. Lâm Quang Vũ (Dr. Lam Quang Vu) |
| **Ngày (Date):** | 11/11/2026 |
| **Chữ ký (Signature):** | *Nguyễn Văn Bình Dương* |

## **Tài liệu Tham khảo (References)**
* Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.
* ISTQB Foundation Level Syllabus v4.0.
* Hardman, P. (2025). A Post-AI Learning Taxonomy.
* Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.
* Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.
* Anthropic (2025). Building reliable AI test agents — engineering blog.
* DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
