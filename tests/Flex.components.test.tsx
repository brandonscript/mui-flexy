import { Box, Grid, Typography } from "@mui/material";
import { FlexBox, FlexGrid } from "../src";

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
