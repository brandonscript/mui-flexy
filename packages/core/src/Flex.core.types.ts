import type { Breakpoint } from "@mui/system";
import type { CSSProperties } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export type FlexOrientation = "row" | "column";

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

type FlexCommonProps = {
  reverse?: boolean;
  nowrap?: boolean;
};

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
export type FlexRowProps = FlexCommonProps & {
  row?: true;
  column?: false | never;
  x?: XRowAlign | StrictResponsiveStyleValue<XRowAlign>;
  y?: YRowAlign | StrictResponsiveStyleValue<YRowAlign>;
};

// column === true
export type FlexColumnProps = FlexCommonProps & {
  column: true;
  row?: false | never;
  x?: XColumnAlign | StrictResponsiveStyleValue<XColumnAlign>;
  y?: YColumnAlign | StrictResponsiveStyleValue<YColumnAlign>;
};

// row is responsive, column is unknown
type RowIsResponsive = FlexCommonProps & {
  row: StrictResponsiveStyleValue<boolean>;
  column?: boolean | never | StrictResponsiveStyleValue<boolean>;
  x?: XRowAlign | XColumnAlign | ResponsiveAlign;
  y?: YColumnAlign | YRowAlign | ResponsiveAlign;
};

// column is responsive, row is unknown
type ColumnIsResponsive = FlexCommonProps & {
  column: StrictResponsiveStyleValue<boolean>;
  row?: boolean | never | StrictResponsiveStyleValue<boolean>;
  x?: XRowAlign | XColumnAlign | ResponsiveAlign;
  y?: YColumnAlign | YRowAlign | ResponsiveAlign;
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

// Legacy aliases for backward compatibility
export type LegacyGridSizeProps = V5GridSizeProps;
export type GridSizeProp = V7GridSizeProps;

export type StrictGrid2Props<P = {}> = Omit<P, "item" | "zeroMinWidth" | "xs" | "sm" | "md" | "lg" | "xl"> & {
  item?: never;
  zeroMinWidth?: never;
  xs?: never;
  sm?: never;
  md?: never;
  lg?: never;
  xl?: never;
};

export type BaseFlexProps<T extends _Any = _Any> = {
  row?: ResponsiveStyleValue<boolean> | null | undefined;
  column?: ResponsiveStyleValue<boolean> | null | undefined;
  reverse?: ResponsiveStyleValue<boolean> | null | undefined;
  nowrap?: ResponsiveStyleValue<boolean> | null | undefined;
  x?: XRowAlign | XColumnAlign | ResponsiveAlign;
  y?: YRowAlign | YColumnAlign | ResponsiveAlign;
  whiteSpace?:
    | readonly string[]
    | ResponsiveStyleValue<CSSProperties["whiteSpace"] | readonly string[] | undefined>
    | ((theme: T) => ResponsiveStyleValue<CSSProperties["whiteSpace"] | readonly string[] | undefined>);
  flexDirection?:
    | readonly string[]
    | ResponsiveStyleValue<CSSProperties["flexDirection"] | readonly string[] | undefined>
    | ((theme: T) => ResponsiveStyleValue<CSSProperties["flexDirection"] | readonly string[] | undefined>);
  display?:
    | readonly string[]
    | ResponsiveStyleValue<CSSProperties["display"] | readonly string[] | undefined>
    | ((theme: T) => ResponsiveStyleValue<CSSProperties["display"] | readonly string[] | undefined>);
  className?: string | ((theme: T) => string);
} & (V5GridSizeProps | V6GridSizeProps | V7GridSizeProps);

export type InferFlexProps = FlexColumnProps | ColumnIsResponsive | FlexRowProps | RowIsResponsive;

// restricts the props to only row
export type OnlyRow<T> = Omit<T, "row" | "column"> & {
  row?: true | StrictResponsiveStyleValue<boolean>;
  column?: false | never | StrictResponsiveStyleValue<boolean>;
};

// restricts the props to only column
export type OnlyColumn<T> = Omit<T, "row" | "column"> & {
  column?: true | StrictResponsiveStyleValue<boolean>;
  row?: false | never | StrictResponsiveStyleValue<boolean>;
};
