import styled from "@emotion/styled";
import { Grid, Link, Typography, TypographyOwnProps } from "@mui/material";
import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { FlexGridProps } from "../../dist";
import pkg from "../../package.json";
import { FlexBox, FlexBoxProps, FlexGrid } from "../../src";

// Or: run `npm link ../` or `yarn link ../` in the ./demo directory
// and import from "mui-flexy":
// import { FlexBox, FlexBoxProps, FlexGrid } from "mui-flexy";

console.log(pkg.name, pkg.version, FlexBox, FlexGrid);

const rowCombinations: Array<[FlexBoxProps<"row">["x"], FlexBoxProps<"row">["y"]]> = [
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

const columnCombinations: Array<[FlexBoxProps<"column">["y"], FlexBoxProps<"column">["x"]]> = [
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

const Inner = styled(FlexBox)<FlexBoxProps>(props => ({
  minHeight: props?.minHeight ?? (props?.sx as any)?.minHeight ?? 120,
  border: "1.5px solid #e2ebf8",
  borderRadius: "4px",
  flexGrow: 1,
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
}));

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
  width,
  code,
  children,
}: PropsWithChildren<{
  width?: string | number;
  inline?: boolean;
  code?: string;
}>) => (
  // @ts-ignore - children can be a string, but react-syntax-highlighter expects a ReactElement
  <SyntaxHighlighter
    language="javascript"
    customStyle={inline ? { display: "inline", padding: "2px 4px", width } : {}}
    style={atelierCaveLight}
  >
    {children?.toString() || code || ""}
  </SyntaxHighlighter>
);

const Title = () => (
  <>
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
  </>
);

const Section = styled((props: FlexGridProps = {}) => (
  <FlexGrid {...props} item xs={12} component="article" />
))({
  width: "100%",
});

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
      pr={2}
      spacing={2}
      x="center"
      component="main"
      sx={{ bgcolor: "#fff" }}
    >
      <FlexGrid item xs={12} column>
        <Title />
      </FlexGrid>
      <Header text="Row" subtitle="Simple: props are string values" />
      {rowCombinations.map(([x, y], i) => (
        <Grid item {...gridColumns} key={i} component="article">
          <Inner x={x} y={y} sx={reponsiveFontSizes}>
            <Code
              code={`<FlexBox x="${x}" y="${y}">
  ...
</FlexBox>`}
            />
            <span>🚣</span>
          </Inner>
        </Grid>
      ))}
      <Header
        text="Row (responsive)"
        subtitle="Advanced: props are array or object values (resize the window to see the difference)"
      />
      <Section>
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
      </Section>
      <Section>
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
      </Section>
      <Header text="Column" subtitle="Basic: props are string values" />
      {columnCombinations.map(([y, x], i) => (
        <Section item {...gridColumns} key={i}>
          <Inner x={x} y={y} column sx={reponsiveFontSizes}>
            <Code
              code={`<FlexBox x="${x}" y="${y}" column>
  ...
</FlexBox>`}
            />
            <span>🏛️</span>
          </Inner>
        </Section>
      ))}

      <Header
        text="Column (responsive)"
        subtitle="Advanced: props are array or object values (resize the window to see the difference)"
      />
      <Section item xs={12} md={6}>
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
      </Section>
      <Section item xs={12} md={6}>
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
      </Section>
      <Header text="Basic CSS Grid (FlexGrid)" />
      <FlexBox x="center" y="center" pl={2}>
        <FlexGrid container spacing={2}>
          {[...Array(12).keys()].map(i => (
            <FlexGrid item key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Inner x="center" y="center">
                <Code
                  code={`<FlexGrid item>
  ${i + 1}
</FlexGrid>`}
                />
              </Inner>
            </FlexGrid>
          ))}
        </FlexGrid>
      </FlexBox>
      <Header text="CSS Grid (FlexGrid) with grid templating" />
      <FlexBox x="center" y="center" mt={2} ml={1} mr={-1} width="100%">
        <FlexGrid
          container
          spacing={2}
          display="grid"
          sx={{
            width: "100%",
            bgcolor: "background.default",
            gridTemplateColumns: "auto 1fr auto",
            gridTemplateRows: "auto 1fr auto",
            gridAutoRows: "minmax(150px, 1fr)",
            gridTemplateAreas: `
              "header header header"
              "left center right"
              "footer footer footer"`,
            gridAutoFlow: "row",
            "& .header": { gridArea: "header" },
            "& .left": { gridArea: "left" },
            "& .center": { gridArea: "center" },
            "& .right": { gridArea: "right" },
            "& .footer": { gridArea: "footer" },
          }}
        >
          <FlexGrid item className="header">
            <Inner x="center" y="center" minHeight="auto">
              <Code code={`<FlexGrid item className="header">Header</FlexGrid>`} />
            </Inner>
          </FlexGrid>
          <FlexGrid item className="left">
            <Inner x="center" y="center" minHeight="auto">
              <Code
                code={`<FlexGrid item className="left">
  Left
</FlexGrid>`}
              />
            </Inner>
          </FlexGrid>
          <FlexGrid item className="center">
            <Inner x="center" y="center" minHeight="auto">
              <Code
                code={`<FlexGrid item className="center">
  Center
</FlexGrid>`}
              />
            </Inner>
          </FlexGrid>
          <FlexGrid item className="right">
            <Inner x="center" y="center" minHeight="auto">
              <Code
                code={`<FlexGrid item className="right">
  Right
</FlexGrid>`}
              />
            </Inner>
          </FlexGrid>
          <FlexGrid item className="footer">
            <Inner x="center" y="center" minHeight={"auto"}>
              <Code code={`<FlexGrid item className="footer">Footer</FlexGrid>`} />
            </Inner>
          </FlexGrid>
        </FlexGrid>
      </FlexBox>
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
