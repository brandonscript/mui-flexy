import { expect, test } from "@playwright/test";

for (const version of ["v5", "v6", "v7", "v9"]) {
  test(`direct link and sandbox controls for ${version}`, async ({ page }) => {
    await page.goto(`/?mui=${version}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(`MUI ${version} + mui-flexy`);
    await expect(page.getByRole("link", { name: `MUI ${version}`, exact: true })).toHaveAttribute(
      "aria-current",
      "page",
    );
    const radioCenter = await page.getByRole("radio", { name: "row", exact: true }).evaluate((input) => {
      const rect = input.closest(".MuiRadio-root")!.getBoundingClientRect();
      return rect.y + rect.height / 2;
    });
    for (const name of ["wrap", "reverse"]) {
      const switchCenter = await page.getByLabel(name, { exact: true }).evaluate((input) => {
        const rect = input.closest(".MuiSwitch-root")!.getBoundingClientRect();
        return rect.y + rect.height / 2;
      });
      expect(Math.abs(radioCenter - switchCenter)).toBeLessThanOrEqual(1);
    }
    if (version === "v6")
      await page.getByTestId("sandbox-controls").screenshot({ path: "/tmp/mui-flexy-controls-v6.png" });
    await page.getByRole("radio", { name: "column", exact: true }).check();
    await expect(page.getByTestId("demo-flexbox")).toHaveCSS("flex-direction", "column");
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(`MUI ${version} + mui-flexy`);
    await page.getByRole("tab", { name: version === "v6" ? "FlexGrid2" : "FlexGrid", exact: true }).click();
    await expect(page.getByTestId("grid-controls")).toHaveCSS("display", "flex");
    await expect(page.locator(".grid-item")).toHaveCount(6);
  });
}

test("navigation preserves parameters and hash, and supports back/forward", async ({ page }) => {
  await page.goto("/?mui=v9&example=keep#sandbox");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("MUI v9 + mui-flexy");
  await page.getByRole("link", { name: "MUI v5", exact: true }).click();
  await expect(page).toHaveURL(/\?mui=v5&example=keep#sandbox$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("MUI v5 + mui-flexy");
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("MUI v9 + mui-flexy");
  await page.goForward();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("MUI v5 + mui-flexy");
  await expect(page.getByRole("link", { name: "MUI v6", exact: true })).toHaveAttribute(
    "href",
    "/?mui=v6&example=keep#sandbox",
  );
});

test("invalid versions safely fall back to v7", async ({ page }) => {
  await page.goto("/?mui=v8");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("MUI v7 + mui-flexy");
});

for (const width of [1440, 390]) {
  test(`v9 controls do not overlap at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto("/?mui=v9&styling=classes");
    await expect(page.getByTestId("demo-flexbox")).toHaveClass(/MuiFlex-j-center/);
    const controls = page.getByTestId("sandbox-controls");
    await expect(controls).toHaveCSS("display", "flex");
    const rectangles = await controls.locator(":scope > div").evaluateAll((elements) =>
      elements.map((element) => {
        const { left, top, right, bottom } = element.getBoundingClientRect();
        return { left, top, right, bottom };
      }),
    );
    expect(rectangles).toHaveLength(5);
    for (let i = 0; i < rectangles.length; i++) {
      for (const b of rectangles.slice(i + 1)) {
        const a = rectangles[i];
        expect(a.right <= b.left + 1 || b.right <= a.left + 1 || a.bottom <= b.top + 1 || b.bottom <= a.top + 1).toBe(
          true,
        );
      }
    }
    const label = await page.locator("#direction-label").boundingBox();
    const radio = await page.getByRole("radiogroup", { name: "Direction" }).boundingBox();
    expect(label!.y + label!.height).toBeLessThanOrEqual(radio!.y + 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `/tmp/mui-flexy-demo-v9-${width}.png`, fullPage: true });
  });
}
