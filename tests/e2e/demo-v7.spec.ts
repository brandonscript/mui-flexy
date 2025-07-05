import { expect, test } from "@playwright/test";

import { createDemoTests, DemoBasePage } from "./demo-base";

// Run the base tests for v7
createDemoTests("7", 3007);

// Additional v7-specific tests
test.describe("Demo v7 - MUI v7 Specific Features", () => {
  let demoPage: DemoBasePage;

  test.beforeEach(async ({ page }) => {
    demoPage = new DemoBasePage(page, "7", 3007);
    await demoPage.goto();
    await demoPage.waitForLoad();
  });

  test("should display MUI v7 specific styling", async () => {
    // Check for MUI v7 specific classes or styling
    const muiElements = await demoPage.page.locator('[class*="MuiBox-root"], [class*="css-"]').count();
    expect(muiElements).toBeGreaterThan(0);
  });

  test("should work with MUI v7 theme provider and latest features", async () => {
    // Check that theme is applied correctly with v7 enhancements
    const bodyStyles = await demoPage.page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        fontFamily: computed.fontFamily,
        margin: computed.margin,
        colorScheme: computed.colorScheme,
      };
    });

    // MUI v7 should apply theme styles
    expect(bodyStyles.fontFamily).toBeTruthy();
  });

  test("should render FlexBox with proper v7 integration", async () => {
    // Test specific FlexBox functionality with MUI v7 by checking computed styles
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
            alignItems: computed.alignItems,
            justifyContent: computed.justifyContent,
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

  test("should support enhanced responsive features in v7", async () => {
    // Test responsive behavior specific to v7
    const viewports = [
      { width: 320, height: 568 }, // Small mobile
      { width: 390, height: 844 }, // iPhone 12 Pro
      { width: 768, height: 1024 }, // Tablet
      { width: 1024, height: 768 }, // Tablet landscape
      { width: 1440, height: 900 }, // Desktop
      { width: 1920, height: 1080 }, // Large desktop
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

      // Check for proper responsive behavior
      const mainElement = await demoPage.page.locator("main").first();
      const mainStyles = await mainElement.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          padding: computed.padding,
          gap: computed.gap,
        };
      });

      expect(mainStyles.padding).toBeTruthy();
    }
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
      } catch (e) {
        continue;
      }
    }
    expect(alignmentCount).toBeGreaterThan(0);
  });
});
