import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps, FlexGrid2TypeMap, FlexOrientation } from "./Flex.types";
export { FlexGrid2ColumnProps, FlexGrid2Props, FlexGrid2RowProps };
export declare const createFlexGrid2: <O extends FlexOrientation | undefined = undefined, D extends React.ElementType = "div", P = {}>() => OverridableComponent<FlexGrid2TypeMap<O, P, D>>;
export declare const FlexGrid2: OverridableComponent<FlexGrid2TypeMap<undefined, {}, "div">>;
export default FlexGrid2;
