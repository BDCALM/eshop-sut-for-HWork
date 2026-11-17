import { defineConfig, devices } from '@playwright/test';

const studentId = '23120242';
const runTimestamp = new Date().toISOString();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  metadata: {
    runBy: studentId,
    generatedAt: runTimestamp,
  },
  reporter: [
    ['html', {
      open: 'never',
      outputFolder: 'Submission/reports/playwright-html-minhchung/FR11',
      title: `Run by: ${studentId} | ${runTimestamp}`,
    }],
    ['./Submission/reports/playwright-html-minhchung/script-report-metadata-reporter.js'],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

