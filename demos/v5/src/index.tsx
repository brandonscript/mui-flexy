import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { FlexBox, FlexGrid, FlexyProvider } from "@mui-flexy/v5";
import { createRoot } from "react-dom/client";

import { ClassModeDemo } from "../../shared/ClassModeDemo";
import App from "./App";

const DecoratedBox = styled(FlexBox)({ border: "1px solid red" });

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    new URLSearchParams(window.location.search).has("classes") ? (
      <ClassModeDemo {...{ FlexBox, DecoratedBox, FlexGrid, FlexyProvider, ThemeProvider, createTheme }} />
    ) : (
      <App />
    ),
  );
}
