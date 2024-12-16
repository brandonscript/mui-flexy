var material = require('@mui/material');
var react = require('react');
var Flex_utils = require('./Flex.utils.cjs');

const FlexBoxComponent = (props)=>/*#__PURE__*/ react.createElement(material.Box, Flex_utils.mapFlexProps(props, "Box"));
const FlexBox = /*#__PURE__*/ react.forwardRef((props, ref)=>FlexBoxComponent({
        ...props,
        ref
    }));
const FlexGridComponent = (props)=>/*#__PURE__*/ react.createElement(material.Grid, Flex_utils.mapFlexProps(props, "Grid"));
const FlexGrid = /*#__PURE__*/ react.forwardRef((props, ref)=>FlexGridComponent({
        ...props,
        ref
    }));

exports.FlexBox = FlexBox;
exports.FlexGrid = FlexGrid;
//# sourceMappingURL=Flex.cjs.map
