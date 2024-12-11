import React from "react";
export declare const FlexBox: React.ForwardRefExoticComponent<Omit<{
    x?: import("./Flex.types").XIfColumn | undefined;
    y?: import("./Flex.types").YIfColumn | undefined;
    row?: boolean;
    column?: boolean;
    reverse?: boolean;
    nowrap?: boolean;
} & import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | React.RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/material/OverridableComponent").CommonProps | keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const FlexGrid: React.ForwardRefExoticComponent<Omit<{
    x?: import("./Flex.types").XIfColumn | undefined;
    y?: import("./Flex.types").YIfColumn | undefined;
    row?: boolean;
    column?: boolean;
    reverse?: boolean;
    nowrap?: boolean;
} & import("@mui/material").GridOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void | React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | React.RefObject<HTMLDivElement> | null | undefined;
}, "top" | "bottom" | "left" | "right" | "className" | "style" | "classes" | "border" | "borderTop" | "borderRight" | "borderBottom" | "borderLeft" | "borderColor" | "borderRadius" | "display" | "displayPrint" | "overflow" | "textOverflow" | "visibility" | "whiteSpace" | "flexBasis" | "flexDirection" | "flexWrap" | "justifyContent" | "alignItems" | "alignContent" | "order" | "flex" | "flexGrow" | "flexShrink" | "alignSelf" | "justifyItems" | "justifySelf" | "gap" | "columnGap" | "rowGap" | "gridColumn" | "gridRow" | "gridAutoFlow" | "gridAutoColumns" | "gridAutoRows" | "gridTemplateColumns" | "gridTemplateRows" | "gridTemplateAreas" | "gridArea" | "bgcolor" | "color" | "zIndex" | "position" | "boxShadow" | "width" | "maxWidth" | "minWidth" | "height" | "maxHeight" | "minHeight" | "boxSizing" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "marginX" | "marginY" | "marginInline" | "marginInlineStart" | "marginInlineEnd" | "marginBlock" | "marginBlockStart" | "marginBlockEnd" | "padding" | "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft" | "paddingX" | "paddingY" | "paddingInline" | "paddingInlineStart" | "paddingInlineEnd" | "paddingBlock" | "paddingBlockStart" | "paddingBlockEnd" | "typography" | "fontFamily" | "fontSize" | "fontStyle" | "fontWeight" | "letterSpacing" | "lineHeight" | "textAlign" | "textTransform" | "direction" | "columns" | "container" | "children" | "sx" | "xs" | "sm" | "md" | "lg" | "xl" | "columnSpacing" | "item" | "rowSpacing" | "spacing" | "wrap" | "zeroMinWidth"> & {
    component?: React.ElementType;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
export type { FlexBoxProps, FlexGridProps } from "./Flex.types";
