import { BoxProps, GridProps } from "@mui/material";
import { Axis, FlexBoxTypeMap, FlexGridTypeMap, FlexProps, HorizontalAlignable, MuiAlign, VerticalAlignable } from "./Flex.types";
export declare const mapFlexProps: <M extends FlexBoxTypeMap | FlexGridTypeMap, P extends FlexProps<BoxProps | GridProps> = M extends FlexBoxTypeMap ? {
    x?: import("./Flex.types").XIfColumn | undefined;
    y?: import("./Flex.types").YIfColumn | undefined;
    row?: boolean;
    column?: boolean;
    reverse?: boolean;
    nowrap?: boolean;
} & import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/material/OverridableComponent").CommonProps | keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> : {
    x?: import("./Flex.types").XIfColumn | undefined;
    y?: import("./Flex.types").YIfColumn | undefined;
    row?: boolean;
    column?: boolean;
    reverse?: boolean;
    nowrap?: boolean;
} & import("@mui/material").GridOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "top" | "bottom" | "left" | "right" | "className" | "style" | "classes" | "border" | "borderTop" | "borderRight" | "borderBottom" | "borderLeft" | "borderColor" | "borderRadius" | "display" | "displayPrint" | "overflow" | "textOverflow" | "visibility" | "whiteSpace" | "flexBasis" | "flexDirection" | "flexWrap" | "justifyContent" | "alignItems" | "alignContent" | "order" | "flex" | "flexGrow" | "flexShrink" | "alignSelf" | "justifyItems" | "justifySelf" | "gap" | "columnGap" | "rowGap" | "gridColumn" | "gridRow" | "gridAutoFlow" | "gridAutoColumns" | "gridAutoRows" | "gridTemplateColumns" | "gridTemplateRows" | "gridTemplateAreas" | "gridArea" | "bgcolor" | "color" | "zIndex" | "position" | "boxShadow" | "width" | "maxWidth" | "minWidth" | "height" | "maxHeight" | "minHeight" | "boxSizing" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "marginX" | "marginY" | "marginInline" | "marginInlineStart" | "marginInlineEnd" | "marginBlock" | "marginBlockStart" | "marginBlockEnd" | "padding" | "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft" | "paddingX" | "paddingY" | "paddingInline" | "paddingInlineStart" | "paddingInlineEnd" | "paddingBlock" | "paddingBlockStart" | "paddingBlockEnd" | "typography" | "fontFamily" | "fontSize" | "fontStyle" | "fontWeight" | "letterSpacing" | "lineHeight" | "textAlign" | "textTransform" | "direction" | "columns" | "container" | "children" | "sx" | "xs" | "sm" | "md" | "lg" | "xl" | "columnSpacing" | "item" | "rowSpacing" | "spacing" | "wrap" | "zeroMinWidth"> & {
    component?: React.ElementType;
}>(props: P, componentName?: "Box" | "Grid") => M extends FlexBoxTypeMap ? BoxProps : M extends FlexGridTypeMap ? GridProps : never;
export declare const _test: {
    mapAlignment: (alignment: HorizontalAlignable | VerticalAlignable | MuiAlign) => MuiAlign;
    mapDirection: (direction: Axis, reverse?: boolean) => Axis;
    mapFlexProps: <M extends FlexBoxTypeMap | FlexGridTypeMap, P extends FlexProps<BoxProps | GridProps> = M extends FlexBoxTypeMap ? {
        x?: import("./Flex.types").XIfColumn | undefined;
        y?: import("./Flex.types").YIfColumn | undefined;
        row?: boolean;
        column?: boolean;
        reverse?: boolean;
        nowrap?: boolean;
    } & import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
        ref?: ((instance: HTMLDivElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLDivElement> | null | undefined;
    }, keyof import("@mui/material/OverridableComponent").CommonProps | keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> : {
        x?: import("./Flex.types").XIfColumn | undefined;
        y?: import("./Flex.types").YIfColumn | undefined;
        row?: boolean;
        column?: boolean;
        reverse?: boolean;
        nowrap?: boolean;
    } & import("@mui/material").GridOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
        ref?: ((instance: HTMLDivElement | null) => void | import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof import("react").DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | import("react").RefObject<HTMLDivElement> | null | undefined;
    }, "top" | "bottom" | "left" | "right" | "className" | "style" | "classes" | "border" | "borderTop" | "borderRight" | "borderBottom" | "borderLeft" | "borderColor" | "borderRadius" | "display" | "displayPrint" | "overflow" | "textOverflow" | "visibility" | "whiteSpace" | "flexBasis" | "flexDirection" | "flexWrap" | "justifyContent" | "alignItems" | "alignContent" | "order" | "flex" | "flexGrow" | "flexShrink" | "alignSelf" | "justifyItems" | "justifySelf" | "gap" | "columnGap" | "rowGap" | "gridColumn" | "gridRow" | "gridAutoFlow" | "gridAutoColumns" | "gridAutoRows" | "gridTemplateColumns" | "gridTemplateRows" | "gridTemplateAreas" | "gridArea" | "bgcolor" | "color" | "zIndex" | "position" | "boxShadow" | "width" | "maxWidth" | "minWidth" | "height" | "maxHeight" | "minHeight" | "boxSizing" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "marginX" | "marginY" | "marginInline" | "marginInlineStart" | "marginInlineEnd" | "marginBlock" | "marginBlockStart" | "marginBlockEnd" | "padding" | "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft" | "paddingX" | "paddingY" | "paddingInline" | "paddingInlineStart" | "paddingInlineEnd" | "paddingBlock" | "paddingBlockStart" | "paddingBlockEnd" | "typography" | "fontFamily" | "fontSize" | "fontStyle" | "fontWeight" | "letterSpacing" | "lineHeight" | "textAlign" | "textTransform" | "direction" | "columns" | "container" | "children" | "sx" | "xs" | "sm" | "md" | "lg" | "xl" | "columnSpacing" | "item" | "rowSpacing" | "spacing" | "wrap" | "zeroMinWidth"> & {
        component?: React.ElementType;
    }>(props: P, componentName?: "Box" | "Grid") => M extends FlexBoxTypeMap ? BoxProps : M extends FlexGridTypeMap ? GridProps : never;
};
