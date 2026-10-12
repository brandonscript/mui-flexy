import { expect, test } from "@playwright/test";

import { FixtureBasePage } from "./fixture-base";

// Additional v5-specific tests
test.describe("Fixture v5 - MUI v5 specific features", () => {
  let fixturePage: FixtureBasePage;

  test.beforeEach(async ({ page }) => {
    fixturePage = new FixtureBasePage(page, "5", 3005);
    await fixturePage.goto();
    await fixturePage.waitForLoad();
  });

  test("should handle responsive breakpoints correctly", async () => {
    // Test responsive behavior specific to v5
    await fixturePage.page.setViewportSize({ width: 600, height: 800 });
    await fixturePage.page.waitForTimeout(500);

    const responsiveElements = await fixturePage.page.locator('[style*="padding"], [style*="gap"]').count();
    expect(responsiveElements).toBeGreaterThan(0);
  });
});
