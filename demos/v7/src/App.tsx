import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { FlexBox, FlexGrid } from "@mui-flexy/v7";
import { useEffect, useRef } from "react";

// @ts-ignore
import packageJson from "../../../packages/v7/package.json";
import {
  BasicGridTitle,
  ColumnBasicTitle,
  columnCombinations,
  columnEmoji,
  ComplexPropsTitle,
  createDemoInner,
  DemoCode,
  DemoDescription,
  DemoTitle,
  Grid2VersionTitle,
  GridTemplatingTitle,
  RefTestTitle,
  reponsiveFontSizes,
  RowBasicTitle,
  rowCombinations,
  rowEmoji,
  useRenderer,
} from "../../shared";

const theme = responsiveFontSizes(createTheme());

const Inner = createDemoInner(FlexBox);

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
      <FlexBox width="100vw" p={[2, 3, 4]} gap={[1, 2, 2]} x="center" component="main" sx={{ bgcolor: "#fff" }} column>
        <FlexBox x="left" y="center" column>
          <DemoTitle packageName={`mui-flexy v${packageJson.version}`} muiVersion="7" FlexBox={FlexBox} />
          <DemoDescription gridComponentName="FlexGrid" />
        </FlexBox>

        <FlexGrid container component="section" spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid size={12} component="header">
            <RowBasicTitle />
          </FlexGrid>
          {rowCombinations.map(([x, y], i) => (
            <FlexGrid size={{ xs: 12, md: 4 }} key={i} component="div">
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
            </FlexGrid>
          ))}
        </FlexGrid>

        <FlexGrid container component="section" spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid size={12} component="header">
            <ColumnBasicTitle />
          </FlexGrid>
          {columnCombinations.map(([y, x], i) => (
            <FlexGrid size={{ xs: 12, md: 4 }} key={i}>
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
            </FlexGrid>
          ))}
        </FlexGrid>

        <FlexGrid container component="section" spacing={[0.5, 1, 2]} sx={{ width: "100%" }}>
          <FlexGrid size={12} component="header">
            <BasicGridTitle gridComponentName="FlexGrid" />
          </FlexGrid>
          <FlexGrid size={12} x="center" y="center">
            <FlexGrid container spacing={2}>
              {[...Array(12).keys()].map((i) => (
                <FlexGrid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={i}>
                  <Inner x="center" y="center">
                    <span>Grid {i + 1}</span>
                  </Inner>
                </FlexGrid>
              ))}
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>

        <FlexGrid container component="section" spacing={[0.5, 1, 2]} sx={{ width: "100%" }}>
          <FlexGrid size={12} component="header">
            <GridTemplatingTitle gridComponentName="FlexGrid" />
          </FlexGrid>
          <FlexGrid size={12} x="center" y="center">
            <FlexGrid
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
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>

        <FlexGrid container component="section" spacing={[0.5, 1, 2]} sx={{ width: "100%" }}>
          <FlexGrid size={12} component="header">
            <Grid2VersionTitle version="7" />
          </FlexGrid>
          <FlexGrid size={12} x="center" y="center">
            <FlexGrid container spacing={2}>
              {[...Array(12).keys()].map((i) => (
                <FlexGrid x="center" size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={i}>
                  <Inner x="center" y="center">
                    <span>Grid {i + 1}</span>
                  </Inner>
                </FlexGrid>
              ))}
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>

        <FlexGrid container component="section" spacing={[0.5, 1, 2]} sx={{ width: "100%" }}>
          <FlexGrid size={12} component="header" ref={ref}>
            <RefTestTitle />
          </FlexGrid>
          <FlexGrid size={12} x="center" y="center">
            <Inner x="center" y="center" column>
              <span>{ref?.current?.innerText ? `${ref?.current?.innerText} successful` : "Failed"}</span>
              <DemoCode code={ref?.current?.toString()} />
            </Inner>
          </FlexGrid>
        </FlexGrid>

        <FlexGrid container component="section" spacing={[0.5, 1, 2]} sx={{ width: "100%" }}>
          <FlexGrid size={12} component="header">
            <ComplexPropsTitle />
          </FlexGrid>
          <FlexGrid size={12} x="center" y="center">
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
          </FlexGrid>
        </FlexGrid>
      </FlexBox>
    </ThemeProvider>
  );
};

export default App;
