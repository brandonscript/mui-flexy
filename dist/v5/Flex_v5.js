import { objectWithoutProperties as _objectWithoutProperties, objectSpread2 as _objectSpread2 } from '../_virtual/_rollupPluginBabelHelpers.js';
import { major } from '@mui/material/version';
import { forwardRef } from 'react';
import { mapFlexProps } from '../Flex.utils.js';
import { jsx } from 'react/jsx-runtime';

var _excluded = ["size"];
var versionMismatchErr = "@mui/material version is ".concat(major, ", but Unstable_FlexGrid2 is only available in v5. Please use FlexGrid2 instead.");
var MuiUnstable_Grid2 = undefined;
try {
  // @ts-ignore
  MuiUnstable_Grid2 = (await import('@mui/material/Grid2'))["default"];
} catch (_err) {
  console.warn(versionMismatchErr);
}
var createUnstable_FlexGrid2 = function createUnstable_FlexGrid2() {
  if (major > 5) {
    throw new Error(versionMismatchErr);
  }
  return /*#__PURE__*/forwardRef(function (props, ref) {
    var _ref = props,
      size = _ref.size,
      rest = _objectWithoutProperties(_ref, _excluded);
    var xs = typeof size === "number" || typeof size === "string" ? size : size === null || size === void 0 ? void 0 : size.xs;
    var _ref2 = size || {},
      _xs = _ref2.xs,
      sm = _ref2.sm,
      md = _ref2.md,
      lg = _ref2.lg,
      xl = _ref2.xl;
    props = _objectSpread2(_objectSpread2({}, rest), {}, {
      xs: xs || _xs,
      sm: sm,
      md: md,
      lg: lg,
      xl: xl,
      ref: ref
    });
    // @ts-ignore
    return /*#__PURE__*/jsx(MuiUnstable_Grid2, _objectSpread2({}, mapFlexProps(props, ref, "Grid2")));
  });
};

export { createUnstable_FlexGrid2 };
//# sourceMappingURL=Flex_v5.js.map
