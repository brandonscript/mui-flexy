import { expect, test } from "@playwright/test";

interface ConsoleMessage {
  type: string;
  text: string;
  location?: string;
}

const DEMO_CONFIGS = [
  { name: "v5", port: 3005, url: "http://localhost:3005" },
  { name: "v6", port: 3006, url: "http://localhost:3006" },
  { name: "v7", port: 3007, url: "http://localhost:3007" },
];

test.describe("Console Validation Tests", () => {
  for (const demo of DEMO_CONFIGS) {
    test(`Demo ${demo.name} should have no console errors or warnings`, async ({ page }) => {
      const consoleMessages: ConsoleMessage[] = [];
      const pageErrors: string[] = [];

      // Capture console messages
      page.on("console", (msg) => {
        consoleMessages.push({
          type: msg.type(),
          text: msg.text(),
          location: msg.location()?.url || "unknown",
        });
      });

      // Capture page errors (uncaught exceptions)
      page.on("pageerror", (error) => {
        pageErrors.push(error.message);
      });

      // Navigate to the demo
      await test.step(`Navigate to ${demo.name} demo`, async () => {
        await page.goto(demo.url, {
          waitUntil: "networkidle",
          timeout: 30000,
        });
      });

      // Wait for React to fully render
      await test.step("Wait for React app to render", async () => {
        await page.waitForTimeout(3000);

        // Verify the page has loaded by checking for flex elements
        const flexElements = await page.$$('[data-testid*="flex"], .MuiBox-root, [class*="Flex"]');
        expect(flexElements.length).toBeGreaterThan(0);
      });

      // Analyze console messages
      await test.step("Validate console messages", async () => {
        const errors = consoleMessages.filter((msg) => msg.type === "error");
        const warnings = consoleMessages.filter((msg) => msg.type === "warning");

        console.log(`\n=== Console Analysis for ${demo.name} ===`);
        console.log(`Total messages: ${consoleMessages.length}`);
        console.log(`Errors: ${errors.length}`);
        console.log(`Warnings: ${warnings.length}`);

        if (errors.length > 0) {
          console.log("\n🔴 Console Errors:");
          errors.forEach((error, i) => {
            console.log(`  ${i + 1}. [${error.location}] ${error.text}`);
          });
        }

        if (warnings.length > 0) {
          console.log("\n🟡 Console Warnings:");
          warnings.forEach((warning, i) => {
            console.log(`  ${i + 1}. [${warning.location}] ${warning.text}`);
          });
        }

        // Log all messages for debugging
        console.log("\n📋 All Console Messages:");
        consoleMessages.forEach((msg, i) => {
          console.log(`  ${i + 1}. [${msg.type.toUpperCase()}] ${msg.text}`);
        });

        // Assert no errors
        expect(errors.length, `Demo ${demo.name} should have no console errors`).toBe(0);

        // Assert no warnings (or adjust this based on acceptable warnings)
        expect(warnings.length, `Demo ${demo.name} should have no console warnings`).toBe(0);
      });

      // Check for page errors
      await test.step("Validate page errors", async () => {
        if (pageErrors.length > 0) {
          console.log(`\n💥 Page Errors for ${demo.name}:`);
          pageErrors.forEach((error, i) => {
            console.log(`  ${i + 1}. ${error}`);
          });
        }

        expect(pageErrors.length, `Demo ${demo.name} should have no uncaught page errors`).toBe(0);
      });

      // Take a screenshot for visual verification
      await test.step("Capture screenshot", async () => {
        await page.screenshot({
          path: `test-results/console-validation-${demo.name}.png`,
          fullPage: true,
        });
      });
    });
  }

  test("All demos should be accessible simultaneously", async ({ browser }) => {
    // Test that all three demos can run simultaneously without conflicts
    const contexts = await Promise.all([browser.newContext(), browser.newContext(), browser.newContext()]);

    const pages = await Promise.all(contexts.map((context) => context.newPage()));

    try {
      // Navigate to all demos simultaneously
      await Promise.all([
        pages[0].goto(DEMO_CONFIGS[0].url, { waitUntil: "networkidle" }),
        pages[1].goto(DEMO_CONFIGS[1].url, { waitUntil: "networkidle" }),
        pages[2].goto(DEMO_CONFIGS[2].url, { waitUntil: "networkidle" }),
      ]);

      // Verify all pages loaded successfully
      for (let i = 0; i < pages.length; i++) {
        const flexElements = await pages[i].$$('[data-testid*="flex"], .MuiBox-root, [class*="Flex"]');
        expect(flexElements.length, `Demo ${DEMO_CONFIGS[i].name} should have flex elements`).toBeGreaterThan(0);
      }

      console.log("✅ All three demos are running simultaneously without conflicts");
    } finally {
      // Clean up
      await Promise.all(contexts.map((context) => context.close()));
    }
  });
});
