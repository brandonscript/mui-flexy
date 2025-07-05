import _MuiBox, { BoxProps } from "@mui/material/Box";
import Grid2, { Grid2Props } from "@mui/material/Grid2";
import {
  AsComponent,
  FlexBoxColumnProps,
  FlexBoxProps,
  FlexBoxRowProps,
  FlexBoxTypeMap,
  FlexOrientation,
  mapFlexProps,
} from "@mui-flexy/core";
import React, { forwardRef } from "react";

// @ts-ignore
const MuiBox = _MuiBox?.default ?? _MuiBox;

export type { FlexBoxColumnProps, FlexBoxProps, FlexBoxRowProps };

const createFlexBox = <O extends FlexOrientation | undefined = undefined, D extends React.ElementType = "div", P = {}>(
  defaultProps: FlexBoxProps<O, D, P> = {} as FlexBoxProps<O, D, P>,
) =>
  forwardRef<BoxProps["ref"], FlexBoxProps<O, D, P>>(
    // @ts-ignore
    (props, ref) => <MuiBox {...defaultProps} {...mapFlexProps(props, ref, "Box")} />,
  ) as AsComponent<FlexBoxTypeMap<O, P, D>>;

export const FlexBox = createFlexBox();

// Grid2 component for v6
export interface FlexGrid2Props<D extends React.ElementType = "div", _P = { component?: React.ElementType }>
  extends Grid2Props {
  sx?: Grid2Props["sx"];
  component?: D;
  row?: true | boolean;
  column?: true | boolean;
  reverse?: boolean;
  nowrap?: boolean;
  x?: string;
  y?: string;
}

const createFlexGrid2 = <
  _O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = "div",
  P = {},
>(
  defaultProps: FlexGrid2Props<D, P> = {} as FlexGrid2Props<D, P>,
) =>
  forwardRef<Grid2Props["ref"], FlexGrid2Props<D, P>>(
    // @ts-ignore
    (props, ref) => <Grid2 {...defaultProps} {...mapFlexProps(props, ref, "Grid2")} />,
  );

export const FlexGrid2 = createFlexGrid2();
