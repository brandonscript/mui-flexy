import { Grid, styled, Typography } from "@mui/material";
import { major as muiVersion } from "@mui/material/version";
import { FlexGrid2, type FlexGrid2Props } from "@mui-flexy/v6";

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

describe("FlexGrid supports Grid props", () => {
  it("should allow ref and component props", () => {
    expect(() => GridPropsTest()).not.toThrow();
  });
});

const StyledFlexGrid2 = styled((props: FlexGrid2Props) => (
  <FlexGrid2 row={{ xs: false, md: true }} x={{ xs: "left", md: "center" }} y="center" {...props} />
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
    expect(() => <StyledFlexGrid2 />).not.toThrow();
  });
});

describe("FlexGrid2 blocks legacy Grid props", () => {
  it("should block item, zeroMinWidth, and breakpoint props with TypeScript errors", () => {
    // These should all produce TypeScript errors and are tested for compilation
    const BlockedPropsTests = [
      // @ts-expect-error - item prop should be blocked
      () => <FlexGrid2 item />,
      // @ts-expect-error - zeroMinWidth prop should be blocked
      () => <FlexGrid2 zeroMinWidth />,
      // @ts-expect-error - xs prop should be blocked
      () => <FlexGrid2 xs={12} />,
      // @ts-expect-error - sm prop should be blocked
      () => <FlexGrid2 sm={6} />,
      // @ts-expect-error - md prop should be blocked
      () => <FlexGrid2 md={4} />,
      // @ts-expect-error - lg prop should be blocked
      () => <FlexGrid2 lg={3} />,
      // @ts-expect-error - xl prop should be blocked
      () => <FlexGrid2 xl={2} />,
    ];

    // These functions exist to test TypeScript compilation, not runtime
    expect(BlockedPropsTests.length).toEqual(7);
  });
});
