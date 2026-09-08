import "@testing-library/jest-dom";

import {
  FlexBox,
  type FlexBoxProps,
  FlexColumnBox,
  FlexGrid,
  FlexGridColumn,
  type FlexGridColumnProps,
  type FlexGridProps,
  FlexGridRow,
  type FlexGridRowProps,
  FlexRowBox,
} from "@mui-flexy/v9";

import { runRenderedTests } from "../shared/Flex.rendered.test-shared";
import {
  createBaseFlexBoxCases,
  createBaseFlexGridCases,
  createBaseFlexGridRowCases,
} from "../shared/test-cases.test-shared";
import type { FlexCase } from "../shared/test-utils.test-shared";

const expectStripped = ["row", "column", "direction", "x", "y", "reverse", "wrap"];
const knownShorthand = new Set([...expectStripped, "size", "xs", "sm", "md", "lg", "xl"]);

// v9-specific FlexBox test cases (includes direction prop and wrap variations)
const v9FlexBoxCases: FlexCase<FlexBoxProps>[] = [
  ...createBaseFlexBoxCases<FlexBoxProps>(),
  {
    name: "row orientation doesn't leak props",
    props: { row: true },
    expectStyle: { flexDirection: "row" },
  },
  {
    name: "direction prop with string value",
    props: { direction: "column" } as const,
    expectStyle: { flexDirection: "column" },
  },
  {
    name: "direction prop with row-reverse value",
    props: { direction: "row-reverse" } as const,
    expectStyle: { flexDirection: "row-reverse" },
  },
  {
    name: "direction prop with column-reverse value",
    props: { direction: "column-reverse" } as const,
    expectStyle: { flexDirection: "column-reverse" },
  },
  {
    name: "direction prop with reverse applied",
    props: { direction: "row", reverse: true } as const,
    expectStyle: { flexDirection: "row-reverse" },
  },
  {
    name: "respects wrap prop",
    props: { wrap: true },
    expectStyle: { flexWrap: "wrap" },
  },
  {
    name: "respects wrap prop with string value",
    props: { wrap: "wrap" },
    expectStyle: { flexWrap: "wrap" },
  },
  {
    name: "respects wrap prop with nowrap",
    props: { wrap: false },
    expectStyle: { flexWrap: "nowrap" },
  },
  {
    name: "respects wrap prop with wrap-reverse",
    props: { wrap: "wrap-reverse" },
    expectStyle: { flexWrap: "wrap-reverse" },
  },
];

// v9-specific FlexGrid test cases
const v9FlexGridCases: FlexCase<FlexGridProps>[] = [
  ...createBaseFlexGridCases<FlexGridProps>(expectStripped),
  {
    name: "consumes grid size object and strips legacy props",
    props: { size: { xs: 12, md: 6 } },
    expectStyle: { display: "flex" },
    strippedAttrs: [...expectStripped, "size", "xs", "sm", "md", "lg", "xl"],
  },
  {
    name: "respects wrap prop",
    props: { wrap: true },
    expectStyle: { flexWrap: "wrap" },
    strippedAttrs: [...expectStripped, "size", "xs", "sm", "md", "lg", "xl"],
  },
];

// v9-specific FlexGridRow test cases
const v9FlexGridRowCases: FlexCase<FlexGridRowProps>[] = [
  ...createBaseFlexGridRowCases<FlexGridRowProps>(expectStripped),
  {
    name: "reverses row orientation",
    props: { reverse: true },
    expectStyle: { flexDirection: "row-reverse" },
    strippedAttrs: [...expectStripped, "size", "xs", "sm", "md", "lg", "xl"],
  },
];

// v9-specific FlexGridColumn test cases
const v9FlexGridColumnCases: FlexCase<FlexGridColumnProps>[] = [
  {
    name: "enforces column orientation",
    props: {},
    expectStyle: { flexDirection: "column" },
    strippedAttrs: [...expectStripped, "size", "xs", "sm", "md", "lg", "xl"],
  },
  {
    name: "reverses column orientation",
    props: { reverse: true },
    expectStyle: { flexDirection: "column-reverse" },
    strippedAttrs: [...expectStripped, "size", "xs", "sm", "md", "lg", "xl"],
  },
];

const versionSpecificCases = {
  flexBoxCases: v9FlexBoxCases,
  flexGridCases: v9FlexGridCases,
  flexGridRowCases: v9FlexGridRowCases,
  flexGridColumnCases: v9FlexGridColumnCases,
};

runRenderedTests({
  components: {
    FlexBox,
    FlexRowBox,
    FlexColumnBox,
    FlexGrid,
    FlexGridRow,
    FlexGridColumn,
  },
  config: {
    defaultStripped: expectStripped,
    knownShorthand,
  },
  versionSpecificCases,
});
