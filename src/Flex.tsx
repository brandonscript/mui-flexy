import MuiBox, { BoxProps } from "@mui/material/Box";
import MuiGrid, { GridProps } from "@mui/material/Grid";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { Theme as MaterialTheme } from "@mui/material/styles";
import { major as muiVersion } from "@mui/material/version";
import { Theme as SystemTheme } from "@mui/system";
import { forwardRef } from "react";

import type {
  FlexBoxProps,
  FlexBoxTypeMap,
  FlexGrid2Props,
  FlexGridProps,
  FlexGridTypeMap,
  FlexOrientation,
} from "./Flex.types";
import { mapFlexProps } from "./Flex.utils";
import { createUnstable_FlexGrid2 } from "./v5";
import { createFlexGrid2 } from "./v6";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export { FlexBoxProps };
const createFlexBox = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {},
  Theme extends object = SystemTheme & MaterialTheme,
>() =>
  forwardRef<BoxProps["ref"], FlexBoxProps<Orientation, RootComponent, AdditionalProps>>((props, ref) => (
    <MuiBox {...mapFlexProps(props, ref, "Box")} />
  )) as OverridableComponent<FlexBoxTypeMap<Orientation, AdditionalProps, RootComponent, Theme>>;
export const FlexBox = createFlexBox();

export { FlexGridProps };
const createFlexGrid = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {},
>() =>
  forwardRef<GridProps["ref"], FlexGridProps<Orientation, RootComponent, AdditionalProps>>(
    // @ts-ignore
    (props, ref) => <MuiGrid {...mapFlexProps(props, ref, "Grid")} />,
  ) as OverridableComponent<FlexGridTypeMap<Orientation, AdditionalProps, RootComponent>>;
export const FlexGrid = createFlexGrid();

export { FlexGrid2Props };
export const FlexGrid2 = (() => {
  try {
    return muiVersion > 5 ? createFlexGrid2() : createUnstable_FlexGrid2();
  } catch (err: _Any) {
    return forwardRef((props, ref) => (
      <MuiBox {...props} ref={ref}>
        {String(err?.message || err)}
      </MuiBox>
    ));
  }
})();
