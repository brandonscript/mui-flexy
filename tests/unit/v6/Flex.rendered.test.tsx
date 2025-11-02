import "@testing-library/jest-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FlexBox,
  type FlexBoxColumnProps,
  type FlexBoxProps,
  type FlexBoxRowProps,
  FlexColumnBox,
  FlexGrid,
  FlexGridColumn,
  type FlexGridColumnProps,
  type FlexGridProps,
  FlexGridRow,
  type FlexGridRowProps,
  FlexRowBox,
} from "@mui-flexy/v6";
import { render } from "@testing-library/react";
import type { ComponentProps, ComponentType, ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

type StyleExpectations = Partial<
  Pick<CSSStyleDeclaration, "display" | "flexDirection" | "justifyContent" | "alignItems" | "whiteSpace">
>;

type FlexCase<P> = {
  name: string;
  props: P;
  expectStyle?: StyleExpectations;
  strippedAttrs?: string[];
};

const theme = createTheme();
const defaultStripped = ["row", "column", "x", "y", "reverse", "wrap"];
const knownShorthand = new Set([...defaultStripped, "size", "xs", "sm", "md", "lg", "xl"]);

const renderWithTheme = (ui: ReactElement) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const monitorConsole = () => {
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

const assertStyles = (element: HTMLElement, expected?: StyleExpectations) => {
  if (!expected) return;
  const computed = window.getComputedStyle(element);
  Object.entries(expected).forEach(([property, value]) => {
    expect(computed[property as keyof StyleExpectations]).toBe(value);
  });
};

const assertNoLeakedAttributes = (element: HTMLElement, attrs: string[] = defaultStripped) => {
  const present = new Set(element.getAttributeNames());
  attrs.forEach((attr) => {
    expect(present.has(attr)).toBe(false);
  });
};

const renderAndVerify = <
  C extends ComponentType<_Any> = ComponentType<_Any>,
  P extends ComponentProps<C> = ComponentProps<C>,
>(
  Component: C,
  props: P,
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
        new Set([...defaultStripped, ...Object.keys((props ?? {}) as object).filter((key) => knownShorthand.has(key))]),
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

const flexBoxCases: FlexCase<FlexBoxProps>[] = [
  {
    name: "renders default orientation as row flexbox",
    props: {},
    expectStyle: { display: "flex", flexDirection: "row" },
  },
  {
    name: "applies column orientation without leaking props",
    props: { column: true },
    expectStyle: { flexDirection: "column" },
  },
  {
    name: "maps column x/y alignment to justifyContent and alignItems",
    props: { column: true, x: "center", y: "space-between" },
    expectStyle: { flexDirection: "column", justifyContent: "space-between", alignItems: "center" },
  },
  {
    name: "maps row x/y alignment to justifyContent and alignItems",
    props: { row: true, x: "space-around", y: "bottom" },
    expectStyle: { flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end" },
  },
  {
    name: "supports reversing row direction",
    props: { row: true, reverse: true },
    expectStyle: { flexDirection: "row-reverse" },
  },
  {
    name: "supports reversing column direction",
    props: { column: true, reverse: true },
    expectStyle: { flexDirection: "column-reverse" },
  },
  {
    name: "applies wrap to flexWrap",
    props: { row: true, wrap: true },
    expectStyle: { flexWrap: "wrap" },
  },
  {
    name: "handles responsive row arrays without leaking attributes",
    props: { row: [true, false, true] as const },
    expectStyle: { display: "flex" },
  },
  {
    name: "handles responsive column objects without leaking attributes",
    props: { column: { xs: true, md: false } as const },
    expectStyle: { display: "flex" },
  },
  {
    name: "supports breakpoint direction shorthands via root props",
    props: { xs: "column", md: "row" } as const,
    expectStyle: { flexDirection: "column" },
    strippedAttrs: [...defaultStripped, "xs", "md"],
  },
  {
    name: "supports direction alias for responsive objects",
    props: { direction: { xs: "column", sm: "row" } } as const,
    expectStyle: { flexDirection: "column" },
    strippedAttrs: [...defaultStripped, "direction"],
  },
  {
    name: "supports direction alias for responsive arrays",
    props: { direction: ["column", "row"] as const },
    expectStyle: { flexDirection: "column" },
    strippedAttrs: [...defaultStripped, "direction"],
  },
];

describe("FlexBox rendered output", () => {
  flexBoxCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
    it(name, () => {
      renderAndVerify(FlexBox, props, expectStyle, strippedAttrs);
    });
  });
});

const flexRowBoxCases: FlexCase<FlexBoxRowProps>[] = [
  {
    name: "renders with locked row orientation",
    props: {},
    expectStyle: { flexDirection: "row" },
  },
  {
    name: "respects row reverse shorthand",
    props: { reverse: true },
    expectStyle: { flexDirection: "row-reverse" },
  },
  {
    name: "supports responsive alignment without leaking props",
    props: { x: ["left", "center"], y: ["top", "center"] },
    expectStyle: { display: "flex" },
  },
];

describe("FlexRowBox rendered output", () => {
  flexRowBoxCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
    it(name, () => {
      renderAndVerify(FlexRowBox, props, expectStyle, strippedAttrs);
    });
  });
});

const flexColumnBoxCases: FlexCase<FlexBoxColumnProps>[] = [
  {
    name: "renders with locked column orientation",
    props: {},
    expectStyle: { flexDirection: "column" },
  },
  {
    name: "respects column reverse shorthand",
    props: { reverse: true },
    expectStyle: { flexDirection: "column-reverse" },
  },
  {
    name: "supports responsive alignment without leaking props",
    props: { x: ["stretch", "center"], y: ["space-between", "bottom"] },
    expectStyle: { display: "flex" },
  },
];

describe("FlexColumnBox rendered output", () => {
  flexColumnBoxCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
    it(name, () => {
      renderAndVerify(FlexColumnBox, props, expectStyle, strippedAttrs);
    });
  });
});

const gridStripped = [...defaultStripped, "size", "xs", "sm", "md", "lg", "xl"];

const flexGridCases: FlexCase<FlexGridProps>[] = [
  {
    name: "renders default flex grid",
    props: {},
    expectStyle: { display: "flex", flexDirection: "row" },
    strippedAttrs: gridStripped,
  },
  {
    name: "applies column orientation",
    props: { column: true },
    expectStyle: { flexDirection: "column" },
    strippedAttrs: gridStripped,
  },
  {
    name: "applies row orientation with reverse and alignment",
    props: { row: true, reverse: true, x: "space-evenly", y: "baseline" },
    expectStyle: { flexDirection: "row-reverse", justifyContent: "space-evenly", alignItems: "baseline" },
    strippedAttrs: gridStripped,
  },
  {
    name: "consumes grid legacy size props without leaking attrs",
    props: { item: true, xs: 12, md: 6 },
    expectStyle: { display: "flex" },
    strippedAttrs: gridStripped,
  },
  {
    name: "consumes responsive column values",
    props: { column: { xs: true, sm: null, md: false } },
    expectStyle: { display: "flex" },
    strippedAttrs: gridStripped,
  },
];

describe("FlexGrid rendered output", () => {
  flexGridCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
    it(name, () => {
      renderAndVerify(FlexGrid, props, expectStyle, strippedAttrs);
    });
  });
});

const flexGridRowCases: FlexCase<FlexGridRowProps>[] = [
  {
    name: "enforces row orientation",
    props: {},
    expectStyle: { flexDirection: "row" },
    strippedAttrs: gridStripped,
  },
  {
    name: "respects wrap while stripping shorthand props",
    props: { wrap: true },
    expectStyle: { flexWrap: "wrap" },
    strippedAttrs: gridStripped,
  },
];

describe("FlexGridRow rendered output", () => {
  flexGridRowCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
    it(name, () => {
      renderAndVerify(FlexGridRow, props, expectStyle, strippedAttrs);
    });
  });
});

const flexGridColumnCases: FlexCase<FlexGridColumnProps>[] = [
  {
    name: "enforces column orientation",
    props: {},
    expectStyle: { flexDirection: "column" },
    strippedAttrs: gridStripped,
  },
  {
    name: "supports reverse orientation without leaking attributes",
    props: { reverse: true },
    expectStyle: { flexDirection: "column-reverse" },
    strippedAttrs: gridStripped,
  },
];

describe("FlexGridColumn rendered output", () => {
  flexGridColumnCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
    it(name, () => {
      renderAndVerify(FlexGridColumn, props, expectStyle, strippedAttrs);
    });
  });
});
