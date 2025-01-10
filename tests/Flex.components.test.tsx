import { Box, Grid, styled, Typography } from "@mui/material";

import { FlexBox, FlexBoxProps, FlexGrid } from "../src";

const RowTests = [
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
];

const ColumnTests = [
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
    RowTests.forEach(TestComponent => {
      expect(() => TestComponent()).not.toThrow();
    });
  });

  it("should exec ColumnTests without errors", () => {
    ColumnTests.forEach(TestComponent => {
      expect(() => TestComponent()).not.toThrow();
    });
  });

  it("should exec OverrideBoxTests without errors", () => {
    OverrideBoxTests.forEach(TestComponent => {
      expect(() => TestComponent()).not.toThrow();
    });
  });

  it("should exec OverrideGridTests without errors", () => {
    OverrideGridTests.forEach(TestComponent => {
      expect(() => TestComponent()).not.toThrow();
    });
  });
});

const PropsTests = [
  ({ x, y, sx, ...rest }: FlexBoxProps) => (
    // @ts-expect-error
    <FlexBox {...rest} x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
  ({ x, y, sx, ...rest }: FlexBoxProps<"row">) => (
    <FlexBox {...rest} x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
  ({ x, y, sx, ...rest }: FlexBoxProps<"column">) => (
    <FlexBox {...rest} x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
  ({ x, y, sx, ...rest }: FlexBoxProps<"row">) => (
    // @ts-expect-error
    <FlexBox {...rest} column x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
  ({ x, y, sx, ...rest }: FlexBoxProps<"column">) => (
    // @ts-expect-error
    <FlexBox {...rest} row x={x} y={y} sx={{ ...sx, backgroundColor: "blue", color: "black" }} />
  ),
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
    const { row, column } = {} as FlexBoxProps;
  });
  it("should respect row/column allowed values for row", () => {
    // These are strictly typed as { row: true; column: false | undefined; }
    const { row, column } = {} as FlexBoxProps<"row">;
  });
  it("should respect row/column allowed values for column", () => {
    // These are strictly typed as { row: false | undefined; column: true; }
    const { row, column } = {} as FlexBoxProps<"column">;
  });
});

describe("FlexBox with styled()", () => {
  it("should respect FlexBox/Grid types", () => {
    const StyledFlexBox = styled(FlexBox)(({ theme }) =>
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
      })
    );
  });
});

const GridPropsTest = (gridRef?: React.RefObject<HTMLDivElement>) => (
  <FlexGrid container>
    <FlexGrid item xs={12} component="header" ref={gridRef} column gap={0}></FlexGrid>
  </FlexGrid>
);

describe("FlexGrid supports MUIv5 grid props", () => {
  it("should allow ref and component props", () => {
    expect(() => GridPropsTest()).not.toThrow();
  });
});
