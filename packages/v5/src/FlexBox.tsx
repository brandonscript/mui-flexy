import type { BoxProps } from "@mui/material/Box";
import _MuiBox from "@mui/material/Box";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { Theme as MaterialTheme } from "@mui/material/styles";
import type { FlexOrientation } from "@mui-flexy/core";
import { mapFlexProps } from "@mui-flexy/core";
import { forwardRef } from "react";

import type {
  FlexBoxColumnProps,
  FlexBoxProps,
  FlexBoxRowProps,
  FlexBoxTypeMap,
  FlexFixedOrientationTypeMap,
} from "./FlexBox.types";

export type { FlexBoxColumnProps, FlexBoxProps, FlexBoxRowProps };

// PRAGMA: Box has a default export in some MUI versions, so we need to check for it.
// It also tends to conflict with other `Box` components in the same project.
// @ts-ignore
const MuiBox = _MuiBox?.default ?? _MuiBox;

const createFlexBox = <
  O extends FlexOrientation | undefined = undefined,
  D extends React.ElementType = "div",
  P = {},
  T extends object = MaterialTheme,
  R extends object = O extends "row"
    ? OverridableComponent<FlexFixedOrientationTypeMap<"row">>
    : O extends "column"
      ? OverridableComponent<FlexFixedOrientationTypeMap<"column">>
      : OverridableComponent<FlexBoxTypeMap<O, P, D, T>>,
>(
  defaultProps: FlexBoxProps<O, D, P> = {} as FlexBoxProps<O, D, P>,
) =>
  forwardRef<BoxProps["ref"], FlexBoxProps<O, D, P>>((props, ref) => {
    return <MuiBox {...mapFlexProps({ ...defaultProps, ...props } as FlexBoxProps<O, D, P>, ref, "Box")} />;
  }) as R;
export const FlexBox = createFlexBox();
export const FlexRowBox = createFlexBox<"row">({ row: true });
export const FlexColumnBox = createFlexBox<"column">({ column: true });

export default FlexBox;
