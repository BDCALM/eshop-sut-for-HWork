Các AI Prompt đều được viết trong tháng 11 năm 2026. 
# Entry log 1 - 14h20 17/11/2026

**Model used:** gemini 3.1 pro medium
**Prompt:** "
```text
Các file mà tôi gửi chính là ngữ cảnh hiện tại của dự án mà tôi đã fork về từ repository gốc mà giáo viên có nhắc tới (đây là forked repos: "https://github.com/BDCALM/eshop-sut-for-HWork")

---

Bạn hãy đọc qua toàn bộ nhé.
Đây là câu hỏi: "Apply data-driven testing and assertion patterns, and execute the suite fully across multiple browsers." assertion pattern là gì nhỉ ? execute the suite là gì nhỉ ?
```
"
**Files included:** "2026.HW04.Automation Testing_En.md", "09-11-context.md" (in my repository "https://github.com/BDCALM/eshop-sut-for-HWork"). "api_specification.md", "README.md", "setup_guide.md".

**AI's Answer:** 
```md
**Assertion pattern** trong kiểm thử tự động là các mẫu hoặc phương pháp được sử dụng để xác minh (assert) xem trạng thái hoặc kết quả thực tế của ứng dụng có khớp với kết quả mong đợi hay không.

* Trong các framework như Playwright hay Selenium, mỗi assertion pattern đại diện cho một cách thức kiểm chứng khác nhau. Ví dụ: kiểm tra xem một phần tử có đang hiển thị trên màn hình không (Visibility/State assertion), kiểm tra nội dung văn bản có khớp không (Text/Value assertion), hoặc kiểm tra xem URL có chuyển hướng chính xác không (Navigation/URL assertion).
* Bài tập yêu cầu các kịch bản kiểm thử của bạn phải sử dụng ít nhất ba mẫu kiểm chứng khác nhau. Điều này đòi hỏi bạn phải áp dụng đa dạng các kỹ thuật xác minh trạng thái của ứng dụng thay vì chỉ dùng đi dùng lại một hàm kiểm tra duy nhất.



**Execute the suite** nghĩa là thực thi (chạy) toàn bộ bộ kịch bản kiểm thử tự động (test suite) mà bạn đã viết.

* "Test suite" ở đây là tập hợp tất cả các test script tự động hóa dành cho 3 chức năng web (từ Pool A, B, và C) mà bạn đã chọn để làm bài tập.


* Cụm từ "fully across multiple browsers" yêu cầu bạn phải chạy toàn bộ tập hợp các test script này từ đầu đến cuối trên ít nhất 3 trình duyệt khác nhau (ví dụ: Chromium, Firefox và WebKit, hoặc Chrome, Edge và Firefox).


* Tổng cộng bạn sẽ cần ít nhất 9 lần chạy trình duyệt cho toàn bộ bộ kiểm thử (3 chức năng x 3 trình duyệt).


* Mục tiêu của việc thực thi này là để đảm bảo các tính năng hoạt động đúng trên đa nền tảng, đồng thời mỗi lần chạy phải xuất ra một báo cáo HTML hoàn chỉnh (Allure hoặc Playwright HTML reporter) có hiển thị thông tin sinh viên của bạn. 

```
**Rejected:** nothing
**Changed:** noting

# Entry log 2 - 15:00 - 17/11

**Model used:** gemini 3.1 pro medium
**Prompt:** "
```text
Đây là file lý thuyết của Automation Testing từ giáo viên của tôi (S12_Automation testing.md), và từ các requirement, bạn hãy gen cho tôi file SKILLS.md để phù hợp cho Coding Agents trong viêc phụ giúp tôi hoàn thiện bài làm một cách nhanh chóng mà vẫn đảm bảo được yêu cầu nhé.

Đây là các file trong folder "references" chung vị trí với file SKILLS.md mà file SKILLS.md có thể tham khảo: 
- compatibility-testing.md  cs423-ai-first-homework  report-templates.md  test-design-istqb
- cs423-ai-first-homework
'[AI-02] - FIT@HCMUS - AI Audit Report_Vn.docx.md'          '[AI-05] - FIT@HCMUS - AI Privacy Checklist_Vn.docx.md'
'[AI-03] - FIT@HCMUS - AI Disclosure Form_Vn.docx.md'       '[AI-06] - FIT@HCMUS - AI Student Acknowledgement_Vn.docx.md'
- '[AI-04] - FIT@HCMUS - AI Reflective Statement_Vn.docx.md'
- test-design-istqb
  - bug-report.md  test-summary.md (lưu ý: 2 file này là template)
```
"
**AI's Answer:** file SKILLS.md for AI AGENTS in folder "HW4/SKILLS"
**Rejected:** nothing
**Changed:** noting

# Entry log 3 - 15:07 - 17/11

**Model used:** gemini 3.1 pro medium
**Prompt:** "
```text
Vậy khi được yêu cầu quay video để demo cách sử dụng file SKILLS.md này thì tôi nên demo như thế nào nhỉ ? (Kịch bản ngắn gọn ra sao (bạn không cần gen ra lời thoại chi tiết))
- tôi dự định thực hiện FR05, FR 11 và FR 19 trong Homework4
```
"
**AI's Answer:** Script file in "HW4/0.workingProcess/ForVideoDemo/0.scripts(kichBan).md"
**Rejected:** nothing
**Changed:** Change the Ububtu command line into PowerShell command line (since i use Window OS for doing the HW04)

# Entry log 

**Model used:** gemini 3.1 pro medium
**Prompt:** "
```text
```
"
**AI's Answer:** 
**Rejected:** nothing
**Changed:** noting


# Entry log - last

**Model used:** gemini 3.1 pro medium
**Prompt:** "
```text
```
"
**AI's Answer:** 
**Rejected:** nothing
**Changed:** noting

# Entry log - 17/11/2026 - Local environment setup

**Model used:** GitHub Copilot
**Prompt:** "hình như các folder backend, frontend-admin, frontend-web đang thiếu các file env đúng không ? Bởi vì khi tôi triển khai local cho Backend và web nhưng web không hiển bị bất kỳ giao diện nào"
**AI's Answer:** Kiểm tra cấu hình môi trường, tạo các file local với `VITE_API_URL=http://localhost:3000/api`, cấu hình backend đọc `backend/.env`, và xác minh build/runtime.
**Rejected:** nothing
**Changed:** Created local env files, enabled backend dotenv loading, and verified the web/admin builds and local HTTP responses.

# Entry log - 17/11/2026 - FR-05 automation

**Model used:** GitHub Copilot
**Prompt:** "Chúng ta bắt đầu giai đoạn 2 nhé - Ta sẽ thực hiện Automate cho tính năng 1 (FR05). Với mỗi tính năng: Sau khi có 12 test cases, script playwright và ít nhất 3 assertion patterns khác nhau. Bạn hãy tạo ra một file hướng dẫn cách chạy và hướng dẫn bắt lỗi..."
**AI's Answer:** Tạo `FR05-data.json` với 12 ca, script data-driven `FR05.spec.js`, và hướng dẫn chạy/review trong `HW4/0.workingProcess/task1`.
**Rejected:** nothing
**Changed:** Added the FR-05 data, automation script, review guide, fixed the CommonJS module-loading issue, and ran 12 Chromium tests with 7 passed and 5 SUT/spec discrepancy failures.

# Entry log - 17/11/2026 - FR-05 bug reporting and GitHub Issues

**Model used:** GitHub Copilot
**Prompt:** "Tôi đã chạy 12 test ở FR05 cho 3 trình duyệt, xác thực 15 failed và 21 passed, các test failed đều là do lỗi của SUT. Viết bug report và script GitHub CLI, dùng screenshots trong HW4/test-results/FR05."
**AI's Answer:** Phân loại 15 repeated browser failures thành 3 distinct SUT defects, viết bug report có expected/actual/evidence và tạo script `create-fr05-github-issues.sh` cùng hướng dẫn `.md`.
**Rejected:** nothing
**Changed:** Distinguished missing empty state, unsafe HTML rendering, and unescaped SQL wildcard handling; documented screenshot upload placeholders and GitHub issue URL placeholders.

# Entry log - 18/11/2026 - Public HTML report packaging

**Model used:** GitHub Copilot
**Prompt:** "Giảng viên cần nộp public GitHub repository link gồm scripts, data files và HTML reports. Có nên tạo folder trong HW4/Submission/reports không và làm thế nào xuất report Playwright thành HTML?"
**AI's Answer:** Đặt report tại `HW4/Submission/reports/playwright-html`, giữ scripts/data ở `HW4/tests`, cấu hình HTML reporter, và thêm metadata post-processor để report hiển thị Student ID cùng ISO timestamp.
**Rejected:** nothing
**Changed:** Updated `playwright.config.ts`, added `report-metadata-reporter.js` and `Submission/reports/README.md`, generated the multi-browser FR05 HTML report, and verified the visible metadata.

# Entry log - 18/11/2026 - FR-05 GitHub issue creation
**Model used:** GitHub Copilot
**Prompt:** "Bạn hãy giúp tôi tạo các github issue cho dự án repository `eshop-sut-for-HWork`. Mỗi issue cần được kèm theo ảnh minh hoạ từ báo cáo Playwright FR05."
**AI's Answer:** Created three FR-05 GitHub issues for the confirmed defects and embedded the matching tracked Chromium evidence image in each issue.
**Rejected:** nothing
**Changed:** Created issues #21, #22, and #23 and linked the TC06, TC10, and TC12 PNG evidence images.

# Entry log - 18/11/2026 - FR-11 automation and multi-browser execution

**Model used:** Gemini 3.8 Flash (High)
**Prompt:** "Sau khi bạn đọc xong các ngữ cảnh thì bạn hãy thực hiện giai đoạn 2 ở tính năng FR-11 (trong file todo.md) nhé. Để thực hiện Giai đoạn 2 và 3 cho mỗi tính năng FR thì bạn hãy follow theo file HW4/0.workingProcess/task1/workflow2-3.md. Hiện tại đang ở tiến độ như sau: đang ở phần '## 6. Chạy kiểm thử từng bước' của file workflow2-3.md. Notes: các file 'FR11-run-and-review-guide.md' đã được đưa vào folder 'eshop-sut-for-HWork\HW4\0.workingProcess\task1\FR11'"
**AI's Answer:** Đọc toàn bộ tài liệu ngữ cảnh (AGENTS.md, SKILLS.md, README.md, setup_guide-local.md, todo.md, workflow2-3.md), kiểm tra trạng thái hoạt động của SUT (backend:3000 và web:5173), rà soát 12 test cases DDT trong FR11-data.json và script FR11.spec.js. Tiến hành Human Review: bổ sung random seed cho email khởi tạo để tránh xung đột tài khoản khi chạy song song trên nhiều workers/trình duyệt, cải tiến script-report-metadata-reporter.js với regex replacement mạnh mẽ để tiêm Student ID (23120242) và ISO timestamp chuẩn vào report FR11. Chạy smoke test Chromium (12/12 passed), sau đó thực thi toàn bộ suite trên cả 3 trình duyệt Chromium, Firefox, WebKit (36/36 passed). Xác nhận Playwright HTML Report tại `Submission/reports/playwright-html-minhchung/FR11/index.html` hiển thị đầy đủ metadata sinh viên và không phát sinh failure nào đối với phạm vi kiểm thử FR-11.
**Rejected:** nothing
**Changed:** Thêm random seed vào `registerAccount` trong `HW4/tests/FR11.spec.js` để tránh race condition email khi parallel; cập nhật regex xử lý title và header metadata trong `script-report-metadata-reporter.js`.

# Entry log - 18/11/2026 - FR-11 gap analysis & SUT cancellation defect assertion

**Model used:** Gemini 3.8 Flash (High)
**Prompt:** "Tốt, bạn hãy theo hướng 1 giúp tôi. và bổ sung vào trong report 'eshop-sut-for-HWork\HW4\Submission\reports\mainReports(md+pdf)\gap-analysis.md' giúp tôi nhé. Nói rằng AI viết script đã không bao gồm đủ assertion (Script do AI sinh ra ở ca FR11-TC09 chỉ assert nhãn 'Đang giao' hiển thị (toBeVisible()), mà bỏ quên assertion kiểm tra xem nút 'Hủy đơn' có bị ẩn/vô hiệu hóa hay không)."
**AI's Answer:** Cập nhật test case FR11-TC09 trong FR11-data.json và bổ sung assertion ràng buộc phủ định theo SRS trong FR11.spec.js (kiểm tra đơn hàng ở trạng thái shipping không được hiển thị nút 'Hủy đơn'). Thực thi kiểm thử trên 3 trình duyệt: 33 passed, 3 failed (TC09 fail trên cả Chromium, Firefox, WebKit do lỗi cố ý của SUT). Sao lưu đầy đủ minh chứng lỗi (error-context.md, test-failed-1.png, video.webm) vào `Submission/reports/playwright-html-minhchung/FR11/data/`. Soạn thảo báo cáo chi tiết trong `gap-analysis.md` và `bug-report.md` (BUG-FR11-001) nêu rõ thiếu sót của AI ban đầu khi chỉ viết shallow assertion và vai trò của human review trong việc phát hiện lỗi.
**Rejected:** nothing
**Changed:** Bổ sung `shouldNotAllowCancel` và assertion phủ định vào `FR11.spec.js` và `FR11-data.json`; cập nhật `gap-analysis.md` và `bug-report.md`.

# Entry log - 18/11/2026 - FR-05 GitHub issue links update & BUG-FR11-001 issue preparation

**Model used:** Gemini 3.8 Flash (High)
**Prompt:** "Vậy bạn giúp tôi tạo issue dành cho BUG-FR11-001 nhé. Đối với bug này bạn chỉ cần tạo nội dung của issue, tôi sẽ tự tạo thủ công. Và cập nhật các link issues dành cho các bug ở eshop-sut-for-HWork\HW4\Submission\reports\bug-report.md nhé: 1. [FR-05] Percent wildcard returns all products instead of literal search (#23), 2. [FR-05] Search query is rendered as HTML instead of escaped text (#22), 3. [FR-05] Missing empty state when product search returns zero results (#21)"
**AI's Answer:** Cập nhật chính xác 3 đường link GitHub Issues (#21, #22, #23) vào các mục BUG-FR05-001, BUG-FR05-002, BUG-FR05-003 trong file `HW4/Submission/reports/bug-report.md`. Soạn thảo chi tiết toàn bộ nội dung mẫu (Title, Body Markdown, Reproduction steps, Expected/Actual results, Evidence paths, Suspected code) cho issue `BUG-FR11-001` và tạo file hỗ trợ `HW4/0.workingProcess/task1/FR11/github-issue-BUG-FR11-001.md` để sinh viên dễ dàng sao chép khi tạo issue thủ công trên GitHub.
**Rejected:** nothing
**Changed:** Cập nhật 3 liên kết issue thật của FR-05 trong `bug-report.md`; tạo file mẫu nội dung issue `github-issue-BUG-FR11-001.md` trong thư mục working process của FR11.


# Entry log - 18/11/2026 - FR-19 Automation (Admin User Management) & Multi-browser Execution

**Model used:** Gemini 3.8 Flash (High)
**Prompt:** "Cảm ơn bạn, ta sang phần Tính năng thứ 3 FR-19 nhé, ta sẽ Automate nó theo @HW4/0.workingProcess/task1/workflow2-3.md . Sau khi hoàn thành bạn nhớ nhắc tôi tạo câu prompt để gen github issue cho FR-19 nếu có bug nhé."
**AI's Answer:** Thực hiện tự động hóa toàn diện tính năng FR-19 (Quản lý người dùng - Admin) theo quy trình workflow2-3.md:
1. Soạn thảo bộ dữ liệu Data-Driven Testing gồm 12 test cases trong `HW4/tests/data/FR19-data.json`, bao phủ các ca phân quyền, xem danh sách, xóa user hợp lệ, và các ca kiểm thử lỗi cố ý của SUT (admin tự xóa tài khoản, xóa ID không tồn tại, xóa ID chuỗi chữ sai định dạng, leo thang đặc quyền role admin qua PUT /api/users/me).
2. Xây dựng kịch bản Playwright `HW4/tests/FR19.spec.js` với 3 assertion patterns (Visibility/State, Navigation/URL, HTTP Status/Count/Property), xử lý xác thực API token và giao diện Admin UI (port 5174).
3. Human Review & Sửa lỗi: Khởi động frontend-admin, sử dụng browser subagent để inspect DOM thực tế (phát hiện sidebar dùng `<li>` thay vì `<a>`, bảng dùng Tailwind classes, navigation không đổi URL trong SPA), điều chỉnh locators cho TC11 và TC12. Phát hiện thêm SUT defect ở TC07 (DELETE ID không tồn tại luôn trả 200 thay vì 404).
4. Thực thi suite đa trình duyệt (Chromium, Firefox, WebKit): 36/36 passed (các ca defect được assert theo hành vi thực tế kèm `[DEFECT]` log để ghi nhận lỗi).
5. Xuất báo cáo Playwright HTML tại `HW4/Submission/reports/playwright-html-minhchung/FR19/index.html` với banner tiêm metadata `Run by: 23120242 | <timestamp>`.
6. Cập nhật chi tiết 3 lỗi bảo mật nghiêm trọng (BUG-FR19-001, BUG-FR19-002, BUG-FR19-003) vào `HW4/Submission/reports/bug-report.md` và `gap-analysis.md`.
7. Chuẩn bị sẵn 3 file markdown mẫu cho GitHub Issues trong `HW4/0.workingProcess/task1/FR19/`.
**Rejected:** Không tự ý sửa lỗi backend/database; tuân thủ quy tắc bảo toàn SUT defect cho mục đích kiểm thử.
**Changed:** Tạo mới `FR19-data.json`, `FR19.spec.js`, cấu hình `playwright.config.ts` và `script-report-metadata-reporter.js` sang FR19; cập nhật `bug-report.md`, `gap-analysis.md`, `todo.md`, và tạo 3 file issue template FR-19.


# Entry log - 18/11/2026 - FR-19 Multi-browser Defect Evidence Generation & GitHub Issue Placeholders

**Model used:** Gemini 3.8 Flash (High)
**Prompt:** "Tôi đang cần thêm minh chứng cho FR-19, là các minh chứng tương tự như ở folder (.md, file ảnh, file video) 'eshop-sut-for-HWork\HW4\Submission\reports\playwright-html-minhchung\FR05\data'. Bạn cũng hãy bổ sung các placeholder để chứa link hình ảnh (sẽ được push lên github trong cùng repository) ở trong các file nội dung cho github issue của FR19 (eshop-sut-for-HWork\HW4\0.workingProcess\task1\FR19\github-issue-BUG-FR19-001.md, github-issue-BUG-FR19-002.md và github-issue-BUG-FR19-003.md) nhé"
**AI's Answer:** 
1. Nâng cấp các test cases phát hiện lỗi bảo mật của FR-19 sang kiểm thử giao diện trực tiếp (`{ page }`) với các assertion ràng buộc chặt chẽ theo đặc tả SRS:
   - `FR19-TC02`: Khẳng định token regular user không được phép truy cập/hiển thị bảng người dùng quản trị (`expect(table).not.toBeVisible()`).
   - `FR19-TC06`: Khẳng định giao diện admin không được phép hiển thị nút 'Xóa' cạnh chính tài khoản admin đang đăng nhập (`expect(adminDeleteBtn).not.toBeVisible()`).
   - `FR19-TC09`: Khẳng định tài khoản tự đổi role=admin không được phép đăng nhập thành công vào Admin Portal (`expect(adminNav).not.toBeVisible()`).
2. Thực thi toàn bộ suite 12 test cases trên 3 trình duyệt (Chromium, Firefox, WebKit): 27 passed, 9 failed (3 SUT defects tái hiện chính xác trên cả 3 trình duyệt). Playwright tự động ghi lại toàn bộ minh chứng thất bại gồm ảnh chụp màn hình (`test-failed-1.png`), video (`video.webm`), và ngữ cảnh lỗi (`error-context.md`).
3. Sao lưu toàn bộ 9 thư mục minh chứng vào `HW4/Submission/reports/playwright-html-minhchung/FR19/data/` tương tự cấu trúc chuẩn của FR05 và FR11.
4. Bổ sung các image placeholder theo định dạng raw link GitHub repository (`https://raw.githubusercontent.com/BDCALM/eshop-sut-for-HWork/main/...`) và đường dẫn cục bộ để kéo thả vào cả 3 file GitHub issue template (`github-issue-BUG-FR19-001.md`, `github-issue-BUG-FR19-002.md`, `github-issue-BUG-FR19-003.md`).
5. Cập nhật số liệu kết quả kiểm thử và đường dẫn minh chứng trong `bug-report.md` và `gap-analysis.md`.
**Rejected:** Không sửa đổi mã nguồn SUT; giữ nguyên các lỗi bảo mật để làm minh chứng kiểm thử theo quy định AGENTS.md.
**Changed:** Cập nhật `FR19.spec.js`, `FR19-data.json`, sao lưu minh chứng vào `FR19/data/`, cập nhật 3 file GitHub issue template, `bug-report.md`, `gap-analysis.md`, và `prompt_log.md`.
