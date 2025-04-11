import { objectSpread2 as _objectSpread2 } from './_virtual/_rollupPluginBabelHelpers.js';
import _MuiBox from '@mui/material/Box';
import _MuiGrid from '@mui/material/Grid';
import { forwardRef } from 'react';
import { mapFlexProps } from './Flex.utils.js';
import { jsx } from 'react/jsx-runtime';

var _MuiBox$default, _MuiGrid$default;
var MuiBox = (_MuiBox$default = _MuiBox === null || _MuiBox === void 0 ? void 0 : _MuiBox["default"]) !== null && _MuiBox$default !== void 0 ? _MuiBox$default : _MuiBox;
// @ts-ignore
var MuiGrid = (_MuiGrid$default = _MuiGrid === null || _MuiGrid === void 0 ? void 0 : _MuiGrid["default"]) !== null && _MuiGrid$default !== void 0 ? _MuiGrid$default : _MuiGrid;
var createFlexBox = function createFlexBox() {
  var defaultProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return /*#__PURE__*/forwardRef(function (props, ref) {
    return /*#__PURE__*/jsx(MuiBox, _objectSpread2(_objectSpread2({}, defaultProps), mapFlexProps(props, ref, "Box")));
  });
};
var FlexBox = createFlexBox();
var FlexRowBox = createFlexBox({
  row: true
});
var FlexColumnBox = createFlexBox({
  column: true
});
var createFlexGrid = function createFlexGrid() {
  var defaultProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return /*#__PURE__*/forwardRef(
  // @ts-ignore
  function (props, ref) {
    return /*#__PURE__*/jsx(MuiGrid, _objectSpread2(_objectSpread2({}, defaultProps), mapFlexProps(props, ref, "Grid")));
  });
};
var FlexGrid = createFlexGrid();
var FlexGridRow = createFlexGrid({
  row: true
});
var FlexGridColumn = createFlexGrid({
  column: true
});

export { FlexBox, FlexColumnBox, FlexGrid, FlexGridColumn, FlexGridRow, FlexRowBox };
//# sourceMappingURL=Flex.js.map
