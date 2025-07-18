import { expect, test } from "@playwright/test";

import { DemoBasePage } from "./demo-base";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

test.describe("Demo cross-version tests", () => {
  const versions = [
    { version: "5", port: 3005 },
    { version: "6", port: 3006 },
    { version: "7", port: 3007 },
  ];

  test("should load all demo versions successfully", async ({ browser }) => {
    const results: Array<{ version: string; isLoaded: boolean; title?: string; error?: string }> = [];

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

    results.forEach((result) => {
      expect(result.isLoaded).toBe(true);
    });
  });

  test("should display correct MUI version integration", async ({ browser }) => {
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

  test("should render consistent FlexBox functionality across viewports", async ({ browser }) => {
    const viewports = [
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1440, height: 900 },
      { name: "large-screen", width: 2560, height: 1440 },
    ];

    // Expected flex element counts per version (based on actual measurements)
    // v5 has fewer elements because it doesn't include Grid2 components
    const expectedCounts = {
      "5": 235,
      "6": 263,
      "7": 263,
    };

    for (const viewport of viewports) {
      const results: Array<{
        version: string;
        viewport: { name: string; width: number; height: number };
        hasFlexElements: boolean;
        flexElementCount: number;
      }> = [];

      for (const { version, port } of versions) {
        const context = await browser.newContext();
        const page = await context.newPage();
        const demoPage = new DemoBasePage(page, version, port);

        try {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await demoPage.goto();
          await demoPage.waitForLoad();

          const flexElementCount = await page.evaluate(() => {
            const main = document.querySelector("main");
            if (!main) return 0;

            const computedFlexElements = Array.from(main.querySelectorAll("*")).filter((el) => {
              const style = window.getComputedStyle(el);
              return style.display === "flex" || style.display === "inline-flex";
            });

            return computedFlexElements.length;
          });

          const hasFlexElements = flexElementCount > 0;
          results.push({ version, viewport, hasFlexElements, flexElementCount });
        } finally {
          await context.close();
        }
      }

      // Verify each version has the expected number of flex elements
      results.forEach(({ version, hasFlexElements, flexElementCount }) => {
        expect(hasFlexElements).toBe(true);
        expect(flexElementCount).toBe(expectedCounts[version as keyof typeof expectedCounts]);
      });

      // Verify versions 6 and 7 have identical counts (both use Grid2)
      const v6Result = results.find((r) => r.version === "6");
      const v7Result = results.find((r) => r.version === "7");
      if (v6Result && v7Result) {
        expect(v7Result.flexElementCount).toBe(v6Result.flexElementCount);
      }

      // Log for debugging
      console.log(
        `${viewport.name} (${viewport.width}x${viewport.height}) flex counts:`,
        results
          .map(
            (r) =>
              `v${r.version}: ${r.flexElementCount} (expected: ${expectedCounts[r.version as keyof typeof expectedCounts]})`,
          )
          .join(", "),
      );
    }
  });

  test("should maintain consistent detailed layout across all versions", async ({ browser }) => {
    const viewports = [
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1440, height: 900 },
      { name: "large-screen", width: 2560, height: 1440 },
    ];

    for (const viewport of viewports) {
      console.log(`\n=== Layout Comparison for ${viewport.name} (${viewport.width}x${viewport.height}) ===`);

      const layoutData: Array<{ version: string; layout: _Any }> = [];

      // Capture layout data for all versions
      for (const { version, port } of versions) {
        const context = await browser.newContext();
        const page = await context.newPage();
        const demoPage = new DemoBasePage(page, version, port);

        try {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await demoPage.goto();
          await demoPage.waitForLoad();

          // Wait for layout to stabilize
          await page.waitForTimeout(1000);

          // Capture comprehensive layout metrics
          const layout = await page.evaluate(() => {
            const main = document.querySelector("main");
            if (!main) return null;

            // Get all major layout elements
            const sections = Array.from(main.querySelectorAll("section, div[class*='section'], div[class*='demo']"));
            const headers = Array.from(main.querySelectorAll("h1, h2, h3, h4, h5, h6"));

            // Better mui-flexy element detection
            const muiFlexyElements = Array.from(
              main.querySelectorAll('.MuiBox-root, [class*="Flex"], [data-testid*="flex"]'),
            );
            const computedFlexElements = Array.from(main.querySelectorAll("*")).filter((el) => {
              const style = window.getComputedStyle(el);
              return style.display === "flex" || style.display === "inline-flex";
            });

            const getElementMetrics = (element: Element) => {
              const rect = element.getBoundingClientRect();
              const computedStyle = window.getComputedStyle(element);
              return {
                tag: element.tagName.toLowerCase(),
                className: element.className,
                x: Math.round(rect.x),
                y: Math.round(rect.y),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                display: computedStyle.display,
                position: computedStyle.position,
                flexDirection: computedStyle.flexDirection,
                justifyContent: computedStyle.justifyContent,
                alignItems: computedStyle.alignItems,
                gap: computedStyle.gap,
                margin: computedStyle.margin,
                padding: computedStyle.padding,
                textContent: element.textContent?.trim().substring(0, 50) || "",
              };
            };

            return {
              mainDimensions: {
                width: Math.round(main.getBoundingClientRect().width),
                height: Math.round(main.getBoundingClientRect().height),
              },
              sectionsCount: sections.length,
              headersCount: headers.length,
              muiFlexyElementsCount: muiFlexyElements.length,
              computedFlexElementsCount: computedFlexElements.length,
              sections: sections.map(getElementMetrics),
              headers: headers.map(getElementMetrics),
              muiFlexyElements: muiFlexyElements.slice(0, 15).map(getElementMetrics),
              computedFlexElements: computedFlexElements.slice(0, 15).map(getElementMetrics),
            };
          });

          layoutData.push({ version, layout });
        } finally {
          await context.close();
        }
      }

      // Compare layouts between versions
      const baseLayout = layoutData[0]; // Use v5 as base

      // Ensure all layouts were captured successfully
      for (const { layout } of layoutData) {
        expect(layout).not.toBeNull();
      }

      console.log(`Base version (v${baseLayout.version}) layout:`, {
        mainDimensions: baseLayout.layout!.mainDimensions,
        sectionsCount: baseLayout.layout!.sectionsCount,
        headersCount: baseLayout.layout!.headersCount,
        muiFlexyElementsCount: baseLayout.layout!.muiFlexyElementsCount,
        computedFlexElementsCount: baseLayout.layout!.computedFlexElementsCount,
      });

      for (let i = 1; i < layoutData.length; i++) {
        const compareLayout = layoutData[i];
        console.log(`Comparing v${baseLayout.version} vs v${compareLayout.version}:`);

        // Compare main dimensions (allow small differences due to text rendering)
        const widthDiff = Math.abs(
          baseLayout.layout!.mainDimensions.width - compareLayout.layout!.mainDimensions.width,
        );
        const heightDiff = Math.abs(
          baseLayout.layout!.mainDimensions.height - compareLayout.layout!.mainDimensions.height,
        );

        console.log(
          `  Main dimensions: ${baseLayout.layout!.mainDimensions.width}x${baseLayout.layout!.mainDimensions.height} vs ${compareLayout.layout!.mainDimensions.width}x${compareLayout.layout!.mainDimensions.height}`,
        );
        console.log(`  Dimension differences: width=${widthDiff}px, height=${heightDiff}px`);

        // Allow small differences in dimensions (up to 20px for width)
        expect(widthDiff).toBeLessThanOrEqual(20);

        // For height, account for version-specific content differences
        // v6 and v7 have additional Grid2 sections that v5 doesn't have
        let expectedHeightDiff = 50; // Base tolerance
        if (
          (baseLayout.version === "5" && (compareLayout.version === "6" || compareLayout.version === "7")) ||
          (compareLayout.version === "5" && (baseLayout.version === "6" || baseLayout.version === "7"))
        ) {
          // Different tolerances for different viewports due to responsive layout changes
          if (viewport.name === "large-screen") {
            expectedHeightDiff = 600; // Large screen tolerance (similar to desktop)
          } else if (viewport.name === "desktop") {
            expectedHeightDiff = 600; // Desktop tolerance
          } else if (viewport.name === "tablet") {
            expectedHeightDiff = 1000; // Tablet tolerance (responsive changes affect height more)
          } else if (viewport.name === "mobile") {
            expectedHeightDiff = 1700; // Mobile tolerance (most responsive changes)
          }
        }
        expect(heightDiff).toBeLessThanOrEqual(expectedHeightDiff);

        // Compare element counts - sections may vary due to different HTML structures
        // Focus on headers which are more reliable
        console.log(
          `  Sections: base=${baseLayout.layout!.sectionsCount}, compare=${compareLayout.layout!.sectionsCount}`,
        );

        // v6 and v7 have one additional header (Grid2) compared to v5
        if (
          (baseLayout.version === "5" && (compareLayout.version === "6" || compareLayout.version === "7")) ||
          (compareLayout.version === "5" && (baseLayout.version === "6" || baseLayout.version === "7"))
        ) {
          expect(Math.abs(compareLayout.layout!.headersCount - baseLayout.layout!.headersCount)).toBeLessThanOrEqual(1);
        } else {
          expect(compareLayout.layout!.headersCount).toBe(baseLayout.layout!.headersCount);
        }

        console.log(
          `  Element counts: sections=${compareLayout.layout!.sectionsCount}, headers=${compareLayout.layout!.headersCount}, muiFlexy=${compareLayout.layout!.muiFlexyElementsCount}, computedFlex=${compareLayout.layout!.computedFlexElementsCount}`,
        );

        // Compare core headers that should be present in all versions
        const coreHeaders = ["Row (basic)", "Column (basic)", "Ref test", "Complex props test"];

        for (const expectedHeader of coreHeaders) {
          const baseHasHeader = baseLayout.layout!.headers.some((h) => h.textContent.includes(expectedHeader));
          const compareHasHeader = compareLayout.layout!.headers.some((h) => h.textContent.includes(expectedHeader));

          expect(baseHasHeader).toBe(true);
          expect(compareHasHeader).toBe(true);
        }

        // Verify version-specific headers
        const baseHasGrid2 = baseLayout.layout!.headers.some((h) => h.textContent.includes("Grid2 (@mui"));
        const compareHasGrid2 = compareLayout.layout!.headers.some((h) => h.textContent.includes("Grid2 (@mui"));

        if (baseLayout.version === "5") {
          expect(baseHasGrid2).toBe(false);
        } else {
          expect(baseHasGrid2).toBe(true);
        }

        if (compareLayout.version === "5") {
          expect(compareHasGrid2).toBe(false);
        } else {
          expect(compareHasGrid2).toBe(true);
        }

        // Compare mui-flexy elements structure (allow some variation due to MUI version differences)
        const muiFlexyCountDiff = Math.abs(
          compareLayout.layout!.muiFlexyElements.length - baseLayout.layout!.muiFlexyElements.length,
        );
        console.log(
          `  MUI Flexy elements: base=${baseLayout.layout!.muiFlexyElements.length}, compare=${compareLayout.layout!.muiFlexyElements.length}, diff=${muiFlexyCountDiff}`,
        );

        // Allow up to 30 element difference due to MUI version differences
        expect(muiFlexyCountDiff).toBeLessThanOrEqual(30);

        // Compare the first few elements that should be consistent
        const elementsToCompare = Math.min(
          baseLayout.layout!.muiFlexyElements.length,
          compareLayout.layout!.muiFlexyElements.length,
          10, // Compare first 10 elements
        );

        for (let j = 0; j < elementsToCompare; j++) {
          const baseFlex = baseLayout.layout!.muiFlexyElements[j];
          const compareFlex = compareLayout.layout!.muiFlexyElements[j];

          // Log element details for debugging
          console.log(
            `    Element ${j}: base=${baseFlex.display}/${baseFlex.tag}/${baseFlex.className.substring(0, 30)}, compare=${compareFlex.display}/${compareFlex.tag}/${compareFlex.className.substring(0, 30)}`,
          );

          // For mui-flexy elements, focus on functional layout rather than internal MUI implementation
          // Both should render as visible elements with reasonable dimensions
          expect(baseFlex.width).toBeGreaterThan(0);
          expect(baseFlex.height).toBeGreaterThan(0);
          expect(compareFlex.width).toBeGreaterThan(0);
          expect(compareFlex.height).toBeGreaterThan(0);

          // Compare flex-specific properties only if both elements are flex
          if (baseFlex.display === "flex" && compareFlex.display === "flex") {
            if (baseFlex.flexDirection && compareFlex.flexDirection) {
              expect(compareFlex.flexDirection).toBe(baseFlex.flexDirection);
            }
          }

          // Allow some variation in size but structure should be similar
          const flexWidthDiff = Math.abs(baseFlex.width - compareFlex.width);
          const flexHeightDiff = Math.abs(baseFlex.height - compareFlex.height);

          // Allow up to 20px difference in flex element dimensions (more realistic)
          expect(flexWidthDiff).toBeLessThanOrEqual(20);
          expect(flexHeightDiff).toBeLessThanOrEqual(20);
        }

        // Compare computed flex elements count (allow some variation due to MUI internals)
        const computedFlexCountDiff = Math.abs(
          compareLayout.layout!.computedFlexElementsCount - baseLayout.layout!.computedFlexElementsCount,
        );
        console.log(
          `  Computed flex elements: base=${baseLayout.layout!.computedFlexElementsCount}, compare=${compareLayout.layout!.computedFlexElementsCount}, diff=${computedFlexCountDiff}`,
        );

        // Allow up to 70 computed flex element difference (MUI versions have different internal structures)
        expect(computedFlexCountDiff).toBeLessThanOrEqual(70);
      }

      console.log(`✅ Layout comparison passed for ${viewport.name}`);
    }
  });

  // ========================================
  // PERFORMANCE TESTS
  // ========================================

  test("should maintain consistent performance across versions", async ({ browser }) => {
    const performanceResults: Array<{
      version: string;
      loadTime: number;
      domContentLoaded: number;
      loadComplete: number;
      firstPaint: number;
      firstContentfulPaint: number;
    }> = [];

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
    performanceResults.forEach(({ loadTime }) => {
      expect(loadTime).toBeLessThan(10000);
    });
  });
  test("should capture visual regression screenshots", async ({ browser }) => {
    const viewports = [
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1440, height: 900 },
      { name: "large-screen", width: 2560, height: 1440 },
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
            path: `tests/e2e/test-results/screenshots/visual-regression-v${version}-${viewport.name}.png`,
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

  test("should maintain consistent CSS Grid section functionality across versions", async ({ browser }) => {
    const viewport = { width: 1440, height: 900 }; // Standard desktop viewport

    const gridData: Array<{
      version: string;
      gridItemsCount: number;
      hasGridHeader: boolean;
      gridItemTexts: string[];
      containerWidth: number;
      responsiveBreaks: boolean;
      sampleClassNames: string;
    }> = [];

    // Capture grid data for all versions
    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await page.setViewportSize(viewport);
        await demoPage.goto();
        await demoPage.waitForLoad();
        await page.waitForTimeout(1000);

        // Verify Basic CSS Grid section exists
        const basicGridHeader = await page.locator('h2:has-text("Basic CSS Grid")').first();
        await expect(basicGridHeader).toBeVisible();

        const gridAnalysis = await page.evaluate(() => {
          const main = document.querySelector("main");
          if (!main) return null;

          // Find the Basic CSS Grid section
          const basicGridHeader = Array.from(main.querySelectorAll("h2")).find((h) =>
            h.textContent?.includes("Basic CSS Grid"),
          );

          if (!basicGridHeader) return null;

          // Find the grid container - look for the next sibling or parent
          let gridContainer = basicGridHeader.parentElement;
          while (gridContainer && !gridContainer.querySelector('[class*="Grid"], [class*="MuiGrid"], div')) {
            gridContainer = gridContainer.parentElement;
          }

          if (!gridContainer) return null;

          // Get all potential grid items in this section
          const allPotentialItems = Array.from(
            gridContainer.querySelectorAll('[class*="Grid"], [class*="MuiGrid"], [class*="Mui"], div'),
          );

          // Filter for items that have "Grid" text content
          const gridItems = allPotentialItems.filter((item) => {
            const text = item.textContent;
            return text && text.includes("Grid ") && /Grid \d+/.test(text);
          });

          // Check if grid has responsive grid items
          const hasResponsiveClasses = gridItems.length > 0;

          return {
            gridItemsCount: gridItems.length,
            hasGridHeader: !!basicGridHeader,
            gridItemTexts: gridItems.map((item) => item.textContent?.trim() || "").sort(),
            containerWidth: Math.round(gridContainer.getBoundingClientRect().width),
            responsiveBreaks: hasResponsiveClasses,
            sampleClassNames: gridItems
              .slice(0, 3)
              .map((item) => item.className)
              .join(", "),
          };
        });

        if (gridAnalysis) {
          gridData.push({ version, ...gridAnalysis });
        }
      } finally {
        await context.close();
      }
    }

    // Verify all versions have the grid section
    expect(gridData).toHaveLength(3);

    const baseVersion = gridData.find((d) => d.version === "5");
    const v6Data = gridData.find((d) => d.version === "6");
    const v7Data = gridData.find((d) => d.version === "7");

    expect(baseVersion).toBeDefined();
    expect(v6Data).toBeDefined();
    expect(v7Data).toBeDefined();

    // Test 1: All versions should have the Basic CSS Grid header
    expect(baseVersion!.hasGridHeader).toBe(true);
    expect(v6Data!.hasGridHeader).toBe(true);
    expect(v7Data!.hasGridHeader).toBe(true);

    // Test 2: All versions should have the same number of grid items
    expect(v6Data!.gridItemsCount).toBe(baseVersion!.gridItemsCount);
    expect(v7Data!.gridItemsCount).toBe(baseVersion!.gridItemsCount);

    // Test 3: All versions should have the same grid item content
    expect(v6Data!.gridItemTexts).toEqual(baseVersion!.gridItemTexts);
    expect(v7Data!.gridItemTexts).toEqual(baseVersion!.gridItemTexts);

    // Test 4: All versions should have responsive behavior
    expect(baseVersion!.responsiveBreaks).toBe(true);
    expect(v6Data!.responsiveBreaks).toBe(true);
    expect(v7Data!.responsiveBreaks).toBe(true);

    // Test 5: Container widths - allow for expected differences between Grid vs Grid2
    // but verify they're within reasonable bounds (Grid2 may be narrower due to different defaults)
    const v5Width = baseVersion!.containerWidth;
    const v6Width = v6Data!.containerWidth;
    const v7Width = v7Data!.containerWidth;

    // v6 and v7 might be narrower due to Grid2 behavior, but should be within 30% of v5
    const maxWidthDiffPercent = 30;
    const maxAllowedDiff = (v5Width * maxWidthDiffPercent) / 100;

    expect(Math.abs(v6Width - v5Width)).toBeLessThanOrEqual(maxAllowedDiff);
    expect(Math.abs(v7Width - v5Width)).toBeLessThanOrEqual(maxAllowedDiff);

    // v6 and v7 should have very similar widths to each other (both use Grid2)
    expect(Math.abs(v7Width - v6Width)).toBeLessThanOrEqual(50); // Allow 50px difference

    // Log summary for debugging
    console.log(`Grid section summary:
      - v5: ${baseVersion!.gridItemsCount} items, ${v5Width}px width, responsive: ${baseVersion!.responsiveBreaks}
      - v6: ${v6Data!.gridItemsCount} items, ${v6Width}px width, responsive: ${v6Data!.responsiveBreaks}
      - v7: ${v7Data!.gridItemsCount} items, ${v7Width}px width, responsive: ${v7Data!.responsiveBreaks}
      - Width diff v5→v6: ${v6Width - v5Width}px
      - Width diff v5→v7: ${v7Width - v5Width}px
      - Sample classes v5: ${baseVersion!.sampleClassNames}
      - Sample classes v6: ${v6Data!.sampleClassNames}
      - Sample classes v7: ${v7Data!.sampleClassNames}`);
  });

  test("should display all required section headers consistently across versions", async ({ browser }) => {
    const headerResults: Array<{
      version: string;
      headers: Record<string, number>;
      isValid: boolean;
    }> = [];

    // Capture header data for all versions
    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        const headers = await demoPage.checkAllRequiredHeaders();

        // Validate that all required headers are present
        const expectedHeaders = [
          "mainTitle",
          "rowBasic",
          "columnBasic",
          "basicGrid",
          "gridTemplating",
          "refTest",
          "complexProps",
        ];

        // Check version-specific headers
        if (version === "6" || version === "7") {
          expectedHeaders.push("grid2");
        }

        const isValid = expectedHeaders.every((headerKey) => headers[headerKey] === 1);

        headerResults.push({ version, headers, isValid });
      } finally {
        await context.close();
      }
    }

    // Verify all versions have valid headers
    headerResults.forEach(({ version, headers, isValid }) => {
      expect(isValid).toBe(true);

      // Verify specific header counts
      expect(headers.mainTitle).toBe(1);
      expect(headers.rowBasic).toBe(1);
      expect(headers.columnBasic).toBe(1);
      expect(headers.basicGrid).toBe(1);
      expect(headers.gridTemplating).toBe(1);
      expect(headers.refTest).toBe(1);
      expect(headers.complexProps).toBe(1);

      // Check version-specific headers
      if (version === "6" || version === "7") {
        expect(headers.grid2).toBe(1);
      } else {
        expect(headers.grid2).toBeUndefined();
      }
    });

    // Verify v6 and v7 have identical header structure (both should include Grid2)
    const v5Headers = headerResults.find((r) => r.version === "5")!.headers;
    const v6Headers = headerResults.find((r) => r.version === "6")!.headers;
    const v7Headers = headerResults.find((r) => r.version === "7")!.headers;

    // v5 should have one less header than v6/v7 (no Grid2)
    const v5HeaderCount = Object.keys(v5Headers).length;
    const v6HeaderCount = Object.keys(v6Headers).length;
    const v7HeaderCount = Object.keys(v7Headers).length;

    expect(v6HeaderCount).toBe(v5HeaderCount + 1); // v6 has Grid2 header
    expect(v7HeaderCount).toBe(v5HeaderCount + 1); // v7 has Grid2 header
    expect(v6HeaderCount).toBe(v7HeaderCount); // v6 and v7 should be identical

    // Verify v6 and v7 have exactly the same headers
    Object.keys(v6Headers).forEach((headerKey) => {
      expect(v7Headers[headerKey]).toBe(v6Headers[headerKey]);
    });

    // Log header summary for debugging
    console.log("Header verification summary:");
    headerResults.forEach(({ version, headers }) => {
      const headerList = Object.entries(headers)
        .map(([key, count]) => `${key}: ${count}`)
        .join(", ");
      console.log(`  v${version}: ${headerList}`);
    });
  });

  test("should display correct ref test results consistently across versions", async ({ browser }) => {
    // Check ref functionality for all versions
    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        // Find the ref test section
        const refHeader = await page.locator('h2:has-text("Ref test")').first();
        await expect(refHeader).toBeVisible();

        // Get the ref test output content
        const refTestText = await page.evaluate(() => {
          // Search for containers with both "Ref test successful" and HTML element object
          const refContainers = Array.from(
            document.querySelectorAll("div.MuiFlex-root, div.MuiFlexBox-root, div.MuiBox-root"),
          );

          for (const container of refContainers) {
            const containerText = container.textContent || "";
            if (containerText.includes("Ref test successful") && /\[object HTML(Div)?Element\]/.test(containerText)) {
              return containerText.trim();
            }
          }

          // Fallback: search for span and traverse up to find parent with both parts
          const successSpan = Array.from(document.querySelectorAll("span")).find((span) =>
            span.textContent?.includes("Ref test successful"),
          );

          if (successSpan) {
            let parent = successSpan.parentElement;
            while (parent) {
              const parentText = parent.textContent || "";
              if (parentText.includes("Ref test successful") && /\[object HTML(Div)?Element\]/.test(parentText)) {
                return parentText.trim();
              }
              parent = parent.parentElement;
            }

            // Try to construct from separate elements
            const objectElement = Array.from(document.querySelectorAll("code, pre")).find((el) =>
              /\[object HTML(Div)?Element\]/.test(el.textContent || ""),
            );
            if (objectElement) {
              return `${successSpan.textContent?.trim()}\n${objectElement.textContent?.trim()}`;
            }
          }

          return "";
        });

        // Verify ref test output for this version
        expect(refTestText).not.toBe("");
        expect(refTestText).toContain("Ref test successful");
        expect(refTestText).toMatch(/\[object HTML(Div)?Element\]/);
      } finally {
        await context.close();
      }
    }
  });

  test("should display MUI version-specific styling consistently across versions", async ({ browser }) => {
    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        // Check for MUI-specific classes or styling
        const muiElements = await page.locator('[class*="MuiBox-root"], [class*="css-"]').count();
        expect(muiElements).toBeGreaterThan(0);
      } finally {
        await context.close();
      }
    }
  });

  test("should work with MUI theme provider across all versions", async ({ browser }) => {
    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        // Check that theme is applied correctly
        const bodyStyles = await page.evaluate(() => {
          const body = document.body;
          const computed = window.getComputedStyle(body);
          return {
            fontFamily: computed.fontFamily,
            margin: computed.margin,
            colorScheme: computed.colorScheme || undefined, // v7 specific but gracefully handle older versions
          };
        });

        // MUI should apply theme styles
        expect(bodyStyles.fontFamily).toBeTruthy();
      } finally {
        await context.close();
      }
    }
  });

  test("should render FlexBox with proper MUI integration across versions", async ({ browser }) => {
    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        // Test FlexBox functionality by checking computed styles
        const allElements = await page.locator("div, section, main");
        const elementCount = await allElements.count();

        let flexCount = 0;
        let firstFlexElement: {
          display: string;
          gap: string;
          flexDirection?: string;
          alignItems?: string;
          justifyContent?: string;
          padding?: string;
        } | null = null;

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
                padding: computed.padding,
              };
            });

            if (styles.display === "flex") {
              flexCount++;
              if (!firstFlexElement) {
                firstFlexElement = styles;
              }
            }
          } catch (_e) {
            continue;
          }
        }

        expect(flexCount).toBeGreaterThan(0);
        expect(firstFlexElement).toBeTruthy();
        expect(firstFlexElement?.display).toBe("flex");
      } finally {
        await context.close();
      }
    }
  });

  test("should support responsive features across all versions", async ({ browser }) => {
    const viewports = [
      { width: 320, height: 568 }, // Small mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1440, height: 900 }, // Desktop
      { width: 1920, height: 1080 }, // Large desktop
    ];

    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        for (const viewport of viewports) {
          await page.setViewportSize(viewport);
          await page.waitForTimeout(300);

          // Check that layout adapts properly by checking computed styles
          const allElements = await page.locator("div, section, main");
          const elementCount = await allElements.count();

          let flexCount = 0;
          for (let i = 0; i < Math.min(10, elementCount); i++) {
            const element = allElements.nth(i);
            try {
              const isFlexDisplay = await element.evaluate((el) => {
                return window.getComputedStyle(el).display === "flex";
              });
              if (isFlexDisplay) flexCount++;
            } catch (_e) {
              continue;
            }
          }
          expect(flexCount).toBeGreaterThan(0);

          // Check for proper responsive behavior
          const mainElement = await page.locator("main").first();
          const mainStyles = await mainElement.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              padding: computed.padding,
              gap: computed.gap,
            };
          });

          expect(mainStyles.padding).toBeTruthy();
        }
      } finally {
        await context.close();
      }
    }
  });

  test("should meet basic accessibility requirements across all versions", async ({ browser }) => {
    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        const accessibility = await demoPage.checkAccessibility();

        expect(accessibility.hasMainLandmark).toBe(true);
        expect(accessibility.hasHeadings).toBe(true);
        expect(accessibility.allImagesHaveAlt).toBe(true);
      } finally {
        await context.close();
      }
    }
  });

  test("should take responsive screenshots across all versions", async ({ browser }) => {
    for (const { version, port } of versions) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const demoPage = new DemoBasePage(page, version, port);

      try {
        await demoPage.goto();
        await demoPage.waitForLoad();

        // Take screenshots at different viewports for visual regression testing
        await demoPage.checkResponsiveness();

        // If we get here without throwing, all screenshots were taken successfully
        expect(true).toBe(true);
      } finally {
        await context.close();
      }
    }
  });
});
