import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { FlexGrid2Props, FlexGrid2TypeMap, FlexOrientation } from "./Flex.types";
export { FlexGrid2Props as Unstable_FlexGrid2Props };
export declare const createUnstable_FlexGrid2: <Orientation extends FlexOrientation | undefined = undefined, RootComponent extends React.ElementType = "div", AdditionalProps = {}>() => OverridableComponent<FlexGrid2TypeMap<Orientation, AdditionalProps, RootComponent>>;
export declare const Unstable_FlexGrid2: OverridableComponent<FlexGrid2TypeMap<undefined, {}, "div">>;
export default Unstable_FlexGrid2;
