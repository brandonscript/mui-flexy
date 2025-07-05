import { Link, styled, Typography, TypographyOwnProps } from "@mui/material";
import React, { forwardRef, PropsWithChildren } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { demoBgColor, reponsiveFontSizes } from "./DemoTheme";
import { DemoHeaderProps, DemoInnerProps, FlexBoxLike, FlexGridLike, GridSizeProps } from "./types";

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

export const DemoHeader = forwardRef<HTMLDivElement, DemoHeaderProps>(
  ({ text, subtitle, FlexGrid, getGridSizeProps }, ref) => (
    <FlexGrid item {...getGridSizeProps({ xs: 12 }, 6)} component="header" ref={ref} column gap={0}>
      <Typography component="h2" variant="h5" sx={{ display: "flex", alignItems: "center" }}>
        {text}
        {text.toLowerCase().includes("row") ? rowArrow : text.toLowerCase().includes("column") ? colArrow : ""}
      </Typography>
      <Typography component="h4" variant="subtitle1">
        {subtitle}
      </Typography>
    </FlexGrid>
  ),
);
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

export const createDemoInner = (FlexBox: FlexBoxLike) =>
  styled(FlexBox)<DemoInnerProps>((props) => ({
    minHeight: props?.minHeight ?? (props?.sx as any)?.minHeight ?? 120,
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
  FlexBox,
}: {
  packageName: string;
  packageVersion: string;
  muiVersion: string;
  FlexBox: FlexBoxLike;
}) => (
  <FlexBox
    component={(props: TypographyOwnProps) => <Typography {...props} component="h1" />}
    variant="h4"
    row
    x="left"
    y="center"
    gap={2}
  >
    <FlexBox
      width={100}
      height={100}
      mb={2}
      ml={-1}
      column
      component="img"
      src="apple-touch-icon.png"
      alt="mui-flexy logo"
    />
    {packageName} for
    <Link target="_blank" href="https://mui.com/" sx={{ ml: -0.75 }}>
      @mui/material^{muiVersion.split(".")[0]}
    </Link>
  </FlexBox>
);

export const DemoDescription = ({ FlexBox }: { FlexBox: FlexBoxLike }) => (
  <Typography variant="body1" component="div">
    {
      "mui-flexy for MUI is a component wrapper for flexbox styles that allows you to easily \
        align and distribute flexy items in a space in a way that doesn't make you want \
        to pull your hair out trying to remember whether to use "
    }
    <DemoCode inline>justify-content</DemoCode>
    {" or "}
    <DemoCode inline>align-items</DemoCode>
    {
      ". Using a simple and consistent x, y coordinate system, you can stop worrying about \
        the CSS working group's choices and get on with your life of centering divs."
    }
    <br />
    <br />
    {"Flex components inherit from either "}
    <Link target="_blank" href="https://mui.com/material-ui/react-box/">
      Box
    </Link>{" "}
    or{" "}
    <Link target="_blank" href="https://mui.com/material-ui/react-grid">
      Grid
    </Link>
    {", depending on your needs. Simply use "}
    <DemoCode inline>{"<FlexBox />"}</DemoCode>
    {" or "}
    <DemoCode inline>{"<FlexGrid />"}</DemoCode>
    {" as you would Box or Grid. The default axis is "}
    <DemoCode inline>row</DemoCode>
    {", but for good hygiene, you might want to set "}
    <DemoCode inline>row</DemoCode>
    {" anyway. If you want a column, just pass a "}
    <DemoCode inline>column</DemoCode>
    {"prop, and Flexy will do the hard thinking and make CSS so you don't have to."}
  </Typography>
);

// Helper function to handle Grid size props for different MUI versions
export const getGridSizeProps = (sizeObj: GridSizeProps, muiVersionMajor: number) => {
  if (muiVersionMajor >= 7) {
    // For MUI v7+, convert old props to new size format
    return { size: sizeObj };
  }
  // For MUI v5/v6, use the old format
  return sizeObj;
};

// Create styled grid and box sections
export const createGridSection = (FlexGrid: FlexGridLike) =>
  styled(FlexGrid)(({ theme }) =>
    theme.unstable_sx({
      "&.MuiGrid-root, &.MuiGrid2-root": {
        maxWidth: "100%",
      },
    }),
  );

export const createBoxSection = (FlexBox: FlexBoxLike) =>
  styled(FlexBox)(({ theme }) =>
    theme.unstable_sx({
      width: "100%",
      maxWidth: "100%",
      rowGap: [2, 3, 4],
    }),
  );

export const createGridItem = (FlexGrid: FlexGridLike) =>
  styled(FlexGrid)({
    width: "100%",
  });

// Hook for re-rendering
export const useRenderer = () => {
  const [, _render] = React.useState({});
  return React.useCallback(() => _render({}), []);
};

// Export responsive font sizes
export { reponsiveFontSizes };
