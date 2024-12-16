import { Box, Grid } from "@mui/material";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Theme as MaterialTheme } from "@mui/material/styles";
import { createElement, forwardRef } from "react";
import { FlexBoxProps, FlexBoxTypeMap, FlexGridProps, FlexGridTypeMap } from "./Flex.types";
import { mapFlexProps } from "./Flex.utils";

const FlexBoxComponent = (props: FlexBoxProps) =>
  createElement<OverridableComponent<FlexBoxTypeMap<{}, "div", MaterialTheme>>>(
    Box as React.FC<OverridableComponent<FlexBoxTypeMap<{}, "div", MaterialTheme>>>,
    mapFlexProps(props, "Box") as OverridableComponent<FlexBoxTypeMap<{}, "div", MaterialTheme>>
  );

export const FlexBox = forwardRef<unknown, FlexBoxProps>((props: FlexBoxProps, ref) =>
  FlexBoxComponent({ ...props, ref })
) as OverridableComponent<FlexBoxTypeMap<{}, "div", MaterialTheme>>;

const FlexGridComponent = (props: FlexGridProps) =>
  createElement<OverridableComponent<FlexGridTypeMap<{}, "div">>>(
    Grid as React.FC<OverridableComponent<FlexGridTypeMap<{}, "div">>>,
    mapFlexProps(props, "Grid") as OverridableComponent<FlexGridTypeMap<{}, "div">>
  );

export const FlexGrid = forwardRef<HTMLDivElement, FlexGridProps>((props: FlexGridProps, ref) =>
  FlexGridComponent({ ...props, ref })
) as OverridableComponent<FlexGridTypeMap<{}, "div">>;

export type { FlexBoxProps, FlexGridProps } from "./Flex.types";
