// @ts-ignore
import type { GridProps } from "@mui/material/Grid_v6";
// @ts-ignore
import Grid from "@mui/material/Grid_v6";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { type FlexOrientation, mapFlexProps, verifyGridSizeProps } from "@mui-flexy/core";
import { forwardRef } from "react";

import type { FlexGridColumnProps, FlexGridProps, FlexGridRowProps, FlexGridTypeMap } from "./FlexGrid.types";

export type { FlexGridColumnProps, FlexGridProps, FlexGridRowProps };

export const createFlexGrid = <
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = "div",
  P = {},
>(
  defaultProps: FlexGridProps<O, D, P> = {} as FlexGridProps<O, D, P>,
) => {
  return forwardRef<GridProps["ref"], FlexGridProps<O, D, P>>((props, ref) => {
    return <Grid {...defaultProps} {...mapFlexProps(verifyGridSizeProps(props, "legacy"), ref, "Grid")} />;
  }) as OverridableComponent<FlexGridTypeMap<O, P, D>>;
};
export const FlexGrid = createFlexGrid();
export const FlexGridRow = createFlexGrid<"row">({ row: true });
export const FlexGridColumn = createFlexGrid<"column">({ column: true });
export default FlexGrid;
