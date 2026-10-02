const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/browser', timeout: 30000, retries: process.env.CI ? 1 : 0,
  reporter: 'list', use: { baseURL: 'http://127.0.0.1:8765', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-webkit', use: { ...devices['iPhone 13'] } }
  ],
  webServer: { command: 'node tests/server.cjs', url: 'http://127.0.0.1:8765', reuseExistingServer: !process.env.CI }
});
