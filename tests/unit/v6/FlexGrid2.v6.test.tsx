import { Grid, Typography } from "../../../packages/v6/node_modules/@mui/material";
import { major as muiVersion } from "../../../packages/v6/node_modules/@mui/material/version";
import { FlexGrid2 } from "../../../packages/v6/src/FlexGrid2.v6";

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
  () => <FlexGrid2 component="div" />,
  () => <FlexGrid2 component="div" className="myClass" />,
  () => <FlexGrid2 component="main" />,
  () => <FlexGrid2 component="img" src="" />,
  () => <FlexGrid2 component={Typography} variant="h1" />,
];

describe("FlexGrid JSX tests", () => {
  it("should exec OverrideGridTests without errors", () => {
    OverrideGridTests.forEach((TestComponent) => {
      expect(() => TestComponent()).not.toThrow();
    });
  });
});

const GridPropsTest = (gridRef?: React.RefObject<HTMLDivElement>) => (
  <FlexGrid2 container>
    <FlexGrid2 size={{ xs: 12 }} component="header" ref={gridRef} column gap={0}></FlexGrid2>
  </FlexGrid2>
);

describe("FlexGrid supports Grid props", () => {
  it("should allow ref and component props", () => {
    expect(() => GridPropsTest()).not.toThrow();
  });
});

const Grid2_v6PropsTest = (gridRef?: React.RefObject<HTMLDivElement>) => (
  <FlexGrid2 container spacing={2} ref={gridRef}>
    <FlexGrid2 size={{ xs: 8, md: 4 }} />
    <FlexGrid2 size={{ xs: 4, md: 2 }} />
    <FlexGrid2 size={{ xs: 4, md: 2 }}>Child text</FlexGrid2>
    <FlexGrid2 size={{ xs: 8, md: 4 }} />
  </FlexGrid2>
);

describe("FlexGrid supports MUIv6 Grid2 props", () => {
  it("should allow ref and component props", () => {
    expect(() => Grid2_v6PropsTest()).not.toThrow();
  });
});
