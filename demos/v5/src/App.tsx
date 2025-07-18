import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { FlexBox, FlexGrid } from "@mui-flexy/v5";
import { useEffect, useRef } from "react";

// @ts-ignore
import packageJson from "../../../packages/v5/package.json";
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
          <DemoTitle packageName={`mui-flexy v${packageJson.version}`} muiVersion="5" FlexBox={FlexBox} />
          <DemoDescription />
        </FlexBox>

        <FlexGrid container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid item xs={12}>
            <RowBasicTitle />
          </FlexGrid>
          {rowCombinations.map(([x, y], i) => (
            <FlexGrid item xs={12} md={4} lg={4} xl={4} key={i}>
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

        <FlexGrid container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid item xs={12}>
            <ColumnBasicTitle />
          </FlexGrid>
          {columnCombinations.map(([y, x], i) => (
            <FlexGrid item xs={12} md={4} lg={4} xl={4} key={i}>
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

        <FlexGrid container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid item xs={12}>
            <BasicGridTitle gridComponentName="FlexGrid" />
          </FlexGrid>
          <FlexGrid item xs={12} x="center" y="center">
            <FlexGrid container spacing={2}>
              {[...Array(12).keys()].map((i) => (
                <FlexGrid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                  <Inner x="center" y="center">
                    <span>Grid {i + 1}</span>
                  </Inner>
                </FlexGrid>
              ))}
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>

        <FlexGrid container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid item xs={12}>
            <GridTemplatingTitle gridComponentName="FlexGrid" />
          </FlexGrid>
          <FlexGrid item xs={12} x="center" y="center">
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

        <FlexGrid container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid item xs={12} ref={ref}>
            <RefTestTitle />
          </FlexGrid>
          <FlexGrid item xs={12} x="center" y="center">
            <Inner x="center" y="center" column>
              <span>{ref?.current?.innerText ? `${ref?.current?.innerText} successful` : "Failed"}</span>
              <DemoCode code={ref?.current?.toString()} />
            </Inner>
          </FlexGrid>
        </FlexGrid>

        <FlexGrid container spacing={[0.5, 1, 2]} sx={{ maxWidth: "100%" }}>
          <FlexGrid item xs={12}>
            <ComplexPropsTitle />
          </FlexGrid>
          <FlexGrid item xs={12} x="center" y="center">
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
