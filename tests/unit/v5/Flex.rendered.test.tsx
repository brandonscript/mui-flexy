import "@testing-library/jest-dom";

import {
  FlexBox,
  FlexColumnBox,
  FlexGrid,
  FlexGridColumn,
  type FlexGridProps,
  FlexGridRow,
  FlexRowBox,
} from "@mui-flexy/v5";

import { runRenderedTests } from "../shared/Flex.rendered.test-shared";
import { createBaseFlexGridCases, type VersionSpecificCases } from "../shared/test-cases.test-shared";
import type { FlexCase } from "../shared/test-utils.test-shared";

const defaultStripped = ["row", "column", "x", "y", "reverse", "wrap"];
const knownShorthand = new Set([...defaultStripped, "xs", "sm", "md", "lg", "xl"]);

// Version-specific test cases
const v5FlexGridCases: FlexCase<FlexGridProps>[] = [
  ...createBaseFlexGridCases<FlexGridProps>(defaultStripped),
  {
    name: "consumes grid legacy size props without leaking attrs",
    props: { item: true, xs: 12, md: 6 },
    expectStyle: { display: "flex" },
    strippedAttrs: [...defaultStripped, "xs", "sm", "md", "lg", "xl"],
  },
];

const versionSpecificCases: VersionSpecificCases<FlexGridProps> = {
  flexGridCases: v5FlexGridCases,
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
    defaultStripped,
    knownShorthand,
  },
  versionSpecificCases,
});
