import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { FlexBox, FlexGrid, FlexyProvider } from "@mui-flexy/v6";
import { createRoot } from "react-dom/client";

import { ClassModeFixture } from "../../shared/ClassModeFixture";
import App from "./App";

const DecoratedBox = styled(FlexBox)({ border: "1px solid red" });

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    new URLSearchParams(window.location.search).has("classes") ? (
      <ClassModeFixture {...{ FlexBox, DecoratedBox, FlexGrid, FlexyProvider, ThemeProvider, createTheme }} />
    ) : (
      <App />
    ),
  );
}
