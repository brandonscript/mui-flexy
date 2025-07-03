import "@testing-library/jest-dom";

import { createSerializer } from "@emotion/jest";
import _StockBox, { type BoxProps } from "@mui/material/Box";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import * as React from "react";

import { type FlexBoxColumnProps, type FlexBoxProps } from "../src";
import { FlexBox } from "../src";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

const StockBox = (_StockBox as _Any)?.default || _StockBox;

expect.addSnapshotSerializer(createSerializer());

const theme = createTheme();
const withThemeProvider = <P,>(Component: React.ComponentType<P>) => {
  return function WrappedComponent(props = {} as P) {
    return (
      <ThemeProvider theme={theme}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Component {...(props as any)} />
      </ThemeProvider>
    );
  };
};

type WithDataTestId<P, T = string> = P & {
  "data-testid"?: T;
};

const _StyledStockBox = styled((props: WithDataTestId<BoxProps>) => (
  <StockBox {...props} position="absolute" component="span" />
))<FlexBoxProps>(({ theme }) =>
  theme.unstable_sx({
    padding: 1,
    margin: 1,
    borderRadius: `${(theme.shape.borderRadius as number) * 2}px`, // 4 * 2 = 8
    backgroundColor: "aquamarine",
  }),
);
_StyledStockBox.displayName = "StyledStockBox";
const StyledStockBox = withThemeProvider(_StyledStockBox);

const ForwardRefStockBox = React.forwardRef<HTMLDivElement, WithDataTestId<BoxProps>>((props, ref) =>
  withThemeProvider(() => <StockBox ref={ref} {...props} position="absolute" />)(),
);
ForwardRefStockBox.displayName = "ForwardRefStockBox";

describe("baseline", () => {
  it("should render a vanilla div", () => {
    render(withThemeProvider(() => React.createElement("div", { "data-testid": "vanilla-div" }))());
    const vanillaDiv = screen.getByTestId("vanilla-div");
    expect(vanillaDiv).toBeInTheDocument();
    expect(vanillaDiv).toHaveAttribute("data-testid", "vanilla-div");
  });

  it("should render a vanilla div with a ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    const Div = React.forwardRef<HTMLDivElement>((props, ref) => <div {...props} ref={ref} />);
    render(withThemeProvider(() => <Div ref={ref} data-testid="vanilla-div-with-ref" />)());
    const vanillaDivWithRef = screen.getByTestId("vanilla-div-with-ref");
    expect(vanillaDivWithRef).toBeInTheDocument();
    expect(vanillaDivWithRef).toHaveAttribute("data-testid", "vanilla-div-with-ref");
    expect(ref.current).toBe(vanillaDivWithRef);
  });

  it("should render a vanilla MUI Box", () => {
    render(<StockBox data-testid="vanilla-mui-box" />);
    const vanillaMuiBox = screen.getByTestId("vanilla-mui-box");
    expect(vanillaMuiBox).toBeInTheDocument();
    expect(vanillaMuiBox).toHaveAttribute("data-testid", "vanilla-mui-box");
  });

  it("should render a vanilla MUI Box in a ThemeProvider", () => {
    render(withThemeProvider(() => <StockBox data-testid="vanilla-mui-box" />)());
    const vanillaMuiBox = screen.getByTestId("vanilla-mui-box");
    expect(vanillaMuiBox).toBeInTheDocument();
    expect(vanillaMuiBox).toHaveAttribute("data-testid", "vanilla-mui-box");
  });

  it("should inherit props from the styled component when using styled() sx", () => {
    const el = <StyledStockBox data-testid="styled-mui-box" />;
    const _tree = render(el);
    const styledMuiBox = screen.getByTestId("styled-mui-box");
    expect(styledMuiBox).toBeInTheDocument();
    expect(styledMuiBox).toHaveAttribute("data-testid", "styled-mui-box");
    const computedStyle = window.getComputedStyle(styledMuiBox);
    expect(computedStyle.padding).toBe("8px");
    expect(computedStyle.margin).toBe("8px");
    expect(computedStyle.borderRadius).toBe("8px");
    expect(computedStyle.backgroundColor).toBe("aquamarine");
    expect(computedStyle.position).toBe("absolute");
  });

  it("should render a vanilla MUI Box with a ref (using forwardRef)", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ForwardRefStockBox ref={ref} data-testid="vanilla-mui-box-with-ref" />);
    const vanillaMuiBoxWithRef = screen.getByTestId("vanilla-mui-box-with-ref");
    expect(vanillaMuiBoxWithRef).toBeInTheDocument();
    expect(vanillaMuiBoxWithRef).toHaveAttribute("data-testid", "vanilla-mui-box-with-ref");
    expect(ref.current).toHaveAttribute("data-testid", "vanilla-mui-box-with-ref");
    expect(ref.current).toBe(vanillaMuiBoxWithRef);
  });
});

const ForwardRefFlexBox = React.forwardRef<HTMLDivElement, WithDataTestId<FlexBoxColumnProps>>((props, ref) => (
  <FlexBox ref={ref} {...props} column x="center" y="bottom" position="absolute" data-static-value="static-value" />
));

const StyledFlexBox = styled(ForwardRefFlexBox)<FlexBoxProps>(({ theme }) =>
  theme.unstable_sx({
    // We want to ensure that the props from the styled component are passed to the FlexBox component
    padding: 1,
    margin: 1,
    borderRadius: `${(theme.shape.borderRadius as number) * 2}px`,
    backgroundColor: "aquamarine",
  }),
);
StyledFlexBox.displayName = "StyledFlexBox";

describe("FlexBox", () => {
  it("should render a vanilla FlexBox", () => {
    render(<FlexBox data-testid="vanilla-flexbox" />);
    const vanillaFlexBox = screen.getByTestId("vanilla-flexbox");
    expect(vanillaFlexBox).toBeInTheDocument();
    expect(vanillaFlexBox).toHaveAttribute("data-testid", "vanilla-flexbox");
    const computedStyle = window.getComputedStyle(vanillaFlexBox);
    expect(computedStyle.display).toBe("flex");
    expect(computedStyle.flexDirection).toBe("row");
  });

  it("should render a vanilla FlexBox in a ThemeProvider", () => {
    render(withThemeProvider(() => <FlexBox data-testid="vanilla-flexbox" />)());
    const vanillaFlexBox = screen.getByTestId("vanilla-flexbox");
    expect(vanillaFlexBox).toBeInTheDocument();
    expect(vanillaFlexBox).toHaveAttribute("data-testid", "vanilla-flexbox");
    const computedStyle = window.getComputedStyle(vanillaFlexBox);
    expect(computedStyle.display).toBe("flex");
    expect(computedStyle.flexDirection).toBe("row");
  });

  it("should render a vanilla FlexBox with a ref (using forwardRef)", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ForwardRefFlexBox ref={ref} data-testid="vanilla-flexbox-with-ref" />);
    const vanillaFlexBoxWithRef = screen.getByTestId("vanilla-flexbox-with-ref");
    expect(vanillaFlexBoxWithRef).toBeInTheDocument();
    expect(vanillaFlexBoxWithRef).toHaveAttribute("data-testid", "vanilla-flexbox-with-ref");
    expect(ref.current).toHaveAttribute("data-testid", "vanilla-flexbox-with-ref");
    expect(ref.current).toBe(vanillaFlexBoxWithRef);
  });

  it("should merge props from the Base component when using styled() sx", () => {
    const el = <StyledFlexBox data-testid="styled-flex-box" />;
    render(withThemeProvider(() => el)());
    const styledFlexBox = screen.getByTestId("styled-flex-box");
    expect(styledFlexBox).toBeInTheDocument();
    expect(styledFlexBox).toHaveAttribute("data-testid", "styled-flex-box");
    expect(styledFlexBox).toHaveAttribute("data-static-value", "static-value");
    const computedStyle = window.getComputedStyle(styledFlexBox);
    expect(computedStyle.padding).toBe("8px");
    expect(computedStyle.margin).toBe("8px");
    expect(computedStyle.borderRadius).toBe("8px");
    expect(computedStyle.backgroundColor).toBe("aquamarine");
    expect(computedStyle.position).toBe("absolute");
    expect(computedStyle.display).toBe("flex");
    expect(computedStyle.flexDirection).toBe("column");
    expect(computedStyle.alignItems).toBe("center");
    expect(computedStyle.justifyContent).toBe("flex-end");
  });
});

export default {};
