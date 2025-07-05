import { Browser, expect, Page, test } from "@playwright/test";

import { DemoBasePage } from "./demo-base";

test.describe("Cross-Version Demo Comparison", () => {
  const versions = [
    { version: "5", port: 3005 },
    { version: "6", port: 3006 },
    { version: "7", port: 3007 },
  ];

  test("should load all demo versions successfully", async ({ browser }) => {
    const results = [];

    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        const title = await demoPage.getTitle();
        const isLoaded = title.includes(`mui-flexy v${version} Demo`);

        results.push({ version, isLoaded, title });
      } catch (error) {
        results.push({ version, isLoaded: false, error: error instanceof Error ? error.message : String(error) });
      } finally {
        await context.close();
      }
    }

    // All versions should load successfully
    results.forEach((result) => {
      expect(result.isLoaded).toBe(true);
    });
  });

  test("should display consistent FlexBox functionality across versions", async ({ browser }) => {
    const flexCounts = [];

    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        const flexCount = await demoPage.checkFlexboxAlignment();
        flexCounts.push({ version, flexCount });
      } finally {
        await context.close();
      }
    }

    // All versions should have flex elements
    flexCounts.forEach(({ version, flexCount }) => {
      expect(flexCount).toBeGreaterThan(0);
    });

    // Log the counts for comparison
    console.log("Flex element counts by version:", flexCounts);
  });

  test("should maintain consistent responsive behavior across versions", async ({ browser }) => {
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1440, height: 900 }, // Desktop
    ];

    for (const viewport of viewports) {
      const results = [];

      for (const { version, port } of versions) {
        const context = await browser.newContext();
        const page = await context.newPage();
        const demoPage = new DemoBasePage(page, version, port);

        try {
          await page.setViewportSize(viewport);
          await demoPage.goto();
          await demoPage.waitForLoad();

          const flexElements = await page.locator('[style*="display: flex"]').count();
          const hasResponsiveElements = flexElements > 0;

          results.push({ version, viewport, hasResponsiveElements, flexElements });
        } finally {
          await context.close();
        }
      }

      // All versions should handle this viewport properly
      results.forEach(({ version, hasResponsiveElements }) => {
        expect(hasResponsiveElements).toBe(true);
      });
    }
  });

  test("should show correct MUI version integration for each demo", async ({ browser }) => {
    const expectedMuiVersions: Record<string, string> = {
      "5": "@mui/material^5",
      "6": "@mui/material^6",
      "7": "@mui/material^7",
    };

    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        const muiVersionText = await demoPage.getMuiVersionText();
        expect(muiVersionText).toContain(expectedMuiVersions[version]);
      } finally {
        await context.close();
      }
    }
  });

  test("should demonstrate consistent accessibility across versions", async ({ browser }) => {
    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        const accessibility = await demoPage.checkAccessibility();

        // All versions should meet basic accessibility requirements
        expect(accessibility.hasMainLandmark).toBe(true);
        expect(accessibility.hasHeadings).toBe(true);
        expect(accessibility.allImagesHaveAlt).toBe(true);
      } finally {
        await context.close();
      }
    }
  });

  test("should capture visual comparison screenshots", async ({ browser }) => {
    const viewports = [
      { name: "mobile", width: 375, height: 667 },
      { name: "desktop", width: 1440, height: 900 },
    ];

    for (const viewport of viewports) {
      for (const { version, port } of versions) {
        const context = await browser.newContext();
        const page = await context.newPage();
        const demoPage = new DemoBasePage(page, version, port);

        try {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await demoPage.goto();
          await demoPage.waitForLoad();

          // Take screenshot for visual comparison
          await page.screenshot({
            path: `test-results/screenshots/comparison-v${version}-${viewport.name}.png`,
            fullPage: true,
          });
        } finally {
          await context.close();
        }
      }
    }

    // If we reach here, all screenshots were taken successfully
    expect(true).toBe(true);
  });

  test("should verify performance consistency across versions", async ({ browser }) => {
    const performanceResults = [];

    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        const startTime = Date.now();

        await page.goto(`http://localhost:${port}`);
        await page.waitForSelector("main", { timeout: 10000 });
        await page.waitForFunction(() => {
          const main = document.querySelector("main");
          return main && main.children.length > 0;
        });

        const loadTime = Date.now() - startTime;

        // Get performance metrics
        const metrics = await page.evaluate(() => {
          const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
          return {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            firstPaint: performance.getEntriesByName("first-paint")[0]?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
          };
        });

        performanceResults.push({
          version,
          loadTime,
          ...metrics,
        });
      } finally {
        await context.close();
      }
    }

    // Log performance results for comparison
    console.log("Performance comparison:", performanceResults);

    // All versions should load within reasonable time (10 seconds)
    performanceResults.forEach(({ version, loadTime }) => {
      expect(loadTime).toBeLessThan(10000);
    });
  });
});
