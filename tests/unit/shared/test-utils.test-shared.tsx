import "@testing-library/jest-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import type { ComponentProps, ComponentType, ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export type StyleExpectations = Partial<
  Pick<CSSStyleDeclaration, "display" | "flexDirection" | "justifyContent" | "alignItems" | "flexWrap" | "whiteSpace">
>;

export type FlexCase<P> = {
  name: string;
  props: P;
  expectStyle?: StyleExpectations;
  strippedAttrs?: string[];
};

export type VersionConfig = {
  defaultStripped: string[];
  knownShorthand: Set<string>;
};

const theme = createTheme();

export const renderWithTheme = (ui: ReactElement) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

export const monitorConsole = () => {
  const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  return {
    warnSpy,
    errorSpy,
    restore: () => {
      warnSpy.mockRestore();
      errorSpy.mockRestore();
    },
  };
};

export const assertStyles = (element: HTMLElement, expected?: StyleExpectations) => {
  if (!expected) return;
  const computed = window.getComputedStyle(element);
  Object.entries(expected).forEach(([property, value]) => {
    expect(computed[property as keyof StyleExpectations]).toBe(value);
  });
};

export const assertNoLeakedAttributes = (element: HTMLElement, attrs: string[]) => {
  const present = new Set(element.getAttributeNames());
  attrs.forEach((attr) => {
    expect(present.has(attr)).toBe(false);
  });
};

export const renderAndVerify = <
  C extends ComponentType<_Any> = ComponentType<_Any>,
  P extends ComponentProps<C> = ComponentProps<C>,
>(
  Component: C,
  props: P,
  config: VersionConfig,
  expectStyle?: StyleExpectations,
  strippedAttrs?: string[],
) => {
  const { warnSpy, errorSpy, restore } = monitorConsole();
  try {
    const { container } = renderWithTheme(<Component {...props} />);
    const element = container.firstElementChild as HTMLElement | null;
    expect(element).not.toBeNull();
    const derivedStripped =
      strippedAttrs ??
      Array.from(
        new Set([
          ...config.defaultStripped,
          ...Object.keys((props ?? {}) as object).filter((key) => config.knownShorthand.has(key)),
        ]),
      );
    assertNoLeakedAttributes(element as HTMLElement, derivedStripped);
    assertStyles(element as HTMLElement, expectStyle);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    const consoleMessages = [...errorSpy.mock.calls, ...warnSpy.mock.calls].flat().map(String);
    consoleMessages.forEach((msg) => {
      expect(msg).not.toContain("non-boolean attribute");
    });
  } finally {
    restore();
  }
};
