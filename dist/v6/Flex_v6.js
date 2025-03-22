import { objectWithoutProperties as _objectWithoutProperties, objectSpread2 as _objectSpread2 } from '../_virtual/_rollupPluginBabelHelpers.js';
import { major } from '@mui/material/version';
import { forwardRef } from 'react';
import { mapFlexProps } from '../Flex.utils.js';
import { jsx } from 'react/jsx-runtime';

var _excluded = ["xs", "sm", "md", "lg", "xl", "size"];
var versionMismatchErr = "@mui/material version is ".concat(major, ", but v6 or above is required to use FlexGrid2. Please use Unstable_FlexGrid2 instead.");
var MuiGrid2 = undefined;
try {
  // @ts-ignore
  MuiGrid2 = (await import('@mui/material/Grid2'))["default"];
} catch (_err) {
  console.warn(versionMismatchErr);
}
var createFlexGrid2 = function createFlexGrid2() {
  if (major < 6) {
    throw new Error(versionMismatchErr);
  }
  return /*#__PURE__*/forwardRef(function (props, ref) {
    var _ref = props,
      xs = _ref.xs,
      sm = _ref.sm,
      md = _ref.md,
      lg = _ref.lg,
      xl = _ref.xl,
      size = _ref.size,
      rest = _objectWithoutProperties(_ref, _excluded);
    var sizeValues = [xs, sm, md, lg, xl].filter(function (value) {
      return value !== null && value !== undefined;
    });
    var sizeProps = size !== null && size !== void 0 ? size : sizeValues.every(function (value) {
      return value === sizeValues[0];
    }) ? sizeValues[0] : {
      xs: xs,
      sm: sm,
      md: md,
      lg: lg,
      xl: xl
    };
    props = _objectSpread2(_objectSpread2({}, rest), {}, {
      size: sizeProps
    });
    // @ts-ignore
    return /*#__PURE__*/jsx(MuiGrid2, _objectSpread2({}, mapFlexProps(props, ref, "Grid2")));
  });
};

export { createFlexGrid2 };
//# sourceMappingURL=Flex_v6.js.map
