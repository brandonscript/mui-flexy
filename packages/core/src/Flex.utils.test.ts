import { jest } from "@jest/globals";
import { CSSProperties } from "react";

import { _test } from "./Flex.utils";

// Test constants
const cssFlexDirection: CSSProperties["flexDirection"][] = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
  "initial",
  "inherit",
  "unset",
];

const cssJustifyContent: CSSProperties["justifyContent"][] = [
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

const cssAlignItems: CSSProperties["alignItems"][] = [
  "flex-start",
  "flex-end",
  "center",
  "baseline",
  "stretch",
  "initial",
  "inherit",
  "unset",
];

const { mapAlignment, mapDirection, resolveDirection } = _test;

describe("Core Flex Utils", () => {
  describe("mapDirection", () => {
    it('should accept all standard "flexDirection" CSS properties', () => {
      cssFlexDirection.forEach((flexDirection) => {
        expect(mapDirection(flexDirection)).toBe(flexDirection);
      });
    });

    it('should accept all standard "flexDirection" CSS properties with (reverse=true)', () => {
      cssFlexDirection.forEach((flexDirection) => {
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
    });

    it("should log a warning to the console if passed any CSS base values", () => {
      const spy = jest.spyOn(console, "warn");
      mapDirection("inherit");
      mapDirection("initial");
      mapDirection("revert");
      mapDirection("revert-layer");
      mapDirection("unset");
      expect(spy).toHaveBeenCalledTimes(5);
    });

    it("should accept an array of directions", () => {
      expect(mapDirection(["row", "column"])).toMatchObject(["row", "column"]);
      expect(mapDirection(["row", "column"], true)).toMatchObject(["row-reverse", "column-reverse"]);
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
      expect(mapDirection({ xs: "row", sm: "column", md: "row-reverse", lg: "inherit" }, true)).toMatchObject({
        xs: "row-reverse",
        sm: "column-reverse",
        md: "row-reverse",
        lg: "inherit",
      });
    });
  });

  describe("resolveDirection", () => {
    it("should resolve row direction correctly", () => {
      expect(resolveDirection(true, false)).toBe("row");
      expect(resolveDirection(true, undefined)).toBe("row");
      expect(resolveDirection(true, null)).toBe("row");
    });

    it("should resolve column direction correctly", () => {
      expect(resolveDirection(false, true)).toBe("column");
      expect(resolveDirection(undefined, true)).toBe("column");
      expect(resolveDirection(null, true)).toBe("column");
    });

    it("should handle reverse correctly", () => {
      expect(resolveDirection(true, false, true)).toBe("row-reverse");
      expect(resolveDirection(false, true, true)).toBe("column-reverse");
    });

    it("should default to row when both are undefined", () => {
      expect(resolveDirection(undefined, undefined)).toBe("row");
      expect(resolveDirection(null, null)).toBe("row");
    });
  });

  describe("mapAlignment", () => {
    it("should map alignment values correctly", () => {
      expect(mapAlignment("left")).toBe("flex-start");
      expect(mapAlignment("center")).toBe("center");
      expect(mapAlignment("right")).toBe("flex-end");
      expect(mapAlignment("top")).toBe("flex-start");
      expect(mapAlignment("bottom")).toBe("flex-end");
    });

    it("should handle CSS values directly", () => {
      cssJustifyContent.forEach((value) => {
        expect(mapAlignment(value)).toBe(value);
      });

      cssAlignItems.forEach((value) => {
        expect(mapAlignment(value)).toBe(value);
      });
    });

    it("should handle undefined", () => {
      expect(mapAlignment(undefined)).toBeUndefined();
    });
  });
});
