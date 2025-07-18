import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests/e2e",
  /* Only run docs tests */
  testMatch: "**/docs*.spec.ts",
  /* Separate output directory for docs test results */
  outputDir: "./tests/e2e/docs-test-results",
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
    ["html", { open: "never", outputFolder: "tests/e2e/docs-html-report" }], // Separate HTML report for docs
    ["json", { outputFile: "tests/e2e/docs-test-results/results.json" }], // JSON results for docs
    ["list"],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3003",

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
  ],

  /* Run the docs static server before starting the tests */
  webServer: {
    cwd: "docs",
    command: "yarn dev",
    url: "http://localhost:3003",
    reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_FORCE_CLEAN,
    timeout: 60000, // Timeout for server startup
    // Ensure clean shutdown
    env: {
      ...process.env,
      FORCE_COLOR: "0", // Disable color codes that might interfere
    },
  },
});
