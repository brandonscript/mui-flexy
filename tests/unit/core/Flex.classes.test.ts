import { createFlexClassStyles, getFlexClassConfig, mapFlexClassProps } from "../../../packages/core/src/Flex.classes";
import type { FlexyTheme } from "../../../packages/core/src/Flex.classes";

const theme: FlexyTheme = {
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    up: (key: string) =>
      `@media (min-width:${({ xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } as Record<string, number>)[key]}px)`,
  },
};
const config = getFlexClassConfig(theme);
const map = (props: Parameters<typeof mapFlexClassProps>[0]) => mapFlexClassProps(props, config, theme);

describe("class layout resolution", () => {
  it("normalizes equivalent aliases to the same classes", () => {
    expect(map({ row: true, x: "left", y: "top" }).mapped.className).toBe(
      map({ direction: "row", x: "flex-start", y: "flex-start" }).mapped.className,
    );
    expect(map({ wrap: false }).mapped.className).toBe(map({ wrap: "nowrap" }).mapped.className);
  });

  it("carries sparse input values independently and swaps alignment at direction changes", () => {
    const output = map({
      direction: { xs: "row", md: "column" },
      reverse: { lg: true },
      x: { xs: "center", sm: "right" },
      y: "top",
    });
    const names = output.mapped.className as string;
    expect(names).toContain("MuiFlex-justify-center");
    expect(names).toContain(`MuiFlex-justify-flex-end-${config.namespace}-sm`);
    expect(names).toContain(`MuiFlex-justify-flex-start-${config.namespace}-md`);
    expect(names).toContain(`MuiFlex-align-flex-end-${config.namespace}-md`);
    expect(names).toContain(`MuiFlex-direction-column-reverse-${config.namespace}-lg`);
    expect(output.mapped).not.toHaveProperty("flexDirection");
    expect(output.mapped).not.toHaveProperty("justifyContent");
  });

  it("handles null array gaps, responsive booleans, reverse, and wrap", () => {
    const names = map({
      column: [false, null, true],
      reverse: [false, true, null],
      x: "center",
      y: "top",
      wrap: [true, null, false],
    }).mapped.className as string;
    expect(names).toContain("MuiFlex-direction-row");
    expect(names).toContain(`MuiFlex-direction-row-reverse-${config.namespace}-sm`);
    expect(names).toContain(`MuiFlex-direction-column-reverse-${config.namespace}-md`);
    expect(names).toContain(`MuiFlex-wrap-nowrap-${config.namespace}-md`);
    expect(names).not.toContain(`MuiFlex-wrap-wrap-${config.namespace}-sm`);
  });

  it("clears the previous alignment if the new orientation leaves an axis unspecified", () => {
    const names = map({ column: { md: true }, x: "center" }).mapped.className as string;
    expect(names).toContain(`MuiFlex-justify-initial-${config.namespace}-md`);
  });

  it("uses custom breakpoint keys and queries in theme order", () => {
    const custom: FlexyTheme = {
      breakpoints: {
        keys: ["mobile", "wide"],
        up: (key: string) => `@media (min-width:${key === "mobile" ? 0 : 720}rem)`,
      },
    };
    const customConfig = getFlexClassConfig(custom);
    const names = mapFlexClassProps({ direction: ["row", "column"], x: "center" }, customConfig, custom).mapped
      .className as string;
    expect(names).toContain(`MuiFlex-direction-column-${customConfig.namespace}-wide`);
    expect(createFlexClassStyles(customConfig)).toHaveProperty("@media (min-width:720rem)");
    expect(customConfig.namespace).not.toBe(config.namespace);
  });

  it("falls back for a whole property when any responsive value is outside the utility vocabulary", () => {
    const { mapped, fallback } = map({ display: { xs: "flex", md: "flow-root" }, x: "center" });
    expect(mapped.className).not.toContain("MuiFlex-display-");
    expect(mapped.className).toContain("MuiFlex-justify-center");
    expect(fallback).toEqual({ display: "flex", "@media (min-width:900px)": { display: "flow-root" } });
  });
});
