import type { BoxProps, Grid2Props, GridProps } from "@mui/material";
import { CSSProperties } from "react";

import {
  type InferFlexProps,
  type ResponsiveFlexBoolean,
  ResponsiveFlexDirection,
  ResponsiveFlexPosition,
} from "./Flex.types";

type _Any = unknown;
type CSSFlexDirection = CSSProperties["flexDirection"];
type MappableFlexProps = Partial<InferFlexProps> & Partial<BoxProps | GridProps | Grid2Props>;
export declare const mapFlexProps: <P extends MappableFlexProps = MappableFlexProps>(
  props: P,
  ref?: React.Ref<_Any> | null,
  componentName?: "Box" | "Grid" | "Grid2",
) => P;
export declare const _test: {
  mapAlignment: (alignment?: _Any) => ResponsiveFlexPosition;
  mapDirection: (
    direction: ResponsiveFlexDirection | undefined | null,
    reverse?: boolean | undefined | null,
  ) => ResponsiveFlexDirection;
  mapFlexProps: <P extends MappableFlexProps = MappableFlexProps>(
    props: P,
    ref?: React.Ref<_Any> | null,
    componentName?: "Box" | "Grid" | "Grid2",
  ) => P;
  resolveDirection: <R extends ResponsiveFlexDirection = ResponsiveFlexDirection>(
    row: ResponsiveFlexDirection | ResponsiveFlexBoolean | undefined | null,
    column: ResponsiveFlexDirection | ResponsiveFlexBoolean | undefined | null,
    reverse?: boolean | undefined | null,
    fallback?: ResponsiveFlexDirection,
  ) => R | CSSFlexDirection | undefined;
};
export {};
