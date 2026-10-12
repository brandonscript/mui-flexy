import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { act, render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { createRef } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server.node";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export function runClassModeTests({
  FlexBox,
  FlexRowBox,
  FlexColumnBox,
  FlexGrid,
  FlexyProvider,
  extraGrid,
}: Record<string, ComponentType<_Any>>) {
  const theme = createTheme();
  const wrap = (children: React.ReactNode, styling: "classes" | "system" = "classes") => (
    <ThemeProvider theme={theme}>
      <FlexyProvider styling={styling}>{children}</FlexyProvider>
    </ThemeProvider>
  );
  const utilities = (element: HTMLElement) =>
    [...element.classList].filter((name) => /^MuiFlex-(?:d-|dir-|row(?:-|$)|col(?:-|$)|j-|a-|w-)/.test(name));
  describe("shared layout class mode", () => {
    it("shares layout classes across unrelated sx styles and preserves forwarding", () => {
      const ref = createRef<HTMLElement>();
      render(
        wrap(
          <>
            <FlexBox
              data-testid="first"
              x="center"
              y="top"
              sx={{ color: "red", p: 1 }}
              component="section"
              ref={ref}
              className="user-class"
            />
            <FlexBox data-testid="second" x="center" y="top" sx={{ color: "blue", p: 2 }} />
          </>,
        ),
      );
      const first = screen.getByTestId("first");
      expect(utilities(first)).toEqual(utilities(screen.getByTestId("second")));
      expect(first).toHaveClass("MuiFlex-j-center", "MuiFlex-a-start", "user-class", "MuiFlexBox-root");
      expect(first.tagName).toBe("SECTION");
      expect(ref.current).toBe(first);
      expect(first).not.toHaveAttribute("styling");
      expect(first).not.toHaveAttribute("x");
      expect(window.getComputedStyle(first).padding).toBe("8px");
    });

    it("supports fixed orientations and all Grid adapters", () => {
      const components = [FlexRowBox, FlexColumnBox, FlexGrid, ...(extraGrid ? [extraGrid] : [])];
      render(
        wrap(
          <>
            {components.map((Component, index) => (
              <Component key={index} data-testid={`variant-${index}`} x="center" y="center" wrap={false} />
            ))}
          </>,
        ),
      );
      components.forEach((_, index) => {
        const element = screen.getByTestId(`variant-${index}`);
        expect(element).toHaveClass("MuiFlex-w-nowrap", "MuiFlex-j-center", "MuiFlex-a-center");
        expect(element).toHaveClass(index === 1 ? "MuiFlex-col" : "MuiFlex-row");
      });
    });

    it("lets components override provider defaults in either direction", () => {
      render(
        wrap(
          <>
            <FlexBox data-testid="system" styling="system" />
            <FlexyProvider>
              <FlexBox data-testid="classes" styling="classes" />
            </FlexyProvider>
          </>,
        ),
      );
      expect(utilities(screen.getByTestId("system"))).toEqual([]);
      expect(screen.getByTestId("classes")).toHaveClass("MuiFlex-row");
      expect(screen.getByTestId("classes")).not.toHaveClass("MuiFlex-d-flex");
    });

    it("keeps sx objects, arrays, callbacks, nested selectors, and styled decoration", () => {
      const Decorated = styled(FlexBox)({ border: "1px solid red" });
      render(
        wrap(
          <Decorated
            data-testid="override"
            x="center"
            y="center"
            sx={[
              { justifyContent: "flex-start", "& > span": { color: "red" } },
              false,
              (activeTheme: _Any) => ({ justifyContent: "flex-end", padding: activeTheme.spacing(2) }),
            ]}
          >
            <span data-testid="child">Child</span>
          </Decorated>,
        ),
      );
      const style = window.getComputedStyle(screen.getByTestId("override"));
      // jsdom ignores specificity between separate sheets; inspect the stronger rule.
      expect(screen.getByTestId("override")).toHaveStyleRule("justify-content", "flex-end", {
        target: ".MuiFlex-root.MuiFlex-root.MuiFlex-root",
      });
      expect(style.padding).toBe("16px");
      expect(style.borderTopWidth).toBe("1px");
      expect(window.getComputedStyle(screen.getByTestId("child")).color).toMatch(/^(red|rgb\(255, 0, 0\))$/);
    });

    it("evaluates theme callbacks and falls back only for unsupported properties", () => {
      render(
        wrap(<FlexBox data-testid="fallback" direction={() => "column"} display={() => "flow-root"} x="center" />),
      );
      const element = screen.getByTestId("fallback");
      expect(element).toHaveClass("MuiFlex-col", "MuiFlex-a-center");
      // jsdom does not honor :where() specificity across sheets. Chromium
      // verifies the computed result; here verify the explicit fallback rule.
      expect(element).toHaveStyleRule("display", "flow-root", {
        target: ".MuiFlex-root.MuiFlex-root.MuiFlex-root",
      });
      expect(element.className).not.toContain("MuiFlex-d-");
    });

    it("does not install duplicate sheets for equivalent nested providers", () => {
      render(
        wrap(
          <FlexyProvider styling="classes">
            <FlexBox />
          </FlexyProvider>,
        ),
      );
      expect(document.querySelectorAll('style[data-emotion$="-global"]')).toHaveLength(1);
    });

    it("uses a separate sheet inside a separate Emotion cache", () => {
      const cache = createCache({ key: "other", speedy: true });
      render(
        wrap(
          <>
            <FlexBox />
            <CacheProvider value={cache}>
              <FlexyProvider styling="classes">
                <FlexBox data-testid="other-cache" />
              </FlexyProvider>
            </CacheProvider>
          </>,
        ),
      );
      expect(document.querySelectorAll('style[data-emotion$="-global"]')).toHaveLength(2);
      expect(screen.getByTestId("other-cache")).toHaveClass("MuiFlex-row");
    });

    it("hydrates deterministic layout markup without recoverable errors", async () => {
      const jsx = wrap(<FlexBox data-testid="hydrated" column={{ xs: false, md: true }} x="center" y="top" />);
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const container = document.createElement("div");
      document.body.append(container);
      try {
        container.innerHTML = renderToString(jsx);
        // MUI's browser-only layout effect warns when its browser build is server-rendered in jsdom.
        expect(
          spy.mock.calls.every(([message]) => String(message).includes("useLayoutEffect does nothing on the server")),
        ).toBe(true);
        spy.mockClear();
        const original = container.querySelector('[data-testid="hydrated"]');
        const errors: unknown[] = [];
        let root: ReturnType<typeof hydrateRoot>;
        await act(async () => {
          root = hydrateRoot(container, jsx, { onRecoverableError: (error) => errors.push(error) });
        });
        expect(container.querySelector('[data-testid="hydrated"]')).toBe(original);
        expect(errors).toEqual([]);
        expect(spy).not.toHaveBeenCalled();
        await act(async () => {
          root.unmount();
        });
      } finally {
        container.remove();
        spy.mockRestore();
      }
    });

    it("keeps layout CSS fixed as hundreds of differently styled instances are added", () => {
      const rules = () => {
        const result: string[] = [];
        const visit = (list: CSSRuleList) => {
          for (const rule of Array.from(list)) {
            if (rule instanceof CSSStyleRule && rule.selectorText.startsWith(".MuiFlex-root.MuiFlex-"))
              result.push(rule.cssText);
            else if ("cssRules" in rule) visit((rule as CSSGroupingRule).cssRules);
          }
        };
        Array.from(document.styleSheets).forEach((sheet) => visit(sheet.cssRules));
        return result.sort();
      };
      const boxes = (count: number) =>
        wrap(
          <>
            {Array.from({ length: count }, (_, i) => (
              <FlexBox
                key={i}
                data-testid="repeated"
                x="center"
                y="top"
                sx={{ color: `rgb(${i % 255},0,0)`, p: i % 4 }}
              />
            ))}
          </>,
        );
      const view = render(boxes(1));
      const before = rules();
      expect(before.length).toBeGreaterThan(0);
      expect(new Set(before).size).toBe(before.length);
      view.rerender(boxes(300));
      expect(rules()).toEqual(before);
      expect(new Set(screen.getAllByTestId("repeated").map((element) => utilities(element).join(" "))).size).toBe(1);
    });

    it("reports a missing provider while default system mode remains usable", () => {
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      try {
        expect(() => render(<FlexBox styling="classes" />)).toThrow(/requires a FlexyProvider/);
      } finally {
        spy.mockRestore();
      }
      render(<FlexBox data-testid="default" />);
      expect(utilities(screen.getByTestId("default"))).toEqual([]);
    });
  });
}
