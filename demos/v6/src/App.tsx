import { Link, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  columnCombinations,
  columnEmoji,
  DemoCode,
  reponsiveFontSizes,
  rowCombinations,
  rowEmoji,
} from "../../../packages/demo-shared/src";
// @ts-ignore
import packageJson from "../../../packages/v6/package.json";
import { FlexBox, FlexGrid2 } from "../../../packages/v6/src";

const theme = createTheme();

const Inner = ({ children, ...props }: any) => (
  <FlexBox
    {...props}
    sx={{
      minHeight: props?.minHeight ?? 120,
      border: "1.5px solid #e2ebf8",
      borderRadius: "4px",
      flexGrow: 1,
      gap: "4px",
      padding: "4px",
      backgroundColor: "#fff",
      "& > span": {
        backgroundColor: "#f5f5f5",
        paddingLeft: "4px",
        paddingRight: "4px",
        borderRadius: "4px",
      },
      ...props.sx,
    }}
  >
    {children}
  </FlexBox>
);

const useRenderer = () => {
  const [, _render] = useState({});
  return useCallback(() => _render({}), []);
};

const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const render = useRenderer();

  useEffect(() => {
    if (ref.current) {
      render();
    }
  }, [ref, render]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlexBox width="100vw" p={[2, 3, 4]} gap={[2, 3, 4]} x="center" component="main" sx={{ bgcolor: "#fff" }} column>
        <FlexBox x="left" y="center" column>
          <FlexBox component={Typography} variant="h4" row x="left" y="center" gap={2}>
            <FlexBox
              width={100}
              height={100}
              mb={2}
              ml={-1}
              column
              component="img"
              src="/apple-touch-icon.png"
              alt="mui-flexy logo"
            />
            mui-flexy v{packageJson.version} for
            <Link target="_blank" href="https://mui.com/" sx={{ ml: -0.75 }}>
              @mui/material^6
            </Link>
          </FlexBox>
          <Typography variant="body1" component="div">
            mui-flexy for MUI is a component wrapper for flexbox styles that allows you to easily align and distribute
            flexy items in a space in a way that doesn't make you want to pull your hair out trying to remember whether
            to use <DemoCode inline>justify-content</DemoCode>
            {" or "}
            <DemoCode inline>align-items</DemoCode>. Using a simple and consistent x, y coordinate system, you can stop
            worrying about the CSS working group's choices and get on with your life of centering divs.
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
        </FlexBox>

        <FlexGrid2 container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid2 size={12}>
            <Typography component="h2" variant="h5">
              Row (basic) - Props are string values
            </Typography>
          </FlexGrid2>
          {rowCombinations.map(([x, y], i) => (
            <FlexGrid2 size={{ xs: 12, md: 4 }} key={i}>
              <FlexBox column sx={{ width: "100%" }}>
                <DemoCode
                  margin="0px 16px"
                  code={`<FlexBox x="${x}" y="${y}">
  ...
</FlexBox>`}
                />
                <Inner x={x} y={y} sx={reponsiveFontSizes}>
                  <span>{rowEmoji}</span>
                </Inner>
              </FlexBox>
            </FlexGrid2>
          ))}
        </FlexGrid2>

        <FlexGrid2 container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid2 size={12}>
            <Typography component="h2" variant="h5">
              Column (basic) - Props are string values
            </Typography>
          </FlexGrid2>
          {columnCombinations.map(([y, x], i) => (
            <FlexGrid2 size={{ xs: 12, md: 4 }} key={i}>
              <FlexBox column sx={{ width: "100%" }}>
                <DemoCode
                  margin="0px 16px"
                  code={`<FlexBox x="${x}" y="${y}" column>
  ...
</FlexBox>`}
                />
                <Inner x={x} y={y} column sx={reponsiveFontSizes}>
                  <span>{columnEmoji}</span>
                </Inner>
              </FlexBox>
            </FlexGrid2>
          ))}
        </FlexGrid2>

        <FlexGrid2 container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid2 size={12}>
            <Typography component="h2" variant="h5">
              Basic CSS Grid (FlexGrid2)
            </Typography>
          </FlexGrid2>
          <FlexGrid2 size={12} x="center" y="center">
            <FlexGrid2 container spacing={2}>
              {[...Array(12).keys()].map((i) => (
                <FlexGrid2 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={i}>
                  <Inner x="center" y="center">
                    <span>Grid {i + 1}</span>
                  </Inner>
                </FlexGrid2>
              ))}
            </FlexGrid2>
          </FlexGrid2>
        </FlexGrid2>

        <FlexBox column sx={{ width: "100%", maxWidth: "100%", rowGap: [2, 3, 4] }}>
          <FlexGrid2 container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
            <FlexGrid2 size={12}>
              <Typography component="h2" variant="h5">
                CSS Grid (FlexGrid2) with grid templating
              </Typography>
            </FlexGrid2>
          </FlexGrid2>
          <FlexGrid2
            x="center"
            y="center"
            ml={1}
            mr={1}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gridGap: 2,
              width: "100%",
            }}
          >
            {[...Array(8).keys()].map((i) => (
              <Inner key={i} x="center" y="center">
                <span>Template {i + 1}</span>
              </Inner>
            ))}
          </FlexGrid2>
        </FlexBox>

        <FlexGrid2 container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid2 size={12}>
            <Typography component="h2" variant="h5">
              Grid2 (@mui v6+)
            </Typography>
          </FlexGrid2>
          <FlexGrid2 size={12} x="center" y="center">
            <FlexGrid2 container spacing={2}>
              {[...Array(12).keys()].map((i) => (
                <FlexGrid2 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={i}>
                  <Inner x="center" y="center">
                    <span>Grid2 {i + 1}</span>
                  </Inner>
                </FlexGrid2>
              ))}
            </FlexGrid2>
          </FlexGrid2>
        </FlexGrid2>

        <FlexBox column sx={{ width: "100%", maxWidth: "100%", rowGap: [2, 3, 4] }}>
          <FlexGrid2 container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
            <FlexGrid2 size={12} ref={ref}>
              <Typography component="h2" variant="h5">
                Ref test
              </Typography>
            </FlexGrid2>
          </FlexGrid2>
          <Inner x="center" y="center" column mt={[0.5, 1, 2]}>
            <span>{ref?.current?.innerText ? `${ref?.current?.innerText} successful` : "Failed"}</span>
            <DemoCode code={ref?.current?.toString()} />
          </Inner>
        </FlexBox>

        <FlexBox column sx={{ width: "100%", maxWidth: "100%", rowGap: [2, 3, 4] }}>
          <FlexGrid2 container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
            <FlexGrid2 size={12}>
              <Typography component="h2" variant="h5">
                Complex props test
              </Typography>
            </FlexGrid2>
          </FlexGrid2>
          <FlexBox column mt={[0.5, 1, 2]}>
            <Inner x="center" y="center" column>
              <span>Complex responsive props</span>
              <DemoCode
                code={`<FlexBox 
  p={[1, 2, 3]} 
  gap={[1, 2, 4]} 
  sx={{ bgcolor: ['red', 'blue', 'green'] }}
>
  Responsive values
</FlexBox>`}
              />
            </Inner>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </ThemeProvider>
  );
};

export default App;
