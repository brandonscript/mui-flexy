import type { GridOwnProps } from "@mui/material/Grid";
import type { OverrideProps } from "@mui/material/OverridableComponent";
import type { Theme as MaterialTheme } from "@mui/material/styles";
import type { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import {
  type FlexColumnProps,
  type FlexOrientation,
  type FlexRowProps,
  type InferFlexProps,
  type OnlyColumn,
  type OnlyRow,
} from "@mui-flexy/core";
import type * as React from "react";

/**
 * @deprecated Grid will be replaced with Grid2 in MUI v7 (see [`Grid2`](https://mui.com/material-ui/react-grid2/)).
 */
export interface FlexGridTypeMap<
  O extends FlexOrientation | undefined = undefined,
  P = {},
  D extends React.ElementType = "div",
> {
  props: P &
    GridOwnProps & {
      sx?: SxProps<MaterialTheme>;
    } & (O extends "row" ? FlexRowProps : O extends "column" ? FlexColumnProps : InferFlexProps);
  defaultComponent: D;
}

/**
 * @deprecated Grid will be replaced with Grid2 in MUI v7 (see [`Grid2`](https://mui.com/material-ui/react-grid2/)).
 */
export type FlexGridProps<
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = FlexGridTypeMap<O>["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FlexGridTypeMap<O, P, D>, D>;

/**
 * @deprecated Grid will be replaced with Grid2 in MUI v7 (see [`Grid2`](https://mui.com/material-ui/react-grid2/)).
 */
export type FlexGridRowProps<
  D extends React.ElementType = FlexGridTypeMap<"row">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyRow<FlexGridProps<"row", D, P>>;

/**
 * @deprecated Grid will be replaced with Grid2 in MUI v7 (see [`Grid2`](https://mui.com/material-ui/react-grid2/)).
 */
export type FlexGridColumnProps<
  D extends React.ElementType = FlexGridTypeMap<"column">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyColumn<FlexGridProps<"column", D, P>>;
