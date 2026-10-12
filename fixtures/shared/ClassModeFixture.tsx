import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { ComponentType } from "react";
import { useState } from "react";

type _Any = any;
type FixtureComponents = {
  FlexBox: ComponentType<_Any>;
  DecoratedBox: ComponentType<_Any>;
  FlexGrid: ComponentType<_Any>;
  FlexyProvider: ComponentType<_Any>;
  ThemeProvider: ComponentType<_Any>;
  createTheme: (options?: _Any) => _Any;
};
const alternateCache = createCache({ key: "alternate" });

/** A small standalone fixture also used to verify real browser CSS cascading. */
export function ClassModeFixture({
  FlexBox,
  DecoratedBox,
  FlexGrid,
  FlexyProvider,
  ThemeProvider,
  createTheme,
}: FixtureComponents) {
  const [count, setCount] = useState(1);
  const [theme] = useState(() => createTheme());
  const [customTheme] = useState(() =>
    createTheme({ breakpoints: { values: { xs: 0, sm: 500, md: 700, lg: 1000, xl: 1400 } } }),
  );
  const [namedTheme] = useState(() => createTheme({ breakpoints: { values: { phone: 0, desktop: 650 } } }));
  return (
    <ThemeProvider theme={theme}>
      <FlexyProvider styling="classes">
        <main>
          <h1>Shared layout classes</h1>
          <button onClick={() => setCount(300)}>Render 300 boxes</button>
          <FlexBox data-testid="default-display" />
          <FlexBox data-testid="responsive-display" display={{ xs: "flex", sm: "none", md: "flex" }} />
          <FlexBox data-testid="system-display" styling="system" display="block" />
          <FlexBox data-testid="sx-display" sx={{ display: "inline-flex" }} />
          <FlexBox
            data-testid="responsive"
            direction={{ xs: "row", md: "column" }}
            reverse={{ lg: true }}
            x={{ xs: "center", sm: "right" }}
            y="top"
            wrap={{ xs: true, md: false }}
          />
          <FlexBox data-testid="gaps" column={[false, null, true]} reverse={[false, true, null]} x="center" y="top" />
          <FlexBox data-testid="axis-reset" column={{ md: true }} x="center" />
          <FlexGrid data-testid="grid" container column x="center" y="bottom" wrap={false} spacing={2} />
          <FlexBox
            data-testid="sx"
            x="center"
            y="center"
            sx={[
              { justifyContent: "flex-start" },
              false,
              (activeTheme: _Any) => ({
                justifyContent: { xs: "flex-end", md: "space-between" },
                p: activeTheme.spacing(2),
                "& > span": { color: "red" },
              }),
            ]}
          >
            <span>Child</span>
          </FlexBox>
          <DecoratedBox data-testid="styled-sx" x="center" sx={{ justifyContent: "flex-end" }} />
          <FlexBox
            data-testid="fallback"
            direction={() => "column"}
            display={{ xs: "flex", md: "flow-root" }}
            x="center"
          />
          <FlexBox data-testid="system" styling="system" column x="center" y="bottom" />
          <FlexyProvider styling="classes">
            <FlexBox data-testid="nested" x="center" y="top" />
          </FlexyProvider>
          <ThemeProvider theme={customTheme}>
            <FlexyProvider styling="classes">
              <FlexBox data-testid="custom-theme" column={{ xs: false, md: true }} x="center" y="top" />
            </FlexyProvider>
          </ThemeProvider>
          <ThemeProvider theme={namedTheme}>
            <FlexyProvider styling="classes">
              <FlexBox data-testid="named-theme" direction={["row", "column"]} x="center" y="top" />
            </FlexyProvider>
          </ThemeProvider>
          <CacheProvider value={alternateCache}>
            <FlexyProvider styling="classes">
              <FlexBox data-testid="system-cache-display" styling="system" display="inline-block" />
              <FlexBox data-testid="cache" column x="center" y="bottom" />
            </FlexyProvider>
          </CacheProvider>
          {Array.from({ length: count }, (_, i) => (
            <FlexBox
              data-testid="repeated"
              key={i}
              x="center"
              y="top"
              sx={{ color: `rgb(${i % 255},0,0)`, p: i % 4 }}
            />
          ))}
        </main>
      </FlexyProvider>
    </ThemeProvider>
  );
}
