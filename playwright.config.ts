import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests/e2e",
  /* Exclude docs tests - they have their own config */
  testIgnore: "**/docs.spec.ts",
  /* Consolidated output directory for all test results */
  outputDir: "./tests/e2e/test-results",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: "never", outputFolder: "tests/e2e/html-report" }], // Separate HTML report directory
    ["json", { outputFile: "tests/e2e/test-results/results.json" }], // JSON results in test-results
    ["list"],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Run in headed mode using Playwright's self-contained Chromium */
    headless: true,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    /* Take screenshot on failure */
    screenshot: "only-on-failure",

    /* Record video on failure */
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers - all use self-contained browser binaries */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Explicitly use self-contained Chromium (this is the default)
        // No 'channel' property means it uses Playwright's bundled Chromium
        // Ensure we don't accidentally use system browser
        channel: undefined,
      },
    },

    // Temporarily disabled for faster testing - only using Chrome for now
    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     // Uses self-contained Firefox (default behavior)
    //   },
    // },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     // Uses self-contained WebKit (default behavior)
    //   },
    // },

    /* Mobile tests temporarily disabled for faster testing */
    // {
    //   name: "Mobile Chrome",
    //   use: {
    //     ...devices["Pixel 5"],
    //     // Uses self-contained Chromium for mobile testing
    //   },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: {
    //     ...devices["iPhone 12"],
    //     // Uses self-contained WebKit for mobile testing
    //   },
    // },

    /*
     * NOTE: The commented configurations below would use system-installed browsers
     * instead of self-contained ones. We keep them commented to ensure we always
     * use Playwright's bundled browsers for consistency across environments.
     */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' }, // Uses system Edge
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' }, // Uses system Chrome
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      cwd: "demos/v5",
      command: "yarn dev",
      url: "http://127.0.0.1:3005",
      reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_FORCE_CLEAN,
      timeout: 60000, // Reduced timeout for faster feedback
      // Ensure clean shutdown
      env: {
        ...process.env,
        FORCE_COLOR: "0", // Disable color codes that might interfere
      },
    },
    {
      cwd: "demos/v6",
      command: "yarn dev",
      url: "http://127.0.0.1:3006",
      reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_FORCE_CLEAN,
      timeout: 60000,
      env: {
        ...process.env,
        FORCE_COLOR: "0",
      },
    },
    {
      cwd: "demos/v7",
      command: "yarn dev",
      url: "http://127.0.0.1:3007",
      reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_FORCE_CLEAN,
      timeout: 60000,
      env: {
        ...process.env,
        FORCE_COLOR: "0",
      },
    },
  ],
});
