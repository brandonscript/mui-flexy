import { Box, Grid } from '@mui/material';
import { forwardRef, createElement } from 'react';
import { mapFlexProps } from './Flex.utils.js';

const FlexBoxComponent = (props)=>/*#__PURE__*/ createElement(Box, mapFlexProps(props, "Box"));
const FlexBox = /*#__PURE__*/ forwardRef((props, ref)=>FlexBoxComponent({
        ...props,
        ref
    }));
const FlexGridComponent = (props)=>/*#__PURE__*/ createElement(Grid, mapFlexProps(props, "Grid"));
const FlexGrid = /*#__PURE__*/ forwardRef((props, ref)=>FlexGridComponent({
        ...props,
        ref
    }));

export { FlexBox, FlexGrid };
//# sourceMappingURL=Flex.js.map
