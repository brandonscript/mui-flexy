import { ComponentType } from "react";
import { Align, Axis, FlexBoxProps } from "./Flex.types";
export declare function getDisplayName<P>(Component: ComponentType<P>): string;
export declare const mapFlexProps: <T extends FlexBoxProps = FlexBoxProps>(props: T) => (T & {
    flexDirection: "row" | "column" | "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset" | "column-reverse" | "row-reverse";
    justifyContent: Align;
    alignItems: Align;
}) | (T & {
    flexDirection: NonNullable<import("csstype").Property.FlexDirection | undefined>[] | (import("csstype").Property.FlexDirection | NonNullable<import("csstype").Property.FlexDirection | undefined>[] | null | undefined)[] | (import("@mui/material").GridDirection | null)[];
    justifyContent: any[];
    alignItems: any[];
}) | (T & {
    flexDirection: {
        [key: string]: import("csstype").Property.FlexDirection | NonNullable<import("csstype").Property.FlexDirection | undefined>[] | null | undefined;
    } | {
        [key: string]: import("@mui/material").GridDirection | null;
    };
    justifyContent: {
        [k: string]: string | undefined;
    };
    alignItems: {
        [k: string]: string | undefined;
    };
}) | (T & {
    flexDirection: ((theme: import("@mui/material").Theme) => import("@mui/system/styleFunctionSx").ResponsiveStyleValue<import("csstype").Property.FlexDirection | NonNullable<import("csstype").Property.FlexDirection | undefined>[] | undefined>) | null | undefined;
    justifyContent: Align;
    alignItems: Align;
});
export declare const _test: {
    mapAlignment: (alignment: Align) => Align;
    mapDirection: (direction: Axis, reverse?: boolean) => Axis;
    mapFlexProps: <T extends FlexBoxProps = FlexBoxProps>(props: T) => (T & {
        flexDirection: "row" | "column" | "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset" | "column-reverse" | "row-reverse";
        justifyContent: Align;
        alignItems: Align;
    }) | (T & {
        flexDirection: NonNullable<import("csstype").Property.FlexDirection | undefined>[] | (import("csstype").Property.FlexDirection | NonNullable<import("csstype").Property.FlexDirection | undefined>[] | null | undefined)[] | (import("@mui/material").GridDirection | null)[];
        justifyContent: any[];
        alignItems: any[];
    }) | (T & {
        flexDirection: {
            [key: string]: import("csstype").Property.FlexDirection | NonNullable<import("csstype").Property.FlexDirection | undefined>[] | null | undefined;
        } | {
            [key: string]: import("@mui/material").GridDirection | null;
        };
        justifyContent: {
            [k: string]: string | undefined;
        };
        alignItems: {
            [k: string]: string | undefined;
        };
    }) | (T & {
        flexDirection: ((theme: import("@mui/material").Theme) => import("@mui/system/styleFunctionSx").ResponsiveStyleValue<import("csstype").Property.FlexDirection | NonNullable<import("csstype").Property.FlexDirection | undefined>[] | undefined>) | null | undefined;
        justifyContent: Align;
        alignItems: Align;
    });
};
