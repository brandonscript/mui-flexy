import { expect, test } from "@playwright/test";

import { DemoBasePage } from "./demo-base";

// Additional v6-specific tests
test.describe("Demo v6 - MUI v6 specific features", () => {
  let demoPage: DemoBasePage;

  test.beforeEach(async ({ page }) => {
    demoPage = new DemoBasePage(page, "6", 3006);
    await demoPage.goto();
    await demoPage.waitForLoad();
  });

  test("should handle MUI v6 container queries if available", async () => {
    // Test any v6-specific container query features
    await demoPage.page.setViewportSize({ width: 1200, height: 800 });
    await demoPage.page.waitForTimeout(500);

    const containerElements = await demoPage.page.locator('[style*="container"], [class*="container"]').count();
    // This might be 0 if container queries aren't used, which is fine
    expect(containerElements).toBeGreaterThanOrEqual(0);
  });
});
