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

type FlexGridOrientationProps<O extends FlexOrientation | undefined> = O extends "row"
  ? OnlyRow<FlexRowProps>
  : O extends "column"
    ? OnlyColumn<FlexColumnProps>
    : InferFlexProps;

/**
 * @deprecated Grid will be replaced with Grid2 in MUI v7 (see [`Grid2`](https://mui.com/material-ui/react-grid2/)). You can migrate to `Grid2` in v6.
 */
export interface FlexGridTypeMap<
  O extends FlexOrientation | undefined = undefined,
  P = {},
  D extends React.ElementType = "div",
> {
  props: P &
    GridOwnProps & {
      sx?: SxProps<MaterialTheme>;
    } & FlexGridOrientationProps<O>;
  defaultComponent: D;
}

export type FlexGridFixedOrientationTypeMap<
  O extends FlexOrientation,
  P = {},
  D extends React.ElementType = FlexGridTypeMap<O, P>["defaultComponent"],
> = {
  props: Omit<FlexGridTypeMap<O, P, D>["props"], "row" | "column">;
  defaultComponent: FlexGridTypeMap<O, P, D>["defaultComponent"];
};

/**
 * @deprecated Grid will be replaced with Grid2 in MUI v7 (see [`Grid2`](https://mui.com/material-ui/react-grid2/)). You can migrate to `Grid2` in v6.
 */
export type FlexGridProps<
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = FlexGridTypeMap<O>["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FlexGridTypeMap<O, P, D>, D>;

/**
 * @deprecated Grid will be replaced with Grid2 in MUI v7 (see [`Grid2`](https://mui.com/material-ui/react-grid2/)). You can migrate to `Grid2` in v6.
 */
export type FlexGridRowProps<
  D extends React.ElementType = FlexGridTypeMap<"row">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyRow<FlexGridProps<"row", D, P>>;

/**
 * @deprecated Grid will be replaced with Grid2 in MUI v7 (see [`Grid2`](https://mui.com/material-ui/react-grid2/)). You can migrate to `Grid2` in v6.
 */
export type FlexGridColumnProps<
  D extends React.ElementType = FlexGridTypeMap<"column">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyColumn<FlexGridProps<"column", D, P>>;
