import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import FlexDemo from "./Flex.demo";

const fontFamily = [
  '"Source Sans 3Variable"',
  '"Source Sans 3"',
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Source Sans Pro",
  "Open Sans",
  "Arial",
  "sans-serif",
];

const preFontFamily = ['"SF Mono"', '"Roboto Mono"', "Menlo", '"Source Code Pro"', "monospace"];

const baseTheme = createTheme({
  typography: {
    fontFamily: fontFamily.join(","),
  },
});

const theme = createTheme({
  ...baseTheme,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "div, span, p, h1, h2, h3, h4, h5, h6": {
          fontFamily: fontFamily.join(","),
        },
        "pre, code, code > *": {
          fontFamily: preFontFamily.join(","),
          fontSize: "0.95em",
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlexDemo />
    </ThemeProvider>
  );
};

export default App;
