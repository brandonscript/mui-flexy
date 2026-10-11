/** @jest-environment node */
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FlexBox, FlexyProvider } from "@mui-flexy/v5";
import { renderToString } from "react-dom/server";

it("renders shared rules and deterministic responsive classes on the server", () => {
  const render = () =>
    renderToString(
      <CacheProvider value={createCache({ key: "ssr" })}>
        <ThemeProvider theme={createTheme()}>
          <FlexyProvider styling="classes">
            <FlexyProvider styling="classes">
              <FlexBox column={{ xs: false, md: true }} x="center" y="top" sx={{ p: 2 }} />
            </FlexyProvider>
          </FlexyProvider>
        </ThemeProvider>
      </CacheProvider>,
    );
  const html = render();
  expect(render()).toBe(html);
  expect(html).toContain('data-emotion="ssr-global');
  expect(html.match(/data-emotion="ssr-global/g)).toHaveLength(1);
  expect(html).toContain(".MuiFlex-root.MuiFlex-justify-center");
  expect(html).toMatch(/MuiFlex-direction-column-[a-z0-9]+-md/);
  expect(html).toContain("padding:16px");
});
