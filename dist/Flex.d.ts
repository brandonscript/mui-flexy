import { Theme as MaterialTheme } from "@mui/material/styles";
import type { AsComponent, FlexBoxColumnProps, FlexBoxProps, FlexBoxRowProps, FlexBoxTypeMap, FlexGridColumnProps, FlexGridProps, FlexGridRowProps, FlexGridTypeMap } from "./Flex.types";
export { FlexBoxColumnProps, FlexBoxProps, FlexBoxRowProps };
export declare const FlexBox: AsComponent<FlexBoxTypeMap<undefined, {}, "div", MaterialTheme>>;
export { FlexGridColumnProps, FlexGridProps, FlexGridRowProps };
export declare const FlexGrid: AsComponent<FlexGridTypeMap<undefined, {}, "div">>;
