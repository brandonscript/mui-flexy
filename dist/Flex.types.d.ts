import type { GridOwnProps } from "@mui/material/Grid";
import type { DefaultComponentProps, OverridableTypeMap, OverrideProps } from "@mui/material/OverridableComponent";
import { Theme as MaterialTheme } from "@mui/material/styles";
import type { BoxOwnProps, Breakpoint, GridBaseProps, ResponsiveStyleValue, SxProps, SystemProps } from "@mui/system";
import type { CSSProperties } from "react";
import React from "react";
export interface AsComponent<T extends OverridableTypeMap> {
    <RootComponent extends React.ElementType>(props: {
        component?: RootComponent;
    } & OverrideProps<T, RootComponent>): React.JSX.Element | null;
    (props: DefaultComponentProps<T>): React.JSX.Element | null;
}
export type FlexOrientation = "row" | "column";
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "initial" | "inherit" | "unset";
type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline" | "initial" | "inherit" | "unset";
export type HorizontalAlign = "left" | "right" | "center";
export type VerticalAlign = "top" | "bottom" | "center";
type XRowAlign = HorizontalAlign | JustifyContent;
type YRowAlign = VerticalAlign | AlignItems;
type XColumnAlign = HorizontalAlign | AlignItems;
type YColumnAlign = VerticalAlign | JustifyContent;
type ResponsiveArray<T> = T[];
type ResponsiveObject<T> = Partial<{
    [key in Breakpoint]: T | null;
}>;
type StrictResponsiveStyleValue<T> = ResponsiveArray<T> | ResponsiveObject<T>;
type FlexCommonProps = {
    reverse?: boolean;
    nowrap?: boolean;
};
export type ResponsiveFlexPosition = ResponsiveStyleValue<XRowAlign | YRowAlign | XColumnAlign | YColumnAlign | null | undefined>;
export type ResponsiveFlexDirection = ResponsiveStyleValue<CSSProperties["flexDirection"]>;
export type ResponsiveFlexBoolean = ResponsiveStyleValue<boolean | null | undefined>;
type ResponsiveAlign = StrictResponsiveStyleValue<XRowAlign | XColumnAlign | YRowAlign | YColumnAlign>;
export type FlexRowProps = FlexCommonProps & {
    row?: true;
    column?: false | never;
    x?: XRowAlign | StrictResponsiveStyleValue<XRowAlign>;
    y?: YRowAlign | StrictResponsiveStyleValue<YRowAlign>;
};
export type FlexColumnProps = FlexCommonProps & {
    column: true;
    row?: false | never;
    x?: XColumnAlign | StrictResponsiveStyleValue<XColumnAlign>;
    y?: YColumnAlign | StrictResponsiveStyleValue<YColumnAlign>;
};
type RowIsResponsive = FlexCommonProps & {
    row: StrictResponsiveStyleValue<boolean>;
    column?: boolean | never | StrictResponsiveStyleValue<boolean>;
    x?: XRowAlign | XColumnAlign | ResponsiveAlign;
    y?: YColumnAlign | YRowAlign | ResponsiveAlign;
};
type ColumnIsResponsive = FlexCommonProps & {
    column: StrictResponsiveStyleValue<boolean>;
    row?: boolean | never | StrictResponsiveStyleValue<boolean>;
    x?: XRowAlign | XColumnAlign | ResponsiveAlign;
    y?: YColumnAlign | YRowAlign | ResponsiveAlign;
};
export type InferFlexProps = FlexColumnProps | ColumnIsResponsive | FlexRowProps | RowIsResponsive;
type OnlyRow<T> = Omit<T, "row" | "column"> & {
    row?: true | StrictResponsiveStyleValue<boolean>;
    column?: false | never | StrictResponsiveStyleValue<boolean>;
};
type OnlyColumn<T> = Omit<T, "row" | "column"> & {
    column?: true | StrictResponsiveStyleValue<boolean>;
    row?: false | never | StrictResponsiveStyleValue<boolean>;
};
export interface FlexBoxTypeMap<O extends FlexOrientation | undefined = undefined, P = {}, D extends React.ElementType = "div", T extends object = MaterialTheme> {
    props: P & BoxOwnProps<T> & {
        sx?: SxProps<MaterialTheme>;
    } & (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
    defaultComponent: D;
}
export type FlexBoxProps<O extends FlexOrientation | undefined = undefined, D extends React.ElementType = FlexBoxTypeMap<O>["defaultComponent"], P = {
    component?: React.ElementType;
}> = OverrideProps<FlexBoxTypeMap<O, P, D, MaterialTheme>, D>;
export type FlexBoxRowProps<D extends React.ElementType = FlexBoxTypeMap<"row">["defaultComponent"], P = {
    component?: React.ElementType;
}> = OnlyRow<FlexBoxProps<"row", D, P>>;
export type FlexBoxColumnProps<D extends React.ElementType = FlexBoxTypeMap<"column">["defaultComponent"], P = {
    component?: React.ElementType;
}> = OnlyColumn<FlexBoxProps<"column", D, P>>;
/**
 * @deprecated Use the FlexGrid2 (via [`Grid2`](https://mui.com/material-ui/react-grid2/)) component instead.
 */
export interface FlexGridTypeMap<O extends FlexOrientation | undefined = undefined, P = {}, D extends React.ElementType = "div"> {
    props: P & GridOwnProps & {
        sx?: SxProps<MaterialTheme>;
    } & (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
    defaultComponent: D;
}
export type FlexGridProps<O extends FlexOrientation | undefined = undefined, D extends React.ElementType = FlexGridTypeMap<O>["defaultComponent"], P = {
    component?: React.ElementType;
}> = OverrideProps<FlexGridTypeMap<O, P, D>, D>;
export type FlexGridRowProps<D extends React.ElementType = FlexGridTypeMap<"row">["defaultComponent"], P = {
    component?: React.ElementType;
}> = OnlyRow<FlexGridProps<"row", D, P>>;
export type FlexGridColumnProps<D extends React.ElementType = FlexGridTypeMap<"column">["defaultComponent"], P = {
    component?: React.ElementType;
}> = OnlyColumn<FlexGridProps<"column", D, P>>;
export interface FlexGrid2TypeMap<O extends FlexOrientation | undefined = undefined, P = {}, D extends React.ElementType = "div"> {
    props: P & GridBaseProps & {
        sx?: SxProps<MaterialTheme>;
    } & SystemProps<MaterialTheme> & (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
    defaultComponent: D;
}
export type FlexGrid2Props<O extends FlexOrientation | undefined = undefined, D extends React.ElementType = FlexGrid2TypeMap<O>["defaultComponent"], P = {
    component?: React.ElementType;
}> = OverrideProps<FlexGrid2TypeMap<O, P, D>, D>;
export type FlexGrid2RowProps<D extends React.ElementType = FlexGrid2TypeMap<"row">["defaultComponent"], P = {
    component?: React.ElementType;
}> = OnlyRow<FlexGrid2Props<"row", D, P>>;
export type FlexGrid2ColumnProps<D extends React.ElementType = FlexGrid2TypeMap<"column">["defaultComponent"], P = {
    component?: React.ElementType;
}> = OnlyColumn<FlexGrid2Props<"column", D, P>>;
export {};
