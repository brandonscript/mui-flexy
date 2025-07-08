import type { OverrideProps } from "@mui/material/OverridableComponent";
import type { Theme as MaterialTheme } from "@mui/material/styles";
import type { BoxOwnProps } from "@mui/system/Box";
import type { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import type {
  FlexColumnProps,
  FlexOrientation,
  FlexRowProps,
  InferFlexProps,
  OnlyColumn,
  OnlyRow,
} from "@mui-flexy/core";
import type * as React from "react";

export interface FlexBoxTypeMap<
  O extends FlexOrientation | undefined = undefined,
  P = {},
  D extends React.ElementType = "div",
  T extends object = MaterialTheme,
> {
  props: P &
    BoxOwnProps<T> & {
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
> = OnlyColumn<FlexBoxProps<"column", D, P>>;
