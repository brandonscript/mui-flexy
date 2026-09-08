import { jsx } from 'react/jsx-runtime';
import _MuiBox from '@mui/material/Box';
import { forwardRef } from 'react';
import Grid from '@mui/material/Grid';

const stripUndefined = (obj)=>{
    return Object.fromEntries(Object.entries(obj).filter(([, value])=>value !== undefined));
};
const isResponsiveArray = (value)=>{
    return Array.isArray(value) && value.every((v)=>typeof v === "string" || typeof v === "boolean" || v === null || v === undefined);
};
const isResponsiveObject = (value)=>{
    return !!value && typeof value === "object" && Object.keys(value).some((key)=>[
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
        ].includes(key));
};
const getResponsiveKeys = (...responsiveObjects)=>{
    return Array.from(new Set(responsiveObjects.flatMap((obj)=>Object.keys(obj ?? {})))).sort((a, b)=>[
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
        ].indexOf(a) - [
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
        ].indexOf(b));
};
const resolveWrapValue = (wrap)=>{
    const resolvePrimitive = (value)=>{
        if (value === null || value === undefined) return undefined;
        // String values pass through
        if (typeof value === "string") {
            return value;
        }
        // Boolean values map to wrap/nowrap
        if (typeof value === "boolean") {
            return value ? "wrap" : "nowrap";
        }
        return undefined;
    };
    if (wrap === null || wrap === undefined) return undefined;
    // String values pass through
    if (typeof wrap === "string") {
        return resolvePrimitive(wrap);
    }
    // Boolean values map to wrap/nowrap
    if (typeof wrap === "boolean") {
        return resolvePrimitive(wrap);
    }
    // Array values map each element
    if (Array.isArray(wrap)) {
        return wrap.map(resolvePrimitive);
    }
    // Object values map each breakpoint value
    if (typeof wrap === "object") {
        const mapped = {};
        let hasValue = false;
        Object.entries(wrap).forEach(([key, value])=>{
            const mappedValue = resolvePrimitive(value);
            if (mappedValue !== undefined) {
                mapped[key] = mappedValue;
                hasValue = true;
            }
        });
        return hasValue ? mapped : undefined;
    }
    return undefined;
};
const mapAlignment = (alignment)=>{
    if (!alignment) return;
    if (typeof alignment === "string") {
        switch(alignment){
            case "top":
            case "left":
                return "flex-start";
            case "bottom":
            case "right":
                return "flex-end";
            default:
                return alignment;
        }
    }
    if (Array.isArray(alignment)) {
        return alignment.map(mapAlignment);
    }
    if (typeof alignment === "object") {
        const mapped = {};
        for (const [key, value] of Object.entries(alignment)){
            mapped[key] = mapAlignment(value);
        }
        return mapped;
    }
    return alignment;
};
const coerceToResponsiveArray = (value)=>{
    if (value === null || value === undefined) return [];
    if (isResponsiveArray(value)) {
        return value;
    }
    if (isResponsiveObject(value)) {
        // Make sure we account for gaps in breakpoint keys, e.g. { xs: 'row', lg: 'column' } => ['row', undefined, undefined, 'column']
        if ("xl" in value) return [
            value.xs,
            value.sm,
            value.md,
            value.lg,
            value.xl
        ];
        if ("lg" in value) return [
            value.xs,
            value.sm,
            value.md,
            value.lg
        ];
        if ("md" in value) return [
            value.xs,
            value.sm,
            value.md
        ];
        if ("sm" in value) return [
            value.xs,
            value.sm
        ];
        return [
            value.xs
        ];
    }
    return [
        value
    ];
};
// TODO: Handle function values and breakpoint overrides
const coerceToResponsiveObject = (value)=>{
    if (value === null || value === undefined) return {
        xs: value
    };
    if (isResponsiveArray(value)) {
        const keys = [
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
        ].slice(0, value.length);
        return Object.fromEntries(keys.map((key, index)=>[
                key,
                value?.[index]
            ]));
    }
    if (isResponsiveObject(value)) {
        return value;
    }
    return {
        xs: value
    };
};
const resolveStringDirection = (direction, reverse)=>{
    if (!direction && !reverse) return "row";
    if (typeof direction === "string" && (!reverse || reverse === true)) {
        if (![
            "row",
            "row-reverse",
            "column",
            "column-reverse"
        ].includes(direction)) {
            console.warn(`Using { flex-direction: ${direction} } with mui-flexy shorthand is not recommended \
because it can cause unexpected alignment and orientation anomalies.`);
        }
        if (reverse && (direction === "row" || direction === "column")) {
            // No double reverse - only reverse "row" and "column", not other CSS values
            return `${direction.replace("-reverse", "")}-reverse`;
        }
        return direction;
    }
    // We need to find the largest common type, i.e. if both are string (or null/undefined), return string.
    // But if one is an object, or an array, convert the other to the same type.
    if (isResponsiveObject(direction) || isResponsiveObject(reverse)) {
        let directionAsObject = coerceToResponsiveObject(direction);
        let reverseAsObject = coerceToResponsiveObject(reverse);
        // If direction is an object and reverse is a boolean (not an object), expand reverse to match all direction keys
        if (isResponsiveObject(direction) && typeof reverse === "boolean") {
            const directionKeys = Object.keys(directionAsObject);
            reverseAsObject = Object.fromEntries(directionKeys.map((key)=>[
                    key,
                    reverse
                ]));
        }
        // If direction is a string and reverse is an object, expand direction to match all reverse keys
        if (typeof direction === "string" && isResponsiveObject(reverse)) {
            const reverseKeys = Object.keys(reverseAsObject);
            directionAsObject = Object.fromEntries(reverseKeys.map((key)=>[
                    key,
                    direction
                ]));
        }
        const keys = getResponsiveKeys(directionAsObject, reverseAsObject);
        return Object.fromEntries(keys.map((key)=>[
                key,
                resolveStringDirection(directionAsObject?.[key], reverseAsObject?.[key])
            ]));
    }
    if (isResponsiveArray(direction) || isResponsiveArray(reverse)) {
        const directionAsArray = coerceToResponsiveArray(direction);
        const reverseAsArray = coerceToResponsiveArray(reverse);
        const maxLength = Math.max(directionAsArray.length, reverseAsArray.length);
        return Array.from({
            length: maxLength
        }, (_, i)=>resolveStringDirection(directionAsArray?.[Math.min(i, directionAsArray.length - 1)], reverseAsArray?.[Math.min(i, reverseAsArray.length - 1)]));
    }
    console.warn(`Invalid value for resolveStringDirection: ${JSON.stringify(direction)} and ${JSON.stringify(reverse)}`);
    return "row";
};
const stringOrArrayValue = (value, index)=>{
    if (typeof value === "string") {
        return value;
    } else if (Array.isArray(value)) {
        return value?.[index];
    }
};
const mapResponsiveObject = (direction, main, cross)=>{
    const breakpointIndexMap = {
        xs: 0,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4
    };
    return Object.fromEntries(Object.entries(direction ?? {}).map(([key, d])=>{
        if (typeof d !== "string") {
            throw new Error("Values for a flex direction ResponsiveStyleObject must be strings, e.g. { xs: 'row', sm: 'column' }");
        }
        const target = d.startsWith("column") ? cross : main;
        const aligned = mapAlignment(target);
        if (aligned === undefined || aligned === null || typeof aligned === "string") {
            return [
                key,
                aligned
            ];
        }
        if (Array.isArray(aligned)) {
            const index = breakpointIndexMap[key];
            if (index !== undefined && typeof index === "number" && !Number.isNaN(index) && index >= 0) {
                return [
                    key,
                    aligned[index]
                ];
            }
            return [
                key,
                undefined
            ];
        }
        return [
            key,
            aligned[key]
        ];
    }));
};
const resolveAlignment = (direction, x, y)=>{
    if (typeof direction === "string") {
        const isColumn = direction.startsWith("column");
        return {
            justifyContent: mapAlignment(isColumn ? y : x),
            alignItems: mapAlignment(isColumn ? x : y)
        };
    }
    if (Array.isArray(direction)) {
        return {
            justifyContent: direction.map((d, i)=>stringOrArrayValue(mapAlignment(d?.startsWith("column") ? y : x), i)),
            alignItems: direction.map((d, i)=>stringOrArrayValue(mapAlignment(d?.startsWith("column") ? x : y), i))
        };
    }
    if (typeof direction === "object" && !Array.isArray(direction)) {
        return {
            justifyContent: mapResponsiveObject(direction, x, y),
            alignItems: mapResponsiveObject(direction, y, x)
        };
    }
    return {
        justifyContent: x,
        alignItems: y
    };
};
const resolveBoolDirection = (row, column, reverse, fallback = "row")=>{
    /* Maps boolean responsive row/column props to flexDirection values */ const rowIsNullOrUndefined = row === null || row === undefined;
    const columnIsNullOrUndefined = column === null || column === undefined;
    if (rowIsNullOrUndefined && columnIsNullOrUndefined) {
        return resolveStringDirection(fallback, reverse);
    }
    const rowIsFalse = row === false;
    const columnIsFalse = column === false;
    let chooseRow = [
        true,
        "row"
    ].includes(row) || columnIsFalse || columnIsNullOrUndefined;
    let chooseColumn = [
        true,
        "column"
    ].includes(column) || rowIsFalse || rowIsNullOrUndefined;
    if (rowIsFalse && !columnIsFalse) {
        chooseRow = false;
        chooseColumn = true;
    } else if (columnIsFalse && !rowIsFalse) {
        chooseColumn = false;
        chooseRow = true;
    } else if (chooseRow && chooseColumn) {
        chooseColumn = false;
    }
    const rowIsArray = isResponsiveArray(row);
    const columnIsArray = isResponsiveArray(column);
    const rowIsObject = isResponsiveObject(row);
    const columnIsObject = isResponsiveObject(column);
    // Check if both are empty objects - return empty object
    const rowIsEmptyObject = typeof row === "object" && !Array.isArray(row) && row !== null && !Object.keys(row).length;
    const columnIsEmptyObject = typeof column === "object" && !Array.isArray(column) && column !== null && !Object.keys(column).length;
    if (rowIsEmptyObject && columnIsEmptyObject) {
        return {};
    }
    if ([
        !rowIsObject,
        !columnIsObject,
        !rowIsArray,
        !columnIsArray
    ].every(Boolean)) {
        return resolveStringDirection(chooseColumn ? "column" : chooseRow ? "row" : fallback, reverse);
    }
    const rowIsFalsy = !row || rowIsArray && !row.length || rowIsObject && !Object.keys(row).length || typeof row === "object" && !Array.isArray(row) && row !== null && !Object.keys(row).length;
    const columnIsFalsy = !column || columnIsArray && !column.length || columnIsObject && !Object.keys(column).length || typeof column === "object" && !Array.isArray(column) && column !== null && !Object.keys(column).length;
    if (rowIsArray && columnIsFalsy) {
        return row.map((r)=>resolveBoolDirection(r, column, reverse, fallback));
    }
    if (columnIsArray && rowIsFalsy) {
        return column.map((c)=>resolveBoolDirection(row, c, reverse, fallback));
    }
    if (rowIsArray && columnIsArray) {
        const composite = [];
        if (row.length !== column.length) {
            console.warn(`When using Array type ResponsiveFlexDirection for both 'row' and 'column', they should be the same length (have the same number of breakpoints) - got row=${JSON.stringify(row)} and column=${JSON.stringify(column)}. You probably want to use just one or the other.`);
            const longestLength = Math.max(row.length, column.length);
            for(let i = 0; i < longestLength; i++){
                const r = row[i] ?? (column[i] === "column" ? "row" : "column");
                const c = column[i] ?? (row[i] === "row" ? "column" : "row");
                if (Array.isArray(composite)) {
                    composite.push(resolveBoolDirection(r, c, reverse, fallback));
                }
            }
            return composite;
        }
        // if any of the values in each array are both true for the same array index, warn in the console and default to 'row'
        return row.map((r, i)=>{
            let c = column[i];
            if (r && c) {
                console.warn(`When using Array type ResponsiveFlexDirection for both 'row' and 'column', they cannot not both be true for the same breakpoint index - got row=${JSON.stringify(row)} and column=${JSON.stringify(column)}. Defaulting to 'row' for conflicting indices.`);
                c = false;
            }
            return resolveBoolDirection(r, c, reverse, fallback);
        });
    }
    if (rowIsObject && columnIsFalsy) {
        return Object.fromEntries(Object.entries(row).filter(([, r])=>![
                null,
                undefined
            ].includes(r)).map(([k, r])=>[
                k,
                resolveBoolDirection(r, undefined, reverse, fallback)
            ]));
    }
    if (columnIsObject && rowIsFalsy) {
        return Object.fromEntries(Object.entries(column).filter(([, r])=>![
                null,
                undefined
            ].includes(r)).map(([k, c])=>[
                k,
                resolveBoolDirection(undefined, c, reverse, fallback)
            ]));
    }
    if (rowIsObject && columnIsObject) {
        const composite = {};
        const keys = new Set([
            ...Object.keys(row),
            ...Object.keys(column)
        ]);
        for (const key of [
            ...keys
        ]){
            const r = key in row ? row[key] : undefined;
            const c = key in column ? column[key] : undefined;
            if ([
                null,
                undefined
            ].includes(r) && [
                null,
                undefined
            ].includes(c)) {
                continue;
            }
            composite[key] = resolveBoolDirection(r, c, reverse, fallback);
        }
        return composite;
    }
};
const mapFlexProps = (props, ref, componentName = "Box")=>{
    const { x, y, row, column, flexDirection, direction, reverse, wrap, agnostic: _agnostic, ...rest } = props;
    // If direction is explicitly provided, it takes precedence over row/column/flexDirection
    const resolvedDirection = direction !== undefined && direction !== null ? resolveStringDirection(direction, reverse) : resolveBoolDirection(row, column, reverse, flexDirection);
    // Map wrap to flexWrap (supports boolean, string, and responsive values)
    const flexWrap = resolveWrapValue(wrap);
    // TODO: Add unique classnames for each variant of the flex component
    const className = `${props.className || ""} MuiFlex-root${componentName ? ` MuiFlex${componentName}-root` : ""}`.trim();
    const flexProps = {
        display: rest.display || "flex",
        flexWrap
    };
    const alignments = resolveAlignment(resolvedDirection, x, y);
    return stripUndefined({
        ...rest,
        ...flexProps,
        ...alignments,
        flexDirection: resolvedDirection,
        className,
        ref
    });
};
const verifyGridSizeProps = (props, gridVersion)=>{
    const { xs, sm, md, lg, xl, size, ...rest } = props;
    const hasLegacyProps = [
        xs,
        sm,
        md,
        lg,
        xl
    ].some((v)=>v !== undefined);
    const legacyObject = stripUndefined({
        xs,
        sm,
        md,
        lg,
        xl
    });
    const sizeIsObject = size !== undefined && typeof size === "object" && !Array.isArray(size);
    if (gridVersion === "legacy") {
        // Convert size object to legacy props, or size primitive to xs
        if (sizeIsObject) return {
            ...rest,
            ...legacyObject,
            ...size
        };
        // If size is defined, and not an object, set xs to the value of size
        if (size !== undefined) return {
            ...rest,
            ...legacyObject,
            xs: size
        };
        return {
            ...rest,
            ...legacyObject
        };
    }
    // If there are no legacy props, or size is a primitive, return without legacy props
    const sizeIsPrimitive = size !== undefined && typeof size !== "object" && !Array.isArray(size);
    if (!hasLegacyProps || sizeIsPrimitive) return {
        ...rest,
        size
    };
    // If size is an object, merge legacy with size object
    if (sizeIsObject) return {
        ...rest,
        size: {
            ...legacyObject,
            ...size
        }
    };
    // If size is undefined, and legacy is a primitive, set size to the value of xs
    const legacyIsPrimitive = Object.keys(legacyObject).length === 1 && Object.keys(legacyObject)[0] === "xs";
    if (legacyIsPrimitive) return {
        ...rest,
        size: xs
    };
    // if size is undefined, and legacy is an object, set size to legacy
    const legacyIsObject = Object.keys(legacyObject).length > 1;
    if (legacyIsObject) return {
        ...rest,
        size: legacyObject
    };
    // Otherwise, we have no way of knowing what to do with the size prop
    return props;
};

// PRAGMA: Box has a default export in some MUI versions, so we need to check for it.
// It also tends to conflict with other `Box` components in the same project.
// @ts-ignore
const MuiBox = _MuiBox?.default ?? _MuiBox;
const createFlexBox = (defaultProps = {})=>/*#__PURE__*/ forwardRef((props, ref)=>{
        return /*#__PURE__*/ jsx(MuiBox, {
            ...mapFlexProps({
                ...defaultProps,
                ...props
            }, ref, "Box")
        });
    });
const FlexBox = createFlexBox();
const FlexRowBox = createFlexBox({
    row: true
});
const FlexColumnBox = createFlexBox({
    column: true
});

const createFlexGrid = (defaultProps = {})=>/*#__PURE__*/ forwardRef((props, ref)=>/*#__PURE__*/ jsx(Grid, {
            ...mapFlexProps(verifyGridSizeProps({
                ...defaultProps,
                ...props
            }, "legacy"), ref, "Grid")
        }));
const FlexGrid = createFlexGrid();
const FlexGridRow = createFlexGrid({
    row: true
});
const FlexGridColumn = createFlexGrid({
    column: true
});

export { FlexBox, FlexColumnBox, FlexGrid, FlexGridColumn, FlexGridRow, FlexRowBox, createFlexGrid };
