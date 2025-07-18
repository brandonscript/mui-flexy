// @ts-ignore
import type { Grid2Props } from "@mui/material/Grid2_v6";
// @ts-ignore
import Grid2 from "@mui/material/Grid2_v6";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { type FlexOrientation, mapFlexProps, verifyGridSizeProps } from "@mui-flexy/core";
import { forwardRef } from "react";

import type { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps, FlexGrid2TypeMap } from "./FlexGrid2.types";

export type { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps };

export const createFlexGrid2 = <
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = "div",
  P = {},
>(
  defaultProps: FlexGrid2Props<O, D, P> = {} as FlexGrid2Props<O, D, P>,
) => {
  return forwardRef<Grid2Props["ref"], FlexGrid2Props<O, D, P>>((props, ref) => {
    return (
      <Grid2
        {...defaultProps}
        {...mapFlexProps(verifyGridSizeProps(props as FlexGrid2Props<O, D, P>, "new"), ref, "Grid2")}
      />
    );
  }) as OverridableComponent<FlexGrid2TypeMap<O, P, D>>;
};

export const FlexGrid2Row = createFlexGrid2<"row">({ row: true });
export const FlexGrid2Column = createFlexGrid2<"column">({ column: true });
export const FlexGrid2 = createFlexGrid2();
export default FlexGrid2;
