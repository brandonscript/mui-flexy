import { objectSpread2 as _objectSpread2 } from './_virtual/_rollupPluginBabelHelpers.js';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import { forwardRef } from 'react';
import { mapFlexProps } from './Flex.utils.js';
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

export { FlexBox, FlexGrid };
//# sourceMappingURL=Flex.js.map
