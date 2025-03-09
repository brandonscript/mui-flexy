import { jest } from "@jest/globals";
import { CSSProperties } from "react";

import {
  HorizontalAlign,
  type ResponsiveFlexBoolean,
  type ResponsiveFlexDirection,
  VerticalAlign,
} from "@/Flex.types";

import { _test } from "../src/Flex.utils";

const { mapAlignment, mapDirection, mapFlexProps, resolveDirection } = _test;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

type FlexMapTestType = {
  x: {
    [key in "left" | "center" | "right"]: HorizontalAlign | CSSProperties["justifyContent"];
  };
  y: {
    [key in "top" | "center" | "bottom"]: VerticalAlign | CSSProperties["alignItems"];
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
    expect(
      mapDirection({ xs: "row", sm: "column", md: "row-reverse", lg: "inherit" }, true)
    ).toMatchObject({ xs: "row-reverse", sm: "column-reverse", md: "row-reverse", lg: "inherit" });
  });
});

type DirectionTestType = (ResponsiveFlexBoolean | ResponsiveFlexDirection)[];

const determineExpected = (row: _Any, column: _Any, reverse: boolean | null = false) => {
  let expected = [true, "column"].includes(column as _Any) ? "column" : "row";
  if (row === false && column !== false) {
    expected = "column"; // ambiguous input, column takes precedence
  }
  if ((row === true || row === "row") && (column === true || column === "column")) {
    expected = "row"; // conflicting input, row takes precedence
  }
  return `${expected}${reverse ? "-reverse" : ""}`;
};

describe("resolveDirection", () => {
  describe("primitive values for `row` and `column`", () => {
    const rowValues = [undefined, null, true, false, "row"] as DirectionTestType;
    const columnValues = [undefined, null, true, false, "column"] as DirectionTestType;
    const reverseValues = [undefined, null, true, false];

    rowValues.forEach(row => {
      columnValues.forEach(column => {
        reverseValues.forEach(reverse => {
          const rowString = typeof row === "string" ? `"${row}"` : row;
          const columnString = typeof column === "string" ? `"${column}"` : column;
          const reverseString = reverse === undefined ? "" : `, ↺ ${reverse}`;
          const expected = determineExpected(row, column, reverse);
          it(`expect (↔︎ ${rowString}, ↕ ${columnString}${reverseString}) to be '${expected}'`, () => {
            expect(resolveDirection(row, column, reverse)).toBe(expected);
          });
        });
      });
    });
  });

  describe("responsive array values for `row` and `column`", () => {
    const arrValues = [true, false, null, undefined] as DirectionTestType;
    const reverseValues = [undefined, null, true, false];

    // Generates all possible array combinations of one and two values, e.g.
    // [true], [false], [null], [undefined], [true, true], [true, false], etc.
    const generateCombinations = (values: DirectionTestType) => {
      let rowArrValues: _Any[] = [];
      let columnArrValues: _Any[] = [];

      values.forEach(value => {
        const rowArr = values.map(value2 => [value, value2]);
        const colArr = values.map(value2 => [value2, value]);
        rowArrValues.push(([[value]] as typeof rowArr).concat(rowArr));
        columnArrValues.push(([[value]] as typeof colArr).concat(colArr));
      });

      rowArrValues = values
        .map(value => [value])
        .concat(values.map(value => values.map(value2 => [value, value2])).flat());

      columnArrValues = values
        .map(value => [value])
        .concat(values.map(value => values.map(value2 => [value2, value])).flat());

      // remove any duplicates that exist at the exact same index from rowArrValues and columnArrValues
      rowArrValues = rowArrValues.filter((value, i) => {
        return (
          rowArrValues.findIndex(
            value2 =>
              value.length === value2.length &&
              value.every((v: _Any, j: string | number) => v === value2[j])
          ) === i
        );
      });
      columnArrValues = columnArrValues.filter((value, i) => {
        return (
          columnArrValues.findIndex(
            value2 =>
              value.length === value2.length &&
              value.every((v: _Any, j: string | number) => v === value2[j])
          ) === i
        );
      });

      return [rowArrValues, columnArrValues];
    };

    const [rowArrTestCases, columnArrTestCases] = [...generateCombinations(arrValues)];

    // Just in case, let's make sure we don't run the same test case twice
    const uniqueTests: string[] = [];

    reverseValues.map(reverse => {
      rowArrTestCases.map(_rowChildArr => {
        if (!Array.isArray(_rowChildArr)) {
          throw new Error("rowChildArr is not an array");
        }

        columnArrTestCases.map(_columnChildArr => {
          if (!Array.isArray(_columnChildArr)) {
            throw new Error("columnChildArr is not an array");
          }

          if (_rowChildArr.length !== _columnChildArr.length) {
            return; // No need to test if the arrays are different lengths because this is unsupported syntax
          }

          const rowChildArr = _rowChildArr as (boolean | null | undefined)[];
          const columnChildArr = _columnChildArr as (boolean | null | undefined)[];
          const rowString = JSON.stringify(rowChildArr);
          const columnString = JSON.stringify(columnChildArr);

          const reverseString = reverse === undefined ? "" : `, ↺ ${reverse}`;
          const expected = rowChildArr.map((_row, j) => {
            const row = _row as boolean | null | undefined;
            const column = columnChildArr[j] as boolean | null | undefined;
            return determineExpected(row, column, reverse);
          });
          const expectedString = JSON.stringify(expected);
          const responsiveArrayTestDesc = `expect (↔︎ ${rowString}, ↕ ${columnString}${reverseString}) to be ${expectedString}`;
          if (uniqueTests.includes(responsiveArrayTestDesc)) {
            return;
          }
          uniqueTests.push(responsiveArrayTestDesc);
          it(responsiveArrayTestDesc, () => {
            const resolved = resolveDirection(rowChildArr, columnChildArr, reverse);
            expect(resolved).toStrictEqual(expected);
            expect(resolved).toHaveLength(rowChildArr.length);
          });
        });
      });
    });
  });

  describe("responsive object values for `row` and `column`", () => {
    const objValues = [undefined, null, true, false] as DirectionTestType;
    const reverseValues = [undefined, true];
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];

    // Generates all possible object combinations for { xs: value, sm: value, md: value, lg: value, xl: value }
    const generateCombinations = (values: DirectionTestType) => {
      const singleKeys = [["xs"], ["sm"], ["md"], ["lg"], ["xl"]];
      const doubleKeys = [
        ["xs", "sm"],
        ["sm", "lg"],
        ["md", "xl"],
      ];
      const tripleKeys = [
        ["xs", "sm", "md"],
        ["sm", "md", "lg"],
        ["sm", "md", "xl"],
      ];
      const quadKeys = [
        ["xs", "sm", "md", "lg"],
        ["sm", "md", "lg", "xl"],
      ];
      const allKeys = [["xs", "sm", "md", "lg", "xl"]];

      // Remove all `undefined` keys + values from every value in every object
      const filterUndefined = (arr: Record<string, _Any>[]) => {
        if (arr.map(o => Object.keys(o).length === 1).every(Boolean)) {
          return arr;
        }
        return arr
          .map(obj =>
            Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined))
          )
          .filter(obj => Object.keys(obj).length > 0);
      };

      const filterDupes = (arr: Record<string, _Any>[]) => {
        const arrStrSet = new Set(arr.map(obj => JSON.stringify(obj)));
        return Array.from(arrStrSet).map(str => JSON.parse(str));
      };

      // { xs: value }, { sm: value }, { md: value }, { lg: value }, { xl: value }
      const singles = singleKeys
        .map(keys => values.map(value => Object.fromEntries(keys.map(key => [key, value]))))
        .map(filterUndefined);

      // reduce permutations by only using `true` and `false` for multiple breakpoints tests
      const boolValues = [true, false];

      // { xs: value, sm: value }, ..., { lg: value, xl: value }
      const doubles = doubleKeys
        .map(keys =>
          boolValues.flatMap(value1 =>
            boolValues.map(value2 => ({
              [keys[0]]: value1,
              [keys[1]]: value2,
            }))
          )
        )
        .map(filterUndefined);

      // { xs: value, sm: value, md: value }, ..., { md: value, lg: value, xl: value }
      const triples = tripleKeys.map(keys =>
        boolValues.flatMap(value1 =>
          boolValues.flatMap(value2 =>
            boolValues.map(value3 => ({
              [keys[0]]: value1,
              [keys[1]]: value2,
              [keys[2]]: value3,
            }))
          )
        )
      );

      // { xs: value, sm: value, md: value, lg: value }, ..., { sm: value, md: value, lg: value, xl: value }
      const quads = quadKeys.map(keys =>
        boolValues.flatMap(value1 =>
          boolValues.flatMap(value2 =>
            boolValues.flatMap(value3 =>
              boolValues.map(value4 => ({
                [keys[0]]: value1,
                [keys[1]]: value2,
                [keys[2]]: value3,
                [keys[3]]: value4,
              }))
            )
          )
        )
      );

      // { xs: value, sm: value, md: value, lg: value, xl: value }
      const all = allKeys.map(keys =>
        boolValues.flatMap(value1 =>
          boolValues.flatMap(value2 =>
            boolValues.flatMap(value3 =>
              boolValues.flatMap(value4 =>
                boolValues.map(value5 => ({
                  [keys[0]]: value1,
                  [keys[1]]: value2,
                  [keys[2]]: value3,
                  [keys[3]]: value4,
                  [keys[4]]: value5,
                }))
              )
            )
          )
        )
      );

      const rowObjValues = filterDupes(
        [{}, ...singles, ...doubles, ...triples, ...quads, ...all].flat()
      );
      const columnObjValues = [...rowObjValues];
      return [rowObjValues, columnObjValues];
    };

    let [rowObjTestCases, columnObjTestCases] = [...generateCombinations(objValues)];

    // Just in case, let's make sure we don't run the same test case twice
    const uniqueTests: string[] = [];

    // Limit number of tests to 100
    rowObjTestCases = rowObjTestCases.slice(0, 100);
    columnObjTestCases = columnObjTestCases.slice(0, 100);

    let reverseTestsCount = 0;

    rowObjTestCases.map(rowChildObj => {
      if (!rowChildObj || typeof rowChildObj !== "object") {
        throw new Error("rowObj is not an object");
      }

      columnObjTestCases.map(columnChildObj => {
        if (!columnChildObj || typeof columnChildObj !== "object") {
          throw new Error("columnObj is not an object");
        }

        const testBreakpoints = breakpoints.filter(
          bk =>
            [true, false].includes(rowChildObj[bk] as _Any) ||
            [true, false].includes(columnChildObj[bk] as _Any)
        );

        const rowKeys = Object.keys(rowChildObj);
        const columnKeys = Object.keys(columnChildObj);

        if (
          rowKeys.length !== columnKeys.length &&
          Math.max(rowKeys.length, columnKeys.length) > 3
        ) {
          return; // No need to test mismatched breakpoints when there are more than 3 breakpoints
        }

        const excTest = (reverse?: boolean | null) => {
          if (reverse === true) {
            if (reverseTestsCount > 20) {
              return;
            }
            reverseTestsCount++;
          }

          const rowString = JSON.stringify(rowChildObj);
          const columnString = JSON.stringify(columnChildObj);

          const reverseString = reverse === undefined ? "" : `, ↺ ${reverse}`;
          const expected = Object.fromEntries(
            testBreakpoints.map(bk => {
              const row = rowChildObj[bk] as boolean | null | undefined;
              const column = columnChildObj[bk] as boolean | null | undefined;
              return [bk, determineExpected(row, column, reverse)];
            })
          );
          const expectedString = JSON.stringify(expected);
          const responsiveObjectTestCase = `expect (↔︎ ${rowString}, ↕ ${columnString}${reverseString}) to be ${expectedString}`;
          if (uniqueTests.includes(responsiveObjectTestCase)) {
            return;
          }
          uniqueTests.push(responsiveObjectTestCase);
          it(responsiveObjectTestCase, () => {
            const resolved = resolveDirection(rowChildObj, columnChildObj, reverse);
            expect(resolved).toEqual(expected);
            expect(Object.keys(resolved as {})).toHaveLength(testBreakpoints.length);
          });
        };

        if (testBreakpoints.length <= 2) {
          // To keep number of tests manageable, only test `reverse` when there are <= 2 breakpoints
          reverseValues.map(reverse => {
            excTest(reverse);
          });
        } else {
          excTest();
        }
      });
    });
  });

  describe("fallback (flexDirection) primitive, array, and object values", () => {
    const fallbackPrimitives = ["row", "column", "initial", "inherit", "unset"] as const;
    const fallbackArrays = [
      ["row", "column"],
      ["column", "row"],
      ["row", "row"],
      ["column", "column"],
    ] as ResponsiveFlexDirection[];
    const fallbackObjects = [
      { xs: "row", sm: "column" },
      { xs: "column", sm: "row" },
      { xs: "row", sm: "row" },
      { xs: "column", sm: "column" },
      { xs: "row", lg: "row" },
    ] as ResponsiveFlexDirection[];
    const reverseValues = [undefined, true];

    fallbackPrimitives.map(fallback => {
      reverseValues.map(reverse => {
        const reverseString = reverse === undefined ? "" : `, ↺ ${reverse}`;
        const expected = mapDirection(fallback, reverse);
        it(`expect (fallback: ${fallback}${reverseString}) to be '${expected}'`, () => {
          expect(resolveDirection(undefined, undefined, reverse, fallback)).toBe(expected);
        });
      });
    });

    fallbackArrays.map(fallback => {
      reverseValues.map(reverse => {
        const fallbackString = JSON.stringify(fallback);
        const reverseString = reverse === undefined ? "" : `, ↺ ${reverse}`;
        const expected = mapDirection(fallback, reverse);
        it(`expect (fallback: ${fallbackString}${reverseString}) to be '${expected}'`, () => {
          expect(resolveDirection(undefined, undefined, reverse, fallback)).toEqual(expected);
        });
      });
    });

    fallbackObjects.map(fallback => {
      reverseValues.map(reverse => {
        const fallbackString = JSON.stringify(fallback);
        const reverseString = reverse === undefined ? "" : `, ↺ ${reverse}`;
        const expected = mapDirection(fallback, reverse);
        it(`expect (fallback: ${fallbackString}${reverseString}) to be '${JSON.stringify(
          expected
        )}'`, () => {
          expect(resolveDirection(undefined, undefined, reverse, fallback)).toEqual(expected);
        });
      });
    });
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
        const props = mapFlexProps({ x, y, row: true } as _Any);
        const propsReverse = mapFlexProps({ x, y, row: true, reverse: true } as _Any);
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
        const props = mapFlexProps({ x, y, column: true } as _Any);
        const propsReverse = mapFlexProps({ x, y, column: true, reverse: true } as _Any);
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
      mapFlexProps({
        x: ["left", "center", "right"],
        y: ["bottom", "center", "top"],
        row: true,
      } as _Any)
    ).toMatchObject({
      justifyContent: ["flex-start", "center", "flex-end"],
      alignItems: ["flex-end", "center", "flex-start"],
      flexDirection: "row",
    });
    expect(
      mapFlexProps({
        x: ["left", "center", "right"],
        y: ["bottom", "center", "top"],
        column: true,
      } as _Any)
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
      mapFlexProps({ x: ["left", "center", "right"], y: ["bottom", "center", "top"] } as _Any)
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
      } as _Any)
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
      } as _Any)
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
      } as _Any)
    ).toMatchObject({
      //              x: ["left"], y: ["bottom"],
      justifyContent: ["flex-start", "flex-end"],
      //             y: ["center"], x: ["center"],
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
      } as _Any)
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
      } as _Any)
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
      } as _Any)
    ).toMatchObject({
      justifyContent: { xs: "flex-start", sm: "center" },
      alignItems: { xs: "center", sm: "space-between" },
      flexDirection: { xs: "row", sm: "column" },
    });
  });
});
