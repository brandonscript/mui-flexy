import type { GridBaseProps as _GridBaseProps } from "@mui/material/Grid";
import type { GridOwnProps as _GridOwnProps } from "@mui/material/Grid2";
import type { DefaultComponentProps, OverridableTypeMap, OverrideProps } from "@mui/material/OverridableComponent";
import { Theme as MaterialTheme } from "@mui/material/styles";
import type { BoxOwnProps, Breakpoint, GridBaseProps, ResponsiveStyleValue, SxProps, SystemProps } from "@mui/system";
import type { CSSProperties } from "react";
import React from "react";
type GridOwnProps = _GridOwnProps | _GridBaseProps;
export interface AsComponent<T extends OverridableTypeMap> {
    <RootComponent extends React.ElementType>(props: {
        component?: RootComponent;
    } & OverrideProps<T, RootComponent>): React.JSX.Element | null;
    (props: DefaultComponentProps<T>): React.JSX.Element | null;
}
export type FlexOrientation = "row" | "column";
export type ColumnFlexProps<D extends React.ElementType = "div"> = FlexBoxColumnProps<D>;
export type RowFlexProps<D extends React.ElementType = "div"> = FlexBoxRowProps<D>;
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
interface FlexBoxBaseProps<D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> extends BoxOwnProps<MaterialTheme> {
    sx?: SxProps<MaterialTheme>;
    component?: D;
}
export interface FlexBoxRowProps<D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> extends BoxOwnProps<MaterialTheme> {
    sx?: SxProps<MaterialTheme>;
    component?: D;
    row?: true | StrictResponsiveStyleValue<boolean>;
    column?: false | never | StrictResponsiveStyleValue<boolean>;
    reverse?: boolean;
    nowrap?: boolean;
    x?: XRowAlign | StrictResponsiveStyleValue<XRowAlign>;
    y?: YRowAlign | StrictResponsiveStyleValue<YRowAlign>;
}
export interface FlexBoxColumnProps<D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> extends BoxOwnProps<MaterialTheme> {
    sx?: SxProps<MaterialTheme>;
    component?: D;
    column?: true | StrictResponsiveStyleValue<boolean>;
    row?: false | never | StrictResponsiveStyleValue<boolean>;
    reverse?: boolean;
    nowrap?: boolean;
    x?: XColumnAlign | StrictResponsiveStyleValue<XColumnAlign>;
    y?: YColumnAlign | StrictResponsiveStyleValue<YColumnAlign>;
}
export type FlexBoxProps<O extends FlexOrientation | undefined = undefined, D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> = O extends "row" ? FlexBoxRowProps<D, P> : O extends "column" ? FlexBoxColumnProps<D, P> : FlexBoxBaseProps<D, P> & InferFlexProps;
export interface FlexBoxTypeMap<O extends FlexOrientation | undefined = undefined, P = {}, D extends React.ElementType = "div", T extends object = MaterialTheme> {
    props: P & BoxOwnProps<T> & {
        sx?: SxProps<MaterialTheme>;
    } & (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
    defaultComponent: D;
}
/**
 * @deprecated Use the FlexGrid2 (via [`Grid2`](https://mui.com/material-ui/react-grid2/)) component instead.
 */
export interface FlexGridRowProps<D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> extends GridOwnProps {
    sx?: SxProps<MaterialTheme>;
    component?: D;
    row?: true | StrictResponsiveStyleValue<boolean>;
    column?: false | never | StrictResponsiveStyleValue<boolean>;
    reverse?: boolean;
    nowrap?: boolean;
    x?: XRowAlign | StrictResponsiveStyleValue<XRowAlign>;
    y?: YRowAlign | StrictResponsiveStyleValue<YRowAlign>;
}
/**
 * @deprecated Use the FlexGrid2 (via [`Grid2`](https://mui.com/material-ui/react-grid2/)) component instead.
 */
export interface FlexGridColumnProps<D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> extends GridOwnProps {
    sx?: SxProps<MaterialTheme>;
    component?: D;
    column?: true | StrictResponsiveStyleValue<boolean>;
    row?: false | never | StrictResponsiveStyleValue<boolean>;
    reverse?: boolean;
    nowrap?: boolean;
    x?: XColumnAlign | StrictResponsiveStyleValue<XColumnAlign>;
    y?: YColumnAlign | StrictResponsiveStyleValue<YColumnAlign>;
}
/**
 * @deprecated Use the FlexGrid2 (via [`Grid2`](https://mui.com/material-ui/react-grid2/)) component instead.
 */
export type FlexGridProps<O extends FlexOrientation | undefined = undefined, D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> = O extends "row" ? FlexGridRowProps<D, P> : O extends "column" ? FlexGridColumnProps<D, P> : GridOwnProps & {
    sx?: SxProps<MaterialTheme>;
    component?: D;
} & InferFlexProps;
export interface FlexGridTypeMap<O extends FlexOrientation | undefined = undefined, P = {}, D extends React.ElementType = "div"> {
    props: P & GridOwnProps & {
        sx?: SxProps<MaterialTheme>;
    } & (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
    defaultComponent: D;
}
export interface FlexGrid2RowProps<D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> extends GridBaseProps, SystemProps<MaterialTheme> {
    sx?: SxProps<MaterialTheme>;
    component?: D;
    row?: true | StrictResponsiveStyleValue<boolean>;
    column?: false | never | StrictResponsiveStyleValue<boolean>;
    reverse?: boolean;
    nowrap?: boolean;
    x?: XRowAlign | StrictResponsiveStyleValue<XRowAlign>;
    y?: YRowAlign | StrictResponsiveStyleValue<YRowAlign>;
}
export interface FlexGrid2ColumnProps<D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> extends GridBaseProps, SystemProps<MaterialTheme> {
    sx?: SxProps<MaterialTheme>;
    component?: D;
    column?: true | StrictResponsiveStyleValue<boolean>;
    row?: false | never | StrictResponsiveStyleValue<boolean>;
    reverse?: boolean;
    nowrap?: boolean;
    x?: XColumnAlign | StrictResponsiveStyleValue<XColumnAlign>;
    y?: YColumnAlign | StrictResponsiveStyleValue<YColumnAlign>;
}
export type FlexGrid2Props<O extends FlexOrientation | undefined = undefined, D extends React.ElementType = "div", P = {
    component?: React.ElementType;
}> = O extends "row" ? FlexGrid2RowProps<D, P> : O extends "column" ? FlexGrid2ColumnProps<D, P> : GridBaseProps & SystemProps<MaterialTheme> & {
    sx?: SxProps<MaterialTheme>;
    component?: D;
} & InferFlexProps;
export interface FlexGrid2TypeMap<O extends FlexOrientation | undefined = undefined, P = {}, D extends React.ElementType = "div"> {
    props: P & GridBaseProps & {
        sx?: SxProps<MaterialTheme>;
    } & SystemProps<MaterialTheme> & (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
    defaultComponent: D;
}
export {};
