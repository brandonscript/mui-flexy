import { Link, styled, Typography, TypographyOwnProps } from "@mui/material";
import { forwardRef, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { FlexGridProps } from "../../dist";
import pkg from "../../package.json";
import { FlexBox, type FlexBoxProps, FlexGrid, FlexGrid2 } from "../../src";

// Or: run `npm link ../` or `yarn link ../` in the ./demo directory
// and import from "mui-flexy":
// import { FlexBox, FlexBoxProps, FlexGrid } from "mui-flexy";

const muiVersion = await import("@mui/material/package.json").then(pkg => pkg.version);

console.log(pkg.name, pkg.version, FlexBox, FlexGrid, "@mui/material", muiVersion);

const rowEmoji = "🚣";
const columnEmoji = "🏛";

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

const bgColor = "#f6f5f6";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

const Inner = styled(FlexBox)<FlexBoxProps>(props => ({
  minHeight: props?.minHeight ?? (props?.sx as _Any)?.minHeight ?? 120,
  border: "1.5px solid #e2ebf8",
  borderRadius: "4px",
  flexGrow: 1,
  gap: "4px",
  padding: "4px",
  backgroundColor: "#fff",
  "& > span": {
    backgroundColor: bgColor,
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

const rowArrow = (
  <span
    style={{ writingMode: "vertical-rl", textOrientation: "sideways" }}
    aria-label="left-right arrow"
  >
    ⇅
  </span>
);
const colArrow = (
  <span
    style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
    aria-label="up-down arrow"
  >
    ⇅
  </span>
);

const gridColumns = { xs: 12, md: 4, l: 4, xl: 4 };
const reponsiveFontSizes = { "& pre": { fontSize: { xs: "0.85rem", md: "1.0vw", lg: "0.85rem" } } };

const Header = forwardRef(
  (
    { text, subtitle }: { text: string; subtitle?: string },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => (
    <FlexGrid item xs={12} component="header" ref={ref} column gap={0}>
      <Typography component="h2" variant="h5" sx={{ display: "flex", alignItems: "center" }}>
        {text}
        {text.toLowerCase().includes("row")
          ? rowArrow
          : text.toLowerCase().includes("column")
          ? colArrow
          : ""}
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
            background: bgColor,
            borderRadius: 4,
            margin,
          }
        : { background: bgColor, borderRadius: 4, margin }
    }
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
      mui-flexy for{" "}
      <Link target="_blank" href="https://mui.com/">
        Material UI
      </Link>
    </FlexBox>
    <Typography variant="body1" component="div">
      {
        "mui-flexy for MUI is a component wrapper for flexbox styles that allows you to easily \
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
      {"prop, and Flexy will do the hard thinking and make CSS so you don't have to."}
    </Typography>
  </>
);

const GridSection = styled((props: FlexGridProps = {}) => (
  <FlexGrid {...props} container component="section" spacing={[2, 3, 4]} />
))(({ theme }) =>
  theme.unstable_sx({
    "&.MuiGrid-root": {
      // This adjusts the outer gutter of the grid to match the rest of the page content
      ml: [-2, -3, -4],
      maxWidth: "fit-content",
      width: theme => [
        `calc(100% + ${theme.spacing(2)})`,
        `calc(100% + ${theme.spacing(3)})`,
        `calc(100% + ${theme.spacing(4)})`,
      ],
    },
  })
);

const Item = styled((props: FlexGridProps = {}) => (
  <FlexGrid {...props} item xs={12} component="div" />
))({
  width: "100%",
});

const BoxSection = styled(FlexBox)(({ theme }) =>
  theme.unstable_sx({
    width: "100%",
    maxWidth: "100%",
    rowGap: [2, 3, 4],
  })
);

export const useRenderer = () => {
  const [, _render] = useState({});
  return useCallback(() => _render({}), []);
};

export const FlexTest = () => {
  const ref = useRef<HTMLDivElement>(null);
  const render = useRenderer();

  useEffect(() => {
    if (ref.current) {
      render();
    }
  }, [ref, render]);

  return (
    <FlexBox
      width="100vw"
      p={[2, 3, 4]}
      gap={[2, 3, 4]}
      x="center"
      component="main"
      sx={{ bgcolor: "#fff" }}
      column
    >
      <FlexBox x="left" y="center" column>
        <Title />
      </FlexBox>
      <GridSection className="row-basic">
        <Header text="Row (basic)" subtitle="Props are string values" />
        {rowCombinations.map(([x, y], i) => (
          <Item {...gridColumns} key={i} component="div" column>
            <Code
              margin="0px 16px"
              code={`<FlexBox x="${x}" y="${y}">
  ...
</FlexBox>`}
            />
            <Inner x={x} y={y} sx={reponsiveFontSizes}>
              <span>{rowEmoji}</span>
            </Inner>
          </Item>
        ))}
      </GridSection>
      <GridSection className="row-responsive">
        <Header
          text="Row (responsive)"
          subtitle="Responsive array or object values (resize the window to see different breakpoints)"
        />
        <Item xs={12} lg={6}>
          <Code
            code={`<FlexBox\n\
  x={[ "center", "left", "center", "right" ]}\n\
  y={[ "center", "top", "center", "bottom" ]}\n/>\n
// (interpreted as [ xs, sm, md, >= lg ])`}
          />
          <Inner
            x={["center", "left", "center", "right"]}
            y={["center", "top", "center", "bottom"]}
            sx={{ minHeight: 240 }}
          >
            <span>{rowEmoji}</span>
          </Inner>
        </Item>
        <Item xs={12} lg={6}>
          <Code
            code={`<FlexBox\n\
  x={{ sm: "left", md: "center", lg: "right" }}\n\
  y={{ sm: "top", md: "center", lg: "bottom" }}\n/>`}
          />
          <Inner
            x={{ sm: "left", md: "center", lg: "right" }}
            y={{ sm: "top", md: "center", lg: "bottom" }}
            sx={{ minHeight: 240, ...reponsiveFontSizes }}
          >
            <span>{rowEmoji}</span>
          </Inner>
        </Item>
        <Item xs={12} lg={6}>
          <Code
            code={`<FlexBox
  row={[ false, false, true, true, false ]}
  // column={[ true, true, false, false, true ]} <- this is implied
  x={[ "center", "center", "space-between", "space-around" ]}
  y="center"
  gap={[2, 3, 4]}\n/>\n`}
          />
          <Inner
            row={[false, false, true, true, false]}
            // column={[true, true, false, false, true]} <- this is implied
            x={["center", "center", "space-between", "space-around"]}
            y="center"
            gap={[2, 3, 4]}
            sx={{ minHeight: 240, ...reponsiveFontSizes }}
          >
            <span>{rowEmoji}</span>
            <span>{rowEmoji}</span>
            <span>{rowEmoji}</span>
          </Inner>
        </Item>
        <Item xs={12} lg={6}>
          <Code
            code={`<FlexBox
  row={{ xs: false, md: true, xl: false }}
  // column={{ xs: true, md: false, xl: true }} <- this is implied
  x={{ xs: "center", md: "space-between", lg: "space-around" }}\n/>`}
          />
          <Inner
            row={{ xs: false, md: true, xl: false }}
            // column={{ xs: true, md: false, xl: true }} <- this is implied
            x={{ xs: "center", md: "space-between", lg: "space-around" }}
            gap={[2, 3, 4]}
            sx={{ minHeight: 240, ...reponsiveFontSizes }}
          >
            <span>{rowEmoji}</span>
            <span>{rowEmoji}</span>
            <span>{rowEmoji}</span>
          </Inner>
        </Item>
      </GridSection>
      <GridSection className="column-basic">
        <Header text="Column (basic)" subtitle="Props are string values" />
        {columnCombinations.map(([y, x], i) => (
          <Item item {...gridColumns} key={i} column>
            <Code
              margin="0px 16px"
              code={`<FlexBox x="${x}" y="${y}" column>
  ...
</FlexBox>`}
            />
            <Inner x={x} y={y} column sx={reponsiveFontSizes}>
              <span>{columnEmoji}</span>
            </Inner>
          </Item>
        ))}
      </GridSection>
      <GridSection className="column-responsive">
        <Header
          text="Column (responsive)"
          subtitle="Props are array or object values (resize the window to see different breakpoints)"
        />
        <Item xs={12} lg={6}>
          <Code
            code={`<FlexBox\n\
  x={[ "center", "left", "center", "right" ]}\n\
  y={[ "center", "top", "center", "bottom" ]}\n\
  column\n/>\n
// (interpreted as [ xs, sm, md, lg ])`}
          />
          <Inner
            x={["center", "left", "center", "right"]}
            y={["center", "top", "center", "bottom"]}
            column
            sx={{ minHeight: [240, 240, 480] }}
          >
            <span>{columnEmoji}</span>
          </Inner>
        </Item>
        <Item xs={12} lg={6}>
          <Code
            code={`<FlexBox\n\
  x={{ sm: "left", md: "center", lg: "right" }}\n\
  y={{ sm: "top", md: "center", lg: "bottom" }}\n\
  column\n/>\n
// (interpreted as { sm: _, md: _, lg: _ })`}
          />
          <Inner
            x={{ sm: "left", md: "center", lg: "right" }}
            y={{ sm: "top", md: "center", lg: "bottom" }}
            column
            sx={{ minHeight: [240, 240, 480] }}
          >
            <span>{columnEmoji}</span>
          </Inner>
        </Item>
      </GridSection>
      <GridSection className="css-grid-basic">
        <Header text="Basic CSS Grid (FlexGrid)" />
        <FlexGrid item x="center" y="center">
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
        </FlexGrid>
      </GridSection>
      <BoxSection className="css-grid-templating" column>
        <Header text="CSS Grid (FlexGrid) with grid templating" />
        <FlexGrid
          item
          x="center"
          y="center"
          ml={1}
          mr={-1}
          width="100%"
          sx={{ display: { xs: "flex", md: "none" }, opacity: 0.5 }}
        >
          (This demo is not formatted for smaller screens)
        </FlexGrid>
        <FlexGrid
          item
          x="center"
          y="center"
          width="100%"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <FlexGrid
            container
            spacing={[2, 3, 4]}
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
        </FlexGrid>
      </BoxSection>
      {muiVersion.startsWith("5") ? (
        <GridSection className="mui-grid2-v5">
          <Header text="Unstable_Grid2 (@mui v5)" />
          <FlexGrid item x="center" y="center">
            <FlexGrid2 container spacing={2}>
              {[...Array(12).keys()].map(i => (
                // @ts-ignore - Grid2 props change between v5 and v6
                <FlexGrid2
                  key={i}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                >
                  <Inner x="center" y="center">
                    <Code
                      code={`<FlexGrid2>
  ${i + 1}
</FlexGrid2>`}
                    />
                  </Inner>
                </FlexGrid2>
              ))}
            </FlexGrid2>
          </FlexGrid>
        </GridSection>
      ) : (
        <GridSection className="mui-grid2-v5">
          <Header text="Grid2 (@mui v6+)" />
          <FlexGrid item x="center" y="center">
            <FlexGrid2 container spacing={2}>
              {[...Array(12).keys()].map(i => (
                // @ts-ignore - Grid2 props change between v5 and v6
                <FlexGrid2 key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                  <Inner x="center" y="center">
                    <Code
                      code={`<FlexGrid2>
  ${i + 1}
</FlexGrid2>`}
                    />
                  </Inner>
                </FlexGrid2>
              ))}
            </FlexGrid2>
          </FlexGrid>
        </GridSection>
      )}
      <BoxSection className="ref-test" column>
        <Header text="Ref test" ref={ref} />
        <Inner x="center" y="center" column>
          <span>
            {ref?.current?.innerText ? `${ref?.current?.innerText} successful` : "Failed"}
          </span>
          <Code code={ref?.current?.toString()} />
        </Inner>
      </BoxSection>
      <BoxSection className="complex-props-test" column>
        <Header text="Complex props test" />
        {(() => {
          const invalidProps = { prop: "invalid" } as FlexBoxProps<"column">;
          return (
            <FlexBox column>
              <Code code={`<FlexBox prop="invalid" />`} margin="0px 16px" />
              <Inner x="center" y="center" column {...invalidProps}>
                <span>Complex props test</span>
              </Inner>
            </FlexBox>
          );
        })()}
      </BoxSection>
    </FlexBox>
  );
};
