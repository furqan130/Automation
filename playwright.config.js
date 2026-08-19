require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://de-uat-internal.waiindustries.com/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },
    {
      // Login module runs unauthenticated so it can exercise the login form itself.
      name: 'chromium-no-auth',
      testMatch: /tests\/login\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        // A full-HD viewport (instead of the 1280x720 default) so headed runs are easy to watch.
        // (viewport: null would be "true" full-window sizing, but it conflicts with the
        // deviceScaleFactor baked into the Desktop Chrome preset.)
        viewport: { width: 1920, height: 1080 },
        launchOptions: { args: ['--start-maximized'] },
      },
    },
    {
      // Every other module reuses a logged-in session saved by auth.setup.js.
      name: 'chromium',
      testIgnore: /tests\/login\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
        viewport: { width: 1920, height: 1080 },
        launchOptions: { args: ['--start-maximized'] },
      },
      dependencies: ['setup'],
    },
  ],
});
