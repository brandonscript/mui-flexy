import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps, FlexGrid2TypeMap, FlexOrientation } from "./Flex.types";
export { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps };
export declare const createFlexGrid2: <O extends FlexOrientation | undefined = undefined, D extends React.ElementType = "div", P = {}>(defaultProps?: FlexGrid2Props<O, D, P>) => OverridableComponent<FlexGrid2TypeMap<O, P, D>>;
export declare const FlexGrid2: OverridableComponent<FlexGrid2TypeMap<undefined, {}, "div">>;
export declare const FlexGrid2Row: OverridableComponent<FlexGrid2TypeMap<"row", {}, "div">>;
export declare const FlexGrid2Column: OverridableComponent<FlexGrid2TypeMap<"column", {}, "div">>;
export default FlexGrid2;
