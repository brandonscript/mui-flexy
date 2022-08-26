<img width="256" alt="flex-logo" src="https://user-images.githubusercontent.com/1480253/186842214-5575f27e-fc48-4617-bedb-a7ec29411203.png">

# Flex
A flexbox wrapper for [Material UI](https://mui.com/) Box and Grid components with handy shorthand props

## The problem

If you have never gotten confused whether to use justify-content or align-items, then Flex is not for you. If you have, and you've lost sleep, hair, or brain cells because centering a div is hard, then say no more, and `yarn add mui-flex` or `npm install mui-flex`.

See, CSS dictates that:

`justify-content` aligns along the main axis and `align-items` aligns along the cross axis. When you change the axis, your alignments go bonkers.

## The solution

What if we took an approach from science and math and 2-dimensional space?

Flex gives you a way to align things in 2-dimensional space using sensible props like x and y instead, and does all the hard CSS stuff for you so you don't have to.

![mui-flex](https://user-images.githubusercontent.com/1480253/186974043-d75cd310-c60b-4835-ba80-e72cbab167c3.gif)

## Getting started

```shell
yarn add mui-flex
# or 
npm install mui-flex
```

Make sure you've got `@mui/material` and its dependencies installed. And React, don't forget React.

If you're not using TypesScript, expect for now that everything will be angry and you will be mad at me. File an issue or submit a PR if you want to live in Wild West.js land.

Then add to your project:

```jsx

import { Typography } from '@mui/material'; // or use a <p> if you don't like fun typography
import { FlexBox, FlexGrid } from 'mui-flex';

<FlexBox x="top" y="center">
  <Typography>Hello, Bajor</Typography>
</FlexBox>

```

## Meaty bits of fun usage and more words

It's like magic:

```jsx

const YouTooCanCenterADiv = () => (
  <FlexBox x="center" y="center" width='100vw' height='100vh'>
    <Typography>
      2-D coordinate systems are cool
    </Typography>
  </FlexBox>
)
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

Just like MUI (via Emotion) lets you use arrays and object notation, Flex does too (because it's a wrapper for Box and Grid):

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
```

Want to get crafty with a `ResponsiveStyleObject`?

```jsx
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

Neato, burrito! That's pretty easy, right?

Oh, one last thing—you can get clever with `reverse`, too:

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

Coming soon, perhas it's worth having some shorthand like this:

```jsx
<FlexRow box />
<FlexColumn grid />

// and

<FlexBox row top-left />

// maybe?
