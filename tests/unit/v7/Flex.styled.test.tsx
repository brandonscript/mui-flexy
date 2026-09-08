import "@testing-library/jest-dom";

import { createSerializer } from "@emotion/jest";
import _MuiBox from "@mui/material/Box";
import { createTheme, styled } from "@mui/material/styles";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { FlexBox } from "@mui-flexy/v7";
import { type FlexBoxColumnProps, type FlexBoxProps } from "@mui-flexy/v7";
import { render, screen } from "@testing-library/react";
import * as React from "react";

import { runBaselineTests } from "../shared/Flex.rendered-baseline.test";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

const MuiBox = (_MuiBox as _Any)?.default || _MuiBox;

expect.addSnapshotSerializer(createSerializer());

runBaselineTests({
  MuiBox,
  ThemeProvider,
  createTheme,
  styled,
});

const theme = createTheme();
const withThemeProvider = <P,>(Component: React.ComponentType<P>) => {
  return function WrappedComponent(props = {} as P) {
    return (
      <ThemeProvider theme={theme}>
        <Component {...(props as _Any)} />
      </ThemeProvider>
    );
  };
};

type WithDataTestId<P, T = string> = P & {
  "data-testid"?: T;
};

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
