import type { ComponentType } from "react";

import {
  createBaseFlexBoxCases,
  createBaseFlexColumnBoxCases,
  createBaseFlexGridCases,
  createBaseFlexGridColumnCases,
  createBaseFlexGridRowCases,
  createBaseFlexRowBoxCases,
} from "./test-cases.test-shared";
import type { FlexCase, VersionConfig } from "./test-utils.test-shared";
import { renderAndVerify } from "./test-utils.test-shared";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export type RenderedTestComponents = {
  FlexBox: ComponentType<_Any>;
  FlexRowBox: ComponentType<_Any>;
  FlexColumnBox: ComponentType<_Any>;
  FlexGrid: ComponentType<_Any>;
  FlexGridRow: ComponentType<_Any>;
  FlexGridColumn: ComponentType<_Any>;
};

export type RenderedTestConfig = {
  components: RenderedTestComponents;
  config: VersionConfig;
  versionSpecificCases?: {
    flexBoxCases?: FlexCase<_Any>[];
    flexRowBoxCases?: FlexCase<_Any>[];
    flexColumnBoxCases?: FlexCase<_Any>[];
    flexGridCases?: FlexCase<_Any>[];
    flexGridRowCases?: FlexCase<_Any>[];
    flexGridColumnCases?: FlexCase<_Any>[];
  };
};

export function runRenderedTests(testConfig: RenderedTestConfig) {
  const { components, config, versionSpecificCases } = testConfig;
  const { FlexBox, FlexRowBox, FlexColumnBox, FlexGrid, FlexGridRow, FlexGridColumn } = components;

  // FlexBox tests
  const flexBoxCases = versionSpecificCases?.flexBoxCases ?? createBaseFlexBoxCases<_Any>();
  describe("FlexBox rendered output", () => {
    flexBoxCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
      it(name, () => {
        renderAndVerify(FlexBox, props, config, expectStyle, strippedAttrs);
      });
    });
  });

  // FlexRowBox tests
  const flexRowBoxCases = versionSpecificCases?.flexRowBoxCases ?? createBaseFlexRowBoxCases<_Any>();
  describe("FlexRowBox rendered output", () => {
    flexRowBoxCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
      it(name, () => {
        renderAndVerify(FlexRowBox, props, config, expectStyle, strippedAttrs);
      });
    });
  });

  // FlexColumnBox tests
  const flexColumnBoxCases = versionSpecificCases?.flexColumnBoxCases ?? createBaseFlexColumnBoxCases<_Any>();
  describe("FlexColumnBox rendered output", () => {
    flexColumnBoxCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
      it(name, () => {
        renderAndVerify(FlexColumnBox, props, config, expectStyle, strippedAttrs);
      });
    });
  });

  // FlexGrid tests
  const flexGridCases = versionSpecificCases?.flexGridCases ?? createBaseFlexGridCases<_Any>(config.defaultStripped);
  describe("FlexGrid rendered output", () => {
    flexGridCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
      it(name, () => {
        renderAndVerify(FlexGrid, props, config, expectStyle, strippedAttrs);
      });
    });
  });

  // FlexGridRow tests
  const flexGridRowCases =
    versionSpecificCases?.flexGridRowCases ?? createBaseFlexGridRowCases<_Any>(config.defaultStripped);
  describe("FlexGridRow rendered output", () => {
    flexGridRowCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
      it(name, () => {
        renderAndVerify(FlexGridRow, props, config, expectStyle, strippedAttrs);
      });
    });
  });

  // FlexGridColumn tests
  const flexGridColumnCases =
    versionSpecificCases?.flexGridColumnCases ?? createBaseFlexGridColumnCases<_Any>(config.defaultStripped);
  describe("FlexGridColumn rendered output", () => {
    flexGridColumnCases.forEach(({ name, props, expectStyle, strippedAttrs }) => {
      it(name, () => {
        renderAndVerify(FlexGridColumn, props, config, expectStyle, strippedAttrs);
      });
    });
  });
}
