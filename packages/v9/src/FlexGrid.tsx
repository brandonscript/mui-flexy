import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { unstable_extendSxProp as extendSxProp } from "@mui/system";
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
) =>
  forwardRef<GridProps["ref"], FlexGridProps<O, D, P>>((props, ref) => {
    // MUI v9 removed system props from Grid; fold them into sx instead.
    const mapped = mapFlexProps<FlexGridProps<O, D, P>, GridProps>(
      verifyGridSizeProps({ ...defaultProps, ...props } as FlexGridProps<O, D, P>, "new"),
      ref,
      "Grid2",
    );
    return <Grid {...extendSxProp(mapped as Parameters<typeof extendSxProp>[0])} />;
  }) as OverridableComponent<FlexGridTypeMap<O, P, D>>;

export const FlexGridRow = createFlexGrid<"row">({ row: true });
export const FlexGridColumn = createFlexGrid<"column">({ column: true });
export const FlexGrid = createFlexGrid();
export default FlexGrid;
