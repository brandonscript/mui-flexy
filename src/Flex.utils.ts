import { ComponentType } from "react";

import { Align, Axis, FlexBoxProps, StrictAxis } from "./Flex.types";

// Borrowed unapologetically from https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/utils.ts
export function getDisplayName<P>(Component: ComponentType<P>) {
  return typeof Component === "string"
    ? Component
    : Component.displayName || Component.name || "Unknown";
}

const mapAlignment = (alignment: Align): Align => {
  if (!alignment) return;
  if (typeof alignment === "string") {
    switch (alignment) {
      case "top":
      case "left":
        return "flex-start";
      case "bottom":
      case "right":
        return "flex-end";
      default:
        return alignment;
    }
  } else if (Array.isArray(alignment)) {
    return alignment.map(a => mapAlignment(a));
  } else if (typeof alignment === "object") {
    return Object.fromEntries(Object.entries(alignment).map(([k, a]) => [k, mapAlignment(a)]));
  }
};

const mapDirection = (direction: Axis, reverse: boolean = false): Axis => {
  if (!direction) return "row";
  if (typeof direction === "string") {
    if (!["row", "row-reverse", "column", "column-reverse"].includes(direction as StrictAxis)) {
      console.warn(
        `Using { flex-direction: ${direction} } with mui-flex shorthand is not recommended \
because it can cause unexpected alignment and orientation anomalies.`
      );
    }
    switch (direction) {
      case "row":
      case "column":
        return `${direction}${reverse ? "-reverse" : ""}`;
      default:
        return direction;
    }
  } else if (Array.isArray(direction)) {
    return direction.map(d => mapDirection(d, reverse)) as Axis;
  } else if (typeof direction === "object") {
    return Object.fromEntries(
      Object.entries(direction).map(([k, d]) => [k, mapDirection(d, reverse)])
    ) as Axis;
  }
};

const stringOrArrayValue = (value: Align | Axis | undefined, index: number) => {
  if (typeof value === "string") {
    return value;
  } else if (Array.isArray(value)) {
    return value?.[index];
  }
};

const mapResponsiveObject = (direction: { [key: string]: Axis }, main: Align, cross: Align) => {
  return Object.fromEntries(
    Object.entries(direction).map(([key, d]) => {
      if (typeof d !== "string") {
        throw new Error(
          "Values for a flex direction ResponsiveStyleObject must be strings, e.g. { xs: 'row', sm: 'column' }"
        );
      }
      if (d.startsWith("column")) {
        return [key, typeof cross === "string" ? cross : mapAlignment(cross)?.[key as keyof Align]];
      } else {
        return [key, typeof main === "string" ? main : mapAlignment(main)?.[key as keyof Align]];
      }
    })
  );
};

export const mapFlexProps = <T extends FlexBoxProps = FlexBoxProps>(props: T) => {
  const { x, y, row, column, flexDirection, reverse, nowrap } = props;
  const direction = mapDirection(row ? "row" : column ? "column" : flexDirection, reverse);

  const whiteSpace = nowrap ? "nowrap" : props.whiteSpace;

  const flexProps: T = { display: "flex", whiteSpace } as T;

  if (typeof direction === "string") {
    return {
      ...flexProps,
      flexDirection: direction,
      justifyContent: mapAlignment(direction.startsWith("column") ? y : x),
      alignItems: mapAlignment(direction.startsWith("column") ? x : y),
    };
  } else if (Array.isArray(direction)) {
    if (
      (Array.isArray(x) && x.length !== direction.length && typeof x !== "string") ||
      (Array.isArray(y) && y.length !== direction.length && typeof y !== "string")
    ) {
      throw new Error(
        "Invalid flex shorthand props. If using ResponsiveStyleValue arrays for x, y, or flexDirection,\
 all arrays must be the same length. You may only mix and match ResponsiveStyleValue arrays and strings."
      );
    } else {
      return {
        ...flexProps,
        flexDirection: direction,
        justifyContent: direction.map((d: Align, i: number) => {
          return stringOrArrayValue(mapAlignment((d as string).startsWith("column") ? y : x), i);
        }),
        alignItems: direction.map((d: Align, i: number) => {
          return stringOrArrayValue(mapAlignment((d as string).startsWith("column") ? x : y), i);
        }),
      };
    }
  } else if (direction && typeof direction === "object") {
    if (
      (typeof x !== "object" && typeof x !== "string") ||
      (typeof y !== "object" && typeof y !== "string")
    ) {
      throw new Error(
        "Invalid flex shorthand props. You may only mix and match ResponsiveStyleValue objects and strings."
      );
    }
    return {
      ...flexProps,
      flexDirection: direction,
      justifyContent: mapResponsiveObject(direction, x, y),
      alignItems: mapResponsiveObject(direction, y, x),
    };
  }
  return {
    ...flexProps,
    flexDirection: direction,
    justifyContent: x,
    alignItems: y,
  };
};

export const _test = {
  mapAlignment,
  mapDirection,
  mapFlexProps,
};
