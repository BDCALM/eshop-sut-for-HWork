**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM (HCMUS)**

# **Báo cáo Kiểm toán AI (AI Audit Report) — Mẫu 5 Phần cho từng Chế tác (Artifact)**

## **1. Thông tin Sinh viên (Student Information)**
| Trường thông tin (Field) | Giá trị (Value) |
| --- | --- |
| **Họ và tên sinh viên (Student name):** | NGUYEN VAN BINH DUONG |
| **Mã số sinh viên (Student ID):** | 23120242 |
| **Lớp / Khóa (Class / Cohort):** | Software Testing CQ2023/3 |
| **Mã bài tập (Assignment ID):** | HW#04 — Automation Testing & AI-First Quality Assurance |
| **Ngày thực hiện (Assignment date):** | 18/11/2026 |
| **Công cụ AI sử dụng (AI tool(s) used):** | Gemini 3.8 Flash (High), Gemini 3.1 Pro, GitHub Copilot |
| **Có sử dụng AI (AI tool(s) used):** | [x] Có (Yes)  [ ] Không (No) |

---

## **2. Hướng dẫn (Instructions)**
* Thêm một dòng cho mỗi chế tác do AI tạo ra (test case, script, checklist, file kỹ năng, báo cáo phân tích...).
* Dán tóm tắt câu lệnh (prompt) kèm thời gian và công cụ sử dụng từ nhật ký `prompt_log.md`.
* Tóm tắt kết quả đầu ra của AI và gán nhãn đánh giá: `VALID` (Hợp lệ) / `INVALID` (Không hợp lệ) / `INCOMPLETE` (Chưa hoàn chỉnh).
* Lý giải dựa trên nguyên lý ISTQB hoặc tài liệu bài giảng và nêu rõ nội dung sinh viên đã chỉnh sửa/bổ sung.

---

## **3. Bảng Kiểm toán (Audit Table — one row per artifact)**

| (1) Prompt + Công cụ (Prompt + Tool) | (2) Kết quả đầu ra của AI (AI Output) | (3) Đánh giá (Verdict) | (4) Lý giải theo chuẩn ISTQB (Reasoning) | (5) Chỉnh sửa của Sinh viên (Student Fix) |
| :--- | :--- | :---: | :--- | :--- |
| **Artifact #1: File định nghĩa kỹ năng AI (`HW4/SKILLS.md`)**<br>**Công cụ:** Gemini 3.1 Pro<br>**Thời gian:** 15:00 17/11/2026<br>**Prompt:** *"Từ requirement và file lý thuyết Automation Testing, hãy gen cho tôi file SKILLS.md để phù hợp cho Coding Agents giúp tôi hoàn thiện HW04..."* | Tạo cấu trúc file `SKILLS.md` thiết lập quy trình 4 bước cho Coding Agent: (1) Sinh test cases DDT JSON, (2) Viết script Playwright, (3) Báo cáo lỗi, (4) Tổng kết phản hồi. | `INCOMPLETE` | Khung quy trình bám sát luồng kiểm thử, nhưng ban đầu thiếu cơ chế chặn luồng cưỡng bức (STOP RULE), chưa ràng buộc 3 Assertion Patterns theo ISTQB FL §5.2, và chưa có cơ chế tiêm mã sinh viên (`Run by: 23120242`) vào báo cáo Playwright HTML. | Sinh viên đã bổ sung quy tắc dừng nghiêm ngặt (STOP RULE), bắt buộc tách dữ liệu JSON trước khi sinh code, quy định rõ 3 assertion patterns và cơ chế reporter tiêm metadata sinh viên. |
| **Artifact #2: Dữ liệu DDT & Script kiểm thử FR-05 (`FR05-data.json`, `FR05.spec.js`)**<br>**Công cụ:** GitHub Copilot<br>**Thời gian:** 16:30 17/11/2026<br>**Prompt:** *"Automate tính năng FR-05: tạo 12 test cases DDT, script playwright có ít nhất 3 assertion patterns khác nhau..."* | Sinh 12 ca kiểm thử tìm kiếm sản phẩm trong file JSON và script Playwright `FR05.spec.js`. | `INCOMPLETE` | Vi phạm ISTQB FL §4.2 (Kiểm thử tương đương & giá trị biên) và thực hành Best Practice của Playwright: AI sử dụng CSS selector dễ vỡ (`#root > div > form > input`), thiếu network wait (`waitForResponse`) gây race condition trên WebKit, và assertion XSS (`FR05-TC10`) nông cạn (chỉ kiểm tra trang không crash). | Thay thế bằng accessibility locators (`getByPlaceholder`), thêm explicit network synchronization bắt response API 200, và tăng cường assertion kiểm tra an toàn text escaping của chuỗi HTML. |
| **Artifact #3: Dữ liệu DDT & Script kiểm thử FR-11 (`FR11-data.json`, `FR11.spec.js`)**<br>**Công cụ:** Gemini 3.8 Flash (High)<br>**Thời gian:** 04:10 18/11/2026<br>**Prompt:** *"Thực hiện giai đoạn 2 và 3 cho tính năng FR-11 theo workflow2-3.md..."* | Xây dựng bộ 12 ca DDT và kịch bản Playwright kiểm thử lịch sử đơn hàng và chuyển đổi trạng thái đơn hàng. | `INCOMPLETE` | Mắc bẫy "Khẳng định nông cạn" (Shallow Assertion Trap): ở ca `FR11-TC09`, AI chỉ assert xem chữ 'Đang giao' có hiển thị hay không (`toBeVisible()`), hoàn toàn bỏ quên ràng buộc âm (Negative Constraint) trong SRS: *"Đơn hàng ở trạng thái shipping thì User không được phép tự hủy"*. Điều này tạo ra kết quả 100% pass giả tạo (False-Pass), che giấu lỗi cố ý của SUT. | Sinh viên phát hiện lỗ hổng nghiệp vụ, bổ sung assertion phủ định: `expect(shippingRow.getByRole('button', { name: 'Hủy đơn' })).not.toBeVisible()`, bắt đúng lỗi SUT hiển thị nút Hủy đơn trên cả 3 trình duyệt (33 passed, 3 failed). |
| **Artifact #4: Dữ liệu DDT & Script kiểm thử FR-19 (`FR19-data.json`, `FR19.spec.js`)**<br>**Công cụ:** Gemini 3.8 Flash (High)<br>**Thời gian:** 05:00 18/11/2026<br>**Prompt:** *"Automate tính năng thứ 3 FR-19 (Quản lý người dùng - Admin) theo workflow2-3.md..."* | Sinh 12 ca DDT và script kiểm thử các quyền Admin Portal: xem danh sách, xóa user, kiểm tra phân quyền. | `INCOMPLETE` | (1) Sai lệch kiến trúc giao diện SPA: AI tự suy diễn admin portal có URL routing (`waitForURL(/users/)`) và dùng thẻ `<a>` (`getByRole('link')`), trong khi thực tế là React SPA dùng tab `<li>` và hook `useState`. (2) Thỏa hiệp Test Oracle: AI ban đầu có xu hướng đổi assertion mong đợi sang 200 khi thấy backend trả về 200 cho ID sai, làm mất khả năng phát hiện lỗi bảo mật. | Sử dụng Browser Subagent điều tra DOM thực tế để sửa locator chuẩn `li`; kiên quyết bảo vệ Test Oracle theo SRS, chuyển đổi các ca bảo mật (TC02, TC06, TC09) thành UI integration tests để bắt hệ thống fail thực tế, sinh ra 9 failed runs kèm bằng chứng screenshot/video. |
| **Artifact #5: Các Báo cáo Chính thức (`automation-report.md`, `gap-analysis.md`, `bug-report.md`)**<br>**Công cụ:** Gemini 3.8 Flash (High)<br>**Thời gian:** 05:20 18/11/2026<br>**Prompt:** *"Viết automation-report.md, gap-analysis.md và bug-report.md tổng hợp toàn diện HW04..."* | Sinh các tài liệu báo cáo tổng kết thực thi, phân tích khoảng cách và hồ sơ 7 lỗi phần mềm. | `INCOMPLETE` | Bản thảo ban đầu của AI mắc mâu thuẫn logic về Test Oracle (ở FR-19 viết nhầm là sửa assertion theo code lỗi của SUT), và chưa làm rõ phạm vi kiến trúc của `BUG-FR19-003` (lỗ hổng liên đới từ FR-04/SEC-06). | Rà soát toàn bộ tài liệu, xóa bỏ đoạn mâu thuẫn logic, cấu trúc lại tiểu mục Human Review (4.1 & 4.2), bổ sung ghi chú kiến trúc Chained Vulnerability, và kiểm tra tính hợp lệ của toàn bộ đường dẫn liên kết tương đối. |

---

## **4. Tổng hợp Độ chính xác của AI (Summary of AI Accuracy)**
Tổng hợp các đánh giá (Verdicts) từ Mục 3 cho 5 nhóm chế tác cốt lõi của đề tài HW04:

| Chỉ số (Metric) | Số lượng (Count) | Tỷ lệ (Percentage) |
| --- | :---: | :---: |
| **Tổng số chế tác do AI tạo đã được kiểm toán (Total AI-generated artifacts audited)** | **5** | **100%** |
| **VALID (Chính xác, được chấp nhận nguyên trạng)** | **0** | **0%** |
| **INVALID (Sai hoàn toàn; bị loại bỏ)** | **0** | **0%** |
| **INCOMPLETE (Chấp nhận được sau khi chỉnh sửa/bổ sung kỹ thuật)** | **5** | **100%** |

> **Nhận xét chuyên môn:** Kết quả kiểm toán 100% chế tác ở mức `INCOMPLETE` phản ánh chính xác thực tế kỹ thuật: AI tạo sinh là công cụ hỗ trợ xây dựng khung sườn (scaffolding) và mã nguồn khởi điểm rất nhanh, nhưng **không có bất kỳ chế tác nào có thể đưa vào sử dụng thực tế mà thiếu đi sự rà soát, kiểm định và hiệu chỉnh của kỹ sư con người (Human-in-the-loop)**.

---

## **5. Kết luận — Khi nào nên (hoặc không nên) sử dụng AI? (Conclusion — 80–150 words)**

Để xác định khi nào nên hoặc không nên sử dụng AI, ta cần phải thấu hiểu thế mạnh thực sự của mô hình. Qua quá trình học tập và thực hành đề tài HW04, tôi nhận thấy AI phát huy năng lực vượt trội trong việc khởi tạo khung mã nguồn nền tảng (code base), xây dựng cấu trúc mẫu (templates) và soạn thảo các bản phác thảo báo cáo. Tuy nhiên, mọi kết quả do AI sinh ra đều bắt buộc phải trải qua quy trình rà soát nghiêm ngặt của con người (Human Review). Đặc biệt trong kiểm thử giao diện, dù công nghệ tự động hóa hiện nay đã rất phát triển, AI vẫn dễ dàng bỏ sót các khối giao diện, nhãn chữ hoặc các ràng buộc trạng thái cơ bản. Hơn nữa, khi AI/LLM ngày càng được dùng phổ biến để viết tài liệu — nơi kết tinh tri thức cốt lõi về mã nguồn và nghiệp vụ — con người càng phải kiểm định cẩn trọng hơn; nếu không, tài liệu sẽ mất đi giá trị và không thể kế thừa cho các thế hệ kỹ sư tiếp theo.

---

## **6. Tuyên bố Bắt buộc (Mandatory Disclosure — paste verbatim)**

*"The test automation artifacts [SKILLS.md, Playwright test scripts for FR-05, FR-11, FR-19, DDT JSON test data files, automation-report.md, gap-analysis.md, and bug-report.md] were initially drafted with the assistance of [Gemini 3.8 Flash, Gemini 3.1 Pro, and GitHub Copilot]; I thoroughly reviewed, evaluated, and modified [the test oracles to strictly uphold SRS requirements without compromising on SUT defects, the DOM locators adapted to React SPA state architecture in FR-19, the negative state transition assertions forbidding order cancellation during shipping status in FR-11, and explicit network synchronization waits in FR-05], added [authentic multi-browser failure evidence across Chromium, Firefox, WebKit including high-resolution screenshots and video recordings, White-box root-cause analyses down to specific frontend/backend source lines, and custom Playwright metadata injection for Student ID 23120242]; [all Human Review critiques, final SUT Bug evaluations, and this AI Audit Report] were authored, verified, and finalized by me. I confirm I did not use AI to generate any artifact listed in the prohibited category."*

---

## **Chữ ký Xác nhận (Signature)**
| Họ và tên sinh viên (Student name - printed): | NGUYEN VAN BINH DUONG |
| --- | --- |
| **Mã số sinh viên (Student ID):** | 23120242 |
| **Lớp / Khóa (Class / Cohort):** | Software Testing CQ2023/3 |
| **Môn học (Course):** | CS423 / CSC13003 – Software Testing |
| **Giảng viên (Instructor):** | TS. Lâm Quang Vũ (Dr. Lam Quang Vu) |
| **Ngày (Date):** | 18/11/2026 |
| **Chữ ký (Signature):** | *Nguyễn Văn Bình Dương* |

---

## **Tài liệu Tham khảo (References)**
* Kharbach, M. (2026). *AI Use Policy Templates for Higher Education*. CC BY-NC-SA 4.0.
* International Software Testing Qualifications Board (ISTQB). *Certified Tester Foundation Level (CTFL) Syllabus*, v4.0.
* Hardman, P. (2025). *A Post-AI Learning Taxonomy*.
* Perkins, M., Roe, J., & Furze, L. (2025). *AI Assessment Scale in Higher Education*.
* Microsoft Corporation. *Playwright Documentation — Best Practices, Locators, and Assertions*.
