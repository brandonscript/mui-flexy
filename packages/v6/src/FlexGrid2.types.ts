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

type FlexGrid2OrientationProps<O extends FlexOrientation | undefined> = O extends "row"
  ? OnlyRow<FlexRowProps>
  : O extends "column"
    ? OnlyColumn<FlexColumnProps>
    : InferFlexProps;

export interface FlexGrid2TypeMap<
  O extends FlexOrientation | undefined = undefined,
  P = {},
  D extends React.ElementType = "div",
> {
  props: P &
    Omit<GridBaseProps, "wrap"> & {
      sx?: SxProps<MaterialTheme>;
    } & Omit<SystemProps<MaterialTheme>, "wrap"> &
    FlexGrid2OrientationProps<O> &
    StrictGrid2Props;
  defaultComponent: D;
}

export type FlexGrid2Props<
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = FlexGrid2TypeMap<O>["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FlexGrid2TypeMap<O, P, D>, D>;

export type FlexGrid2RowProps<
  D extends React.ElementType = FlexGrid2TypeMap<"row">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyRow<FlexGrid2Props<"row", D, P>>;

export type FlexGrid2ColumnProps<
  D extends React.ElementType = FlexGrid2TypeMap<"column">["defaultComponent"],
  P = {
    component?: React.ElementType;
  },
> = OnlyColumn<FlexGrid2Props<"column", D, P>>;
