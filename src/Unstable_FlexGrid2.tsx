import type { Grid2Props as Unstable_Grid2Props } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { major as muiVersion } from "@mui/material/version";
import { forwardRef, Suspense } from "react";

import type { FlexGrid2Props, FlexGrid2TypeMap, FlexOrientation } from "./Flex.types";
import { mapFlexProps } from "./Flex.utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

const versionMismatchErr = `@mui/material version is ${muiVersion}, but Unstable_FlexGrid2 is only available in v5. Please use FlexGrid2 instead.`;

export { FlexGrid2Props as Unstable_FlexGrid2Props };
export const createUnstable_FlexGrid2 = <
  Orientation extends FlexOrientation | undefined = undefined,
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {},
>() => {
  let MuiUnstable_Grid2: _Any = undefined;
  try {
    if (muiVersion > 5) {
      throw new Error(versionMismatchErr);
    }
    // @ts-ignore
    MuiUnstable_Grid2 = React.lazy(() => import("@mui/material/Unstable_Grid2"));
  } catch (_err) {
    console.warn(versionMismatchErr);
  }
  return forwardRef<Unstable_Grid2Props["ref"], FlexGrid2Props<Orientation, RootComponent, AdditionalProps>>(
    (props, ref) => {
      const { size, ...rest } = props as _Any;
      const xs = typeof size === "number" || typeof size === "string" ? size : size?.xs;
      const { xs: _xs, sm, md, lg, xl } = size || {};
      props = {
        ...rest,
        xs: xs || _xs,
        sm,
        md,
        lg,
        xl,
        ref,
      };
      return (
        <Suspense fallback={<div data-mui-flexy-unstable-grid2="loading" />}>
          <MuiUnstable_Grid2 {...mapFlexProps(props, ref, "Grid2")} />;
        </Suspense>
      );
    },
  ) as OverridableComponent<FlexGrid2TypeMap<Orientation, AdditionalProps, RootComponent>>;
};

export const Unstable_FlexGrid2 = createUnstable_FlexGrid2();
export default Unstable_FlexGrid2;
