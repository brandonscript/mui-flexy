import type { OverrideProps } from "@mui/material/OverridableComponent";
import type { Theme as MaterialTheme } from "@mui/material/styles";
import type { ResponsiveStyleValue, SxProps } from "@mui/system";
import type {
  FlexColumnProps,
  FlexOrientation,
  FlexRowProps,
  InferFlexProps,
  OnlyColumn,
  OnlyRow,
} from "@mui-flexy/core";

// Custom BoxOwnProps adapted from MUI v6/v7 for v5 compatibility
// This avoids the complexity issues in MUI v5's BoxOwnProps while maintaining compatibility
interface SimplifiedBoxOwnProps<Theme extends object = MaterialTheme> {
  children?: React.ReactNode;
  ref?: React.Ref<unknown>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  // Common layout props that users might need
  display?: ResponsiveStyleValue<React.CSSProperties["display"]>;
  width?: ResponsiveStyleValue<React.CSSProperties["width"]>;
  height?: ResponsiveStyleValue<React.CSSProperties["height"]>;
  maxWidth?: ResponsiveStyleValue<React.CSSProperties["maxWidth"]>;
  maxHeight?: ResponsiveStyleValue<React.CSSProperties["maxHeight"]>;
  minWidth?: ResponsiveStyleValue<React.CSSProperties["minWidth"]>;
  minHeight?: ResponsiveStyleValue<React.CSSProperties["minHeight"]>;
  margin?: ResponsiveStyleValue<React.CSSProperties["margin"] | number>;
  padding?: ResponsiveStyleValue<React.CSSProperties["padding"] | number>;
  // Position props
  position?: ResponsiveStyleValue<React.CSSProperties["position"]>;
  top?: ResponsiveStyleValue<React.CSSProperties["top"]>;
  right?: ResponsiveStyleValue<React.CSSProperties["right"]>;
  bottom?: ResponsiveStyleValue<React.CSSProperties["bottom"]>;
  left?: ResponsiveStyleValue<React.CSSProperties["left"]>;
  zIndex?: ResponsiveStyleValue<React.CSSProperties["zIndex"]>;
  // Flexbox props (with responsive value support)
  flexDirection?: ResponsiveStyleValue<React.CSSProperties["flexDirection"]>;
  flexWrap?: ResponsiveStyleValue<React.CSSProperties["flexWrap"]>;
  justifyContent?: ResponsiveStyleValue<React.CSSProperties["justifyContent"]>;
  alignItems?: ResponsiveStyleValue<React.CSSProperties["alignItems"]>;
  alignContent?: ResponsiveStyleValue<React.CSSProperties["alignContent"]>;
  flex?: ResponsiveStyleValue<React.CSSProperties["flex"]>;
  flexGrow?: ResponsiveStyleValue<React.CSSProperties["flexGrow"]>;
  flexShrink?: ResponsiveStyleValue<React.CSSProperties["flexShrink"]>;
  flexBasis?: ResponsiveStyleValue<React.CSSProperties["flexBasis"]>;
  alignSelf?: ResponsiveStyleValue<React.CSSProperties["alignSelf"]>;
  justifyItems?: ResponsiveStyleValue<React.CSSProperties["justifyItems"]>;
  justifySelf?: ResponsiveStyleValue<React.CSSProperties["justifySelf"]>;
  order?: ResponsiveStyleValue<React.CSSProperties["order"]>;
  gap?: ResponsiveStyleValue<React.CSSProperties["gap"] | number>;
  // Standard HTML attributes
  className?: string;
  style?: React.CSSProperties;
  slot?: string;
  // For styled() components
  theme?: Theme;
}

export interface FlexBoxTypeMap<
  O extends FlexOrientation | undefined = undefined,
  P = {},
  D extends React.ElementType = "div",
  T extends object = MaterialTheme,
> {
  props: P &
    SimplifiedBoxOwnProps<T> & {
      sx?: SxProps<MaterialTheme>;
    } & (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
  defaultComponent: D;
}

export type FlexBoxProps<
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = FlexBoxTypeMap<O>["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FlexBoxTypeMap<O, P, D, MaterialTheme>, D>;

export type FlexBoxRowProps<
  D extends React.ElementType = FlexBoxTypeMap<"row">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyRow<FlexBoxProps<"row", D, P>>;

export type FlexBoxColumnProps<
  D extends React.ElementType = FlexBoxTypeMap<"column">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyColumn<FlexBoxProps<"column", D, P>> & {
  // Make it compatible with MUIStyledCommonProps for styled components
  theme?: MaterialTheme;
  as?: React.ElementType;
  sx?: SxProps<MaterialTheme>;
};
