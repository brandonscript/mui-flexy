import type { FlexBoxColumnProps, FlexBoxProps, FlexBoxRowProps, FlexGridProps } from "@mui-flexy/v5";

describe("Flex.types", () => {
  it("should support FlexBoxProps and FlexGridProps along with standard CSS props", () => {
    const flexBoxProps: FlexBoxProps = {
      alignItems: "center",
      flexDirection: "row",
      row: true,
      justifyContent: "center",
      flexWrap: "nowrap",
      gap: 2,
      sx: {
        border: "1px solid black",
        borderRadius: 1,
        bgcolor: "background.paper",
        p: 2,
      },
    };
    const flexGridProps: FlexGridProps = {
      alignItems: "center",
      flexDirection: "row",
      row: true,
      justifyContent: "center",
      flexWrap: "nowrap",
      item: true,
      zeroMinWidth: true,
      gap: 2,
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 2,
      sx: {
        border: "1px solid black",
        borderRadius: 1,
        bgcolor: "background.paper",
        p: 2,
      },
    };

    expect(flexBoxProps).toBeDefined();
    expect(flexGridProps).toBeDefined();
  });

  it("should be typesafe against invalid x/y row values", () => {
    let xRow: FlexBoxProps<"row">["x"];
    xRow = "left";
    xRow = "center";
    xRow = "right";
    xRow = "space-between";
    xRow = "space-around";
    xRow = "space-evenly";
    // @ts-expect-error
    xRow = "top";
    // @ts-expect-error
    xRow = "bottom";
    // @ts-expect-error
    xRow = "stretch";
    // @ts-expect-error
    xRow = "baseline";

    expect(xRow).toBeDefined();

    let yRow: FlexBoxProps<"row">["y"];
    yRow = "top";
    yRow = "center";
    yRow = "bottom";
    yRow = "stretch";
    yRow = "baseline";
    // @ts-expect-error
    yRow = "left";
    // @ts-expect-error
    yRow = "right";
    // @ts-expect-error
    yRow = "space-between";
    // @ts-expect-error
    yRow = "space-around";
    // @ts-expect-error
    yRow = "space-evenly";

    expect(yRow).toBeDefined();
  });

  it("should be typesafe against invalid x/y column values", () => {
    let xColumn: FlexBoxProps<"column">["x"];
    xColumn = "left";
    xColumn = "center";
    xColumn = "right";
    xColumn = "flex-start";
    xColumn = "flex-end";
    xColumn = "baseline";
    // @ts-expect-error
    xColumn = "top";
    // @ts-expect-error
    xColumn = "bottom";
    // @ts-expect-error
    xColumn = "space-between";
    // @ts-expect-error
    xColumn = "space-around";
    // @ts-expect-error
    xColumn = "space-evenly";

    expect(xColumn).toBeDefined();

    let yColumn: FlexBoxProps<"column">["y"];
    yColumn = "top";
    yColumn = "center";
    yColumn = "bottom";
    yColumn = "flex-start";
    yColumn = "flex-end";
    yColumn = "space-between";
    yColumn = "space-around";
    yColumn = "space-evenly";
    // @ts-expect-error
    yColumn = "baseline";
    // @ts-expect-error
    yColumn = "left";
    // @ts-expect-error
    yColumn = "right";

    expect(yColumn).toBeDefined();
  });

  it("should correctly infer row/column values based on props", () => {
    const oRowTrue: FlexBoxProps = { row: true };
    const oColTrue: FlexBoxProps = { column: true };
    // @ts-expect-error
    const oRowFalse: FlexBoxProps = { row: false };
    const oColFalse: FlexBoxProps = { column: false };
    // @ts-expect-error
    const oBothTrue: FlexBoxProps = { row: true, column: true };
    // @ts-expect-error
    const oBothFalse: FlexBoxProps = { row: false, column: false };
    const oRowTrueColFalse: FlexBoxProps = { row: true, column: false };
    const oRowFalseColTrue: FlexBoxProps = { row: false, column: true };
    const rRowTrue: FlexBoxRowProps = { row: true };
    // @ts-expect-error
    const rColTrue: FlexBoxRowProps = { column: true };
    // @ts-expect-error
    const rRowFalse: FlexBoxRowProps = { row: false };
    const rColFalse: FlexBoxRowProps = { column: false };
    const rrRowTrue: FlexBoxRowProps["row"] = true;
    // @ts-expect-error
    const rrColTrue: FlexBoxRowProps["column"] = true;
    const rrColFalse: FlexBoxRowProps["column"] = false;
    // @ts-expect-error
    const rrRowFalse: FlexBoxRowProps["row"] = false;
    const rrRowEqTrue = ("" as unknown as FlexBoxRowProps["row"]) === true;
    // @ts-expect-error
    const rrRowEqFalse = ("" as unknown as FlexBoxRowProps["row"]) === false;
    const rrColEqFalse = ("" as unknown as FlexBoxRowProps["column"]) === false;
    // @ts-expect-error
    const rrColEqTrue = ("" as unknown as FlexBoxRowProps["column"]) === true;
    // @ts-expect-error
    const cRowTrue: FlexBoxColumnProps = { row: true };
    const cColTrue: FlexBoxColumnProps = { column: true };
    // @ts-expect-error
    const cColFalse: FlexBoxColumnProps = { column: false };
    const cRowFalse: FlexBoxColumnProps = { row: false };

    const ccColTrue: FlexBoxColumnProps["column"] = true;
    // @ts-expect-error
    const ccRowTrue: FlexBoxColumnProps["row"] = true;
    const ccRowFalse: FlexBoxColumnProps["row"] = false;
    // @ts-expect-error
    const ccColFalse: FlexBoxColumnProps["column"] = false;
    const ccColEqTrue = ("" as unknown as FlexBoxColumnProps["column"]) === true;
    // @ts-expect-error
    const ccColEqFalse = ("" as unknown as FlexBoxColumnProps["column"]) === false;
    const ccRowEqFalse = ("" as unknown as FlexBoxColumnProps["row"]) === false;
    // @ts-expect-error
    const ccRowEqTrue = ("" as unknown as FlexBoxColumnProps["row"]) === true;

    for (const value of [
      oRowTrue,
      oColTrue,
      oRowFalse,
      oColFalse,
      oBothTrue,
      oBothFalse,
      oRowTrueColFalse,
      oRowFalseColTrue,
      rRowTrue,
      rColTrue,
      rRowFalse,
      rColFalse,
      rrRowTrue,
      rrColTrue,
      rrColFalse,
      rrRowFalse,
      rrRowEqTrue,
      rrRowEqFalse,
      rrColEqFalse,
      rrColEqTrue,
      cRowTrue,
      cColTrue,
      cColFalse,
      cRowFalse,
      ccColTrue,
      ccRowTrue,
      ccRowFalse,
      ccColFalse,
      ccColEqTrue,
      ccColEqFalse,
      ccRowEqFalse,
      ccRowEqTrue,
    ]) {
      expect(value).not.toBeUndefined();
    }
  });

  it("should support responsive style props", () => {
    const flexBoxProps: FlexBoxProps = {
      alignItems: ["center", "flex-start"],
      row: true,
      justifyContent: { xs: "center", sm: "flex-start" },
      flexWrap: "nowrap",
      gap: 2,
      sx: {
        border: "1px solid black",
        borderRadius: 1,
        bgcolor: "background.paper",
        p: 2,
      },
    };
    const flexGridProps: FlexGridProps = {
      alignItems: ["center", "flex-start"],
      flexDirection: "row",
      row: true,
      justifyContent: "center",
      flexWrap: "nowrap",
      gap: 2,
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 2,
      sx: {
        border: "1px solid black",
        borderRadius: 1,
        bgcolor: "background.paper",
        p: 2,
      },
    };

    expect(flexBoxProps).toBeDefined();
    expect(flexGridProps).toBeDefined();
  });

  it("should allow explicit usage of orientation-based props", () => {
    const flexBoxRowProps = {} as FlexBoxRowProps;
    const fleXColumnAlign = {} as FlexBoxColumnProps;

    expect(flexBoxRowProps).toBeDefined();
    expect(fleXColumnAlign).toBeDefined();

    const { row: rowWhenRow } = flexBoxRowProps;
    const { row: rowWhenColumn } = fleXColumnAlign;
    const { column: columnWhenColumn } = fleXColumnAlign;
    const { column: columnWhenRow } = flexBoxRowProps;

    if (rowWhenRow === true) {
      expect(rowWhenRow).toBe(true);
    }
    // @ts-expect-error
    if (rowWhenRow === false) {
      expect(rowWhenRow).toBe(false);
    }

    if (rowWhenColumn === false) {
      expect(rowWhenColumn).toBe(false);
    }
    // @ts-expect-error
    if (rowWhenColumn === true) {
      expect(rowWhenColumn).toBe(true);
    }

    if (columnWhenColumn === true) {
      expect(columnWhenColumn).toBe(true);
    }
    // @ts-expect-error
    if (columnWhenColumn === false) {
      expect(columnWhenColumn).toBe(false);
    }
    if (columnWhenRow === false) {
      expect(columnWhenRow).toBe(false);
    }
    // @ts-expect-error
    if (columnWhenRow === true) {
      expect(columnWhenRow).toBe(true);
    }
  });
});
