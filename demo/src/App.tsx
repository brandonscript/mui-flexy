import { CssBaseline, ThemeProvider } from "@mui/material";

import FlexDemo from "./Flex.demo";
import { demoTheme } from "./shared/DemoTheme";

const App = () => {
  return (
    <ThemeProvider theme={demoTheme}>
      <CssBaseline />
      <FlexDemo />
    </ThemeProvider>
  );
};

export default App;
