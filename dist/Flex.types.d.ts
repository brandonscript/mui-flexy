import type { GridOwnProps } from "@mui/material/Grid";
import type { OverridableComponent, OverrideProps } from "@mui/material/OverridableComponent";
import type { BoxOwnProps, BoxTypeMap, ResponsiveStyleValue, Theme as SystemTheme } from "@mui/system";
import type { CSSProperties } from "react";
export type FlexOrientation = "row" | "column";
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "initial" | "inherit" | "unset";
type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline" | "initial" | "inherit" | "unset";
type HorizontalAlignable = "left" | "right" | "center";
type VerticalAlignable = "top" | "bottom" | "center";
type XRowProps = HorizontalAlignable | JustifyContent;
type YRowProps = VerticalAlignable | AlignItems;
type XColumnProps = HorizontalAlignable | AlignItems;
type YColumnProps = VerticalAlignable | JustifyContent;
type FlexRowType = {
    row?: true | undefined;
    column?: false | undefined;
    x?: XRowProps;
    y?: YRowProps;
    reverse?: boolean;
    nowrap?: boolean;
};
type FlexColumnType = {
    row?: false;
    column: true;
    x?: XColumnProps;
    y?: YColumnProps;
    reverse?: boolean;
    nowrap?: boolean;
};
type FlexProps<Orientation extends FlexOrientation | undefined = undefined> = Orientation extends "row" ? FlexRowType : Orientation extends "column" ? FlexColumnType : FlexRowType | FlexColumnType;
export type ResponsiveFlexPosition = ResponsiveStyleValue<XRowProps | YRowProps | XColumnProps | YColumnProps | null | undefined>;
export type ResponsiveFlexDirection = ResponsiveStyleValue<CSSProperties["flexDirection"]>;
export interface FlexBoxTypeMap<Orientation extends FlexOrientation | undefined = undefined, AdditionalProps = {}, RootComponent extends React.ElementType = "div", Theme extends object = SystemTheme> {
    props: AdditionalProps & FlexProps<Orientation> & BoxOwnProps<Theme>;
    defaultComponent: RootComponent;
}
export type FlexBoxProps<Orientation extends FlexOrientation | undefined = undefined, RootComponent extends React.ElementType = BoxTypeMap["defaultComponent"], AdditionalProps = {}> = OverrideProps<FlexBoxTypeMap<Orientation, AdditionalProps & FlexProps<Orientation>, RootComponent>, RootComponent> & {
    component?: React.ElementType;
};
declare const FlexBox: OverridableComponent<FlexBoxTypeMap>;
export { FlexBox };
export type FlexBoxComponent<Orientation extends FlexOrientation | undefined = undefined, RootComponent extends React.ElementType = "div", AdditionalProps = {}, Theme extends object = SystemTheme> = OverridableComponent<FlexBoxTypeMap<Orientation, AdditionalProps, RootComponent, Theme>>;
export interface FlexGridTypeMap<Orientation extends FlexOrientation | undefined = undefined, AdditionalProps = {}, RootComponent extends React.ElementType = "div"> {
    props: AdditionalProps & FlexProps<Orientation> & GridOwnProps;
    defaultComponent: RootComponent;
}
export type FlexGridProps<Orientation extends FlexOrientation | undefined = undefined, RootComponent extends React.ElementType = FlexGridTypeMap["defaultComponent"], AdditionalProps = {}> = OverrideProps<FlexGridTypeMap<Orientation, AdditionalProps & FlexProps<Orientation>, RootComponent>, RootComponent> & {
    component?: React.ElementType;
};
declare const FlexGrid: OverridableComponent<FlexGridTypeMap>;
export { FlexGrid };
export type FlexGridComponent<Orientation extends FlexOrientation | undefined = undefined, RootComponent extends React.ElementType = "div", AdditionalProps = {}> = OverridableComponent<FlexGridTypeMap<Orientation, AdditionalProps, RootComponent>>;
