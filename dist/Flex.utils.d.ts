import { CSSProperties } from "react";
import { FlexBoxProps, type FlexGrid2Props, FlexGridProps, type ResponsiveFlexBoolean, ResponsiveFlexDirection, ResponsiveFlexPosition } from "./Flex.types";
type _Any = any;
type CSSFlexDirection = CSSProperties["flexDirection"];
export declare const mapFlexProps: <P extends FlexBoxProps | FlexGridProps | FlexGrid2Props>(props: Partial<FlexBoxProps | FlexGridProps | FlexGrid2Props>, ref?: React.Ref<_Any> | null, componentName?: "Box" | "Grid" | "Grid2") => P;
export declare const _test: {
    mapAlignment: (alignment?: _Any) => ResponsiveFlexPosition;
    mapDirection: (direction: ResponsiveFlexDirection | undefined | null, reverse?: boolean | undefined | null) => ResponsiveFlexDirection;
    mapFlexProps: <P extends FlexBoxProps | FlexGridProps | FlexGrid2Props>(props: Partial<FlexBoxProps | FlexGridProps | FlexGrid2Props>, ref?: React.Ref<_Any> | null, componentName?: "Box" | "Grid" | "Grid2") => P;
    resolveDirection: <R extends ResponsiveFlexDirection = ResponsiveFlexDirection>(row: ResponsiveFlexDirection | ResponsiveFlexBoolean | undefined | null, column: ResponsiveFlexDirection | ResponsiveFlexBoolean | undefined | null, reverse?: boolean | undefined | null, fallback?: ResponsiveFlexDirection) => R | CSSFlexDirection | undefined;
};
export {};
