import type { Grid2Props } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { major as muiVersion } from "@mui/material/version";
import { forwardRef } from "react";

import type { FlexGrid2Props, FlexGrid2TypeMap, FlexOrientation } from "../Flex.types";
import { mapFlexProps } from "../Flex.utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

const versionMismatchErr = `@mui/material version is ${muiVersion}, but v6 or above is required to use FlexGrid2. Please use Unstable_FlexGrid2 instead.`;

let MuiGrid2: _Any = undefined;
try {
  // @ts-ignore
  MuiGrid2 = (await import("@mui/material/Grid2")).default;
} catch (_err) {
  console.warn(versionMismatchErr);
}

export { FlexGrid2Props };
export const createFlexGrid2 = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {},
>() => {
  if (muiVersion < 6) {
    throw new Error(versionMismatchErr);
  }
  return forwardRef<Grid2Props["ref"], FlexGrid2Props<Orientation, RootComponent, AdditionalProps>>((props, ref) => {
    const { xs, sm, md, lg, xl, size, ...rest } = props as _Any;
    const sizeValues = [xs, sm, md, lg, xl].filter((value) => value !== null && value !== undefined);
    const sizeProps =
      size ?? (sizeValues.every((value) => value === sizeValues[0]) ? sizeValues[0] : { xs, sm, md, lg, xl });
    props = { ...rest, size: sizeProps };
    // @ts-ignore
    return <MuiGrid2 {...mapFlexProps(props, ref, "Grid2")} />;
  }) as OverridableComponent<FlexGrid2TypeMap<Orientation, AdditionalProps, RootComponent>>;
};
