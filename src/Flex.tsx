import type { Grid2Props } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { Theme as MaterialTheme } from "@mui/material/styles";
import type { BoxProps } from "@mui/system/Box";
import { Theme as SystemTheme } from "@mui/system/createTheme";
import type { GridProps } from "@mui/system/Grid";
import { createElement, forwardRef } from "react";

import type {
  FlexBoxProps,
  FlexBoxTypeMap,
  FlexGrid2Props,
  FlexGridProps,
  FlexGridTypeMap,
  FlexOrientation,
} from "./Flex.types";
import { mapFlexProps } from "./Flex.utils";

const muiPkg = await import("@mui/material/package.json");
const muiVersion = parseInt(muiPkg?.version?.split(".")[0], 10);

const MuiGrid2 = await import("@mui/material").then(m => {
  if (muiVersion > 5) {
    // @ts-ignore
    return m?.Grid2;
  }
  // @ts-ignore
  return m?.Unstable_Grid2;
});

type Grid2Size_v6 = number | false | "auto" | "grow";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

const createFlexBox = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {},
  Theme extends object = SystemTheme & MaterialTheme
>() =>
  forwardRef<BoxProps["ref"], FlexBoxProps<Orientation, RootComponent, AdditionalProps>>(
    (props, ref) => createElement(MuiBox as React.FC, mapFlexProps(props, ref, "Box"))
  ) as OverridableComponent<FlexBoxTypeMap<Orientation, AdditionalProps, RootComponent, Theme>>;

export { FlexBoxProps };
export const FlexBox = createFlexBox();

const createFlexGrid = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {}
>() =>
  forwardRef<GridProps["ref"], FlexGridProps<Orientation, RootComponent, AdditionalProps>>(
    (props, ref) => createElement(MuiGrid as React.FC, mapFlexProps(props, ref, "Grid"))
  ) as OverridableComponent<FlexGridTypeMap<Orientation, AdditionalProps, RootComponent>>;

export { FlexGridProps };
export const FlexGrid = createFlexGrid();

const createFlexGrid2_v6 = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {}
>() =>
  forwardRef<Grid2Props["ref"], FlexGrid2Props<Orientation, RootComponent, AdditionalProps>>(
    (props, ref) => {
      const { xs, sm, md, lg, xl, size, ...rest } = props as _Any;
      const sizeValues = [xs, sm, md, lg, xl].filter(
        value => value !== null && value !== undefined
      );
      const sizeProps: Grid2Size_v6 =
        size ??
        (sizeValues.every(value => value === sizeValues[0])
          ? sizeValues[0]
          : { xs, sm, md, lg, xl });
      props = { ...rest, size: sizeProps };
      return createElement(MuiGrid2 as React.FC, mapFlexProps(props, ref, "Grid2"));
    }
  ) as OverridableComponent<FlexGridTypeMap<Orientation, AdditionalProps, RootComponent>>;

const createFlexGrid2_v5 = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {}
>() =>
  forwardRef<Grid2Props["ref"], FlexGrid2Props<Orientation, RootComponent, AdditionalProps>>(
    (props, ref) => {
      const { size, ...rest } = props as _Any;
      const xs = typeof size === "number" || typeof size === "string" ? size : size?.xs;
      const { xs: _xs, sm, md, lg, xl } = size || {};
      props = {
        ...rest,
        xs: xs || _xs,
        sm,
        md,
        lg,
        xl,
        ref,
      };
      return createElement(MuiGrid2, mapFlexProps(props, ref, "Grid2"));
    }
  ) as OverridableComponent<FlexGridTypeMap<Orientation, AdditionalProps, RootComponent>>;

export { FlexGrid2Props };
export const FlexGrid2 = muiVersion > 5 ? createFlexGrid2_v6() : createFlexGrid2_v5();
