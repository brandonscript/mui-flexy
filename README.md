<img width="256" alt="flex-logo" src="https://user-images.githubusercontent.com/1480253/186842214-5575f27e-fc48-4617-bedb-a7ec29411203.png">

# `mui-flexy`

A flexbox wrapper for [Material UI](https://mui.com/) Box and Grid components with handy shorthand props.

<a href="https://npmjs.org/mui-flexy" target="_blank">![NPM Version](https://img.shields.io/npm/v/mui-flexy)</a>
<a href="https://npmjs.org/mui-flexy" target="_blank">![NPM Downloads](https://img.shields.io/npm/dm/mui-flexy?label=downloads)</a>
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/brandonscript/mui-flexy)
![MUI Versions](https://img.shields.io/badge/%40mui%2Fmaterial%20v5%20%7C%20v6%20%7C%20v7%20%7C%20v9-blue)
![React Versions](https://img.shields.io/badge/React%2017%20%7C%2018%20%7C%2019-8A2BE2?logo=react)

## Why?

### The problem

If you have gotten confused whether to use `justify-content` or `align-items`, then mui-flexy is for you! Vanilla CSS requires a lot of mental gymnastics to remember which alignment property to use depending on the axis of your flexbox:

> `justify-content` aligns along the main axis and `align-items` aligns along the cross axis. When you change the axis, you have to re-write your alignments. This gets exponentially more difficult when you introduce responsive breakpoints.

### The solution

Science and math solved this problem a long time ago with constants like `x` and `y` to represent 2-dimensional space, where `x` is the horizontal axis and `y` is the vertical axis.

mui-flexy gives you a way to align things in the same way using `x` and `y` props instead, calculating all the hard CSS stuff for you so you don't have to.

Instead of:

```jsx
<FlexBox
  justifyContent="center" // is this the main or cross axis?
  alignItems="center" // maybe I can use stretch or space-around? 🤷‍♂️
  flexDirection="row" // if I change this to column, do I need to change the other two?
  width="100vw"
  height="100vh"
/>
```

You can just do:

```jsx
<FlexBox x="center" y="center" width="100vw" height="100vh" />

// and

<FlexBox column x="left" y="bottom" />

// and

<FlexBox column x="center" y="stretch" />

```

The real power of mui-flexy comes from its ability to handle the switch between different orientations at different breakpoints.

You can write this:

```jsx
<FlexBox x={{ xs: "left", lg: "right" }} y="center" row={{ xs: true, md: false }} />
```

...instead of this:

```jsx
<Box
  sx={{
    display: "flex",
    justifyContent: { xs: "flex-start", md: "center" },
    alignItems: { xs: "center", md: "flex-start", lg: "flex-end" },
    flexDirection: { xs: "row", md: "column" },
  }}
/>
```

### Interactive demo &amp; docs

Check out the <a href="https://brandonscript.github.io/mui-flexy/" target="_blank" rel="noopener noreferrer">live demo</a> for interactive examples of all <code>mui-flexy</code>'s features:

[![mui-flexy](https://user-images.githubusercontent.com/1480253/186974043-d75cd310-c60b-4835-ba80-e72cbab167c3.gif)](https://brandonscript.github.io/mui-flexy/)

## Get started

#### (Note: _Breaking changes in v2.0.0_)

> mui-flexy is now a monorepo with separate packages for each MUI version (`@mui-flexy/v5`, `@mui-flexy/v6`, `@mui-flexy/v7`, `@mui-flexy/v9`) with a dedicated `@mui-flexy/core` package for shared utilities. Each package is now optimized specifically for its MUI version, resulting in smaller bundle sizes and better TypeScript resolution.

> Make sure to update your imports to the new package structure:

```jsx
import { FlexBox } from "mui-flexy"; // old
import { FlexBox } from "@mui-flexy/v7"; // new
```

> And, as of v1.2.0, CommonJS is no longer supported. If you need it, please use an older version, or file a bug/PR.

#### (Note: _Breaking change - `nowrap` prop replaced with `wrap`_)

> The `nowrap` prop was incorrectly setting `whiteSpace: "nowrap"` instead of `flexWrap: "nowrap"`. Since `flexWrap: "nowrap"` is the default CSS behavior, the new `wrap` prop correctly enables flex wrapping by setting `flexWrap: "wrap"`.

```jsx
// Old
<FlexBox nowrap={true} />

// New (simple)
<FlexBox wrap /> // Sets flexWrap: "wrap"
// or use ResponsiveStyleValue (object or array) notation
<FlexBox wrap={{ xs: true, md: false }} />
```

### Installing

Choose the package that matches your MUI version:

```shell
# For @mui/material v9 (MUI skipped v8)
npm install @mui-flexy/v9

# For @mui/material v7
npm install @mui-flexy/v7

# For @mui/material v6
npm install @mui-flexy/v6

# For @mui/material v5
npm install @mui-flexy/v5

# or...
pnpm add @mui-flexy/v{5,6,7,9}
pnpm add @mui-flexy/v{5,6,7,9}
```

### Dependencies & setup

Make sure you have `@mui/material` and its dependencies installed, as well as React:

```shell
pnpm add @mui/material @emotion/react @emotion/styled react react-dom
# or
npm install @mui/material @emotion/react @emotion/styled react react-dom
```

If you haven't already, make sure to wrap your app with the MUI `ThemeProvider`:

```jsx
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light", // or "dark"
  },
});
const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <YourApp />
  </ThemeProvider>
);
```

If you are using a SSR-based framework like Next.js, you should use an Emotion cache to avoid hydration errors:

```jsx
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({ key: "my-app-css" });

const App = () => (
  <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YourApp />
    </ThemeProvider>
  </CacheProvider>
);
```

## Using mui-flexy

### FlexBox: The basics / tl;dr

mui-flexy is a drop-in replacement for MUI's `Box` and `Grid` components, with the added benefit of `x` and `y` props for alignment.

Import the `FlexBox` or `FlexGrid` components from the appropriate version package and use them in your app as you would with MUI's `Box` or `Grid` components:

```jsx
import { Typography } from "@mui/material"; // or use a <p> if you don't like fun typography

// For MUI v5
import { FlexBox, FlexGrid } from "@mui-flexy/v5";

// For MUI v6
import { FlexBox, FlexGrid } from "@mui-flexy/v6";

// For MUI v7
import { FlexBox, FlexGrid } from "@mui-flexy/v7";

// For MUI v9
import { FlexBox, FlexGrid } from "@mui-flexy/v9";

<FlexBox x="top" y="center">
  <Typography>Hello, Bajor</Typography>
</FlexBox>;
```

> _(To do this without mui-flexy, you'd need to do one of these)_

```jsx
// Use sx:
<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Typography>Hello, Bajor</Typography>
</Box>;

// Use a styled component to reuse the complete layout style:
const CenteredFlexBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

<CenteredFlexBox>
  <Typography>Hello, Bajor</Typography>
</CenteredFlexBox>;
```

### FlexGrid

`FlexGrid` (or `FlexGrid2` for MUI v6) supports all the grid-alignment props alongside the `x` and `y` props for alignment:

```jsx
// For MUI v5 (uses Grid)
import { FlexBox, FlexGrid } from "@mui-flexy/v5";

// For MUI v6 (uses Grid2)
import { FlexBox, FlexGrid2 } from "@mui-flexy/v6";

// For MUI v7 / v9 (uses Grid with size prop)
import { FlexBox, FlexGrid } from "@mui-flexy/v7";
import { FlexBox, FlexGrid } from "@mui-flexy/v9";

// Usage is the same across versions:
<FlexGrid2 container x="center" y="top">
  <FlexGrid2 item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} x="center" y="center">
    <Typography>Grids are cool</Typography>
  </FlexGrid2>
</FlexGrid2>;
```

> _(Note: the syntax for legacy Grid is slightly different)_

```jsx
// For MUI v5
import { FlexBox, FlexGrid } from "@mui-flexy/v5";

<FlexGrid container x="center" y="center">
  <FlexGrid item xs={12} sm={6} md={4} lg={3}>
    <Typography>Grids are cool</Typography>
  </FlexGrid>
</FlexGrid>;
```

### More examples & responsive usage

The `row` and `column` props are used to switch between the different orientations of the flexbox container.

```jsx
<FlexBox x="center" y="center" row />

// ...is equivalent to:

<Box sx={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row"
}} />
```

It used to get tricky when you switch the `flex-direction`:

```jsx
<>
  <FlexBox x="left" y="bottom" row />
  <FlexBox x="left" y="bottom" column />
</>

// ...is equivalent to:
<>
  <Box sx={{
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row"
  }} />
  <Box sx={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column"
  }} />
</>
```

FlexBox and FlexGrid also support `ResponsiveStyleObject` array notation:

```jsx
<FlexBox x={["left", "center", "right"]} y={["bottom", "center", "top"]} row />

// ...is equivalent to:

<Box sx={{
  display: "flex",
  justifyContent: ["flex-start", "center", "flex-end"],
  alignItems: ["flex-end", "center", "flex-start"],
  flexDirection: "row"
}} />
```

```jsx
<FlexBox x={["left", "space-between"]} y={["top", "center"]} flexDirection={["row", "column"]} />

// ...is equivalent to:

<Box sx={{
  display: "flex",
  justifyContent: ["flex-start", "center"],
  alignItems: ["flex-start", "space-between"],
  flexDirection: ["row", "column"]
}} />
```

...and `ResponsiveStyleObject` object notation:

```jsx
<FlexBox
  x={{ xs: "left", sm: "center", md: "right" }}
  y={{ xs: "bottom", sm: "center", md: "top" }}
/>

// ...is equivalent to:

<Box sx={{
  display: "flex",
  justifyContent: { xs: "flex-start", sm: "center", md: "flex-end" },
  alignItems: { xs: "flex-end", sm: "center", md: "flex-start" },
  flexDirection: "row"
}} />
```

And remember, mui-flexy helps you handle the complex switch between `row` and `column` at different breakpoints:

```jsx
<FlexBox
  x={{ xs: "left", lg: "right" }}
  y="center"
  row={{ xs: true, md: false }}
/>

// ...is equivalent to:

<Box sx={{
  display: "flex",
  justifyContent: { xs: "flex-start", md: "center" },
  alignItems: { xs: "center", md: "flex-start", lg: "flex-end" },
  flexDirection: { xs: "row", md: "column" }
}} />
```

...and:

```jsx
<FlexBox x="left" y="bottom" row={{ xs: true, md: false }} />

// ...is equivalent to:

<Box sx={{
  justifyContent: {
    xs: "flex-start",
    md: "flex-end"
  },
  alignItems: {
    xs: "flex-end",
    md: "flex-start"
  },
  flexDirection: { xs: "row", md: "column" }
}} />
```

You can mix and match arrays and objects for `x`, `y`, `row`, and `column` properties. Notice how complicated this gets when we mix and match breakpoints:

```jsx
<FlexBox x="center" y={["center", "stretch"]} row={{ xs: true, md: false }} />

// ...is equivalent to:

<Box sx={{
  justifyContent: { xs: "center", md: "stretch" },
  alignItems: { xs: "center", sm: "stretch", md: "center" },
  flexDirection: { xs: "row", md: "column" }
}} />
```

It supports `reverse` and `flex-wrap` too:

```jsx
<FlexBox x="left" y="center" reverse row />

// ...is equivalent to:

<Box sx={{
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "row-reverse"
}} />
```

```jsx
<FlexBox x="left" y="center" wrap />

// ...is equivalent to:

<Box sx={{
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "wrap"
}} />
```

## FlexGrid migration and legacy Grid support

MUI v5 introduced `Unstable_Grid2`, a new grid system based on flexbox. In v6, `Unstable_Grid2` has been renamed to `Grid2`, and `Grid` is deprecated. In v7, `Grid2` replaced the flagship `Grid` component. MUI skipped v8 and released v9 with the same Grid `size` API as v7 (system props like `mt`/`p` now go through `sx`).

```jsx
// FlexGrid (v5), based on @mui/material/Grid
<FlexGrid container x="center" y="center">
  <FlexGrid item xs={12} sm={6} md={4} lg={3}>
    <Typography>Grids are cool</Typography>
  </FlexGrid>
</FlexGrid>

// FlexGrid2 (v6), based on @mui/material/Grid2
<FlexGrid2 container x="center" y="center">
  <FlexGrid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
    <Typography>Grids are cool</Typography>
  </FlexGrid2>
</FlexGrid2>

// FlexGrid (v7+), based on @mui/material/Grid
<FlexGrid container x="center" y="center">
  <FlexGrid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
    <Typography>Grids are cool</Typography>
  </FlexGrid>
</FlexGrid>
```

## Refs & component overrides

Both FlexBox and FlexGrid are wrapped with forwardRef, so you can pass a ref to FlexBox and FlexGrid. You can also pass a `component` prop to override the default `div`:

```jsx
import { forwardRef } from "react";

const boxRef = useRef(null);

<FlexBox ref={boxRef} id="my-flex-box">
  <Typography>{`I'm a FlexBox with id ${boxRef.current?.id}`}</Typography>
</FlexBox>;
```

```jsx
const SpanFlex = <FlexBox component="span" x="center" y="center" />;
const TypographyFlex = <FlexBox component={Typography} x="center" y="center" variant="subtitle1" />;
```

## Shared layout classes

Flexy's default `styling="system"` mode uses MUI's existing styling path. To reuse
layout rules independently of each element's other styles, enable `styling="classes"`:

```tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FlexBox, FlexyProvider } from "@mui-flexy/v7";

const theme = createTheme();

<ThemeProvider theme={theme}>
  <FlexyProvider styling="classes">
    <FlexBox x="center" y="top" sx={{ color: "red" }} />
    <FlexBox x="center" y="top" sx={{ color: "blue" }} />
    <FlexBox styling="system" x="center" y="top" />
  </FlexyProvider>
</ThemeProvider>;
```

The first two boxes share `MuiFlex-j-center` and `MuiFlex-a-start`,
along with `MuiFlex-row`. The root supplies `display: flex` with zero specificity,
so only display overrides and responsive resets need a display utility. Existing MUI root
classes remain present in both modes; the compact layout utilities identify class mode. There is one utility rule
per property/value, rather than one rule per combination. Unrelated `sx` values
can still produce different MUI classes, but the shared layout declarations are
not bundled into those classes.

`FlexyProvider` and the `styling` prop are available in the v5, v6, v7, and v9
packages, including fixed row/column variants and v6's `FlexGrid2`. Providers
default to `"system"`; a component's `styling` prop overrides that default in
either direction. Class mode requires a provider even when enabled on a single
component. The provider installs the stylesheet automatically; no CSS import is
required.

### Responsive layout and themes

Responsive objects and arrays use the provider's theme breakpoint order and
media queries, including custom breakpoint names and units. Missing or null
entries keep the previous value. Direction changes recalculate horizontal and
vertical alignment at each breakpoint:

```tsx
<FlexBox direction={{ xs: "row", md: "column" }} x="center" y="top" wrap={{ xs: true, md: false }} />
```

Scalar classes have stable names. Responsive classes add a deterministic
breakpoint-configuration identifier and breakpoint name, so themes with different
breakpoint values can coexist. Treat that identifier as opaque. Place a
`FlexyProvider` inside each nested `ThemeProvider` that changes the theme, and
inside each separate Emotion `CacheProvider`. Equivalent nested Flexy providers
reuse their ancestor's stylesheet. Each independent provider tree owns its
stylesheet lifecycle; unrelated sibling providers should usually be replaced by
one shared ancestor.

Styles use Emotion's existing cache and server-rendering path. Keep the same
theme/breakpoint configuration on the server and client, and use your application's
normal Emotion SSR setup.

### Styling and overrides

Class mode covers display, direction, reverse, horizontal/vertical alignment, and
wrap. Spacing, Grid sizing, other system props, and arbitrary `sx` remain on MUI's
styling path. Theme callbacks for display/direction are evaluated against the
provider's theme. Values outside the finite utility vocabulary, such as
`display="flow-root"`, fall back to MUI for that property while other layout
properties retain shared classes.

Explicit `sx` and inline `style` override shared layout rules. Objects, arrays,
theme callbacks, responsive `sx`, and `styled(FlexBox)` composition are supported.
Emotion styles supplied through `styled()` also take priority over shared layout
rules in class mode. External CSS that overrides layout needs sufficient
specificity; for example:

```css
.MuiFlex-root.my-layout {
  justify-content: flex-end;
}
```

Load an equally specific external rule after the shared stylesheet, or add another
class selector. Avoid depending on the order of names in `className`.

A standalone class-mode demo is available at `/?classes` on each version's demo
server. Its "Render 300 boxes" button demonstrates layout-rule reuse with varied
`sx` styling.

## `styled()` support

mui-flexy supports the `styled()` function from `@mui/material/styles` to create styled components:

```jsx
const CenterCenterBox = styled(FlexBox)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
```

It supports all of the advanced functions available through `styled()` for theme-injection, prop-passing, and TypeScript:

##### `shouldForwardProp`:

```jsx
const CountBox =
  styled(FlexBox, {
    shouldForwardProp: (prop) => !["count"].includes(String(prop)),
  }) <
  { count: number } >
  (({ theme, count }) =>
    theme.unstable_sx({
      color: (theme) => (count > 8 ? theme.palette.primary.warning : theme.palette.primary.main),
    }));
```

##### `inline components`:

```jsx
const ResetBox = styled(
  ({ resetFn, ...props }: FlexBoxProps & { resetFn?: () => void }) => <FlexBox x="center" y="center" {...props} onClick={resetFn} />,
)(({ theme }) => ({
  maxWidth: 100,
  maxHeight: 100,
}));
```

##### `theme.unstable_sx`:

```jsx
const SquircleishBox = styled(FlexBox)(({ theme }) =>
  theme.unstable_sx({
    backgroundColor: theme.palette.primary.light,
    borderRadius: 2, // use theme.unstable_sx to use theme values
    px: 1, // use theme.unstable_sx to use theme values
  }),
);
```

## Development

Use Node.js 20 or newer and the pnpm version pinned in `package.json`. With Corepack installed, run `corepack enable`; otherwise install the pinned pnpm version with `npm install -g pnpm@12.11.2`.

```sh
pnpm install --frozen-lockfile
pnpm run test:unit
pnpm run test:types
pnpm run build:all
pnpm run demo
```

Install dependencies once from the repository root. Builds and demo commands use the installed, locked tools. `pnpm-workspace.yaml` defines the packages, test fixtures, and demo & docs; `pnpm-lock.yaml` is the shared lockfile. CI installs with `--frozen-lockfile`.

### Demo & docs

`pnpm run demo` (also `pnpm dev` or `pnpm run docs:dev`) starts the same interactive
**demo & docs** published at https://brandonscript.github.io/mui-flexy/.
Open http://localhost:3003/. The development server builds the site on startup,
watches source changes, and asks you to refresh after rebuilding.

Use `?mui=v5`, `?mui=v6`, `?mui=v7`, or `?mui=v9` to select a version directly.
For example, https://brandonscript.github.io/mui-flexy/?mui=v9 opens MUI v9.
Version navigation updates this parameter and supports browser back/forward,
reloads, and opening links in another tab. Missing or invalid versions select v7.
Add `&styling=classes` to try shared layout classes in the sandbox:
http://localhost:3003/?mui=v9&styling=classes.

### Test fixtures

`fixtures/` contains isolated per-version rendering fixtures for automated tests;
these are not the public demo. Use `pnpm run fixture:v9` (or `fixture:v5`,
`fixture:v6`, `fixture:v7`) to run one, or `pnpm run fixture:all` to run all four.
They use ports 3005–3008. `?classes` opens the class-mode regression fixture.
`pnpm run build:fixtures` builds them, and `pnpm run test:e2e:fixtures` checks them.
`pnpm run test:e2e:docs` checks the actual demo & docs.

### Documentation for coding agents

The README is the API and usage reference. `context7.json` configures Context7
indexing to exclude test fixtures and generated bundles. The published site
provides `llms.txt` and a Markdown copy of this README at `guide.md`; the copy is
generated during the site build so it stays aligned with the package examples.
