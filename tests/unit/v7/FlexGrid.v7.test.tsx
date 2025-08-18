import { Grid, Typography } from "@mui/material";
import { major as muiVersion } from "@mui/material/version";
import { FlexGrid } from "@mui-flexy/v7";

console.log("Tests running with MUI version:", muiVersion);

describe("Verify MUI version", () => {
  it("should be MUI version 7", () => {
    expect(muiVersion).toEqual(7);
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
  <FlexGrid container spacing={2} ref={gridRef}>
    <FlexGrid size={{ xs: 12 }} component="header" ref={gridRef} column gap={0}></FlexGrid>
    <FlexGrid size="grow" component="header" ref={gridRef} column gap={0}></FlexGrid>
    <FlexGrid size={{ xs: 8, md: 4 }} />
    <FlexGrid size={{ xs: 4, md: 2 }} />
    <FlexGrid size={{ xs: 4, md: 2 }}>Child text</FlexGrid>
  </FlexGrid>
);

describe("FlexGrid supports Grid props", () => {
  it("should allow ref and component props", () => {
    expect(() => GridPropsTest()).not.toThrow();
  });
});
