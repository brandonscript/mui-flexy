import type { TypographyOwnProps, TypographyProps } from "@mui/material";
import { Link, styled, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
import * as React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { fixtureBgColor, reponsiveFontSizes } from "./FixtureTheme";
import type { FixtureInnerProps, FlexBoxLike } from "./types";

export const FixtureCode = ({
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
            background: fixtureBgColor,
            borderRadius: 4,
            margin,
            fontSize: "clamp(0.75rem, 2.5vw, 0.875rem)",
          }
        : {
            background: fixtureBgColor,
            borderRadius: 4,
            margin,
            fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
          }
    }
    style={atelierCaveLight}
  >
    {children?.toString() || code || ""}
  </SyntaxHighlighter>
);

export const createFixtureInner = (FlexBox: FlexBoxLike) =>
  styled(FlexBox)<FixtureInnerProps>((props) => ({
    minHeight: props?.minHeight ?? (props?.sx as any)?.minHeight ?? 120,
    border: "1.5px solid #e2ebf8",
    borderRadius: "4px",
    flexGrow: 1,
    gap: "4px",
    padding: "4px",
    backgroundColor: "#fff",
    "& > span": {
      backgroundColor: fixtureBgColor,
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

export const FixtureTitle = ({
  packageName,
  muiVersion,
  FlexBox,
}: {
  packageName: string;
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
    <FlexBox row={[false, true]} gap={[0.5, 1.5]}>
      {packageName} for
      <Link target="_blank" href="https://mui.com/" sx={{ ml: -0.75 }}>
        @mui/material^{muiVersion.split(".")[0]}
      </Link>
    </FlexBox>
  </FlexBox>
);

export const FixtureDescription = ({ gridComponentName = "FlexGrid" }: { gridComponentName?: string }) => (
  <Typography variant="body1" component="div">
    {
      "mui-flexy extends MUI's Box and Grid components to allow you to easily align and \
      distribute flexbox items in a space in a way that doesn't make you want to pull your \
      hair out trying to remember whether to use "
    }
    <FixtureCode inline>justify-content</FixtureCode>
    {" or "}
    <FixtureCode inline>align-items</FixtureCode>
    {
      ". Using a simple and consistent x, y coordinate system, you can stop worrying about \
        the CSS working group's choices and get on with your life of centering divs and building forms."
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
    <FixtureCode inline>{"<FlexBox />"}</FixtureCode>
    {" or "}
    <FixtureCode inline>{`<${gridComponentName} />`}</FixtureCode>
    {` as you would Box or ${gridComponentName === "FlexGrid2" ? "Grid2" : "Grid"}. The default axis is `}
    <FixtureCode inline>row</FixtureCode>
    {", but for good hygiene, you might want to set "}
    <FixtureCode inline>row</FixtureCode>
    {" anyway. If you want a column, just pass a "}
    <FixtureCode inline>column</FixtureCode>
    {"prop, and mui-flexy will do the hard thinking and make CSS so you don't have to."}
  </Typography>
);

// Hook for re-rendering
export const useRenderer = () => {
  const [, _render] = React.useState({});
  return React.useCallback(() => _render({}), []);
};

// Shared section titles
export const FixtureSectionTitle = styled((props: TypographyProps) => (
  <Typography component="h2" variant="h5" {...props} />
))(({ theme }) =>
  theme.unstable_sx({
    mt: 1.5,
    fontWeight: "medium",
  }),
);

// Common section titles used across all fixtures
export const RowBasicTitle = () => <FixtureSectionTitle>Row (basic) - Props are string values</FixtureSectionTitle>;

export const ColumnBasicTitle = () => (
  <FixtureSectionTitle>Column (basic) - Props are string values</FixtureSectionTitle>
);

export const RefTestTitle = () => <FixtureSectionTitle>Ref test</FixtureSectionTitle>;

export const ComplexPropsTitle = () => <FixtureSectionTitle>Complex props test</FixtureSectionTitle>;

// Version-specific section titles
export const BasicGridTitle = ({ gridComponentName = "FlexGrid" }: { gridComponentName?: string }) => (
  <FixtureSectionTitle>Basic CSS Grid ({gridComponentName})</FixtureSectionTitle>
);

export const GridTemplatingTitle = ({ gridComponentName = "FlexGrid" }: { gridComponentName?: string }) => (
  <FixtureSectionTitle>CSS Grid ({gridComponentName}) with grid templating</FixtureSectionTitle>
);

export const Grid2VersionTitle = ({ version }: { version: string }) => (
  <FixtureSectionTitle>Grid2 (@mui v{version}+)</FixtureSectionTitle>
);

// Export responsive font sizes
export { reponsiveFontSizes };
