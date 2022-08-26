import { Box, Grid } from "@mui/material";
import { BoxProps } from "@mui/material/Box";
import { GridProps } from "@mui/material/Grid";
import React, { forwardRef } from "react";
import { BaseFlexProps, PropsWithComponent } from "./Flex.types";
import { getDisplayName, mapFlexProps } from "./Flex.utils";

const Flex = <C extends BoxProps | GridProps>(Component: React.ComponentType<C>) => {
  const WC = forwardRef(
    <R extends HTMLElement = HTMLDivElement>(
      props: PropsWithComponent<BaseFlexProps<C>>,
      ref?: React.ForwardedRef<R>
    ) => {
      const { x, y, row, column, reverse, nowrap, ...rest } = props;
      const flexProps = mapFlexProps(props);
      return <Component {...(rest as C)} {...flexProps} ref={ref} />;
    }
  );
  WC.displayName = `Flex(${getDisplayName(Component)})`;
  return WC;
}

export const FlexBox = Flex<BoxProps>(Box);
export const FlexGrid = Flex<GridProps>(Grid);