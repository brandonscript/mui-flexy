import { Box, Grid } from '@mui/material';
import React from 'react';
import { mapFlexProps } from './Flex.utils.js';

const FlexBox = /*#__PURE__*/ React.forwardRef((props, ref)=>/*#__PURE__*/ React.createElement(Box, {
        ...mapFlexProps(props, "Box"),
        ref: ref
    }));
const FlexGrid = /*#__PURE__*/ React.forwardRef((props, ref)=>/*#__PURE__*/ React.createElement(Grid, {
        ...mapFlexProps(props, "Grid"),
        ref: ref
    }));

export { FlexBox, FlexGrid };
//# sourceMappingURL=Flex.js.map
