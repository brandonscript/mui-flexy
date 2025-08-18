import { expect, test } from "@playwright/test";

import { DemoBasePage } from "./demo-base";

// Additional v5-specific tests
test.describe("Demo v5 - MUI v5 specific features", () => {
  let demoPage: DemoBasePage;

  test.beforeEach(async ({ page }) => {
    demoPage = new DemoBasePage(page, "5", 3005);
    await demoPage.goto();
    await demoPage.waitForLoad();
  });

  test("should handle responsive breakpoints correctly", async () => {
    // Test responsive behavior specific to v5
    await demoPage.page.setViewportSize({ width: 600, height: 800 });
    await demoPage.page.waitForTimeout(500);

    const responsiveElements = await demoPage.page.locator('[style*="padding"], [style*="gap"]').count();
    expect(responsiveElements).toBeGreaterThan(0);
  });
});
