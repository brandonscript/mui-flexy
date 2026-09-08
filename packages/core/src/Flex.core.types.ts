import type { Breakpoint, SxProps, Theme } from "@mui/system";
import type { CSSProperties } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export type FlexOrientation = "row" | "column" | "agnostic";

// Orientation-specific alignment properties
type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "initial"
  | "inherit"
  | "unset";

type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline" | "initial" | "inherit" | "unset";

export type HorizontalAlign = "left" | "right" | "center";
export type VerticalAlign = "top" | "bottom" | "center";

export type XRowAlign = HorizontalAlign | JustifyContent;
export type YRowAlign = VerticalAlign | AlignItems;
export type XColumnAlign = HorizontalAlign | AlignItems;
export type YColumnAlign = VerticalAlign | JustifyContent;

// Responsive types using MUI Breakpoint (stable across versions)
export type ResponsiveArray<T> = (T | null | undefined)[] | readonly (T | null | undefined)[];
export type ResponsiveObject<T> = Partial<{ [key in Breakpoint]: T | null }>;
export type StrictResponsiveStyleValue<T> = ResponsiveArray<T> | ResponsiveObject<T>;

// Generic ResponsiveStyleValue type - each version will provide their own implementation
export type ResponsiveStyleValue<T> = T | ResponsiveArray<T> | ResponsiveObject<T>;

// Base alignment types
export type ResponsiveAlign = StrictResponsiveStyleValue<XRowAlign | XColumnAlign | YRowAlign | YColumnAlign>;

// Stable responsive types that work across all MUI versions
export type ResponsiveFlexDirection = ResponsiveStyleValue<CSSProperties["flexDirection"]>;
export type ResponsiveFlexBoolean = ResponsiveStyleValue<boolean | null | undefined>;
export type ResponsiveFlexPosition = ResponsiveStyleValue<
  XRowAlign | YRowAlign | XColumnAlign | YColumnAlign | null | undefined
>;

// row === true
export type FlexRowProps = {
  row?: true | undefined;
  column?: false | never;
  x?: XRowAlign | StrictResponsiveStyleValue<XRowAlign>;
  y?: YRowAlign | StrictResponsiveStyleValue<YRowAlign>;
  direction?: ResponsiveFlexDirection;
  reverse?: ResponsiveFlexBoolean;
  wrap?: ResponsiveFlexWrap;
};

// column === true
export type FlexColumnProps = {
  column: true;
  row?: false | never;
  x?: XColumnAlign | StrictResponsiveStyleValue<XColumnAlign>;
  y?: YColumnAlign | StrictResponsiveStyleValue<YColumnAlign>;
  direction?: ResponsiveFlexDirection;
  reverse?: ResponsiveFlexBoolean;
  wrap?: ResponsiveFlexWrap;
};

// MUI v5 - only supports root xs, sm, md, lg, xl props
export type V5GridSizeProps = {
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
};

// MUI v6 - supports size=true or size={{ xs, sm, etc. }}
export type V6GridSizeProps = {
  size?:
    | true
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      };
};

// MUI v7 - supports size="grow" or size={{ xs, sm, etc. }}
export type V7GridSizeProps = {
  size?:
    | "grow"
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      };
};

// MUI v9 - same Grid size API as v7 (v8 was skipped by MUI)
export type V9GridSizeProps = V7GridSizeProps;

// Legacy aliases for backward compatibility
export type LegacyGridSizeProps = V5GridSizeProps;
export type GridSizeProp = V7GridSizeProps;

export type StrictGrid2Props = {
  item?: never;
  zeroMinWidth?: never;
  xs?: never;
  sm?: never;
  md?: never;
  lg?: never;
  xl?: never;
};

export type FlexWrapValue = "wrap" | "nowrap" | "wrap-reverse";
export type ResponsiveFlexWrap = ResponsiveStyleValue<FlexWrapValue | boolean>;

export type BaseFlexProps<T extends _Any = _Any> = {
  row?: ResponsiveFlexBoolean;
  column?: ResponsiveFlexBoolean;
  reverse?: ResponsiveFlexBoolean;
  wrap?: ResponsiveFlexWrap;
  x?: XRowAlign | XColumnAlign | ResponsiveAlign;
  y?: YRowAlign | YColumnAlign | ResponsiveAlign;
  flexDirection?:
    | readonly string[]
    | ResponsiveStyleValue<CSSProperties["flexDirection"] | readonly string[] | undefined>
    | ((theme: T) => ResponsiveStyleValue<CSSProperties["flexDirection"] | readonly string[] | undefined>);
  direction?:
    | readonly string[]
    | ResponsiveStyleValue<CSSProperties["flexDirection"] | readonly string[] | undefined>
    | ((theme: T) => ResponsiveStyleValue<CSSProperties["flexDirection"] | readonly string[] | undefined>);
  display?:
    | readonly string[]
    | ResponsiveStyleValue<CSSProperties["display"] | readonly string[] | undefined>
    | ((theme: T) => ResponsiveStyleValue<CSSProperties["display"] | readonly string[] | undefined>);
  className?: string | ((theme: T) => string);
  agnostic?: boolean | undefined;
} & (V5GridSizeProps | V6GridSizeProps | V7GridSizeProps | V9GridSizeProps);

/**
 * When working with unknown or computed props, use the agnostic mode to turn off strict typing.
 */
export type AgnosticFlexProps = {
  agnostic: true;
} & BaseFlexProps;

export type InferFlexProps = (
  | {
      agnostic: true;
      row?: BaseFlexProps["row"];
      column?: BaseFlexProps["column"];
      x?: BaseFlexProps["x"];
      y?: BaseFlexProps["y"];
    }
  | {
      row?: true | undefined;
      column?: false | never | StrictResponsiveStyleValue<boolean>;
      x?: XRowAlign | StrictResponsiveStyleValue<XRowAlign>;
      y?: YRowAlign | StrictResponsiveStyleValue<YRowAlign>;
    }
  | {
      row?: false | never | StrictResponsiveStyleValue<boolean>;
      column: true;
      x?: XColumnAlign | StrictResponsiveStyleValue<XColumnAlign>;
      y?: YColumnAlign | StrictResponsiveStyleValue<YColumnAlign>;
    }
  | {
      row: StrictResponsiveStyleValue<boolean>;
      column?: boolean | never | ResponsiveStyleValue<boolean>;
      x?: XRowAlign | XColumnAlign | ResponsiveAlign;
      y?: YColumnAlign | YRowAlign | ResponsiveAlign;
    }
  | {
      column: StrictResponsiveStyleValue<boolean>;
      row?: boolean | never | ResponsiveStyleValue<boolean>;
      x?: XRowAlign | XColumnAlign | ResponsiveAlign;
      y?: YColumnAlign | YRowAlign | ResponsiveAlign;
    }
) & {
  reverse?: ResponsiveFlexBoolean;
  wrap?: ResponsiveFlexWrap;
  direction?: BaseFlexProps["direction"];
  flexDirection?: BaseFlexProps["flexDirection"];
  display?: BaseFlexProps["display"];
  className?: BaseFlexProps["className"];
};

// restricts the props to only row
export type OnlyRow<T> = Omit<T, "row" | "column" | "agnostic"> & {
  row?: true | StrictResponsiveStyleValue<boolean>;
  column?: false | never | StrictResponsiveStyleValue<boolean>;
};

// restricts the props to only column
export type OnlyColumn<T> = Omit<T, "row" | "column" | "agnostic"> & {
  column?: true | StrictResponsiveStyleValue<boolean>;
  row?: false | never | StrictResponsiveStyleValue<boolean>;
};

export type TypeMapLike<P = {}, D extends React.ElementType = "div"> = {
  props: P &
    React.CSSProperties & {
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
};

export type AnyMuiComponentProps = React.CSSProperties & {
  sx?: SxProps<Theme>;
  className?: string;
  ref?: React.Ref<unknown>;
};
