# Workflow Giai đoạn 2-3 - Automation Testing cho một Feature

Tài liệu này mô tả workflow hoàn chỉnh để tự động hóa một feature web trong HW04. Ví dụ minh họa sử dụng FR-05 - Tìm kiếm sản phẩm. Workflow có thể lặp lại cho FR-11 và FR-19 bằng cách thay đổi requirement, test data, locator, luồng đăng nhập và thư mục evidence.

## 1. Xác định phạm vi feature

Đọc requirement trong `README.md` và tài liệu HW04 trước khi sinh test. Với FR-05, phạm vi gồm:

- Hiển thị danh sách sản phẩm.
- Tìm kiếm theo tên sản phẩm.
- Tìm kiếm chính xác, tìm kiếm một phần và tìm kiếm không phân biệt hoa thường.
- Empty state khi không có kết quả.
- Hiển thị an toàn dữ liệu người dùng nhập.
- Xử lý input biên như khoảng trắng, chuỗi dài, Unicode, số và ký tự wildcard.

Không suy đoán expected result chỉ từ implementation hiện tại. Expected result phải dựa trên SRS/requirement để test có thể phát hiện lỗi của SUT.

## 2. Sinh 12 test cases

Tạo đúng 12 ca kiểm thử cho mỗi feature, kết hợp positive, negative và edge cases. Với FR-05, test data được lưu ngoài script tại:

```text
HW4/tests/data/FR05-data.json
```

Mỗi test case nên có tối thiểu:

- `id`: mã duy nhất, ví dụ `FR05-TC01`.
- `title`: mục tiêu kiểm thử.
- `query` hoặc input tương ứng.
- Loại assertion/expected result.
- Giá trị expected cụ thể, nếu có.

Bộ FR-05 gồm các nhóm sau:

1. Không nhập query: hiển thị toàn bộ sản phẩm.
2. Tìm kiếm chính xác theo tên.
3. Tìm kiếm theo một phần tên.
4. Không phân biệt chữ hoa/chữ thường.
5. Query có nhiều từ.
6. Query không có kết quả và phải có empty state.
7. Query chỉ gồm khoảng trắng.
8. Query có chữ Việt/dấu cách.
9. Query là chuỗi số xuất hiện trong tên.
10. Query chứa HTML/script và phải được hiển thị an toàn.
11. Query rất dài không có kết quả.
12. Ký tự SQL wildcard `%` phải được xử lý như input literal.

Kiểm tra dữ liệu trước khi viết script:

- Có đúng 12 object.
- ID không trùng.
- Không hardcode lại test data trong `.spec.js`.
- Expected result phù hợp requirement, không chỉ phù hợp với hành vi hiện tại của SUT.

## 3. Viết script Playwright data-driven

Tạo script tại:

```text
HW4/tests/FR05.spec.js
```

Script phải:

1. Đọc JSON/CSV từ file riêng.
2. Sinh test bằng vòng lặp data-driven.
3. Dùng locator hướng người dùng như `getByRole`, `getByPlaceholder`, hoặc locator theo text ổn định.
4. Không dùng XPath tuyệt đối, selector `nth-child` dễ gãy hoặc dữ liệu test inline.
5. Dùng Playwright auto-wait và assertion để chờ trạng thái UI; không thêm `waitForTimeout` cố định nếu không cần.
6. Có screenshot/video/trace theo cấu hình để phục vụ human review.

Ví dụ cấu trúc:

```js
const { test, expect } = require('@playwright/test');
const testCases = require('./data/FR05-data.json');

for (const testCase of testCases) {
  test(`${testCase.id}: ${testCase.title}`, async ({ page }) => {
    // Arrange, act, and assert according to testCase.
  });
}
```

## 4. Đảm bảo ít nhất 3 assertion patterns

Mỗi script phải có ít nhất ba cách kiểm chứng khác nhau và nên ghi chú rõ trong code. FR05 sử dụng:

### Assertion Pattern 1 - Visibility/state

Kiểm tra control hoặc trạng thái UI tồn tại và hiển thị:

```js
await expect(searchInput).toBeVisible();
await expect(searchButton).toBeVisible();
```

### Assertion Pattern 2 - Navigation/URL

Kiểm tra URL sau thao tác:

```js
await expect(page).toHaveURL(/http:\/\/localhost:5173\/?$/);
```

### Assertion Pattern 3 - Count/value/text/content

Tùy test case, kiểm tra số lượng hoặc nội dung:

```js
await expect(productTitles).toHaveCount(expectedCount);
await expect(productTitles.filter({ hasText: expectedProduct })).toBeVisible();
await expect(page.getByText('Không tìm thấy sản phẩm')).toBeVisible();
```

Với case security như HTML query, assertion nên kiểm tra mạnh hơn:

- Query xuất hiện như text nguyên văn.
- Không tạo thẻ `script` mới.
- Không khẳng định JavaScript đã chạy nếu test chưa có bằng chứng trực tiếp cho việc đó.

## 5. Human review trước khi chạy toàn bộ

Review script và data như một sản phẩm do AI đề xuất, không coi output AI là đúng mặc định.

Kiểm tra các điểm sau:

- Locator có bám vào giao diện người dùng ổn định không?
- Có thiếu `await` không?
- Có dùng wait cố định gây flaky test không?
- Expected result có lấy từ requirement không?
- Assertion có thực sự kiểm tra behavior hay chỉ kiểm tra element tồn tại?
- Test có thể phân biệt lỗi script, lỗi môi trường và lỗi SUT không?
- Có test nào đang làm yếu expected result chỉ để pass không?

Nếu phát hiện lỗi do AI, sửa script trong cùng slice và ghi lại trong AI Audit/AI Critique. Ví dụ FR05: script ban đầu dùng ESM `import` nhưng project chưa khai báo ESM; human review đã sửa sang CommonJS `require` trước khi chạy lại.

## 6. Chạy kiểm thử từng bước

### 6.1. Chuẩn bị SUT

Chạy backend và frontend trong các terminal riêng:

```powershell
cd H:\Source\src\eshop-sut-for-HWork\backend
node server.js
```

```powershell
cd H:\Source\src\eshop-sut-for-HWork\frontend-web
npm run dev -- --host 0.0.0.0 --port 5173
```

Kiểm tra nhanh:

```powershell
Invoke-WebRequest http://localhost:3000/api/products
Invoke-WebRequest http://localhost:5173
```

### 6.2. Chạy một browser trước

```powershell
cd H:\Source\src\eshop-sut-for-HWork\HW4
npx playwright test tests/FR05.spec.js --project=chromium --reporter=line
```

Mục đích là bắt lỗi loader, locator, data hoặc assertion của script với chi phí thấp.

### 6.3. Chạy đủ ba browser

```powershell
npx playwright test tests/FR05.spec.js
```

Playwright phải chạy trên Chromium, Firefox và WebKit. Với 12 test cases, FR05 tạo 36 browser-specific test executions. Ghi lại tổng số passed/failed và phân loại failure.

Lưu ý: nếu có failure do SUT, lệnh có thể trả exit code `1`; HTML report vẫn có thể được tạo. Không coi exit code `1` tự động là lỗi của script.

## 7. Thu thập evidence

### 7.1. HTML report

HTML report được sinh bởi Playwright HTML reporter. Report cần có:

- `index.html`.
- Kết quả theo browser/project.
- Student ID `Run by: 23120242`.
- ISO timestamp.
- Attachments hoặc links đến failure khi có.

Lệnh mở report:

```powershell
npx playwright show-report Submission/reports/playwright-html-minhchung/FR05
```

### 7.2. Screenshot, video và error context

Sau khi chạy test, giữ evidence theo từng test case và browser:

```text
HW4/Submission/reports/playwright-html-minhchung/FR05/
├── index.html
└── data/
    ├── FR05-FR05-TC06-...-chromium/
    │   ├── error-context.md
    │   ├── test-failed-1.png
    │   └── video.webm
    ├── FR05-FR05-TC06-...-firefox/
    └── ...
```

Không chạy lại test sau khi đã thu thập evidence nếu output folder có thể bị Playwright dọn hoặc ghi đè. Nếu cần chạy lại, tạo một output folder/version riêng hoặc sao lưu evidence trước.

## 8. Phân tích failure

Phân loại mỗi failure thành một trong ba nhóm:

### A. Lỗi script/test design

Ví dụ: sai module format, locator không tồn tại, thiếu `await`, expected result sai requirement. Sửa script và chạy lại test liên quan.

### B. Lỗi môi trường

Ví dụ: backend/frontend không chạy, sai `VITE_API_URL`, CORS, port hoặc database bị reset. Sửa môi trường và chạy lại.

### C. Lỗi SUT

Expected result đúng theo requirement, script đã được review, môi trường hợp lệ và behavior sai được tái hiện ổn định. Giữ failure làm evidence và không sửa SUT trong homework automation.

Với FR05, 15 failures trên 3 browser được gom thành 3 lỗi gốc:

1. Thiếu empty state: TC06, TC07, TC11.
2. Render HTML không an toàn: TC10.
3. `%` bị xử lý như SQL wildcard: TC12.

## 9. Viết bug report

Bug report chính đặt tại:

```text
HW4/Submission/reports/bug-report.md
```

Mỗi bug cần có:

- Bug ID và title.
- Summary.
- Environment.
- Preconditions.
- Steps to reproduce.
- Test case liên quan.
- Expected result.
- Actual result.
- Impact.
- Severity/Priority.
- Evidence path.
- Suspected implementation area.
- GitHub Issue URL sau khi issue được tạo.

Không tạo 15 bug chỉ vì cùng một defect lặp lại trên 3 browser. Gộp theo root cause nhưng ghi rõ browser và test case đã tái hiện.

## 10. Tạo GitHub Issues và hoàn thiện link

Script CLI của FR05 nằm tại:

```text
HW4/0.workingProcess/task1/create-fr05-github-issues.sh
```

Hướng dẫn sử dụng nằm tại:

```text
HW4/0.workingProcess/task1/github-issue-cli-script-FR05.md
```

Trong GitHub Codespaces:

```bash
gh auth login
cd /workspaces/eshop-sut-for-HWork
chmod +x HW4/0.workingProcess/task1/create-fr05-github-issues.sh
HW4/0.workingProcess/task1/create-fr05-github-issues.sh
```

Sau khi script tạo issue:

1. Copy URL của từng issue.
2. Upload screenshot tương ứng vào issue.
3. Thay placeholder `REPLACE-BUG-FR05-*` trong `bug-report.md` bằng URL thật.
4. Kiểm tra issue có title, reproduction steps và evidence.
5. Ghi các URL cuối cùng vào báo cáo tổng kết nếu cần.

Đây là phần còn thiếu của workflow FR05 hiện tại.

## 11. Các báo cáo và vị trí lưu

| Artifact | Vị trí |
| --- | --- |
| Test data | `HW4/tests/data/FR05-data.json` |
| Playwright script | `HW4/tests/FR05.spec.js` |
| Run/review guide | `HW4/0.workingProcess/task1/FR05-run-and-review-guide.md` |
| GitHub CLI guide/script | `HW4/0.workingProcess/task1/github-issue-cli-script-FR05.md` và `.sh` |
| HTML report | `HW4/Submission/reports/playwright-html-minhchung/FR05/index.html` |
| Failure evidence | `HW4/Submission/reports/playwright-html-minhchung/FR05/data/<test-case-browser>/` |
| Bug report | `HW4/Submission/reports/bug-report.md` |
| Gap analysis | `HW4/Submission/reports/mainReports(md+pdf)/gap-analysis.md` |
| Gap analysis template | `HW4/Submission/reports/mainReports(md+pdf)/gap-analysis-template.md` |
| AI audit/prompt log | `HW4/Submission/AI-Audit-Report.md` và `HW4/Submission/prompt_log.md` |
| Commit history | `HW4/Submission/Git-Commit-Log.txt` |

## 12. Completion checklist cho một feature

- [ ] Requirement và phạm vi feature đã được đọc.
- [ ] Đã có đúng 12 test cases positive/negative/edge.
- [ ] Data được tách khỏi script trong JSON/CSV.
- [ ] Script Playwright data-driven đã được viết.
- [ ] Có ít nhất 3 assertion patterns được comment rõ ràng.
- [ ] Human review đã sửa lỗi AI và ghi nhận AI Critique.
- [ ] Đã chạy smoke test trên một browser.
- [ ] Đã chạy đủ Chromium, Firefox và WebKit.
- [ ] Đã ghi số passed/failed và phân loại failure.
- [ ] Đã lưu HTML report, screenshot, video và error context.
- [ ] Đã viết bug report cho lỗi SUT thực sự.
- [ ] Đã tạo GitHub Issues và upload screenshot.
- [ ] Đã thay placeholder bằng URL issue thật trong bug report.
- [ ] Đã cập nhật prompt log, AI Audit và Git commit log.
