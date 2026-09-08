import "@testing-library/jest-dom";

import { createSerializer } from "@emotion/jest";
import { render, screen } from "@testing-library/react";
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

expect.addSnapshotSerializer(createSerializer());

type WithDataTestId<P, T = string> = P & {
  "data-testid"?: T;
};

type BoxProps = _Any;
type Theme = _Any;

export type BaselineTestConfig = {
  MuiBox: React.ComponentType<BoxProps>;
  ThemeProvider: React.ComponentType<{ theme: Theme; children: React.ReactNode }>;
  createTheme: () => Theme;
  styled: _Any;
  /** MUI v9+ removed system props from Box; set true to pass styles via sx instead. */
  systemPropsViaSx?: boolean;
};

export function runBaselineTests(config: BaselineTestConfig) {
  const { MuiBox, ThemeProvider, createTheme, styled, systemPropsViaSx = false } = config;

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

  const absolutePositionProps = systemPropsViaSx ? { sx: { position: "absolute" } } : { position: "absolute" };

  const _StyledStockBox = styled((props: WithDataTestId<BoxProps>) => (
    <MuiBox {...props} {...absolutePositionProps} component="span" />
  ))(({ theme }: { theme: Theme }) =>
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
    withThemeProvider(() => <MuiBox ref={ref} {...props} {...absolutePositionProps} />)(),
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
      render(<MuiBox data-testid="vanilla-mui-box" />);
      const vanillaMuiBox = screen.getByTestId("vanilla-mui-box");
      expect(vanillaMuiBox).toBeInTheDocument();
      expect(vanillaMuiBox).toHaveAttribute("data-testid", "vanilla-mui-box");
    });

    it("should render a vanilla MUI Box in a ThemeProvider", () => {
      render(withThemeProvider(() => <MuiBox data-testid="vanilla-mui-box" />)());
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
}
