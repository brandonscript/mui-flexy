import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps, FlexGrid2TypeMap, FlexOrientation } from "./Flex.types";
export { FlexGrid2ColumnProps as Unstable_FlexGrid2ColumnProps, FlexGrid2Props as Unstable_FlexGrid2Props, FlexGrid2RowProps as Unstable_FlexGrid2RowProps, };
export declare const createUnstable_FlexGrid2: <O extends FlexOrientation | undefined = undefined, D extends React.ElementType = "div", P = {}>(defaultProps?: FlexGrid2Props<O, D, P>) => OverridableComponent<FlexGrid2TypeMap<O, P, D>>;
export declare const Unstable_FlexGrid2: OverridableComponent<FlexGrid2TypeMap<undefined, {}, "div">>;
export declare const Unstable_FlexGrid2Row: OverridableComponent<FlexGrid2TypeMap<"row", {}, "div">>;
export declare const Unstable_FlexGrid2Column: OverridableComponent<FlexGrid2TypeMap<"column", {}, "div">>;
export default Unstable_FlexGrid2;
