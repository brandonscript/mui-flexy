import styled from "@emotion/styled";
import { Link, Typography, TypographyOwnProps } from "@mui/material";
import { PropsWithChildren, forwardRef, useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { FlexBox, FlexBoxProps, FlexGrid } from "../../src";
import { FlexProps } from "../../src/Flex.types";

// Or: run `npm link ../` or `yarn link ../` in the ./demo directory
// and import from "mui-flexy":
// import { FlexBox, FlexBoxProps, FlexGrid } from "mui-flexy";

console.log(FlexBox, FlexGrid);

const rowCombinations: Array<[FlexProps<"row">["x"], FlexProps<"row">["y"]]> = [
  ["left", "top"],
  ["left", "center"],
  ["left", "bottom"],
  ["left", "flex-start"],
  ["left", "flex-end"],
  ["left", "stretch"],
  ["left", "baseline"],
  ["right", "top"],
  ["right", "center"],
  ["right", "bottom"],
  ["right", "flex-start"],
  ["right", "flex-end"],
  ["right", "stretch"],
  ["right", "baseline"],
  ["center", "top"],
  ["center", "center"],
  ["center", "bottom"],
  ["center", "flex-start"],
  ["center", "flex-end"],
  ["center", "stretch"],
  ["center", "baseline"],
  ["space-between", "top"],
  ["space-between", "center"],
  ["space-between", "bottom"],
  ["space-around", "top"],
  ["space-around", "center"],
  ["space-around", "bottom"],
  ["space-evenly", "top"],
  ["space-evenly", "center"],
  ["space-evenly", "bottom"],
];

const columnCombinations: Array<[FlexProps<"column">["y"], FlexProps<"column">["x"]]> = [
  ["top", "left"],
  ["top", "center"],
  ["top", "right"],
  ["top", "flex-start"],
  ["top", "flex-end"],
  ["top", "stretch"],
  ["top", "baseline"],
  ["bottom", "left"],
  ["bottom", "center"],
  ["bottom", "right"],
  ["bottom", "flex-start"],
  ["bottom", "flex-end"],
  ["bottom", "stretch"],
  ["bottom", "baseline"],
  ["center", "left"],
  ["center", "center"],
  ["center", "right"],
  ["center", "flex-start"],
  ["center", "flex-end"],
  ["center", "stretch"],
  ["center", "baseline"],
  ["space-between", "left"],
  ["space-between", "center"],
  ["space-between", "right"],
  ["space-around", "left"],
  ["space-around", "center"],
  ["space-around", "right"],
  ["space-evenly", "left"],
  ["space-evenly", "center"],
  ["space-evenly", "right"],
];

const Inner = styled(FlexBox)({
  minHeight: 140,
  border: "1.5px solid #e2ebf8",
  borderRadius: "4px",
  width: "100%",
  gap: "4px",
  padding: "4px",
  backgroundColor: "#fff",
  "& > span": {
    backgroundColor: "#efecf4",
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
});

const gridColumns = { xs: 12, md: 4, l: 4, xl: 4 };
const reponsiveFontSizes = { "& pre": { fontSize: { xs: "0.85rem", md: "1.0vw", lg: "0.85rem" } } };

const Header = forwardRef(
  (
    { text, subtitle }: { text: string; subtitle?: string },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => (
    <FlexGrid item xs={12} component="header" ref={ref} column gap={0}>
      <Typography component="h2" variant="h5">
        {text}
      </Typography>
      <Typography component="h4" variant="subtitle1">
        {subtitle}
      </Typography>
    </FlexGrid>
  )
);
Header.displayName = "Header";

const Code = ({
  inline = false,
  code,
  children,
}: PropsWithChildren<{
  inline?: boolean;
  code?: string;
}>) => (
  // @ts-ignore - children can be a string, but react-syntax-highlighter expects a ReactElement
  <SyntaxHighlighter
    language="javascript"
    customStyle={inline ? { display: "inline", padding: "2px 4px" } : {}}
    style={atelierCaveLight}
  >
    {children?.toString() || code || ""}
  </SyntaxHighlighter>
);

export const FlexTest = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [refState, setRefState] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setRefState(ref.current);
    }
  }, [ref]);

  return (
    <FlexGrid
      container
      width="100vw"
      p={4}
      spacing={2}
      x="center"
      component="main"
      sx={{ bgcolor: "#fff" }}
    >
      <FlexGrid item xs={12} column>
        <FlexBox
          component={(props: TypographyOwnProps) => <Typography {...props} component="h1" />}
          variant="h4"
          row
          x="left"
          // y={{ xs: "top" }}
          gap={2}
        >
          <FlexBox
            width={100}
            height={100}
            mb={2}
            column
            component="img"
            src="apple-touch-icon.png"
            alt="mui-flexy logo"
          />
          Flexy for{" "}
          <Link target="_blank" href="https://mui.com/">
            Material UI
          </Link>
        </FlexBox>
        <Typography variant="body1" component="div">
          {
            "Flexy for MUI is a component wrapper for flexbox styles that allows you to easily \
            align and distribute flexy items in a space in a way that doesn't make you want \
            to pull your hair out trying to remember whether to use "
          }
          <Code inline>justify-content</Code>
          {" or "}
          <Code inline>align-items</Code>
          {
            ". Using a simple and consistent x, y coordinate system, you can stop worrying about \
          the CSS working group's choices and get on with your life of centering divs."
          }
          <br />
          <br />
          {"Flexy components inherit from either "}
          <Link target="_blank" href="https://mui.com/material-ui/react-box/">
            Box
          </Link>{" "}
          or{" "}
          <Link target="_blank" href="https://mui.com/material-ui/react-grid">
            Grid
          </Link>
          {", depending on your needs. Simply use "}
          <Code inline>{"<FlexBox />"}</Code>
          {" or "}
          <Code inline>{"<FlexGrid />"}</Code>
          {" as you would Box or Grid. The default axis is "}
          <Code inline>row</Code>
          {", but for good hygiene, you might want to set "}
          <Code inline>row</Code>
          {" anyway. If you want a column, just pass a "}
          <Code inline>column</Code>
          {"prop, and Flexy will do the hard thinking and make CSS so you don't have to."}
        </Typography>
      </FlexGrid>
      <Header text="Row" subtitle="Simple: props are string values" />
      {rowCombinations.map(([x, y], i) => (
        <FlexGrid item {...gridColumns} key={i} component="article">
          <Inner x={x} y={y} sx={reponsiveFontSizes}>
            <Code
              code={`<FlexBox x="${x}" y="${y}">
  ...
</FlexBox>`}
            />
            <span>🚣</span>
          </Inner>
        </FlexGrid>
      ))}
      <Header
        text="Row (responsive)"
        subtitle="Advanced: props are array or object values (resize the window to see the difference)"
      />
      <FlexGrid item xs={12} component="article">
        <Inner
          x={["center", "left", "center", "right"]}
          y={["center", "top", "center", "bottom"]}
          sx={{ minHeight: 240 }}
        >
          <Code
            code={`<FlexBox\n\
  x={[ "center", "left", "center", "right" ]}\n\
  y={[ "center", "top", "center", "bottom" ]}\n/>\n
// (interpreted as [ xs, sm, md, lg ])`}
          />
          <span>🚣</span>
        </Inner>
      </FlexGrid>
      <FlexGrid item xs={12} component="article">
        <Inner
          x={{ sm: "left", md: "center", lg: "right" }}
          y={{ sm: "top", md: "center", lg: "bottom" }}
          sx={{ minHeight: 240, ...reponsiveFontSizes }}
        >
          <Code
            code={`<FlexBox\n\
  x={{ sm: "left", md: "center", lg: "right" }}\n\
  y={{ sm: "top", md: "center", lg: "bottom" }}\n/>\n
// (interpreted as { sm: _, md: _, lg: _ })`}
          />
          <span>🚣</span>
        </Inner>
      </FlexGrid>
      <Header text="Column" subtitle="Basic: props are string values" />
      {columnCombinations.map(([y, x], i) => (
        <FlexGrid item {...gridColumns} key={i} component="article">
          <Inner x={x} y={y} column sx={reponsiveFontSizes}>
            <Code
              code={`<FlexBox x="${x}" y="${y}" column>
  ...
</FlexBox>`}
            />
            <span>🏛️</span>
          </Inner>
        </FlexGrid>
      ))}

      <Header
        text="Column (responsive)"
        subtitle="Advanced: props are array or object values (resize the window to see the difference)"
      />
      <FlexGrid item xs={12} md={6} component="article">
        <Inner
          x={["center", "left", "center", "right"]}
          y={["center", "top", "center", "bottom"]}
          column
          sx={{ minHeight: [240, 240, 480] }}
        >
          <Code
            code={`<FlexBox\n\
  x={[ "center", "left", "center", "right" ]}\n\
  y={[ "center", "top", "center", "bottom" ]}\n\
  column\n\/>\n
// (interpreted as [ xs, sm, md, lg ])`}
          />
          <span>🏛️</span>
        </Inner>
      </FlexGrid>
      <FlexGrid item xs={12} md={6} component="article">
        <Inner
          x={{ sm: "left", md: "center", lg: "right" }}
          y={{ sm: "top", md: "center", lg: "bottom" }}
          column
          sx={{ minHeight: [240, 240, 480] }}
        >
          <Code
            code={`<FlexBox\n\
  x={{ sm: "left", md: "center", lg: "right" }}\n\
  y={{ sm: "top", md: "center", lg: "bottom" }}\n\
  column\n\/>\n
// (interpreted as { sm: _, md: _, lg: _ })`}
          />
          <span>🏛️</span>
        </Inner>
      </FlexGrid>
      <Header text="Ref test" ref={ref} />
      <FlexGrid item xs={12} component="article">
        <Inner x="center" y="center" column>
          <span>
            {ref?.current?.innerText ? `${ref?.current?.innerText} successful` : "Failed"}
          </span>
          <Code code={ref?.current?.toString()} />
        </Inner>
      </FlexGrid>
      <Header text="Complex props test" />
      {(() => {
        const invalidProps = { prop: "invalid" } as FlexBoxProps;
        return (
          <FlexGrid item xs={12} component="article">
            <Inner x="center" y="center" column {...{ prop: "invalid" }}>
              <span>Complex props test</span>
              <Code code={JSON.stringify(invalidProps)} />
            </Inner>
          </FlexGrid>
        );
      })()}
    </FlexGrid>
  );
};
