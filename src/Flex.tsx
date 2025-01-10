import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import { createElement, forwardRef } from "react";

import type {
  FlexBoxComponent,
  FlexBoxProps,
  FlexGridComponent,
  FlexGridProps,
} from "./Flex.types";
import { mapFlexProps } from "./Flex.utils";

const FlexBoxComponent = (props: FlexBoxProps) =>
  createElement<FlexBoxComponent>(
    MuiBox as React.FC<FlexBoxComponent>,
    mapFlexProps(props, "Box") as FlexBoxComponent
  );

export const FlexBox = forwardRef<unknown, FlexBoxProps>((props: FlexBoxProps, ref) =>
  FlexBoxComponent({ ...props, ref })
) as FlexBoxComponent;

const FlexGridComponent = (props: FlexGridProps) =>
  createElement<FlexGridComponent>(
    MuiGrid as React.FC<FlexGridComponent>,
    mapFlexProps(props, "Grid") as FlexGridComponent
  );

export const FlexGrid = forwardRef<HTMLDivElement, FlexGridProps>((props: FlexGridProps, ref) =>
  FlexGridComponent({ ...props, ref })
) as FlexGridComponent;

export type { FlexBoxProps, FlexGridProps } from "./Flex.types";
