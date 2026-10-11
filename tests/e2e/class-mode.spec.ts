import { expect, test } from "@playwright/test";

for (const [version, port] of [
  [5, 3005],
  [6, 3006],
  [7, 3007],
  [9, 3008],
]) {
  test.describe(`shared classes v${version}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 400, height: 800 });
      await page.goto(`http://127.0.0.1:${port}/?classes`);
      await expect(page.getByRole("heading", { name: "Shared layout classes" })).toBeVisible();
    });

    test("responsive layouts, custom themes, Grid defaults, and sx overrides", async ({ page }) => {
      const responsive = page.getByTestId("responsive");
      await expect(responsive).toHaveCSS("flex-direction", "row");
      await expect(responsive).toHaveCSS("justify-content", "center");
      await expect(responsive).toHaveCSS("align-items", "flex-start");
      await expect(responsive).toHaveCSS("flex-wrap", "wrap");
      await expect(page.getByTestId("grid")).toHaveCSS("flex-wrap", "nowrap");
      await expect(page.getByTestId("grid")).toHaveCSS("justify-content", "flex-end");
      await expect(page.getByTestId("sx")).toHaveCSS("justify-content", "flex-end");
      await expect(page.getByTestId("sx")).toHaveCSS("padding", "16px");
      await expect(page.getByTestId("sx").locator("span")).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(page.getByTestId("styled-sx")).toHaveCSS("justify-content", "flex-end");
      await expect(page.getByTestId("cache")).toHaveCSS("flex-direction", "column");
      await expect(page.getByTestId("system")).toHaveCSS("justify-content", "flex-end");
      await page.setViewportSize({ width: 800, height: 800 });
      await expect(responsive).toHaveCSS("justify-content", "flex-end");
      await expect(page.getByTestId("gaps")).toHaveCSS("flex-direction", "row-reverse");
      await expect(page.getByTestId("custom-theme")).toHaveCSS("flex-direction", "column");
      await expect(page.getByTestId("named-theme")).toHaveCSS("flex-direction", "column");
      await expect(responsive).toHaveCSS("flex-direction", "row");
      await page.setViewportSize({ width: 950, height: 800 });
      await expect(responsive).toHaveCSS("flex-direction", "column");
      await expect(responsive).toHaveCSS("justify-content", "flex-start");
      await expect(responsive).toHaveCSS("align-items", "flex-end");
      await expect(responsive).toHaveCSS("flex-wrap", "nowrap");
      await expect(page.getByTestId("gaps")).toHaveCSS("flex-direction", "column-reverse");
      await expect(page.getByTestId("axis-reset")).toHaveCSS("justify-content", "normal");
      await expect(page.getByTestId("fallback")).toHaveCSS("display", "flow-root");
      await expect(page.getByTestId("sx")).toHaveCSS("justify-content", "space-between");
      await page.setViewportSize({ width: 1250, height: 800 });
      await expect(responsive).toHaveCSS("flex-direction", "column-reverse");
    });

    test("layout CSS stays bounded when hundreds of instances vary their sx", async ({ page }) => {
      const rules = () =>
        page.evaluate(() => {
          const selectors: string[] = [];
          const visit = (list: CSSRuleList) => {
            for (const rule of Array.from(list)) {
              if (rule instanceof CSSStyleRule && rule.selectorText.startsWith(".MuiFlex-root.MuiFlex-"))
                selectors.push(rule.cssText);
              else if ("cssRules" in rule) visit((rule as CSSGroupingRule).cssRules);
            }
          };
          for (const sheet of Array.from(document.styleSheets)) visit(sheet.cssRules);
          return selectors.sort();
        });
      const before = await rules();
      const globalSheetsBefore = await page.locator('style[data-emotion$="-global"]').count();
      expect(before.length).toBeGreaterThan(0);
      await page.getByRole("button", { name: "Render 300 boxes" }).click();
      await expect(page.getByTestId("repeated")).toHaveCount(300);
      expect(await rules()).toEqual(before);
      const classes = await page
        .getByTestId("repeated")
        .evaluateAll((elements) =>
          elements.map((element) =>
            [...element.classList]
              .filter((name) => /^MuiFlex-(display|direction|justify|align|wrap)-/.test(name))
              .join(" "),
          ),
        );
      expect(new Set(classes).size).toBe(1);
      // Emotion can split global rules across style tags in development mode.
      // Adding instances must not add global sheets in either development or production.
      await expect(page.locator('style[data-emotion$="-global"]')).toHaveCount(globalSheetsBefore);
    });
  });
}
