import type { OverrideProps } from "@mui/material/OverridableComponent";
import type { Theme as MaterialTheme } from "@mui/material/styles";
import type { SystemProps } from "@mui/system/Box";
import type { GridBaseProps } from "@mui/system/Grid";
import type { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import type {
  FlexColumnProps,
  FlexOrientation,
  FlexRowProps,
  InferFlexProps,
  OnlyColumn,
  OnlyRow,
  StrictGrid2Props,
} from "@mui-flexy/core";
import type * as React from "react";

export interface FlexGrid2TypeMap<
  O extends FlexOrientation | undefined = undefined,
  P = {},
  D extends React.ElementType = "div",
> {
  props: P &
    GridBaseProps & {
      sx?: SxProps<MaterialTheme>;
    } & SystemProps<MaterialTheme> &
    (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
  defaultComponent: D;
}

export type FlexGrid2Props<
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = FlexGrid2TypeMap<O>["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = StrictGrid2Props<OverrideProps<FlexGrid2TypeMap<O, P, D>, D>>;

export type FlexGrid2RowProps<
  D extends React.ElementType = FlexGrid2TypeMap<"row">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = StrictGrid2Props<OnlyRow<FlexGrid2Props<"row", D, P>>>;

export type FlexGrid2ColumnProps<
  D extends React.ElementType = FlexGrid2TypeMap<"column">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = StrictGrid2Props<OnlyColumn<FlexGrid2Props<"column", D, P>>>;
