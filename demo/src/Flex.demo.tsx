import { Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import { FlexBox, FlexGrid } from "../../src/Flex";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FlexBoxProps } from "src";

const rowCombinations = [
  ["left", "top"],
  ["left", "center"],
  ["left", "bottom"],
  ["left", "space-between"],
  ["left", "space-around"],
  ["left", "space-evenly"],
  ["right", "top"],
  ["right", "center"],
  ["right", "bottom"],
  ["right", "space-between"],
  ["right", "space-around"],
  ["right", "space-evenly"],
  ["center", "top"],
  ["center", "center"],
  ["center", "bottom"],
  ["center", "space-between"],
  ["center", "space-around"],
  ["center", "space-evenly"],
];

const columnCombinations = [
  ["top", "left"],
  ["top", "center"],
  ["top", "right"],
  ["top", "space-between"],
  ["top", "space-around"],
  ["top", "space-evenly"],
  ["center", "left"],
  ["center", "center"],
  ["center", "right"],
  ["center", "space-between"],
  ["center", "space-around"],
  ["center", "space-evenly"],
  ["bottom", "left"],
  ["bottom", "center"],
  ["bottom", "right"],
  ["bottom", "space-between"],
  ["bottom", "space-around"],
  ["bottom", "space-evenly"],
];

const Inner = styled(FlexBox)({
  minHeight: 120,
  border: "1.5px solid lightgrey",
  borderRadius: "4px",
  width: "100%",
  gap: "4px",
  padding: "4px",
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
    whiteSpace: "break-spaces !important",
  },
});

const columns = { xs: 12, sm: 6, xl: 4 };

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
}: PropsWithChildren<{ inline?: boolean; code?: string }>) => (
  <SyntaxHighlighter
    language="javascript"
    customStyle={inline ? { display: "inline", padding: '2px 4px' } : {}}
    style={atelierCaveLight}
  >
    {children?.toString() || code || ""}
  </SyntaxHighlighter>
);

const FlexTest = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [refState, setRefState] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setRefState(ref.current);
    }
  }, [ref]);

  return (
    <FlexGrid container width="100vw" p={4} spacing={2} x="center">
      <FlexGrid item xs={12} column>
        <Typography variant="h4" component="h1">
          Flex for{" "}
          <Link target="_blank" href="https://mui.com/">
            Material UI
          </Link>
        </Typography>
        <Typography variant="body1" component="p">
          {
            "Flex for MUI is a component wrapper for flexbox styles that allows you to easily \
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
          {"Flex components inherit from either "}
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
          {"prop, and Flex will do the hard thinking and make CSS so you don't have to."}
        </Typography>
      </FlexGrid>
      <Header text="Row" subtitle="Simple: props are string values" />
      {columnCombinations.map(([y, x], i) => (
        <FlexGrid item {...columns} key={i} component="article">
          <Inner x={x} y={y}>
            <Code code={`<FlexBox x="${x}" y="${y}"> </FlexBox>`} />
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
  y={[ "center", "top", "center", "bottom" ]}\n\
> </FlexBox>\n
// (interpreted as [ xs, sm, md, lg ])`}
          />
          <span>🚣</span>
        </Inner>
      </FlexGrid>
      <FlexGrid item xs={12} component="article">
        <Inner
          x={{ sm: "left", md: "center", lg: "right" }}
          y={{ sm: "top", md: "center", lg: "bottom" }}
          sx={{ minHeight: 240 }}
        >
          <Code
            code={`<FlexBox\n\
  x={{ sm: "left", md: "center", lg: "right" }}\n\
  y={{ sm: "top", md: "center", lg: "bottom" }}\n\
> </FlexBox>\n
// (interpreted as { sm: _, md: _, lg: _ })`}
          />
          <span>🚣</span>
        </Inner>
      </FlexGrid>
      <Header text="Column" subtitle="Basic: props are string values" />
      {rowCombinations.map(([x, y], i) => (
        <FlexGrid item {...columns} key={i} component="article">
          <Inner x={x} y={y} column>
            <Code code={`<FlexBox x="${x}" y="${y}" column> </FlexBox>`} />
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
  column\n\
> </FlexBox>\n
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
  column\n\
> </FlexBox>\n
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
        const invalidProps = { prop: 'invalid' } as FlexBoxProps;
        return (
          <FlexGrid item xs={12} component="article">
            <Inner x="center" y="center" column {...({ prop: "invalid" } as FlexBoxProps)}>
              <span>Complex props test</span>
              <Code code={JSON.stringify(invalidProps)} />
            </Inner>
          </FlexGrid>
        );
      })()}
      
    </FlexGrid>
  );
};

export default FlexTest;
