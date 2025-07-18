// @ts-ignore
import type { BoxProps } from "@mui/material/Box_v6";
// @ts-ignore
import _MuiBox from "@mui/material/Box_v6";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
// @ts-ignore
import type { Theme as MaterialTheme } from "@mui/material/styles_v6";
import type { FlexOrientation } from "@mui-flexy/core";
import { mapFlexProps } from "@mui-flexy/core";
import { forwardRef } from "react";

import type { FlexBoxColumnProps, FlexBoxProps, FlexBoxRowProps, FlexBoxTypeMap } from "./FlexBox.types";

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
>(
  defaultProps: FlexBoxProps<O, D, P> = {} as FlexBoxProps<O, D, P>,
) =>
  forwardRef<BoxProps["ref"], FlexBoxProps<O, D, P>>((props, ref) => (
    <MuiBox {...defaultProps} {...mapFlexProps(props, ref, "Box")} />
  )) as OverridableComponent<FlexBoxTypeMap<O, P, D, T>>;
export const FlexBox = createFlexBox();
export const FlexRowBox = createFlexBox<"row">({ row: true });
export const FlexColumnBox = createFlexBox<"column">({ column: true });

export default FlexBox;
