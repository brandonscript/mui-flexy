import _MuiBox, { BoxProps } from "@mui/material/Box";
import _MuiGrid, { GridProps } from "@mui/material/Grid";
import { Theme as MaterialTheme } from "@mui/material/styles";
import { forwardRef } from "react";

import type {
  AsComponent,
  FlexBoxColumnProps,
  FlexBoxProps,
  FlexBoxRowProps,
  FlexBoxTypeMap,
  FlexGridColumnProps,
  FlexGridProps,
  FlexGridRowProps,
  FlexGridTypeMap,
  FlexOrientation,
} from "./Flex.types";
import { mapFlexProps } from "./Flex.utils";

// @ts-ignore
const MuiBox = _MuiBox?.default ?? _MuiBox;
// @ts-ignore
const MuiGrid = _MuiGrid?.default ?? _MuiGrid;

export { FlexBoxColumnProps, FlexBoxProps, FlexBoxRowProps };
const createFlexBox = <
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = "div",
  P = {},
  T extends object = MaterialTheme,
>(
  defaultProps: FlexBoxProps<O, D, P> = {} as FlexBoxProps<O, D, P>,
) =>
  forwardRef<BoxProps["ref"], FlexBoxProps<O, D, P>>((props, ref) => (
    <MuiBox {...defaultProps} {...mapFlexProps(props, ref, "Box")} />
  )) as AsComponent<FlexBoxTypeMap<O, P, D, T>>;
export const FlexBox = createFlexBox();
export const FlexRowBox = createFlexBox<"row">({ row: true });
export const FlexColumnBox = createFlexBox<"column">({ column: true });

export { FlexGridColumnProps, FlexGridProps, FlexGridRowProps };
const createFlexGrid = <O extends FlexOrientation | undefined = undefined, D extends React.ElementType = "div", P = {}>(
  defaultProps: FlexGridProps<O, D, P> = {} as FlexGridProps<O, D, P>,
) =>
  forwardRef<GridProps["ref"], FlexGridProps<O, D, P>>(
    // @ts-ignore
    (props, ref) => <MuiGrid {...defaultProps} {...mapFlexProps(props, ref, "Grid")} />,
  ) as AsComponent<FlexGridTypeMap<O, P, D>>;
export const FlexGrid = createFlexGrid();
export const FlexGridRow = createFlexGrid<"row">({ row: true });
export const FlexGridColumn = createFlexGrid<"column">({ column: true });
