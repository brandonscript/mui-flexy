import { Align, Axis } from "../src/Flex.types";
import { _test } from "../src/Flex.utils";

const { mapAlignment, mapDirection, mapFlexProps } = _test;

type FlexMapTestType = {
  x: {
    [key in "left" | "center" | "right"]: Align;
  };
  y: {
    [key in "top" | "center" | "bottom"]: Align;
  };
};

const flexMap: FlexMapTestType = {
  x: {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  },
  y: {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
  },
};

const cssFlexDirection: Axis[] = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
  "initial",
  "inherit",
  "unset",
];

const cssJustifyContent: Align[] = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
  "initial",
  "inherit",
  "unset",
];

const cssAlignItems: Align[] = [
  "flex-start",
  "flex-end",
  "center",
  "baseline",
  "stretch",
  "initial",
  "inherit",
  "unset",
];

describe("mapDirection", () => {
  it('should accept all standard "flexDirection" CSS properties', () => {
    cssFlexDirection.forEach(flexDirection => {
      expect(mapDirection(flexDirection)).toBe(flexDirection);
    });
  });
  it('should accept all standard "flexDirection" CSS properties with (reverse=true)', () => {
    cssFlexDirection.forEach(flexDirection => {
      const reverse = mapDirection(flexDirection, true);
      if (flexDirection === "row" || flexDirection === "column") {
        expect(reverse).toBe(flexDirection + "-reverse");
      } else {
        expect(reverse).toBe(flexDirection);
      }
    });
  });
  it("should default to row when passed undefined or null", () => {
    expect(mapDirection(undefined)).toBe("row");
    expect(mapDirection(null)).toBe("row");
  }),
    it("should log a warning to the console if passed any CSS global values", () => {
      const spy = jest.spyOn(console, "warn");
      mapDirection("inherit");
      mapDirection("initial");
      mapDirection("revert");
      mapDirection("revert-layer");
      mapDirection("unset");
      expect(spy).toHaveBeenCalledTimes(5);
    }),
    it("should accept an array of directions", () => {
      expect(mapDirection(["row", "column"])).toMatchObject(["row", "column"]);
      expect(mapDirection(["row", "column"], true)).toMatchObject([
        "row-reverse",
        "column-reverse",
      ]);
      expect(mapDirection(["row", "column", "row-reverse", "inherit"], true)).toMatchObject([
        "row-reverse",
        "column-reverse",
        "row-reverse",
        "inherit",
      ]);
    });
  it("should accept a MUI ResponsiveStyleValue object of directions", () => {
    expect(mapDirection({ xs: "row", sm: "column" })).toMatchObject({ xs: "row", sm: "column" });
    expect(mapDirection({ xs: "row", sm: "column" }, true)).toMatchObject({
      xs: "row-reverse",
      sm: "column-reverse",
    });
    expect(
      mapDirection({ xs: "row", sm: "column", md: "row-reverse", lg: "inherit" }, true)
    ).toMatchObject({ xs: "row-reverse", sm: "column-reverse", md: "row-reverse", lg: "inherit" });
  });
});

describe("mapAlignment", () => {
  it('should accept all standard "justifyContent" CSS properties', () => {
    cssJustifyContent.forEach(justifyContent => {
      expect(mapAlignment(justifyContent)).toBe(justifyContent);
    });
  });

  it('should accept all standard "alignItems" CSS properties', () => {
    cssAlignItems.forEach(alignItems => {
      expect(mapAlignment(alignItems)).toBe(alignItems);
    });
  });

  it('should accept shorthand "x" CSS properties', () => {
    Object.entries(flexMap.x).forEach(([x, alignment]) => {
      expect(mapAlignment(alignment)).toBe(flexMap.x[x as keyof typeof flexMap.x]);
    });
  });
  it('should accept shorthand "y" CSS properties', () => {
    Object.entries(flexMap.y).forEach(([y, alignment]) => {
      expect(mapAlignment(alignment)).toBe(flexMap.y[y as keyof typeof flexMap.y]);
    });
  });
  it("should accept an array of alignments", () => {
    expect(mapAlignment(["left", "right", "center", "space-between", "stretch"])).toMatchObject([
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "stretch",
    ]);
    expect(mapAlignment(["top", "bottom", "center", "baseline", "space-around"])).toMatchObject([
      "flex-start",
      "flex-end",
      "center",
      "baseline",
      "space-around",
    ]);
  });
  it("should accept a MUI ResponsiveStyleValue object of alignments", () => {
    expect(mapAlignment({ xs: "left", sm: "right" })).toMatchObject({
      xs: "flex-start",
      sm: "flex-end",
    });
    expect(mapAlignment({ xs: "top", sm: "bottom" })).toMatchObject({
      xs: "flex-start",
      sm: "flex-end",
    });
    expect(mapAlignment({ xs: "center", sm: "space-between" })).toMatchObject({
      xs: "center",
      sm: "space-between",
    });
    expect(mapAlignment({ xs: "center", sm: "space-around" })).toMatchObject({
      xs: "center",
      sm: "space-around",
    });
  });
});

describe("mapFlexProps", () => {
  Object.entries(flexMap.y).forEach(([y, alignItems]) => {
    Object.entries(flexMap.x).forEach(([x, justifyContent]) => {
      it(`should map row axis y=${y} x=${x}`, () => {
        const props = mapFlexProps({ x, y, row: true });
        const propsReverse = mapFlexProps({ x, y, row: true, reverse: true });
        expect(props).toMatchObject({
          justifyContent,
          alignItems,
          flexDirection: "row",
          display: "flex",
        });
        expect(propsReverse).toMatchObject({
          justifyContent,
          alignItems,
          flexDirection: "row-reverse",
          display: "flex",
        });
      });
    });
  });
  Object.entries(flexMap.y).forEach(([y, justifyContent]) => {
    Object.entries(flexMap.x).forEach(([x, alignItems]) => {
      it(`should map column axis y=${y} x=${x}`, () => {
        const props = mapFlexProps({ x, y, column: true });
        const propsReverse = mapFlexProps({ x, y, column: true, reverse: true });
        expect(props).toMatchObject({
          justifyContent,
          alignItems,
          flexDirection: "column",
          display: "flex",
        });
        expect(propsReverse).toMatchObject({
          justifyContent,
          alignItems,
          flexDirection: "column-reverse",
          display: "flex",
        });
      });
    });
  });

  it("should accept an array of alignments", () => {
    expect(
      mapFlexProps({ x: ["left", "center", "right"], y: ["bottom", "center", "top"], row: true })
    ).toMatchObject({
      justifyContent: ["flex-start", "center", "flex-end"],
      alignItems: ["flex-end", "center", "flex-start"],
      flexDirection: "row",
    });
    expect(
      mapFlexProps({ x: ["left", "center", "right"], y: ["bottom", "center", "top"], column: true })
    ).toMatchObject({
      justifyContent: ["flex-end", "center", "flex-start"],
      alignItems: ["flex-start", "center", "flex-end"],
      flexDirection: "column",
    });
  });

  it("should behave like a row when row, column, and flexDirection are not specified", () => {
    expect(mapFlexProps({ x: "right", y: "bottom" })).toMatchObject({
      justifyContent: "flex-end",
      alignItems: "flex-end",
      flexDirection: "row",
    });
    expect(
      mapFlexProps({ x: ["left", "center", "right"], y: ["bottom", "center", "top"] })
    ).toMatchObject({
      justifyContent: ["flex-start", "center", "flex-end"],
      alignItems: ["flex-end", "center", "flex-start"],
      flexDirection: "row",
    });
  });

  it("should behave like a row when row when flexDirection is set to inherit, initial, revert, or unset", () => {
    expect(mapFlexProps({ x: "left", y: "bottom", flexDirection: "inherit" })).toMatchObject({
      justifyContent: "flex-start",
      alignItems: "flex-end",
      flexDirection: "inherit",
    });
  });

  it("should accept a MUI ResponsiveStyleValue object of alignments", () => {
    expect(
      mapFlexProps({
        x: { xs: "left", sm: "center" },
        y: { xs: "top", sm: "bottom" },
        row: true,
      })
    ).toMatchObject({
      justifyContent: { xs: "flex-start", sm: "center" },
      alignItems: { xs: "flex-start", sm: "flex-end" },
      flexDirection: "row",
    });
    expect(
      mapFlexProps({
        x: { xs: "left", sm: "center" },
        y: { xs: "top", sm: "bottom" },
        column: true,
      })
    ).toMatchObject({
      justifyContent: { xs: "flex-start", sm: "flex-end" },
      alignItems: { xs: "flex-start", sm: "center" },
      flexDirection: "column",
    });
  });

  it("should handle a matrix of complex row/column axes", () => {
    expect(
      mapFlexProps({
        x: ["left", "center"],
        y: ["center", "bottom"],
        flexDirection: ["row", "column"],
      })
    ).toMatchObject({
      justifyContent: ["flex-start", "flex-end"],
      alignItems: ["center", "center"],
      flexDirection: ["row", "column"],
    });
  });

  it("should handle a matrix of complex row/column axes mixed with string props", () => {
    expect(
      mapFlexProps({
        x: ["center", "left"],
        y: "center",
        flexDirection: ["column", "row"],
      })
    ).toMatchObject({
      justifyContent: ["center", "flex-start"],
      alignItems: ["center", "center"],
      flexDirection: ["column", "row"],
    });
  });

  it("should handle an object of varying row/column axes", () => {
    expect(
      mapFlexProps({
        x: { xs: "left", sm: "space-between" },
        y: { xs: "center", sm: "inherit" },
        flexDirection: { xs: "row", sm: "column" },
      })
    ).toMatchObject({
      justifyContent: { xs: "flex-start", sm: "inherit" },
      alignItems: { xs: "center", sm: "space-between" },
      flexDirection: { xs: "row", sm: "column" },
    });
  });

  it("should handle an object of varying row/column axes mixed with string props", () => {
    expect(
      mapFlexProps({
        x: { xs: "left", sm: "space-between" },
        y: "center",
        flexDirection: { xs: "row", sm: "column" },
      })
    ).toMatchObject({
      justifyContent: { xs: "flex-start", sm: "center" },
      alignItems: { xs: "center", sm: "space-between" },
      flexDirection: { xs: "row", sm: "column" },
    });
  });
});
