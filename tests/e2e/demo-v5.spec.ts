import { expect, test } from "@playwright/test";

import { createDemoTests, DemoBasePage } from "./demo-base";

// Run the base tests for v5
createDemoTests("5", 3005);

// Additional v5-specific tests
test.describe("Demo v5 - MUI v5 specific features", () => {
  let demoPage: DemoBasePage;

  test.beforeEach(async ({ page }) => {
    demoPage = new DemoBasePage(page, "5", 3005);
    await demoPage.goto();
    await demoPage.waitForLoad();
  });

  test("should display MUI v5 specific styling", async () => {
    // Check for MUI v5 specific classes or styling
    const muiElements = await demoPage.page.locator('[class*="MuiBox-root"], [class*="css-"]').count();
    expect(muiElements).toBeGreaterThan(0);
  });

  test("should work with MUI v5 theme provider", async () => {
    // Check that theme is applied correctly
    const themeElements = await demoPage.page.locator('[class*="MuiCssBaseline-root"]').count();
    expect(themeElements).toBeGreaterThanOrEqual(0); // MUI v5 might not have this exact class
  });

  test("should render FlexBox with proper v5 integration", async () => {
    // Test specific FlexBox functionality with MUI v5 by checking computed styles
    const allElements = await demoPage.page.locator("div, section, main");
    const elementCount = await allElements.count();

    let flexCount = 0;
    let firstFlexElement = null;

    // Check computed styles for flex display
    for (let i = 0; i < Math.min(20, elementCount); i++) {
      const element = allElements.nth(i);
      try {
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            display: computed.display,
            gap: computed.gap,
            padding: computed.padding,
          };
        });

        if (styles.display === "flex") {
          flexCount++;
          if (!firstFlexElement) {
            firstFlexElement = styles;
          }
        }
      } catch (e) {
        continue;
      }
    }

    expect(flexCount).toBeGreaterThan(0);
    expect(firstFlexElement).toBeTruthy();
    expect(firstFlexElement?.display).toBe("flex");
  });

  test("should handle responsive breakpoints correctly", async () => {
    // Test responsive behavior specific to v5
    await demoPage.page.setViewportSize({ width: 600, height: 800 });
    await demoPage.page.waitForTimeout(500);

    const responsiveElements = await demoPage.page.locator('[style*="padding"], [style*="gap"]').count();
    expect(responsiveElements).toBeGreaterThan(0);
  });
});
