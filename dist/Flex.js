import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import { forwardRef, createElement } from 'react';
import { mapFlexProps } from './Flex.utils.js';

const muiPkg = await import('@mui/material/package.json');
const muiVersion = parseInt(muiPkg?.version?.split(".")[0], 10);
const MuiGrid2 = await import('@mui/material').then((m)=>{
    if (muiVersion > 5) {
        // @ts-ignore
        return m?.Grid2;
    }
    // @ts-ignore
    return m?.Unstable_Grid2;
});
const createFlexBox = ()=>/*#__PURE__*/ forwardRef((props, ref)=>/*#__PURE__*/ createElement(MuiBox, mapFlexProps(props, ref, "Box")));
const FlexBox = createFlexBox();
const createFlexGrid = ()=>/*#__PURE__*/ forwardRef((props, ref)=>/*#__PURE__*/ createElement(MuiGrid, mapFlexProps(props, ref, "Grid")));
const FlexGrid = createFlexGrid();
const createFlexGrid2_v6 = ()=>/*#__PURE__*/ forwardRef((props, ref)=>{
        const { xs, sm, md, lg, xl, size, ...rest } = props;
        const sizeValues = [
            xs,
            sm,
            md,
            lg,
            xl
        ].filter((value)=>value !== null && value !== undefined);
        const sizeProps = size ?? (sizeValues.every((value)=>value === sizeValues[0]) ? sizeValues[0] : {
            xs,
            sm,
            md,
            lg,
            xl
        });
        props = {
            ...rest,
            size: sizeProps
        };
        return /*#__PURE__*/ createElement(MuiGrid2, mapFlexProps(props, ref, "Grid2"));
    });
const createFlexGrid2_v5 = ()=>/*#__PURE__*/ forwardRef((props, ref)=>{
        const { size, ...rest } = props;
        const xs = typeof size === "number" || typeof size === "string" ? size : size?.xs;
        const { xs: _xs, sm, md, lg, xl } = size || {};
        props = {
            ...rest,
            xs: xs || _xs,
            sm,
            md,
            lg,
            xl,
            ref
        };
        return /*#__PURE__*/ createElement(MuiGrid2, mapFlexProps(props, ref, "Grid2"));
    });
const FlexGrid2 = muiVersion > 5 ? createFlexGrid2_v6() : createFlexGrid2_v5();

export { FlexBox, FlexGrid, FlexGrid2 };
//# sourceMappingURL=Flex.js.map
