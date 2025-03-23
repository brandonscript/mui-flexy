import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { Theme as MaterialTheme } from "@mui/material/styles";
import { Theme as SystemTheme } from "@mui/system";
import type { FlexBoxProps, FlexBoxTypeMap, FlexGridProps, FlexGridTypeMap } from "./Flex.types";
export { FlexBoxProps };
export declare const FlexBox: OverridableComponent<FlexBoxTypeMap<undefined, {}, "div", SystemTheme & MaterialTheme>>;
export { FlexGridProps };
export declare const FlexGrid: OverridableComponent<FlexGridTypeMap<undefined, {}, "div">>;
