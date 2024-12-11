var material = require('@mui/material');
var React = require('react');
var Flex_utils = require('./Flex.utils.cjs');

const FlexBox = /*#__PURE__*/ React.forwardRef((props, ref)=>/*#__PURE__*/ React.createElement(material.Box, {
        ...Flex_utils.mapFlexProps(props, "Box"),
        ref: ref
    }));
const FlexGrid = /*#__PURE__*/ React.forwardRef((props, ref)=>/*#__PURE__*/ React.createElement(material.Grid, {
        ...Flex_utils.mapFlexProps(props, "Grid"),
        ref: ref
    }));

exports.FlexBox = FlexBox;
exports.FlexGrid = FlexGrid;
//# sourceMappingURL=Flex.cjs.map
