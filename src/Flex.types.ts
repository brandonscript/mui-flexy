import type { Grid2TypeMap } from "@mui/material";
import type { GridTypeMap } from "@mui/material/Grid";
import type { OverrideProps } from "@mui/material/OverridableComponent";
import type { BoxTypeMap, Breakpoint, ResponsiveStyleValue, Theme as SystemTheme } from "@mui/system";
import type { CSSProperties } from "react";
import React from "react";

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

type XRowAlign = HorizontalAlign | JustifyContent;
type YRowAlign = VerticalAlign | AlignItems;
type XColumnAlign = HorizontalAlign | AlignItems;
type YColumnAlign = VerticalAlign | JustifyContent;

type ResponsiveArray<T> = T[];
type ResponsiveObject<T> = Partial<{ [key in Breakpoint]: T | null }>;
type StrictResponsiveStyleValue<T> = ResponsiveArray<T> | ResponsiveObject<T>;

type FlexPropsBase = {
  reverse?: boolean;
  nowrap?: boolean;
};

type FlexRowProps = FlexPropsBase & {
  x?: XRowAlign | StrictResponsiveStyleValue<XRowAlign>;
  y?: YRowAlign | StrictResponsiveStyleValue<YRowAlign>;
};

type FlexColumnProps = FlexPropsBase & {
  x?: XColumnAlign | StrictResponsiveStyleValue<XColumnAlign>;
  y?: YColumnAlign | StrictResponsiveStyleValue<YColumnAlign>;
};

export type ResponsiveFlexPosition = ResponsiveStyleValue<
  XRowAlign | YRowAlign | XColumnAlign | YColumnAlign | null | undefined
>;
export type ResponsiveFlexDirection = ResponsiveStyleValue<CSSProperties["flexDirection"]>;
export type ResponsiveFlexBoolean = ResponsiveStyleValue<boolean | null | undefined>;

/* Box */

type InferFlexProps<
  Orientation extends FlexOrientation | undefined = undefined,
  R = FlexRowProps,
  C = FlexColumnProps,
> = Orientation extends "row"
  ? { row?: true; column?: false | never } & R
  : Orientation extends "column"
    ? { column: true; row?: false | never } & C
    :
        | ({ row: true; column?: false | never } & R)
        | ({ column: true; row?: false | never } & C)
        | ({ row: false; column?: true } & C)
        | ({ column: false; row?: true } & R)
        | ({ row?: undefined; column?: undefined } & R)
        | ({
            row: StrictResponsiveStyleValue<boolean>;
            column?: false | never | StrictResponsiveStyleValue<boolean>;
          } & R)
        | ({
            column: StrictResponsiveStyleValue<boolean>;
            row?: false | never | StrictResponsiveStyleValue<boolean>;
          } & C);

type OnlyRow<T> = Omit<T, "row" | "column"> & {
  row: true | undefined;
  column?: false | never;
};
type OnlyColumn<T> = Omit<T, "row" | "column"> & {
  column: true | undefined;
  row?: false | never;
};

export type FlexBoxTypeMap<
  Orientation extends FlexOrientation | undefined = undefined,
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
  Theme extends object = SystemTheme,
> = BoxTypeMap<AdditionalProps & InferFlexProps<Orientation>, RootComponent, Theme>;

export type FlexBoxProps<
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = BoxTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<FlexBoxTypeMap<Orientation, AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export type FlexBoxRowProps<
  RootComponent extends React.ElementType = FlexBoxTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<OnlyRow<FlexBoxTypeMap<"row", AdditionalProps, RootComponent>>, RootComponent> & {
  component?: React.ElementType;
};

export type FlexBoxColumnProps<
  RootComponent extends React.ElementType = FlexBoxTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<OnlyColumn<FlexBoxTypeMap<"column", AdditionalProps, RootComponent>>, RootComponent> & {
  component?: React.ElementType;
};

/* Grid */

export type FlexGridTypeMap<
  Orientation extends FlexOrientation | undefined = undefined,
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> = GridTypeMap<AdditionalProps & InferFlexProps<Orientation>, RootComponent>;

export type FlexGridProps<
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = FlexGridTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<FlexGridTypeMap<Orientation, AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export type FlexGridRowProps<
  RootComponent extends React.ElementType = FlexGridTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<OnlyRow<FlexGridTypeMap<"row", AdditionalProps, RootComponent>>, RootComponent> & {
  component?: React.ElementType;
};

export type FlexGridColumnProps<
  RootComponent extends React.ElementType = FlexGridTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<OnlyColumn<FlexGridTypeMap<"column", AdditionalProps, RootComponent>>, RootComponent> & {
  component?: React.ElementType;
};

/* Grid2 */

export type FlexGrid2TypeMap<
  Orientation extends FlexOrientation | undefined = undefined,
  AdditionalProps = {
    component?: React.ElementType;
  },
  RootComponent extends React.ElementType = "div",
> = Grid2TypeMap<AdditionalProps & InferFlexProps<Orientation>, RootComponent>;

export type FlexGrid2Props<
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = FlexGrid2TypeMap["defaultComponent"],
  AdditionalProps = {
    component?: React.ElementType;
  },
> = OverrideProps<FlexGrid2TypeMap<Orientation, AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export type FlexGrid2RowProps<
  RootComponent extends React.ElementType = FlexGrid2TypeMap["defaultComponent"],
  AdditionalProps = {
    component?: React.ElementType;
  },
> = OverrideProps<OnlyRow<FlexGrid2TypeMap<"row", AdditionalProps, RootComponent>>, RootComponent> & {
  component?: React.ElementType;
};

export type FlexGrid2ColumnProps<
  RootComponent extends React.ElementType = FlexGrid2TypeMap["defaultComponent"],
  AdditionalProps = {
    component?: React.ElementType;
  },
> = OverrideProps<OnlyColumn<FlexGrid2TypeMap<"column", AdditionalProps, RootComponent>>, RootComponent> & {
  component?: React.ElementType;
};
