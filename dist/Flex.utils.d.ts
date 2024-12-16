import { FlexBoxProps, FlexGridProps, ResponsiveFlexDirection, ResponsiveFlexPosition } from "./Flex.types";
export declare const mapFlexProps: <P extends FlexBoxProps | FlexGridProps>(props: FlexBoxProps | FlexGridProps, componentName?: "Box" | "Grid") => P;
export declare const _test: {
    mapAlignment: (alignment?: any) => ResponsiveFlexPosition;
    mapDirection: (direction: ResponsiveFlexDirection | null | undefined, reverse?: boolean) => ResponsiveFlexDirection;
    mapFlexProps: <P extends FlexBoxProps | FlexGridProps>(props: FlexBoxProps | FlexGridProps, componentName?: "Box" | "Grid") => P;
};
