import { BoxProps, GridProps } from "@mui/material";
import { OverrideProps } from "@mui/material/OverridableComponent";
import { BoxTypeMap } from "@mui/system";
import { ComponentType } from "react";
export type PropsWithComponent<P> = P & {
    component?: React.ElementType | undefined;
};
export type RowAlign = BoxProps["justifyContent"] | BoxProps["alignItems"] | GridProps["justifyContent"] | GridProps["alignItems"];
export type ColumnAlign = Omit<BoxProps["justifyContent"] | BoxProps["alignItems"] | GridProps["justifyContent"] | GridProps["alignItems"] | "top" | "bottom", "left" | "right">;
export type Axis = BoxProps["flexDirection"] | GridProps["direction"] | null;
export type StrictAxis = "row" | "row-reverse" | "column" | "column-reverse";
export type Align = RowAlign | ColumnAlign | null;
type FlexBaseProps = {
    x?: Align;
    y?: Align;
    row?: boolean;
    column?: boolean;
    reverse?: boolean;
    nowrap?: boolean;
};
export type FlexTypeMap<M extends BoxTypeMap = BoxTypeMap, P extends M["props"] = M["props"], D extends React.ElementType = M["defaultComponent"]> = {
    props: P & FlexBaseProps;
    defaultComponent: D | "div";
};
export type FlexProps<P extends BoxProps = BoxProps> = OverrideProps<FlexTypeMap, ComponentType<P>>;
export type FlexBoxProps = FlexProps<BoxProps>;
export type FlexGridProps = FlexProps<GridProps>;
export {};
