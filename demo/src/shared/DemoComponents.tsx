import { styled, Typography } from "@mui/material";
import { forwardRef, PropsWithChildren } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { demoBgColor } from "./DemoTheme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export const rowArrow = (
  <span style={{ writingMode: "vertical-rl", textOrientation: "sideways" }} aria-label="left-right arrow">
    ⇅
  </span>
);

export const colArrow = (
  <span style={{ writingMode: "vertical-rl", textOrientation: "upright" }} aria-label="up-down arrow">
    ⇅
  </span>
);

export const DemoHeader = forwardRef<
  HTMLDivElement,
  { text: string; subtitle?: string; FlexGrid: any; getGridSizeProps: any }
>(({ text, subtitle, FlexGrid, getGridSizeProps }, ref) => (
  <FlexGrid item {...getGridSizeProps({ xs: 12 })} component="header" ref={ref} column gap={0}>
    <Typography component="h2" variant="h5" sx={{ display: "flex", alignItems: "center" }}>
      {text}
      {text.toLowerCase().includes("row") ? rowArrow : text.toLowerCase().includes("column") ? colArrow : ""}
    </Typography>
    <Typography component="h4" variant="subtitle1">
      {subtitle}
    </Typography>
  </FlexGrid>
));
DemoHeader.displayName = "DemoHeader";

export const DemoCode = ({
  inline = false,
  width,
  code,
  children,
  margin = "",
}: PropsWithChildren<{
  width?: string | number;
  inline?: boolean;
  code?: string;
  margin?: number | string;
}>) => (
  // @ts-ignore - children can be a string, but react-syntax-highlighter expects a ReactElement
  <SyntaxHighlighter
    language="javascript"
    customStyle={
      inline
        ? {
            display: "inline",
            padding: "2px 4px",
            width,
            background: demoBgColor,
            borderRadius: 4,
            margin,
          }
        : { background: demoBgColor, borderRadius: 4, margin }
    }
    style={atelierCaveLight}
  >
    {children?.toString() || code || ""}
  </SyntaxHighlighter>
);

export const createDemoInner = (FlexBox: any) =>
  styled(FlexBox)<any>((props) => ({
    minHeight: props?.minHeight ?? (props?.sx as _Any)?.minHeight ?? 120,
    border: "1.5px solid #e2ebf8",
    borderRadius: "4px",
    flexGrow: 1,
    gap: "4px",
    padding: "4px",
    backgroundColor: "#fff",
    "& > span": {
      backgroundColor: demoBgColor,
      paddingLeft: "4px",
      paddingRight: "4px",
      borderRadius: "4px",
    },
    "& > pre": {
      margin: 0,
      borderRadius: "4px",
    },
    "& pre, & code": {
      whiteSpace: "break-spaces",
    },
  }));

export const DemoTitle = ({
  packageName,
  packageVersion,
  muiVersion,
}: {
  packageName: string;
  packageVersion: string;
  muiVersion: string;
}) => (
  <>
    <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
      {packageName}
    </Typography>
    <Typography variant="body2" component="p" sx={{ mb: 3 }}>
      Package version: {packageVersion} | MUI version: {muiVersion}
    </Typography>
  </>
);

// Helper function to handle Grid size props for different MUI versions
export const getGridSizeProps = (sizeObj: Record<string, number>, muiVersionMajor: number) => {
  if (muiVersionMajor >= 7) {
    // For MUI v7+, convert old props to new size format
    return { size: sizeObj };
  }
  // For MUI v5/v6, use the old format
  return sizeObj;
};
