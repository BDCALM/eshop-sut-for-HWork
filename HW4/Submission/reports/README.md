# HW04 Submission Reports

This folder contains evidence intended for the public GitHub repository and final submission.

## Contents

- `playwright-html/`: generated Playwright HTML report. It includes the Chromium, Firefox, and WebKit projects from the same run and the report metadata `Run by: 23120242` with an ISO timestamp.
- `bug-report.md`: FR-05 bug report with reproduction steps and evidence paths.
- `mainReports(md+pdf)/`: main report files when they are completed.

The automation source and data remain in their normal source locations:

- `HW4/tests/FR05.spec.js`
- `HW4/tests/data/FR05-data.json`
- `HW4/tests/`

## Generate the HTML report

From the `HW4` directory, with the backend and web frontend running:

```powershell
npx playwright test tests/FR05.spec.js
```

The report is generated in `Submission/reports/playwright-html/` because that output folder is configured in `playwright.config.ts`.

To open it locally:

```powershell
npx playwright show-report Submission/reports/playwright-html
```

Do not commit `HW4/test-results/` or the old root `HW4/playwright-report/` directory. Those are temporary execution artifacts. Copy the relevant failure screenshots into the final submission only when they are needed as supporting evidence for a bug report.
