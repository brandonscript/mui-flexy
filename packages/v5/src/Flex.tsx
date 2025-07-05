import { Box, Grid } from "@mui/material";
import type {
  FlexBoxColumnProps,
  FlexBoxProps,
  FlexBoxRowProps,
  FlexGridColumnProps,
  FlexGridProps,
  FlexGridRowProps,
  FlexOrientation,
} from "@mui-flexy/core";
import { _test } from "@mui-flexy/core";
import React, { forwardRef } from "react";

const { mapFlexProps } = _test;

/**
 * FlexBox component for MUI v5
 * A flexible Box component with convenient shorthand props for flexbox layouts
 */
export const FlexBox = forwardRef<HTMLDivElement, FlexBoxProps<FlexOrientation | undefined, React.ElementType>>(
  function FlexBox(props, ref) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedProps = mapFlexProps(props as any, ref, "Box");
    return <Box {...mappedProps} />;
  },
);

/**
 * FlexGrid component for MUI v5
 * @deprecated Use FlexBox instead. Grid-based flex components are deprecated in favor of Box-based components.
 */
export const FlexGrid = forwardRef<HTMLDivElement, FlexGridProps<FlexOrientation | undefined, React.ElementType>>(
  function FlexGrid(props, ref) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedProps = mapFlexProps(props as any, ref, "Grid");
    return <Grid {...mappedProps} />;
  },
);

// Convenience aliases
export const FlexRow = forwardRef<HTMLDivElement, FlexBoxRowProps>(function FlexRow(props, ref) {
  return <FlexBox ref={ref} row {...props} />;
});

export const FlexColumn = forwardRef<HTMLDivElement, FlexBoxColumnProps>(function FlexColumn(props, ref) {
  return <FlexBox ref={ref} column {...props} />;
});

/**
 * @deprecated Use FlexRow instead
 */
export const FlexGridRow = forwardRef<HTMLDivElement, FlexGridRowProps>(function FlexGridRow(props, ref) {
  return <FlexGrid ref={ref} row {...props} />;
});

/**
 * @deprecated Use FlexColumn instead
 */
export const FlexGridColumn = forwardRef<HTMLDivElement, FlexGridColumnProps>(function FlexGridColumn(props, ref) {
  return <FlexGrid ref={ref} column {...props} />;
});
