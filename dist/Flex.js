import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import { forwardRef, createElement } from 'react';
import { mapFlexProps } from './Flex.utils.js';

const FlexBoxComponent = (props)=>/*#__PURE__*/ createElement(MuiBox, mapFlexProps(props, "Box"));
const FlexBox = /*#__PURE__*/ forwardRef((props, ref)=>FlexBoxComponent({
        ...props,
        ref
    }));
const FlexGridComponent = (props)=>/*#__PURE__*/ createElement(MuiGrid, mapFlexProps(props, "Grid"));
const FlexGrid = /*#__PURE__*/ forwardRef((props, ref)=>FlexGridComponent({
        ...props,
        ref
    }));

export { FlexBox, FlexGrid };
//# sourceMappingURL=Flex.js.map
