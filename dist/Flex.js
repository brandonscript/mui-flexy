import { objectSpread2 as _objectSpread2 } from './_virtual/_rollupPluginBabelHelpers.js';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import { major } from '@mui/material/version';
import { forwardRef } from 'react';
import { mapFlexProps } from './Flex.utils.js';
import { createUnstable_FlexGrid2 } from './v5/Flex_v5.js';
import { createFlexGrid2 } from './v6/Flex_v6.js';
import { jsx } from 'react/jsx-runtime';

var createFlexBox = function createFlexBox() {
  return /*#__PURE__*/forwardRef(function (props, ref) {
    return /*#__PURE__*/jsx(MuiBox, _objectSpread2({}, mapFlexProps(props, ref, "Box")));
  });
};
var FlexBox = createFlexBox();
var createFlexGrid = function createFlexGrid() {
  return /*#__PURE__*/forwardRef(
  // @ts-ignore
  function (props, ref) {
    return /*#__PURE__*/jsx(MuiGrid, _objectSpread2({}, mapFlexProps(props, ref, "Grid")));
  });
};
var FlexGrid = createFlexGrid();
var FlexGrid2 = function () {
  try {
    return major > 5 ? createFlexGrid2() : createUnstable_FlexGrid2();
  } catch (err) {
    return /*#__PURE__*/forwardRef(function (props, ref) {
      return /*#__PURE__*/jsx(MuiBox, _objectSpread2(_objectSpread2({}, props), {}, {
        ref: ref,
        children: String((err === null || err === void 0 ? void 0 : err.message) || err)
      }));
    });
  }
}();

export { FlexBox, FlexGrid, FlexGrid2 };
//# sourceMappingURL=Flex.js.map
