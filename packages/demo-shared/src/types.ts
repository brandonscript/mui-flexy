import { ComponentType, ElementType } from "react";

// Generic component types that can accept any FlexBox/FlexGrid implementation
export type FlexBoxLike = React.ComponentType<any>;

export type FlexGridLike = React.ComponentType<any>;

export type FlexGrid2Like = React.ComponentType<any>;

export interface DemoComponents {
  FlexBox: FlexBoxLike;
  FlexGrid: FlexGridLike;
  FlexGrid2?: FlexGrid2Like;
}

export interface GridSizeProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface DemoHeaderProps {
  text: string;
  subtitle?: string;
  FlexGrid: FlexGridLike;
  getGridSizeProps: (sizeObj: GridSizeProps, muiVersionMajor: number) => any;
}

export interface DemoInnerProps {
  x?: string | string[] | Record<string, string>;
  y?: string | string[] | Record<string, string>;
  row?: boolean | boolean[] | Record<string, boolean>;
  column?: boolean | boolean[] | Record<string, boolean>;
  gap?: number | number[] | Record<string, number>;
  sx?: Record<string, unknown>;
  minHeight?: number | string;
  children?: React.ReactNode;
}
