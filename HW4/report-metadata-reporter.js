const fs = require('node:fs');
const path = require('node:path');

class ReportMetadataReporter {
  async onExit() {
    const reportPath = path.resolve(__dirname, 'Submission/reports/playwright-html/index.html');
    if (!fs.existsSync(reportPath)) return;

    const studentId = '23120242';
    const generatedAt = new Date().toISOString();
    let html = fs.readFileSync(reportPath, 'utf8');

    html = html.replace(
      '<title>Playwright Test Report</title>',
      `<title>Run by: ${studentId} | ${generatedAt}</title>`,
    );
    html = html.replace(
      '<body>',
      `<body><div id="hw04-report-metadata" style="padding: 8px 16px; background: #e8f1ff; color: #17365d; font: 14px sans-serif; border-bottom: 1px solid #b8cce4;">Run by: ${studentId} | ${generatedAt}</div>`,
    );

    fs.writeFileSync(reportPath, html);
  }
}

module.exports = ReportMetadataReporter;
