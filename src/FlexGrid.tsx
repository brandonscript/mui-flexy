import type { GridProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { major as muiVersion } from "@mui/material/version";
import React, { forwardRef, Suspense } from "react";

import type {
  FlexGrid2ColumnProps,
  FlexGrid2Props,
  FlexGrid2RowProps,
  FlexGrid2TypeMap,
  FlexOrientation,
} from "./Flex.types";
import { mapFlexProps } from "./Flex.utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

const versionMismatchErr = `@mui/material version is ${muiVersion}, but v6 or above is required to use FlexGrid2. Please use Unstable_FlexGrid2 instead.`;

export { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps };
export const createFlexGrid = <
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = "div",
  P = {},
>(
  defaultProps: FlexGrid2Props<O, D, P> = {} as FlexGrid2Props<O, D, P>,
) => {
  let MuiGrid: _Any = undefined;
  try {
    if (muiVersion < 6) {
      throw new Error(versionMismatchErr);
    }
    // @ts-ignore
    if (muiVersion >= 7) {
      // In MUI v7, Grid2 has been moved to Grid namespace
      MuiGrid = React.lazy(() => import("@mui/material/Grid"));
    } else {
      // In MUI v6, use Grid2
      // @ts-ignore
      MuiGrid = React.lazy(() => import("@mui/material/Grid2"));
    }
  } catch (_err) {
    console.warn(versionMismatchErr);
  }

  return forwardRef<GridProps["ref"], FlexGrid2Props<O, D, P>>((props, ref) => {
    const { xs, sm, md, lg, xl, size, ...rest } = props as _Any;
    const sizeValues = [xs, sm, md, lg, xl].filter((value) => value !== null && value !== undefined);
    const sizeProps =
      size ?? (sizeValues.every((value) => value === sizeValues[0]) ? sizeValues[0] : { xs, sm, md, lg, xl });
    props = { ...rest, size: sizeProps };
    return (
      <Suspense fallback={<div data-mui-flexy-grid2="loading" />}>
        <MuiGrid {...defaultProps} {...mapFlexProps(props, ref, "Grid")} />
      </Suspense>
    );
  }) as OverridableComponent<FlexGrid2TypeMap<O, P, D>>;
};

export const FlexGrid = createFlexGrid();
export const FlexGridRow = createFlexGrid<"row">({ row: true });
export const FlexGridColumn = createFlexGrid<"column">({ column: true });
export default FlexGrid;
