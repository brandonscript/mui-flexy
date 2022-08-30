import { BoxProps, GridProps } from "@mui/material";

export type PropsWithComponent<P> = P & { component?: React.ElementType | undefined };
export type RowAlign =
  | BoxProps["justifyContent"]
  | BoxProps["alignItems"]
  | GridProps["justifyContent"]
  | GridProps["alignItems"];
export type ColumnAlign = Omit<
  | BoxProps["justifyContent"]
  | BoxProps["alignItems"]
  | GridProps["justifyContent"]
  | GridProps["alignItems"]
  | "top"
  | "bottom",
  "left" | "right"
>;
export type Axis = BoxProps["flexDirection"] | GridProps["direction"] | null;
export type StrictAxis = "row" | "row-reverse" | "column" | "column-reverse";
export type Align = RowAlign | ColumnAlign | null;

export type BaseFlexProps<T extends BoxProps | GridProps> = T & {
  x?: Align;
  y?: Align;
  row?: boolean;
  column?: boolean;
  reverse?: boolean;
  nowrap?: boolean;
};
export type FlexBoxProps = BaseFlexProps<BoxProps>;
export type FlexGridProps = BaseFlexProps<GridProps>;

export type FlexReturnType<T extends BoxProps | GridProps> = T;