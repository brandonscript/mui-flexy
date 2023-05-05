import { Box, Grid } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { forwardRef } from "react";

import { FlexBoxProps, FlexGridProps, FlexProps, FlexTypeMap } from "./Flex.types";
import { getDisplayName, mapFlexProps } from "./Flex.utils";

const flex = <P extends FlexProps = FlexProps>(
  Component: OverridableComponent<FlexTypeMap>,
  componentName?: string
) => {
  const WC = forwardRef((props: P, ref: React.Ref<unknown>) => {
    const { x, y, row, column, reverse, nowrap, ...rest } = props;
    const flexProps = {
      ...rest,
      ...mapFlexProps(props),
    };
    const className = `${props.className || ""} MuiFlex-root${
      componentName ? ` MuiFlex${componentName}-root` : ""
    }`;
    return <Component {...flexProps} ref={ref} className={className} />;
  });
  WC.displayName = `Flex(${componentName ?? getDisplayName(Component)})`;
  return WC;
};

export const FlexBox = flex<FlexBoxProps>(Box, "Box");
export const FlexGrid = flex<FlexGridProps>(
  (props: FlexGridProps) => <FlexBox {...props} component={Grid} />,
  "Grid"
);
export type { FlexBoxProps, FlexGridProps } from "./Flex.types";
