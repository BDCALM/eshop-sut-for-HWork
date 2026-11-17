# Checklist Hoàn Thiện Bài Tập HW04 – Automation Testing
- Mỗi khi hoàn thành xong một giai đoạn, phải kiểm tra để commit. Sau đó ghi commit log vào trong "eshop-sut-for-HWork\HW4\Submission\Git-Commit-Log.txt" kèm theo nội dung mô tả ngắn cho các commits đó.
## Giai đoạn 1: Chuẩn bị & Cấu hình môi trường (Setup & Planning)
- [x] Khởi tạo Public GitHub Repository cho HW04 (Fork từ repo gốc hoặc tạo mới chứa test code).
- [x] Cài đặt Node.js và Playwright (`npm init playwright@latest`).
- [x] Thiết lập file `SKILLS.md` làm system prompt cho Cursor/AI.
- [x] Chỉnh sửa file `playwright.config.ts`:
  - Cấu hình chạy trên 3 trình duyệt (Chromium, Firefox, WebKit).
  - Cấu hình Playwright HTML Reporter.
  - Cài đặt tiêm Metadata "Run by: 23120242" và Timestamp vào title/metadata của HTML Report.
- [x] Khởi chạy SUT (EShop) local: Backend API (`port 3000`), Frontend Web (`port 5173`), Frontend Admin (`port 5174`).
- [x] Chốt danh sách 3 tính năng sẽ test: FR-05 (Tìm kiếm), FR-11 (Lịch sử đơn hàng), FR-19 (Quản lý user).

## Giai đoạn 2: Tự động hóa từng tính năng (Lặp lại cho FR-05, FR-11, FR-19)
- **Tính năng 1: FR-05 (Tìm kiếm sản phẩm)**
  - [x] Điều khiển AI sinh 12 test cases (Positive, Negative, Edge) và lưu vào `FR05-data.json` hoặc `.csv`.
  - [x] Điều khiển AI viết script Playwright (`FR05.spec.js`) áp dụng Data-Driven Testing.
  - [x] Đảm bảo script có ít nhất 3 assertion patterns khác nhau (có comment ghi chú rõ ràng).
  - [x] Human Review: Chạy thử, bắt lỗi AI (vd: locators yếu, thiếu wait), tự sửa lại mã và ghi chú lại để viết AI Critique.
  - [x] Commit code (chỉ các file `.spec.ts`/`.js` tính vào tối thiểu 8 commits).

- **Tính năng 2: FR-11 (Lịch sử đơn hàng cá nhân)**
  - [x] Sinh 12 test cases & file Data (`FR11-data.json`).
  - [x] Viết script (`FR11.spec.js`) - Lưu ý xử lý luồng Đăng nhập (API setup + UI login).
  - [x] Kiểm tra 3 assertion patterns.
  - [x] Human Review & Fix code. Commit code.

- **Tính năng 3: FR-19 (Quản lý người dùng - Admin)**
  - [x] Sinh 12 test cases & file Data (`FR19-data.json`) - Nhớ đưa case Admin tự xóa mình hoặc ID sai định dạng vào data.
  - [x] Viết script (`FR19.spec.js`) - Xử lý đăng nhập bằng quyền Admin.
  - [x] Kiểm tra 3 assertion patterns.
  - [x] Human Review & Fix code. Commit code.

## Giai đoạn 3: Thực thi, Báo cáo lỗi & Lưu vết (Execution & Bugs)
- [x] Chạy lệnh `npx playwright test` để thực thi TOÀN BỘ test suite trên 3 trình duyệt (Tổng >= 9 browser runs).
- [x] Kiểm tra Playwright HTML Report sinh ra: Đảm bảo có hiển thị "Run by: {StudentID}" và ISO timestamp.
- [x] Phân tích các test failed: Đâu là lỗi do script, đâu là lỗi do SUT?
- [ ] Lập Bug Report cho các lỗi thực sự của SUT (vd: FR-19 Admin tự xóa):
  - [x] Viết Bug Report bằng file Markdown theo mẫu `bug-report.md`.
  - [x] Mở Issue trên GitHub Repo, đính kèm ảnh chụp màn hình (Screenshot). *(FR-05 issues #21/#22/#23 đã tạo; FR-11 issue template sẵn sàng; FR-19 issue templates ở HW4/0.workingProcess/task1/FR19/)*

## Giai đoạn 4: Quay Video Demo
- [ ] Chuẩn bị kịch bản quay video (>= 5 phút, thuyết minh tiếng Việt).
- [ ] Mở terminal (CMD/PowerShell) và gõ lệnh `whoami` & `hostname` (hoặc bật face-cam) ở đầu video.
- [ ] Demo giới thiệu `SKILLS.md` (Agent Skill) đã dùng. - quay riêng
- [ ] Quay cảnh chạy một script hoàn chỉnh (vd: FR-19) chạy end-to-end trên đa trình duyệt.
- [ ] Thuyết minh về **một lỗi của AI** mà bạn đã phát hiện và tự sửa lại trong quá trình review.
- [ ] Mở và show HTML Report chứng minh có dòng chữ "Run by: {StudentID}".
- [ ] Upload video lên YouTube ở chế độ "Không công khai" (Unlisted) và lấy link.

## Giai đoạn 5: Viết Báo Cáo (Documentation)
- [ ] **AI Audit Report:** Điền form khai báo theo mẫu (Liệt kê công cụ, ngày giờ, prompt đã dùng, kết quả AI trả về). (Lấy từ log sinh ra ở Step 4 của SKILLS.md).
- [ ] **AI Critique (200-300 từ):** Phê bình AI (AI đã sai ở đâu, bias gì, thiếu sót gì, tại sao nó trượt lỗi, bài học hợp tác với AI).
- [ ] **Git Commit Log:** Xuất lịch sử commit ra một file text (Yêu cầu >= 8 commits thay đổi file test script).
- [ ] **Test Summary Report (Báo cáo tóm tắt):**
  - Tóm tắt số tính năng, số lượng test case (automated, executed, passed, failed).
  - Số lần chạy trình duyệt (>= 9).
  - Số lượng bugs tìm thấy.
  - Chèn link YouTube Video Demo.
  - Chèn Bảng Đánh Giá Cá Nhân (Self-Assessment Table) vào file `README.md`.

## Giai đoạn 6: Đóng gói & Nộp bài
- [ ] Gom tất cả các file yêu cầu vào một thư mục:
  - Báo cáo chính (Markdown + PDF) chứa Test Summary, Bug Report, AI Critique.
  - AI Audit Report (Markdown + PDF).
  - Link GitHub Repository (Public).
  - Báo cáo Playwright HTML (multi-browser).
  - Link YouTube Demo Video (Unlisted).
  - Git commit log (`.txt`).
  - File `README.md` (có bảng Self-Assessment Table).
- [ ] Đánh giá điểm tự chấm (SelfAssessedGrade) từ 000 - 100.
- [ ] Nén thành file ZIP với cú pháp: `<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip` (Ví dụ: `23120242_HW04_AI_Automation_095.zip`).
- [ ] Nộp file ZIP lên Moodle trước Deadline.