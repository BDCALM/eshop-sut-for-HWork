# HW04 Submission Reports

This folder contains evidence intended for the public GitHub repository and final submission.

## Contents

- `playwright-html-minhchung/`: final submission evidence grouped by feature (`FR05/`, `FR11/`, and `FR19/`). Each populated feature folder contains the HTML report and `data/` folders organized by test case and browser, including Markdown error context, screenshots, and videos.
- `bug-report.md`: FR-05 bug report with reproduction steps and evidence paths.
- `mainReports(md+pdf)/`: main report files, including `gap-analysis.md` and the reusable `gap-analysis-template.md`.

The automation source and data remain in their normal source locations:

- `HW4/tests/FR05.spec.js`
- `HW4/tests/data/FR05-data.json`
- `HW4/tests/`

## HTML report and execution evidence

From the `HW4` directory, with the backend and web frontend running:

```powershell
npx playwright test tests/FR05.spec.js
```

The final evidence is stored under `Submission/reports/playwright-html-minhchung/<feature>/`. The `data/` subfolders are copied from the corresponding Playwright `test-results` folders after execution so the screenshots, videos, and error contexts remain grouped by test case.

To open it locally:

```powershell
npx playwright show-report Submission/reports/playwright-html-minhchung/FR05
```

The original `HW4/test-results/` directory is a working execution directory. The organized `playwright-html-minhchung/` copy is the submission evidence and should be committed for public repository review.
