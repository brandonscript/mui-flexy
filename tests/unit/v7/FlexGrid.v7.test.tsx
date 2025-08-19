import { Grid, styled, Typography } from "@mui/material";
import { major as muiVersion } from "@mui/material/version";
import { FlexGrid, type FlexGridProps } from "@mui-flexy/v7";

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

describe("FlexGrid supports styled()", () => {
  it("should wrap FlexGrid in styled() with correct type inference", () => {
    expect(() => <StyledFlexGrid />).not.toThrow();
  });
});

describe("FlexGrid blocks legacy Grid props", () => {
  it("should block item, zeroMinWidth, and breakpoint props with TypeScript errors", () => {
    // These should all produce TypeScript errors and are tested for compilation
    const BlockedPropsTests = [
      // @ts-expect-error - item prop should be blocked
      () => <FlexGrid item />,
      // @ts-expect-error - zeroMinWidth prop should be blocked
      () => <FlexGrid zeroMinWidth />,
      // @ts-expect-error - xs prop should be blocked
      () => <FlexGrid xs={12} />,
      // @ts-expect-error - sm prop should be blocked
      () => <FlexGrid sm={6} />,
      // @ts-expect-error - md prop should be blocked
      () => <FlexGrid md={4} />,
      // @ts-expect-error - lg prop should be blocked
      () => <FlexGrid lg={3} />,
      // @ts-expect-error - xl prop should be blocked
      () => <FlexGrid xl={2} />,
    ];

    // These functions exist to test TypeScript compilation, not runtime
    expect(BlockedPropsTests.length).toEqual(7);
  });
});
