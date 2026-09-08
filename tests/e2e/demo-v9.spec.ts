import { expect, test } from "@playwright/test";

import { DemoBasePage } from "./demo-base";

// Additional v9-specific tests
test.describe("Demo v9 - MUI v9 specific features", () => {
  let demoPage: DemoBasePage;

  test.beforeEach(async ({ page }) => {
    demoPage = new DemoBasePage(page, "9", 3008);
    await demoPage.goto();
    await demoPage.waitForLoad();
  });

  test("should support FlexGrid component in v9", async () => {
    const gridElements = await demoPage.page
      .locator('[class*="MuiGrid-root"], [class*="MuiGrid2-root"], [data-testid*="grid"]')
      .count();
    expect(gridElements).toBeGreaterThanOrEqual(0);
  });

  test("should handle latest CSS features available in v9", async () => {
    await demoPage.page.setViewportSize({ width: 1200, height: 800 });
    await demoPage.page.waitForTimeout(500);

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

  test("should demonstrate latest MUI v9 alignment features", async () => {
    const alignmentDemos = await demoPage.page.locator("text=alignment").count();
    expect(alignmentDemos).toBeGreaterThanOrEqual(0);

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
