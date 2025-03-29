import { Box, Grid, styled, type SxProps, type Theme, Typography } from "@mui/material";
import { major as muiVersion } from "@mui/material/version";

import type { FlexBoxColumnProps, FlexBoxProps, FlexBoxRowProps } from "@/Flex.types";

import { FlexBox, FlexGrid } from "../src";

console.log("Tests running with MUI version:", muiVersion);

describe("Verify MUI version", () => {
  it("should be MUI version 5 or higher", () => {
    expect(muiVersion).toBeGreaterThanOrEqual(5);
  });

  it("should load Unstable_FlexGrid2 for MUI version 5 or skip for v6+", () => {
    if (muiVersion < 6) {
      expect(async () => await import("../src/Unstable_FlexGrid2")).not.toThrow();
    } else {
      expect(async () => await import("../src/FlexGrid2")).not.toThrow();
    }
  });
  it("should load FlexGrid2 for MUI version 6+", () => {
    if (muiVersion >= 6) {
      expect(async () => await import("../src/FlexGrid2")).not.toThrow();
    } else {
      expect(async () => await import("../src/Unstable_FlexGrid2")).not.toThrow();
    }
  });
});

const FlexGrid2 =
  muiVersion > 5
    ? (await import("../src/FlexGrid2")).createFlexGrid2()
    : (await import("../src/Unstable_FlexGrid2")).createUnstable_FlexGrid2();

const RowTests = [
  () => <FlexBox row />,
  () => <FlexBox row={true} />,
  () => <FlexBox row x="left" />,
  () => <FlexBox row x="left" y="top" />,
  () => <FlexBox x="left" y="top" />,
  () => <FlexBox x="left" y="center" />,
  () => <FlexBox x="left" y="bottom" />,
  () => <FlexBox x="left" y="stretch" />,
  () => <FlexBox x="left" y="baseline" />,
  () => <FlexBox x="center" y="top" />,
  () => <FlexBox x="center" y="center" />,
  () => <FlexBox x="center" y="bottom" />,
  () => <FlexBox x="center" y="stretch" />,
  () => <FlexBox x="center" y="baseline" />,
  () => <FlexBox x="right" y="top" />,
  () => <FlexBox x="right" y="center" />,
  () => <FlexBox x="right" y="bottom" />,
  () => <FlexBox x="right" y="stretch" />,
  () => <FlexBox x="right" y="baseline" />,
  () => <FlexBox x="space-between" y="top" />,
  () => <FlexBox x="space-between" y="center" />,
  () => <FlexBox x="space-between" y="bottom" />,
  () => <FlexBox x="space-between" y="stretch" />,
  () => <FlexBox x="space-between" y="baseline" />,
  () => <FlexBox x="space-around" y="top" />,
  () => <FlexBox x="space-around" y="center" />,
  () => <FlexBox x="space-around" y="bottom" />,
  () => <FlexBox x="space-around" y="stretch" />,
  () => <FlexBox x="space-around" y="baseline" />,
  () => <FlexBox x="space-evenly" y="top" />,
  () => <FlexBox x="space-evenly" y="center" />,
  () => <FlexBox x="space-evenly" y="bottom" />,
  () => <FlexBox x="space-evenly" y="stretch" />,
  () => <FlexBox x="space-evenly" y="baseline" />,
  // @ts-expect-error
  () => <FlexBox x="invalid-x" />,
  // @ts-expect-error
  () => <FlexBox y="invalid-y" />,
  // @ts-expect-error
  () => <FlexBox x="top" />,
  // @ts-expect-error
  () => <FlexBox x="bottom" />,
  // @ts-expect-error
  () => <FlexBox x="stretch" />,
  // @ts-expect-error
  () => <FlexBox x="baseline" />,
  // @ts-expect-error
  () => <FlexBox y="left" />,
  // @ts-expect-error
  () => <FlexBox y="right" />,
  // @ts-expect-error
  () => <FlexBox y="space-between" />,
  // @ts-expect-error
  () => <FlexBox y="space-around" />,
  // @ts-expect-error
  () => <FlexBox y="space-evenly" />,
  // @ts-expect-error
  () => <FlexBox row="invalid-row" />,
];

const ColumnTests = [
  () => <FlexBox column />,
  () => <FlexBox column={true} />,
  () => <FlexBox column x="left" />,
  () => <FlexBox column x="left" y="top" />,
  () => <FlexBox column x="left" y="center" />,
  () => <FlexBox column x="left" y="bottom" />,
  () => <FlexBox column x="left" y="space-between" />,
  () => <FlexBox column x="left" y="space-around" />,
  () => <FlexBox column x="left" y="space-evenly" />,
  () => <FlexBox column x="center" y="top" />,
  () => <FlexBox column x="center" y="center" />,
  () => <FlexBox column x="center" y="bottom" />,
  () => <FlexBox column x="center" y="space-between" />,
  () => <FlexBox column x="center" y="space-around" />,
  () => <FlexBox column x="center" y="space-evenly" />,
  () => <FlexBox column x="right" y="top" />,
  () => <FlexBox column x="right" y="center" />,
  () => <FlexBox column x="right" y="bottom" />,
  () => <FlexBox column x="right" y="space-between" />,
  () => <FlexBox column x="right" y="space-around" />,
  () => <FlexBox column x="right" y="space-evenly" />,
  () => <FlexBox column x="stretch" y="top" />,
  () => <FlexBox column x="stretch" y="center" />,
  () => <FlexBox column x="stretch" y="bottom" />,
  () => <FlexBox column x="stretch" y="space-between" />,
  () => <FlexBox column x="stretch" y="space-around" />,
  () => <FlexBox column x="stretch" y="space-evenly" />,
  () => <FlexBox column x="baseline" y="top" />,
  () => <FlexBox column x="baseline" y="center" />,
  () => <FlexBox column x="baseline" y="bottom" />,
  () => <FlexBox column x="baseline" y="space-between" />,
  () => <FlexBox column x="baseline" y="space-around" />,
  () => <FlexBox column x="baseline" y="space-evenly" />,
  // @ts-expect-error
  () => <FlexBox column x="top" />,
  // @ts-expect-error
  () => <FlexBox column x="bottom" />,
  // @ts-expect-error
  () => <FlexBox column x="space-between" />,
  // @ts-expect-error
  () => <FlexBox column x="space-around" />,
  // @ts-expect-error
  () => <FlexBox column x="space-evenly" />,
  // @ts-expect-error
  () => <FlexBox column y="left" />,
  // @ts-expect-error
  () => <FlexBox column y="right" />,
  // @ts-expect-error
  () => <FlexBox column y="stretch" />,
  // @ts-expect-error
  () => <FlexBox column y="baseline" />,
  // @ts-expect-error
  () => <FlexBox column="invalid-column" />,
];

const OverrideBoxTests = [
  () => <Box component="div" />,
  () => <Box component="div" className="myClass" />,
  () => <Box component="main" />,
  () => <Box component="img" src="http" />,
  () => <Box component={Typography} variant="h1" />,
  () => <FlexBox component="div" />,
  () => <FlexBox component="div" className="myClass" />,
  () => <FlexBox component="span" />,
  () => <FlexBox component="main" />,
  () => <FlexBox component="img" src="http" />,
  () => <FlexBox component={Typography} variant="h1" />,
];

const OverrideGridTests = [
  () => <Grid component="div" />,
  () => <Grid component="div" className="myClass" />,
  () => <Grid component="main" />,
  () => <Grid component="img" src="" />,
  () => <Grid component={Typography} variant="h1" />,
  () => <FlexGrid component="div" />,
  () => <FlexGrid component="div" className="myClass" />,
  () => <FlexGrid component="main" />,
  () => <FlexGrid component="img" src="" />,
  () => <FlexGrid component={Typography} variant="h1" />,
];

describe("FlexBox JSX tests", () => {
  it("should exec RowTests without errors", () => {
    RowTests.forEach((TestComponent) => {
      expect(() => TestComponent()).not.toThrow();
    });
  });

  it("should exec ColumnTests without errors", () => {
    ColumnTests.forEach((TestComponent) => {
      expect(() => TestComponent()).not.toThrow();
    });
  });

  it("should exec OverrideBoxTests without errors", () => {
    OverrideBoxTests.forEach((TestComponent) => {
      expect(() => TestComponent()).not.toThrow();
    });
  });

  it("should exec OverrideGridTests without errors", () => {
    OverrideGridTests.forEach((TestComponent) => {
      expect(() => TestComponent()).not.toThrow();
    });
  });
});

const _PropsTests = [
  ({ x, y, sx, ...rest }: FlexBoxProps) => (
    // @ts-expect-error
    <FlexBox {...rest} x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
  ({ x, y, sx, ...rest }: FlexBoxProps<"row">) => (
    <FlexBox {...rest} x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
  ({ x, y, sx, column: _c, ...rest }: FlexBoxProps<"column">) => (
    <FlexBox column {...rest} x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
  ({ x, y, sx, ...rest }: FlexBoxProps<"row">) => (
    // @ts-expect-error
    <FlexBox column {...rest} x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
  ({ x, y, sx, ...rest }: FlexBoxProps<"column">) => (
    // @ts-expect-error
    <FlexBox row {...rest} x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
  ({ row: _r, column: _c, ...rest }: FlexBoxColumnProps) => <FlexBox column row={false} {...rest} />,
  ({ row: _r, column: _c, ...rest }: FlexBoxRowProps) => <FlexBox row column={false} {...rest} />,
  (props: FlexBoxProps) => <FlexBox {...props} />,
  (props: FlexBoxRowProps) => <FlexBox {...props} row />,
  (props: FlexBoxColumnProps) => <FlexBox {...props} column />,
  // @ts-expect-error
  (props: FlexBoxProps) => <FlexBox {...props} row column />,

  (props: FlexBoxProps<"row">) => <FlexBox {...props} row />,
  // @ts-expect-error
  (props: FlexBoxProps<"row">) => <FlexBox {...props} column />,
  // @ts-expect-error
  (props: FlexBoxProps<"row">) => <FlexBox {...props} row column />,

  (props: FlexBoxProps<"column">) => <FlexBox {...props} column />,
  // @ts-expect-error
  (props: FlexBoxProps<"column">) => <FlexBox {...props} row />,
  // @ts-expect-error
  (props: FlexBoxProps<"column">) => <FlexBox {...props} column row />,
];

describe("FlexBoxProps<T> type", () => {
  it("should allow destructuring of props and sx", () => {
    const { x, y, sx, ...rest } = {
      x: "left",
      y: "top",
      sx: { color: "red" },
    } as FlexBoxProps<"row">;
    expect(rest).toBeDefined();
    expect(sx).toBeDefined();
    expect(x).toBeDefined();
    expect(y).toBeDefined();
    expect(() => (
      <FlexBox {...rest} x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
    )).not.toThrow();
  });

  it("should respect row/column allowed values for undefined", () => {
    // These are loosly typed as { row: boolean | undefined; column: boolean | undefined; }
    const { row: _r, column: _c } = {} as FlexBoxProps;
  });
  it("should respect row/column allowed values for row", () => {
    // These are strictly typed as { row: true; column: false | undefined; }
    const { row: _r, column: _c } = {} as FlexBoxProps<"row">;
  });
  it("should respect row/column allowed values for column", () => {
    // These are strictly typed as { row: false | undefined; column: true; }
    const { row: _r, column: _c } = {} as FlexBoxProps<"column">;
  });

  it("should accept correctly cast props for row", () => {
    const flexRowProps: FlexBoxProps<"row"> = {
      row: true,
      x: "left",
      y: "stretch",
    };

    expect(flexRowProps.row).toBe(true);
    expect(flexRowProps.column).toBeUndefined();

    const FlexRow = () => <FlexBox {...flexRowProps} />;
    expect(() => FlexRow()).not.toThrow();
  });

  it("should reject incorrectly cast props for row", () => {
    const flexRowProps: FlexBoxProps<"row"> = {
      // @ts-expect-error
      column: true,
      x: "left",
      y: "stretch",
    };

    // @ts-expect-error
    const FlexRow = () => <FlexBox column {...(flexRowProps as FlexBoxProps<"row">)} />;
    expect(() => FlexRow()).not.toThrow();
  });

  it("should accept correctly cast props for column", () => {
    const flexColumnProps: FlexBoxProps<"column"> = {
      column: true,
      x: "stretch",
      y: "top",
    };

    expect(flexColumnProps.column).toBe(true);
    expect(flexColumnProps.row).toBeUndefined();

    const FlexColumn = () => <FlexBox {...flexColumnProps} />;
    expect(() => FlexColumn()).not.toThrow();
  });

  it("should reject incorrectly cast props for column", () => {
    const flexColumnProps: FlexBoxProps<"column"> = {
      // @ts-expect-error
      column: false,
      x: "stretch",
      y: "top",
    };

    // @ts-expect-error
    const FlexColumn = () => <FlexBox row {...(flexColumnProps as FlexBoxProps<"column">)} />;
    expect(() => FlexColumn()).not.toThrow();
  });
});

describe("FlexBox with styled()", () => {
  it("should respect FlexBox/Grid components", () => {
    styled(FlexBox)(({ theme }) =>
      theme.unstable_sx({
        opacity: 0.5,
        justifyContent: "space-between",
        mt: 0.5,
        "& .MuiTypography-body2": {
          fontSize: "0.7rem",
        },
        "& .MuiTypography-body2:first-of-type": {
          opacity: 0.5,
        },
      }),
    );
  });
});

describe("Responsive prop & sx tests", () => {
  it("should handle typed sx with responsive breakpoints", () => {
    const sx: FlexBoxProps<"row">["sx"] = { minHeight: { xs: 240, sm: 300 } };
    const Component = () => <FlexBox sx={sx} />;
    expect(() => Component()).not.toThrow();
  });

  it("should handle responsive array props for x/y", () => {
    const x: FlexBoxProps<"row">["x"] = ["center", "left", "center", "right"] as const;
    const y: FlexBoxProps<"row">["y"] = ["stretch", "top", "center", "bottom"];

    // @ts-expect-error
    const _xBad: FlexBoxProps<"row">["y"] = ["center", "left", "center", "right"] as const;
    // @ts-expect-error
    const _yBad: FlexBoxProps<"row">["x"] = ["stretch", "top", "center", "bottom"];

    const sx: FlexBoxProps<"row">["sx"] = { minHeight: { xs: 240, sm: 300 } };
    const ComponentViaProps = () => <FlexBox x={x} y={y} sx={sx} />;
    const ComponentDirect = () => (
      <FlexBox x={["center", "left", "center", "right"]} y={["stretch", "top", "center", "bottom"]} sx={sx} />
    );
    expect(() => ComponentViaProps()).not.toThrow();
    expect(() => ComponentDirect()).not.toThrow();
  });

  it("should handle responsive array props for row/column", () => {
    const row: FlexBoxProps["row"] = [true, false, true, false];
    const column: FlexBoxProps["column"] = [false, true, false, true];
    const ComponentViaProps = () => <FlexBox row={row} column={column} />;
    const ComponentDirect = () => <FlexBox row={[true, false, true, false]} column={[false, true, false, true]} />;
    expect(() => ComponentViaProps()).not.toThrow();
    expect(() => ComponentDirect()).not.toThrow();
  });

  it("should infer responsive array props for row v. column", () => {
    const row: FlexBoxProps["row"] = [true, false, true, false];
    const column: FlexBoxProps["column"] = [false, true, false, true];
    const ComponentRowViaProps = () => <FlexBox row={row} />;
    const ComponentColumnViaProps = () => <FlexBox column={column} />;
    const ComponentRowDirect = () => <FlexBox row={[true, false, true, false]} />;
    const ComponentColumnDirect = () => <FlexBox column={[false, true, false, true]} />;
    expect(() => ComponentRowViaProps()).not.toThrow();
    expect(() => ComponentColumnViaProps()).not.toThrow();
    expect(() => ComponentRowDirect()).not.toThrow();
    expect(() => ComponentColumnDirect()).not.toThrow();
  });
});

describe("SxProps & Theme type tests", () => {
  it("should handle SxProps<Theme>", () => {
    const sx: SxProps<Theme> = { color: ["red", "blue"] };
    expect(sx).toBeDefined();
    const _StockBox = () => <Box sx={sx} />;
    expect(() => _StockBox()).not.toThrow();
    const _FlexBox = () => <FlexBox height={100} sx={sx} />;
    expect(() => _FlexBox()).not.toThrow();
  });

  it("should handle SxProps without generic", () => {
    const sx: SxProps = { color: "red" };
    expect(sx).toBeDefined();
    const _StockBox = () => <Box sx={sx} />;
    expect(() => _StockBox()).not.toThrow();
    const _FlexBox = () => <FlexBox height={100} sx={sx} />;
    expect(() => _FlexBox()).not.toThrow();
  });
});

const GridPropsTest = (gridRef?: React.RefObject<HTMLDivElement>) => (
  <FlexGrid container>
    <FlexGrid item xs={12} component="header" ref={gridRef} column gap={0}></FlexGrid>
  </FlexGrid>
);

describe("FlexGrid supports Grid props", () => {
  it("should allow ref and component props", () => {
    expect(() => GridPropsTest()).not.toThrow();
  });
});

//TODO: Proper TypeScript testing import and prop mechanisms for both Grid2 flavors

if (muiVersion < 6) {
  const Grid2_v5PropsTest = (gridRef?: React.RefObject<HTMLDivElement>) => (
    <FlexGrid2 container spacing={2} ref={gridRef}>
      {/* @ts-ignore */}
      <FlexGrid2 xs={8} />
      {/* @ts-ignore */}
      <FlexGrid2 xs={4} />
      {/* @ts-ignore */}
      <FlexGrid2 xs={4}>Child text</FlexGrid2>
      {/* @ts-ignore */}
      <FlexGrid2 xs={8} />
    </FlexGrid2>
  );

  describe("FlexGrid supports MUIv5 Grid2 props", () => {
    it("should allow ref and component props", () => {
      expect(() => Grid2_v5PropsTest()).not.toThrow();
    });
  });
} else {
  const Grid2_v6PropsTest = (gridRef?: React.RefObject<HTMLDivElement>) => (
    <FlexGrid2 container spacing={2} ref={gridRef}>
      {/* @ts-ignore */}
      <FlexGrid2 size={8} />
      {/* @ts-ignore */}
      <FlexGrid2 size={{ xs: 4, md: 2 }} />
      {/* @ts-ignore */}
      <FlexGrid2 size={4}>Child text</FlexGrid2>
      {/* @ts-ignore */}
      <FlexGrid2 size={8} />
    </FlexGrid2>
  );

  describe("FlexGrid supports MUIv6+ Grid2 props", () => {
    it("should allow ref and component props", () => {
      expect(() => Grid2_v6PropsTest()).not.toThrow();
    });
  });
}
