const fs = require('node:fs');
const path = require('node:path');

class ReportMetadataReporter {
  async onExit() {
    const cliArgs = process.argv.join(' ');
    let feature = process.env.PLAYWRIGHT_FEATURE;
    if (!feature) {
      if (cliArgs.includes('FR05')) {
        feature = 'FR05';
      } else if (cliArgs.includes('FR11')) {
        feature = 'FR11';
      } else if (cliArgs.includes('FR19')) {
        feature = 'FR19';
      } else {
        feature = 'FR11';
      }
    }
    const reportPath = path.resolve(__dirname, feature, 'index.html');
    if (!fs.existsSync(reportPath)) return;

    const studentId = '23120242';
    const generatedAt = new Date().toISOString();
    let html = fs.readFileSync(reportPath, 'utf8');

    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>Run by: ${studentId} | ${generatedAt}</title>`,
    );
    if (html.includes('id="hw04-report-metadata"')) {
      html = html.replace(
        /<div id="hw04-report-metadata"[^>]*>.*?<\/div>/,
        `<div id="hw04-report-metadata" style="padding: 8px 16px; background: #e8f1ff; color: #17365d; font: 14px sans-serif; border-bottom: 1px solid #b8cce4;">Run by: ${studentId} | ${generatedAt}</div>`,
      );
    } else {
      html = html.replace(
        '<body>',
        `<body><div id="hw04-report-metadata" style="padding: 8px 16px; background: #e8f1ff; color: #17365d; font: 14px sans-serif; border-bottom: 1px solid #b8cce4;">Run by: ${studentId} | ${generatedAt}</div>`,
      );
    }

    fs.writeFileSync(reportPath, html);
  }
}

module.exports = ReportMetadataReporter;
