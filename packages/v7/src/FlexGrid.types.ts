import type { OverrideProps } from "@mui/material/OverridableComponent";
import type { Theme as MaterialTheme } from "@mui/material/styles";
import type { SystemProps } from "@mui/system/Box";
import type { GridBaseProps } from "@mui/system/Grid";
import type { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import {
  type FlexColumnProps,
  type FlexOrientation,
  type FlexRowProps,
  type InferFlexProps,
  type OnlyColumn,
  type OnlyRow,
  type StrictGrid2Props,
} from "@mui-flexy/core";

export interface FlexGridTypeMap<
  O extends FlexOrientation | undefined = undefined,
  P = {},
  D extends React.ElementType = "div",
> {
  props: P &
    GridBaseProps & {
      sx?: SxProps<MaterialTheme>;
    } & SystemProps<MaterialTheme> &
    (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps) &
    StrictGrid2Props;
  defaultComponent: D;
}

export type FlexGridProps<
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = FlexGridTypeMap<O>["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FlexGridTypeMap<O, P, D>, D>;

export type FlexGridRowProps<
  D extends React.ElementType = FlexGridTypeMap<"row">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyRow<FlexGridProps<"row", D, P>>;

export type FlexGridColumnProps<
  D extends React.ElementType = FlexGridTypeMap<"column">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyColumn<FlexGridProps<"column", D, P>>;
