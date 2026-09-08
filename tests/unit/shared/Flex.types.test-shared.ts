import type { BaseFlexProps } from "@mui-flexy/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

// Shared props objects - typed to extend BaseFlexProps but include CSS properties
// These can be used with version-specific FlexBoxProps/FlexGridProps types
export const test_standardCssProps = {
  alignItems: "center",
  flexDirection: "row",
  row: true,
  justifyContent: "center",
  flexWrap: "nowrap",
  gap: 2,
  sx: {
    border: "1px solid black",
    borderRadius: 1,
    bgcolor: "background.paper",
    p: 2,
  },
} satisfies BaseFlexProps & Record<string, _Any>;

export const test_responsiveStyleProps = {
  alignItems: ["center", "flex-start"],
  row: true,
  justifyContent: { xs: "center", sm: "flex-start" },
  flexWrap: "nowrap",
  gap: 2,
  sx: {
    border: "1px solid black",
    borderRadius: 1,
    bgcolor: "background.paper",
    p: 2,
  },
} satisfies BaseFlexProps & Record<string, _Any>;

export const test_wrapTrueProps = {
  wrap: true,
} satisfies BaseFlexProps;

export const test_wrapFalseProps = {
  wrap: false,
} satisfies BaseFlexProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type TypesTestConfig<TFlexGridProps extends _Any = _Any> = {
  createFlexGridProps?: (base: _Any) => _Any;
};

export function runCommonTypesTests<TFlexGridProps extends _Any = _Any>(config: TypesTestConfig<TFlexGridProps>) {
  const { createFlexGridProps } = config;

  it("should support FlexBoxProps and FlexGridProps along with standard CSS props", () => {
    const flexBoxProps = test_standardCssProps;
    const flexGridProps = createFlexGridProps
      ? createFlexGridProps(test_standardCssProps)
      : ({
          ...test_standardCssProps,
          item: true,
          zeroMinWidth: true,
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
          xl: 2,
        } as TFlexGridProps);

    expect(flexBoxProps).toBeDefined();
    expect(flexGridProps).toBeDefined();
  });

  it("should support responsive style props", () => {
    const flexBoxProps = test_responsiveStyleProps;
    const flexGridProps = createFlexGridProps
      ? createFlexGridProps(test_responsiveStyleProps)
      : ({
          ...test_responsiveStyleProps,
          flexDirection: "row",
          justifyContent: "center",
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
          xl: 2,
        } as TFlexGridProps);

    expect(flexBoxProps).toBeDefined();
    expect(flexGridProps).toBeDefined();
  });

  it("should support wrap prop", () => {
    const flexBoxWrapTrueProps = test_wrapTrueProps;
    const flexBoxWrapFalseProps = test_wrapFalseProps;
    const flexGridWrapTrueProps = test_wrapTrueProps as TFlexGridProps;
    const flexGridWrapFalseProps = test_wrapFalseProps as TFlexGridProps;

    expect(flexBoxWrapTrueProps).toBeDefined();
    expect(flexBoxWrapFalseProps).toBeDefined();
    expect(flexGridWrapTrueProps).toBeDefined();
    expect(flexGridWrapFalseProps).toBeDefined();
  });
}
