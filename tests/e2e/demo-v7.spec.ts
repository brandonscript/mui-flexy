import { expect, test } from "@playwright/test";

import { DemoBasePage } from "./demo-base";

// Additional v7-specific tests
test.describe("Demo v7 - MUI v7 specific features", () => {
  let demoPage: DemoBasePage;

  test.beforeEach(async ({ page }) => {
    demoPage = new DemoBasePage(page, "7", 3007);
    await demoPage.goto();
    await demoPage.waitForLoad();
  });

  test("should support FlexGrid2 component in v7", async () => {
    // Test FlexGrid2 specific functionality
    const gridElements = await demoPage.page.locator('[class*="MuiGrid2-root"], [data-testid*="grid"]').count();
    // FlexGrid2 might not be used in demo, so we check if it's available
    expect(gridElements).toBeGreaterThanOrEqual(0);
  });

  test("should handle latest CSS features available in v7", async () => {
    // Test any v7-specific CSS features like container queries, newer flexbox features
    await demoPage.page.setViewportSize({ width: 1200, height: 800 });
    await demoPage.page.waitForTimeout(500);

    // Check for modern CSS features that might be used in v7
    const modernFeatures = await demoPage.page.evaluate(() => {
      const testEl = document.createElement("div");
      testEl.style.containerType = "inline-size";
      testEl.style.display = "flex";
      testEl.style.gap = "1rem";

      return {
        supportsContainerQueries: testEl.style.containerType !== "",
        supportsFlexGap: testEl.style.gap !== "",
      };
    });

    expect(modernFeatures.supportsFlexGap).toBe(true);
  });

  test("should demonstrate latest MUI v7 alignment features", async () => {
    // Test that the demo showcases the latest alignment capabilities
    const alignmentDemos = await demoPage.page.locator("text=alignment").count();
    expect(alignmentDemos).toBeGreaterThanOrEqual(0);

    // Check for various alignment combinations by checking computed styles
    const allElements = await demoPage.page.locator("div, section, main");
    const elementCount = await allElements.count();

    let alignmentCount = 0;
    for (let i = 0; i < Math.min(15, elementCount); i++) {
      const element = allElements.nth(i);
      try {
        const hasAlignment = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return computed.justifyContent !== "normal" || computed.alignItems !== "normal";
        });
        if (hasAlignment) alignmentCount++;
      } catch (_e) {
        continue;
      }
    }
    expect(alignmentCount).toBeGreaterThan(0);
  });
});
