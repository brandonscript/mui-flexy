import { Link, styled, Typography, TypographyOwnProps } from "@mui/material";
import { major as muiVersionMajor, version as muiVersion } from "@mui/material/version";
import { FlexBox, FlexGrid2 } from "mui-flexy-v6";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import pkg from "../../package.json";
import {
  columnCombinations,
  columnEmoji,
  DemoCode,
  DemoHeader,
  getGridSizeProps,
  reponsiveFontSizes,
  rowCombinations,
  rowEmoji,
} from "./shared";
import { createDemoInner } from "./shared/DemoComponents";

console.log(pkg.name, pkg.version, "@mui/material", muiVersion);
console.log("FlexBox:", FlexBox);
console.log("FlexGrid2:", FlexGrid2);

const Inner = createDemoInner(FlexBox);

const gridColumns = getGridSizeProps({ xs: 12, md: 4, lg: 4, xl: 4 }, muiVersionMajor);

const Header = React.forwardRef<HTMLDivElement, { text: string; subtitle?: string }>((props, ref) => (
  <DemoHeader {...props} FlexGrid={FlexGrid2} getGridSizeProps={getGridSizeProps} ref={ref} />
));

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
      mui-flexy for
      <Link target="_blank" href="https://mui.com/" sx={{ ml: -0.75 }}>
        @mui/material^{muiVersionMajor}
      </Link>
    </FlexBox>
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
      <DemoCode inline>{"<FlexGrid2 />"}</DemoCode>
      {" as you would Box or Grid2. The default axis is "}
      <DemoCode inline>row</DemoCode>
      {", but for good hygiene, you might want to set "}
      <DemoCode inline>row</DemoCode>
      {" anyway. If you want a column, just pass a "}
      <DemoCode inline>column</DemoCode>
      {"prop, and Flexy will do the hard thinking and make CSS so you don't have to."}
    </Typography>
  </>
);

const GridSection = styled((props: any = {}) => (
  <FlexGrid2 {...props} container component="section" spacing={[0.5, 1, 2]} />
))(({ theme }) =>
  theme.unstable_sx({
    "&.MuiGrid-root, &.MuiGrid2-root": {
      maxWidth: "100%",
    },
  }),
);

const Item = styled((props: any = {}) => <FlexGrid2 {...props} component="div" />)({
  width: "100%",
});

const BoxSection = styled(FlexBox)(({ theme }) =>
  theme.unstable_sx({
    width: "100%",
    maxWidth: "100%",
    rowGap: [2, 3, 4],
  }),
).withComponent("section");

export const useRenderer = () => {
  const [, _render] = useState({});
  return useCallback(() => _render({}), []);
};

const FlexDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const render = useRenderer();

  useEffect(() => {
    if (ref.current) {
      render();
    }
  }, [ref, render]);

  return (
    <FlexBox width="100vw" p={[2, 3, 4]} gap={[2, 3, 4]} x="center" component="main" sx={{ bgcolor: "#fff" }} column>
      <FlexBox x="left" y="center" column>
        <Title />
      </FlexBox>
      <GridSection className="row-basic">
        <Header text="Row (basic)" subtitle="Props are string values" />
        {rowCombinations.slice(0, 9).map(([x, y], i) => (
          <Item {...gridColumns} key={i} component="div" column>
            <DemoCode
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
      <GridSection className="column-basic">
        <Header text="Column (basic)" subtitle="Props are string values" />
        {columnCombinations.slice(0, 9).map(([y, x], i) => (
          <Item {...gridColumns} key={i} column>
            <DemoCode
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
      <BoxSection className="ref-test" column>
        <Header text="Ref test" ref={ref} />
        <Inner x="center" y="center" column mt={[0.5, 1, 2]}>
          <span>{ref?.current?.innerText ? `${ref?.current?.innerText} successful` : "Failed"}</span>
          <DemoCode code={ref?.current?.toString()} />
        </Inner>
      </BoxSection>
    </FlexBox>
  );
};

export default FlexDemo;
