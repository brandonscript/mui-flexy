import { Grid, Typography } from "../../../packages/v6/node_modules/@mui/material";
import { major as muiVersion } from "../../../packages/v6/node_modules/@mui/material/version";
import { FlexGrid } from "../../../packages/v6/src/FlexGrid.v6";

console.log("Tests running with MUI version:", muiVersion);

describe("Verify MUI version", () => {
  it("should be MUI version 6", () => {
    expect(muiVersion).toEqual(6);
  });
});

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

describe("FlexGrid JSX tests", () => {
  it("should exec OverrideGridTests without errors", () => {
    OverrideGridTests.forEach((TestComponent) => {
      expect(() => TestComponent()).not.toThrow();
    });
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
