<img width="256" alt="flex-logo" src="https://user-images.githubusercontent.com/1480253/186842214-5575f27e-fc48-4617-bedb-a7ec29411203.png">

# `mui-flexy`

A flexbox wrapper for [Material UI](https://mui.com/) Box and Grid components with handy shorthand props.

![NPM Version](https://img.shields.io/npm/v/mui-flexy)
![NPM Downloads](https://img.shields.io/npm/dm/mui-flexy?label=downloads)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/brandonscript/mui-flexy)
![MUI Versions](https://img.shields.io/badge/%40mui%2Fmaterial%20v5%20%7C%20v6-blue)
![React Versions](https://img.shields.io/badge/React%2017%20%7C%2018-8A2BE2)

## Get started

### Install

```shell
yarn add mui-flexy
# or
npm install mui-flexy
```

> Notes:
>
> - This lib was designed for TypeScript, so please file a bug or PR if you find any issues using it with untyped JS.
> - As of v1.2.0, CommonJS is no longer supported. If you need it, please use an older version, or file a bug/PR.

### Dependencies

Make sure you've got `@mui/material` and its dependencies installed, as well as React:

```shell
yarn add @mui/material @emotion/react @emotion/styled react react-dom
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

### Basic usage

Import the `FlexBox` or `FlexGrid` components from `mui-flexy` and use them in your app as you would with MUI's `Box` or `Grid` components:

```jsx
import { Typography } from "@mui/material"; // or use a <p> if you don't like fun typography
import { FlexBox, FlexGrid } from "mui-flex";

<FlexBox x="top" y="center">
  <Typography>Hello, Bajor</Typography>
</FlexBox>;
```

## Why `mui-flexy`?

### The problem

If you have never been confused whether to use `justify-content` or `align-items`, then Flexy is not for you. If you have, then get started with `yarn add mui-flexy` or `npm install mui-flexy`.

Vanilla CSS requires a lot of mental gymnastics to remember which alignment property to use depending on the axis of your flexbox:

`justify-content` aligns along the main axis and `align-items` aligns along the cross axis. When you change the axis, you have to re-write your alignments. This gets exponentially more difficult when you introduce responsive breakpoints.

### The solution

Science and math solved this problem a long time ago with constants like `x` and `y` to represent 2-dimensional space, where `x` is the horizontal axis and `y` is the vertical axis.

mui-flexy gives you a way to align things in the same way using `x` and `y` props instead, calculating all the hard CSS stuff for you so you don't have to.

![mui-flexy](https://user-images.githubusercontent.com/1480253/186974043-d75cd310-c60b-4835-ba80-e72cbab167c3.gif)

## Usage & features

Check out the [live demo](https://brandonscript.github.io/mui-flexy/) for examples of all `mui-flexy`'s features.

FlexBox can be used as a drop-in replacement for MUI's Box component, with the added benefit of `x` and `y` props for alignment:

```jsx
const YouTooCanCenterADiv = () => (
  <FlexBox x="center" y="center" width="100vw" height="100vh">
    <Typography>2-D coordinate systems are cool</Typography>
  </FlexBox>
);
```

where:

```jsx
{
  x: "center",
  y: "center",
  row: true // default is row, or you can pass column
}
produces {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row"
}
```

and

```jsx
{
  x: "left",
  y: "bottom",
  column: true
}
produces {
  justifyContent: "flex-end",
  alignItems: "flex-start",
  flexDirection: "column"
}
```

It also supports ResponsiveStyleObject arrays/object notation:

```jsx
{
  x: ["left", "center", "right"],
  y: ["bottom", "center", "top"],
  row: true
}
produces {
  justifyContent: ["flex-start", "center", "flex-end"],
  alignItems: ["flex-end", "center", "flex-start"],
  flexDirection: "row"
}

//

{
  x: ["left", "space-between"],
  y: ["top", "center"],
  flexDirection: ["row", "column"]
}
produces {
  justifyContent: ["flex-start", "center"],
  alignItems: ["flex-start", "space-between"],
  flexDirection: ["row", "column"]
}

//

{
  x: {
    xs: "left",
    sm: "center",
    md: "right"
  },
  y: {
    xs: "bottom",
    sm: "center",
    md: "top"
  },
  row: true
}
produces {
  justifyContent: {
    xs: "flex-start",
    sm: "center",
    md: "flex-end"
  },
  alignItems: {
    xs: "flex-end",
    sm: "center",
    md: "flex-start"
  },
  flexDirection: "row"
}

//

{
  x: {
    xs: "left",
    sm: "center",
    md: "left",
    lg: "inherit",
    xl: "space-around"
  },
  y: {
    xs: "top",
    sm: "center",
    md: "bottom",
    lg: "space-between",
    xl: "center"
  }
  flexDirection: {
    xs: "row",
    sm: "row",
    md: "column",
    lg: "column",
    xl: "column"
  }
}
produces {
  justifyContent: {
    xs: "flex-start",
    sm: "center",
    md: "flex-end",
    lg: "center",
    xl: "center"
  },
  alignItems: {
    xs: "flex-start",
    sm: "center",
    md: "flex-start",
    lg: "inherit",
    xl: "space-around"
  },
  flexDirection: {
    xs: "row",
    sm: "row",
    md: "column",
    lg: "column",
    xl: "column"
  }
}
```

As of v1.2.0, you can now use responsive arrays/objects for `row` and `column` properties, too:

```jsx
{
  x: "center",
  y: "center",
  row: [true, true, false], // xs, sm: 'row', md+: 'column'
  // column: [false, false, true] // implied, not required
}

// or

{
  x: "center",
  y: "center",
  row: { xs: true, md: false },
  column: { xs: false, md: true } // implied, not required, but helps with readability
}
```

It supports `reverse`, too:

```jsx
{
  x: "left",
  y: "center",
  reverse: true
  row: true
}
produces {
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "row-reverse"
}
```

## Using a FlexGrid

Like FlexBox, FlexGrid is a drop-in replacement for MUI's Grid component. Note that with @mui/material v6, `Unstable_Grid2` has been renamed to `Grid2`, and `Grid` is deprecated.

```jsx
// Grid (v5), based on @mui/material/Grid
<FlexGrid container x="center" y="center">
  <FlexGrid item xs={12} sm={6} md={4} lg={3}>
    <Typography>Grids are cool</Typography>
  </FlexGrid>
</FlexGrid>

// Grid2 (v5), based on @mui/material/Unstable_Grid2
<FlexGrid2 container x="center" y="center">
  <FlexGrid2 xs={12} sm={6} md={4} lg={3}>
    <Typography>Grids are cool</Typography>
  </FlexGrid2>
</FlexGrid2>

// Grid2 (v6), based on @mui/material/Grid2
<FlexGrid2 container x="center" y="center">
  <FlexGrid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
    <Typography>Grids are cool</Typography>
  </FlexGrid2>
</FlexGrid2>
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
