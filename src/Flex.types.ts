import { BoxProps, GridOwnProps, GridProps } from "@mui/material";
import { OverridableTypeMap, OverrideProps } from "@mui/material/OverridableComponent";
import {
  BoxOwnProps,
  BoxTypeMap,
  GridTypeMap,
  ResponsiveStyleValue,
  Theme as SystemTheme,
} from "@mui/system";
import { CSSProperties } from "react";

export type FlexOrientation = "row" | "column";

// Axis-specific alignment properties
type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "initial"
  | "inherit"
  | "unset";

type AlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline"
  | "initial"
  | "inherit"
  | "unset";

export type HorizontalAlignable = "left" | "right" | "center";
export type VerticalAlignable = "top" | "bottom" | "center";

// Axis-conditional alignment props
type XProps<O extends FlexOrientation> = ResponsiveStyleValue<
  O extends "row" ? HorizontalAlignable | JustifyContent : HorizontalAlignable | AlignItems
>;

type XRowProps = XProps<"row">;
type XColumnProps = XProps<"column">;

type YProps<O extends FlexOrientation> = ResponsiveStyleValue<
  O extends "row" ? VerticalAlignable | AlignItems : VerticalAlignable | JustifyContent
>;

type YRowProps = YProps<"row">;
type YColumnProps = YProps<"column">;

export type ResponsiveFlexPosition =
  | XRowProps
  | YRowProps
  | XColumnProps
  | YColumnProps
  | null
  | undefined;

export type ResponsiveFlexDirection = ResponsiveStyleValue<CSSProperties["flexDirection"]>;
export type ResponsiveFlexRowDirection = ResponsiveStyleValue<"row" | "row-reverse">;
export type ResponsiveFlexColumnDirection = ResponsiveStyleValue<"column" | "column-reverse">;
export type ResponsiveAlignItems = ResponsiveStyleValue<AlignItems> | undefined;
export type ResponsiveJustifyContent = ResponsiveStyleValue<JustifyContent> | undefined;
export type FlexJustifyableProps = FlexProps<"row">["x"] | FlexProps<"column">["y"] | undefined;

// Base FlexProps with conditional axis behavior
export type FlexProps<Orientation extends FlexOrientation> =
  | (Orientation extends "row"
      ? {
          x?: XRowProps;
          y?: YRowProps;
          row?: true;
          column?: false;
          reverse?: boolean;
          nowrap?: boolean;
        }
      : never)
  | (Orientation extends "column"
      ? {
          x?: XColumnProps;
          y?: YColumnProps;
          row?: false;
          column?: true;
          reverse?: boolean;
          nowrap?: boolean;
        }
      : never);

export type InferFlexProps<
  Orientation extends FlexOrientation = "row",
  AdditionalRowProps extends {} = {},
  AdditionalColumnProps extends {} = {}
> =
  | ({
      row?: true | undefined;
      column?: false | undefined;
    } & AdditionalRowProps &
      FlexProps<"row">)
  | ({
      row?: false;
      column: true;
    } & AdditionalColumnProps &
      FlexProps<"column">)
  | (Orientation extends "row" | undefined
      ? AdditionalRowProps & FlexProps<"row">
      : AdditionalColumnProps & FlexProps<"column">);

export type InferComponentOverrideProps<
  TypeMap extends OverridableTypeMap,
  Component extends React.ElementType = TypeMap["defaultComponent"],
  AdditionalProps extends {} = {}
> = {
  component: Component;
} & AdditionalProps &
  OverrideProps<TypeMap, Component>;

export type FlexBoxOwnProps<Theme extends object = SystemTheme> = BoxOwnProps<Theme> &
  InferFlexProps;

export interface FlexBoxTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
  Theme extends object = SystemTheme
> {
  props: AdditionalProps & FlexBoxOwnProps<Theme>;
  defaultComponent: RootComponent;
}

export type FlexBoxProps = BoxProps<"div", InferFlexProps> & OverrideProps<BoxTypeMap, "div">;

export type FlexGridOwnProps = GridOwnProps & InferFlexProps;

export interface FlexGridTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div"
> {
  props: AdditionalProps & FlexGridOwnProps;
  defaultComponent: RootComponent;
}

export type FlexGridProps = GridProps<"div", InferFlexProps> & OverrideProps<GridTypeMap, "div">;
