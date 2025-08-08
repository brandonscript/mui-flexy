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

test.describe("Console validation tests", () => {
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

        // Verify the page has loaded by checking for root DOM element (div#root)
        const rootElements = await page.$$("div#root");
        expect(rootElements.length).toBeGreaterThan(0);
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
          path: `tests/e2e/test-results/screenshots/console-validation-${demo.name}.png`,
          fullPage: true,
        });
      });
    });
  }
});
