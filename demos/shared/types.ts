import React from "react";

// Generic component types that can accept any FlexBox/FlexGrid implementation
export type FlexBoxLike = React.ComponentType<any>;

export interface DemoInnerProps {
  minHeight?: number | string;
  sx?: any;
}
