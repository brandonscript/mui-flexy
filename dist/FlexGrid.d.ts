import type { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
import type { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps, FlexGrid2TypeMap, FlexOrientation } from "./Flex.types";
export { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps };
export declare const createFlexGrid: <O extends FlexOrientation | undefined = undefined, D extends React.ElementType = "div", P = {}>(defaultProps?: FlexGrid2Props<O, D, P>) => OverridableComponent<FlexGrid2TypeMap<O, P, D>>;
export declare const FlexGrid: OverridableComponent<FlexGrid2TypeMap<undefined, {}, "div">>;
export declare const FlexGridRow: OverridableComponent<FlexGrid2TypeMap<"row", {}, "div">>;
export declare const FlexGridColumn: OverridableComponent<FlexGrid2TypeMap<"column", {}, "div">>;
export default FlexGrid;
