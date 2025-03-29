import MuiBox, { BoxProps } from "@mui/material/Box";
import MuiGrid, { GridProps } from "@mui/material/Grid";
import { Theme as MaterialTheme } from "@mui/material/styles";
import React, { forwardRef } from "react";

import type {
  AsComponent,
  FlexBoxColumnProps,
  FlexBoxProps,
  FlexBoxRowProps,
  FlexBoxTypeMap,
  FlexGridColumnProps,
  FlexGridProps,
  FlexGridRowProps,
  FlexGridTypeMap,
  FlexOrientation,
} from "./Flex.types";
import { mapFlexProps } from "./Flex.utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export { FlexBoxColumnProps, FlexBoxProps, FlexBoxRowProps };
const createFlexBox = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {},
  Theme extends object = MaterialTheme,
>() =>
  forwardRef<BoxProps["ref"], FlexBoxProps<Orientation, RootComponent, AdditionalProps>>((props, ref) => (
    <MuiBox {...mapFlexProps(props, ref, "Box")} />
  )) as AsComponent<FlexBoxTypeMap<Orientation, AdditionalProps, RootComponent, Theme>>;
export const FlexBox = createFlexBox();

export { FlexGridColumnProps, FlexGridProps, FlexGridRowProps };
const createFlexGrid = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {},
>() =>
  forwardRef<GridProps["ref"], FlexGridProps<Orientation, RootComponent, AdditionalProps>>(
    // @ts-ignore
    (props, ref) => <MuiGrid {...mapFlexProps(props, ref, "Grid")} />,
  ) as AsComponent<FlexGridTypeMap<Orientation, AdditionalProps, RootComponent>>;
export const FlexGrid = createFlexGrid();
