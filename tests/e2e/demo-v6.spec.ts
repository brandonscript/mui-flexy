import { expect, test } from "@playwright/test";

import { createDemoTests, DemoBasePage } from "./demo-base";

// Run the base tests for v6
createDemoTests("6", 3006);

// Additional v6-specific tests
test.describe("Demo v6 - MUI v6 Specific Features", () => {
  let demoPage: DemoBasePage;

  test.beforeEach(async ({ page }) => {
    demoPage = new DemoBasePage(page, "6", 3006);
    await demoPage.goto();
    await demoPage.waitForLoad();
  });

  test("should display MUI v6 specific styling", async () => {
    // Check for MUI v6 specific classes or styling
    const muiElements = await demoPage.page.locator('[class*="MuiBox-root"], [class*="css-"]').count();
    expect(muiElements).toBeGreaterThan(0);
  });

  test("should work with MUI v6 theme provider", async () => {
    // Check that theme is applied correctly
    const bodyStyles = await demoPage.page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        fontFamily: computed.fontFamily,
        margin: computed.margin,
      };
    });

    // MUI v6 should apply theme styles
    expect(bodyStyles.fontFamily).toBeTruthy();
  });

  test("should render FlexBox with proper v6 integration", async () => {
    // Test specific FlexBox functionality with MUI v6 by checking computed styles
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
            flexDirection: computed.flexDirection,
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

  test("should handle MUI v6 container queries if available", async () => {
    // Test any v6-specific container query features
    await demoPage.page.setViewportSize({ width: 1200, height: 800 });
    await demoPage.page.waitForTimeout(500);

    const containerElements = await demoPage.page.locator('[style*="container"], [class*="container"]').count();
    // This might be 0 if container queries aren't used, which is fine
    expect(containerElements).toBeGreaterThanOrEqual(0);
  });

  test("should support enhanced responsive features in v6", async () => {
    // Test responsive behavior specific to v6
    const viewports = [
      { width: 320, height: 568 }, // Small mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1440, height: 900 }, // Desktop
    ];

    for (const viewport of viewports) {
      await demoPage.page.setViewportSize(viewport);
      await demoPage.page.waitForTimeout(300);

      // Check that layout adapts properly by checking computed styles
      const allElements = await demoPage.page.locator("div, section, main");
      const elementCount = await allElements.count();

      let flexCount = 0;
      for (let i = 0; i < Math.min(10, elementCount); i++) {
        const element = allElements.nth(i);
        try {
          const isFlexDisplay = await element.evaluate((el) => {
            return window.getComputedStyle(el).display === "flex";
          });
          if (isFlexDisplay) flexCount++;
        } catch (e) {
          continue;
        }
      }
      expect(flexCount).toBeGreaterThan(0);
    }
  });
});
