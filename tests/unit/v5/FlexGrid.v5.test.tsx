import { Grid, styled, Typography } from "@mui/material";
import { major as muiVersion } from "@mui/material/version";
import { FlexGrid, type FlexGridProps } from "@mui-flexy/v5";

console.log("Tests running with MUI version:", muiVersion);

describe("Verify MUI version", () => {
  it("should be MUI version 5", () => {
    expect(muiVersion).toEqual(5);
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

const StyledFlexGrid = styled((props: FlexGridProps) => (
  <FlexGrid row={{ xs: false, md: true }} x={{ xs: "left", md: "center" }} y="center" {...props} />
))(({ theme }) =>
  theme.unstable_sx({
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
    gridTemplateRows: { xs: "repeat(2, 1fr)", md: "none" },
    transition: theme.transitions.create(["margin"], { duration: 250, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }),
    rowGap: { xs: 1, md: 1 },
    columnGap: { xs: 1, md: 3 },
    flexWrap: "nowrap",
  }),
);

describe("FlexGrid2 supports styled()", () => {
  it("should wrap FlexGrid in styled() with correct type inference", () => {
    expect(() => <StyledFlexGrid />).not.toThrow();
  });
});
