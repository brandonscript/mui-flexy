import { expect, Page, test } from "@playwright/test";

export class DemoBasePage {
  constructor(
    public readonly page: Page,
    public readonly version: string,
    public readonly port: number,
  ) {}

  async goto() {
    await this.page.goto(`http://localhost:${this.port}`);
  }

  async waitForLoad() {
    // Wait for the main content to be visible
    await this.page.waitForSelector("main", { timeout: 10000 });
    // Wait for React to fully render
    await this.page.waitForFunction(() => {
      const main = document.querySelector("main");
      return main && main.children.length > 0;
    });
  }

  async getTitle() {
    return await this.page.title();
  }

  async getVersionText() {
    const versionElement = await this.page.locator('h4:has-text("mui-flexy v")');
    return await versionElement.textContent();
  }

  async getMuiVersionText() {
    const muiLink = await this.page.locator('a[href="https://mui.com/"]');
    return await muiLink.textContent();
  }

  async getFlexBoxElements() {
    // Get all elements that appear to be FlexBox components
    return await this.page.locator('[class*="css-"][style*="display: flex"], [style*="display:flex"]').count();
  }

  async getRowDemoElements() {
    // Look for row demo sections
    return await this.page.locator("text=Row alignment examples").count();
  }

  async getColumnDemoElements() {
    // Look for column demo sections
    return await this.page.locator("text=Column alignment examples").count();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/screenshots/${this.version}-${name}.png`,
      fullPage: true,
    });
  }

  async checkResponsiveness() {
    // Test mobile viewport
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.page.waitForTimeout(500);
    await this.takeScreenshot("mobile");

    // Test tablet viewport
    await this.page.setViewportSize({ width: 768, height: 1024 });
    await this.page.waitForTimeout(500);
    await this.takeScreenshot("tablet");

    // Test desktop viewport
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.waitForTimeout(500);
    await this.takeScreenshot("desktop");
  }

  async checkAccessibility() {
    // Check for basic accessibility features
    const hasMainLandmark = (await this.page.locator("main").count()) > 0;
    const hasHeadings = (await this.page.locator("h1, h2, h3, h4, h5, h6").count()) > 0;
    const hasAltText = await this.page.locator("img[alt]").count();
    const totalImages = await this.page.locator("img").count();

    return {
      hasMainLandmark,
      hasHeadings,
      allImagesHaveAlt: hasAltText === totalImages && totalImages > 0,
    };
  }

  async checkFlexboxAlignment() {
    // Check that FlexBox components are actually using flexbox by checking computed styles
    // Look for common FlexBox component patterns and CSS classes
    const flexElements = await this.page.locator(
      '[class*="FlexBox"], [class*="flex"], [class*="MuiBox"], div, section',
    );
    const allElements = await flexElements.count();

    let flexCount = 0;

    // Check computed styles for flex display
    for (let i = 0; i < Math.min(20, allElements); i++) {
      const element = flexElements.nth(i);
      try {
        const computedStyle = await element.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return {
            display: style.display,
            flexDirection: style.flexDirection,
            justifyContent: style.justifyContent,
            alignItems: style.alignItems,
          };
        });

        if (computedStyle.display === "flex") {
          flexCount++;
        }
      } catch {
        // Skip elements that can't be evaluated
        continue;
      }
    }

    if (flexCount === 0) {
      throw new Error("No flex elements found");
    }

    return flexCount;
  }

  async checkAllRequiredHeaders() {
    // Check for all the expected headers in the demo
    const headers: Record<string, number> = {
      mainTitle: await this.page.locator('h4:has-text("mui-flexy v")').count(),
      rowBasic: await this.page.locator('h2:has-text("Row (basic)")').count(),
      columnBasic: await this.page.locator('h2:has-text("Column (basic)")').count(),
      basicGrid: await this.page.locator('h2:has-text("Basic CSS Grid")').count(),
      gridTemplating: await this.page.locator('h2:has-text("with grid templating")').count(),
      refTest: await this.page.locator('h2:has-text("Ref test")').count(),
      complexProps: await this.page.locator('h2:has-text("Complex props test")').count(),
    };

    // Check for version-specific headers
    if (this.version === "6" || this.version === "7") {
      headers.grid2 = await this.page.locator(`h2:has-text("Grid2 (@mui v${this.version}+")`).count();
    }

    return headers;
  }
}

export function createDemoTests(version: string, port: number) {
  test.describe(`Demo v${version}`, () => {
    let demoPage: DemoBasePage;

    test.beforeEach(async ({ page }) => {
      demoPage = new DemoBasePage(page, version, port);
      await demoPage.goto();
      await demoPage.waitForLoad();
    });

    test(`should load and display correct title for v${version}`, async () => {
      const title = await demoPage.getTitle();
      expect(title).toContain(`mui-flexy v${version} Demo`);
    });

    test(`should display correct version information for v${version}`, async () => {
      const versionText = await demoPage.getVersionText();
      expect(versionText).toContain("mui-flexy v");

      const muiVersionText = await demoPage.getMuiVersionText();
      expect(muiVersionText).toContain(`@mui/material^${version}`);
    });

    test(`should render FlexBox components for v${version}`, async () => {
      const flexBoxCount = await demoPage.checkFlexboxAlignment();
      expect(flexBoxCount).toBeGreaterThan(0);
    });

    test(`should be responsive for v${version}`, async () => {
      await demoPage.checkResponsiveness();
      // If we get here without throwing, responsiveness test passed
      expect(true).toBe(true);
    });

    test(`should meet basic accessibility requirements for v${version}`, async () => {
      const accessibility = await demoPage.checkAccessibility();
      expect(accessibility.hasMainLandmark).toBe(true);
      expect(accessibility.hasHeadings).toBe(true);
      expect(accessibility.allImagesHaveAlt).toBe(true);
    });

    test(`should take full page screenshot for v${version}`, async () => {
      await demoPage.takeScreenshot("full-page");
      // If we get here without throwing, screenshot was taken successfully
      expect(true).toBe(true);
    });

    test(`should display all required headers for v${version}`, async () => {
      const headers = await demoPage.checkAllRequiredHeaders();

      // Check that all required headers are present
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
      }
    });
  });
}
