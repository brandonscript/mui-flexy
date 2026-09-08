import type { FlexCase } from "./test-utils.test-shared";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export type VersionSpecificCases<P> = {
  flexBoxCases?: FlexCase<P>[];
  flexRowBoxCases?: FlexCase<P>[];
  flexColumnBoxCases?: FlexCase<P>[];
  flexGridCases?: FlexCase<P>[];
  flexGridRowCases?: FlexCase<P>[];
  flexGridColumnCases?: FlexCase<P>[];
};

export function createBaseFlexBoxCases<P extends _Any>(): FlexCase<P>[] {
  return [
    {
      name: "renders default orientation as row flexbox",
      props: {} as P,
      expectStyle: { display: "flex", flexDirection: "row" },
    },
    {
      name: "applies column orientation without leaking props",
      props: { column: true } as P,
      expectStyle: { flexDirection: "column" },
    },
    {
      name: "maps column x/y alignment to justifyContent and alignItems",
      props: { column: true, x: "center", y: "space-between" } as P,
      expectStyle: { flexDirection: "column", justifyContent: "space-between", alignItems: "center" },
    },
    {
      name: "maps row x/y alignment to justifyContent and alignItems",
      props: { row: true, x: "space-around", y: "bottom" } as P,
      expectStyle: { flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end" },
    },
    {
      name: "supports reversing row direction",
      props: { row: true, reverse: true } as P,
      expectStyle: { flexDirection: "row-reverse" },
    },
    {
      name: "supports reversing column direction",
      props: { column: true, reverse: true } as P,
      expectStyle: { flexDirection: "column-reverse" },
    },
    {
      name: "applies wrap to flexWrap",
      props: { row: true, wrap: true } as P,
      expectStyle: { flexWrap: "wrap" },
    },
    {
      name: "handles responsive row arrays without leaking attributes",
      props: { row: [true, false, true] as const } as P,
      expectStyle: { display: "flex" },
    },
    {
      name: "handles responsive column objects without leaking attributes",
      props: { column: { xs: true, md: false } as const } as P,
      expectStyle: { display: "flex" },
    },
  ];
}

export function createBaseFlexRowBoxCases<P extends _Any>(): FlexCase<P>[] {
  return [
    {
      name: "renders with locked row orientation",
      props: {} as P,
      expectStyle: { flexDirection: "row" },
    },
    {
      name: "respects row reverse shorthand",
      props: { reverse: true } as P,
      expectStyle: { flexDirection: "row-reverse" },
    },
    {
      name: "supports responsive alignment without leaking props",
      props: { x: ["left", "center"], y: ["top", "center"] } as P,
      expectStyle: { display: "flex" },
    },
  ];
}

export function createBaseFlexColumnBoxCases<P extends _Any>(): FlexCase<P>[] {
  return [
    {
      name: "renders with locked column orientation",
      props: {} as P,
      expectStyle: { flexDirection: "column" },
    },
    {
      name: "respects column reverse shorthand",
      props: { reverse: true } as P,
      expectStyle: { flexDirection: "column-reverse" },
    },
    {
      name: "supports responsive alignment without leaking props",
      props: { x: ["stretch", "center"], y: ["space-between", "bottom"] } as P,
      expectStyle: { display: "flex" },
    },
  ];
}

export function createBaseFlexGridCases<P extends _Any>(
  defaultStripped: string[],
  additionalCases?: FlexCase<P>[],
): FlexCase<P>[] {
  const gridStripped = [...defaultStripped, "xs", "sm", "md", "lg", "xl"];
  const baseCases: FlexCase<P>[] = [
    {
      name: "renders default flex grid",
      props: {} as P,
      expectStyle: { display: "flex", flexDirection: "row" },
      strippedAttrs: gridStripped,
    },
    {
      name: "applies column orientation",
      props: { column: true } as P,
      expectStyle: { flexDirection: "column" },
      strippedAttrs: gridStripped,
    },
    {
      name: "applies row orientation with reverse and alignment",
      props: { row: true, reverse: true, x: "space-evenly", y: "baseline" } as P,
      expectStyle: { flexDirection: "row-reverse", justifyContent: "space-evenly", alignItems: "baseline" },
      strippedAttrs: gridStripped,
    },
    {
      name: "consumes responsive column values",
      props: { column: { xs: true, sm: null, md: false } } as P,
      expectStyle: { display: "flex" },
      strippedAttrs: gridStripped,
    },
  ];
  return additionalCases ? [...baseCases, ...additionalCases] : baseCases;
}

export function createBaseFlexGridRowCases<P extends _Any>(defaultStripped: string[]): FlexCase<P>[] {
  const gridStripped = [...defaultStripped, "xs", "sm", "md", "lg", "xl"];
  return [
    {
      name: "enforces row orientation",
      props: {} as P,
      expectStyle: { flexDirection: "row" },
      strippedAttrs: gridStripped,
    },
    {
      name: "respects wrap while stripping shorthand props",
      props: { wrap: true } as P,
      expectStyle: { flexWrap: "wrap" },
      strippedAttrs: gridStripped,
    },
  ];
}

export function createBaseFlexGridColumnCases<P extends _Any>(defaultStripped: string[]): FlexCase<P>[] {
  const gridStripped = [...defaultStripped, "xs", "sm", "md", "lg", "xl"];
  return [
    {
      name: "enforces column orientation",
      props: {} as P,
      expectStyle: { flexDirection: "column" },
      strippedAttrs: gridStripped,
    },
    {
      name: "supports reverse orientation without leaking attributes",
      props: { reverse: true } as P,
      expectStyle: { flexDirection: "column-reverse" },
      strippedAttrs: gridStripped,
    },
  ];
}
