import { BoxProps, GridProps, GridTypeMap } from "@mui/material";
import { BoxTypeMap, Theme as SystemTheme } from "@mui/system";

// If row, 'justifyContent' governs horizontal spacing.
// If column, 'justifyContent' governs vertical spacing.
type JustifyContentValues =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

// If row, 'alignItems' governs vertical position and behavior.
// If column, 'alignItems' governs horizontal position and behavior.
type AlignItemsValues = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";

export type VerticalAlignable = "top" | "bottom" | "center";
export type HorizontalAlignable = "left" | "right" | "center";

export type XIfRow = HorizontalAlignable | JustifyContentValues;
export type XIfColumn = HorizontalAlignable | AlignItemsValues;

export type YIfRow = VerticalAlignable | AlignItemsValues;
export type YIfColumn = VerticalAlignable | JustifyContentValues;

export type Axis = BoxProps["flexDirection"] | GridProps["direction"] | null;
export type StrictAxis = "row" | "row-reverse" | "column" | "column-reverse";
export type MuiAlign =
  | BoxProps["justifyContent"]
  | BoxProps["alignItems"]
  | GridProps["justifyContent"]
  | GridProps["alignItems"]
  | null;

export type FlexProps<
  ComponentProps extends BoxProps | GridProps,
  Row extends boolean | undefined = undefined,
  Column extends boolean | undefined = undefined,
  X extends XIfRow | XIfColumn = Row extends true ? XIfRow : XIfColumn,
  Y extends YIfRow | YIfColumn = Row extends true ? YIfRow : YIfColumn
> = Row extends true
  ? {
      x?: X;
      y?: Y;
      row?: true;
      column?: never;
      reverse?: boolean;
      nowrap?: boolean;
    } & ComponentProps
  : Column extends true
  ? {
      x?: X;
      y?: Y;
      row?: never;
      column?: true;
      reverse?: boolean;
      nowrap?: boolean;
    } & ComponentProps
  : {
      x?: X;
      y?: Y;
      row?: boolean;
      column?: boolean;
      reverse?: boolean;
      nowrap?: boolean;
    } & ComponentProps;

export type FlexBoxProps = FlexProps<BoxProps>;
export type FlexGridProps = FlexProps<GridProps>;

export type FlexBoxTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
  Theme extends object = SystemTheme
> = BoxTypeMap<FlexProps<BoxProps> & AdditionalProps, RootComponent, Theme>;

export type FlexGridTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div"
> = GridTypeMap<FlexProps<GridProps> & AdditionalProps, RootComponent>;
