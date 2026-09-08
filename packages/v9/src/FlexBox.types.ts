import type { OverrideProps } from "@mui/material/OverridableComponent";
import type { Theme as MaterialTheme } from "@mui/material/styles";
import type { BoxOwnProps, SystemProps } from "@mui/system/Box";
import type { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import type {
  FlexColumnProps,
  FlexOrientation,
  FlexRowProps,
  InferFlexProps,
  OnlyColumn,
  OnlyRow,
} from "@mui-flexy/core";

export interface FlexBoxTypeMap<
  O extends FlexOrientation | undefined = undefined,
  P = {},
  D extends React.ElementType = "div",
  T extends object = MaterialTheme,
> {
  // MUI v9 removed SystemProps from BoxOwnProps; keep accepting them so FlexBox
  // can fold them into sx via unstable_extendSxProp at runtime.
  props: P &
    BoxOwnProps<T> &
    SystemProps<T> & {
      sx?: SxProps<MaterialTheme>;
    } & (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
  defaultComponent: D;
}

export type FlexFixedOrientationTypeMap<
  O extends FlexOrientation,
  P = {},
  D extends React.ElementType = FlexBoxTypeMap<O, P>["defaultComponent"],
  T extends object = MaterialTheme,
> = {
  props: Omit<FlexBoxTypeMap<O, P, D, T>["props"], "row" | "column">;
  defaultComponent: FlexBoxTypeMap<O, P, D, T>["defaultComponent"];
};

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
> = OnlyColumn<FlexBoxProps<"column", D, P>>;
