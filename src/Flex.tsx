import { Box, Grid } from "@mui/material";

import React from "react";
import { FlexBoxProps, FlexGridProps } from "./Flex.types";
import { mapFlexProps } from "./Flex.utils";

export const FlexBox = React.forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => (
  <Box {...mapFlexProps(props, "Box")} ref={ref} />
));
export const FlexGrid = React.forwardRef<HTMLDivElement, FlexGridProps>((props, ref) => (
  <Grid {...mapFlexProps(props, "Grid")} ref={ref} />
));

export type { FlexBoxProps, FlexGridProps } from "./Flex.types";
