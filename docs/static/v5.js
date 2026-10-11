import { jsxs, jsx } from 'react/jsx-runtime';
import _MuiBox from '@mui/material/Box';
import { unstable_extendSxProp, useTheme as useTheme$1 } from '@mui/system';
import { __unsafe_useEmotionCache, Global, ClassNames } from '@emotion/react';
import * as React from 'react';
import { useContext, createContext, useMemo, cloneElement, forwardRef } from 'react';
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
    const { x, y, row, column, flexDirection, direction, reverse, wrap, agnostic: _agnostic, styling: _styling, ...rest } = props;
    // If direction is explicitly provided, it takes precedence over row/column/flexDirection
    const resolvedDirection = direction !== undefined && direction !== null ? resolveStringDirection(direction, reverse) : resolveBoolDirection(row, column, reverse, flexDirection);
    // Map wrap to flexWrap (supports boolean, string, and responsive values)
    const flexWrap = resolveWrapValue(wrap);
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

const globals = [
    "initial",
    "inherit",
    "unset",
    "revert",
    "revert-layer"
];
const flexClassValues = {
    display: [
        "flex",
        "inline-flex",
        "none",
        "block",
        "inline",
        "inline-block",
        "grid",
        "inline-grid",
        "contents",
        ...globals
    ],
    flexDirection: [
        "row",
        "row-reverse",
        "column",
        "column-reverse",
        ...globals
    ],
    justifyContent: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        ...globals
    ],
    alignItems: [
        "flex-start",
        "flex-end",
        "center",
        "stretch",
        "baseline",
        ...globals
    ],
    flexWrap: [
        "wrap",
        "nowrap",
        "wrap-reverse",
        ...globals
    ]
};
const properties$1 = Object.keys(flexClassValues);
const labels = {
    display: "display",
    flexDirection: "direction",
    justifyContent: "justify",
    alignItems: "align",
    flexWrap: "wrap"
};
const inputs = [
    "row",
    "column",
    "reverse",
    "direction",
    "flexDirection",
    "x",
    "y",
    "wrap",
    "display"
];
const token = (value)=>value.replace(/[^a-zA-Z0-9_-]/g, (char)=>`_${char.charCodeAt(0).toString(16)}_`);
function getFlexClassConfig(theme) {
    const queries = theme.breakpoints.keys.map((key)=>({
            key,
            query: theme.breakpoints.up(key)
        }));
    const signature = JSON.stringify(queries);
    // Two independent 32-bit accumulators keep names short and deterministic on server/client.
    let a = 2166136261;
    let b = 5381;
    for(let i = 0; i < signature.length; i++){
        a = Math.imul(a ^ signature.charCodeAt(i), 16777619);
        b = Math.imul(b, 33) ^ signature.charCodeAt(i);
    }
    return {
        queries,
        signature,
        namespace: `${(a >>> 0).toString(36)}${(b >>> 0).toString(36)}`
    };
}
function classFor(property, value, config, key) {
    return `MuiFlex-${labels[property]}-${value}${key === undefined ? "" : `-${config.namespace}-${token(key)}`}`;
}
/** Finite property rules, never the Cartesian product of layout permutations. */ function createFlexClassStyles(config, includeBase = true) {
    const styles = {};
    const rules = (key)=>{
        const result = {};
        for (const property of properties$1){
            for (const value of flexClassValues[property]){
                // Base sheets from other Emotion caches can be inserted later in the document.
                // Responsive rules must beat those base rules regardless of insertion order.
                const root = key === undefined ? ".MuiFlex-root" : ".MuiFlex-root.MuiFlex-root";
                result[`${root}.${classFor(property, value, config, key)}`] = {
                    [property]: value
                };
            }
        }
        return result;
    };
    if (includeBase) Object.assign(styles, rules());
    for (const { key, query } of config.queries){
        styles[query] = {
            ...styles[query],
            ...rules(key)
        };
    }
    return styles;
}
const isResponsive = (value)=>value !== null && typeof value === "object";
/** Resolve each breakpoint through the same scalar mapper used by system mode. */ function mapFlexClassProps(props, config, theme, ref, componentName = "Box") {
    const evaluated = {
        ...props
    };
    for (const input of inputs){
        const value = evaluated[input];
        if (typeof value === "function") evaluated[input] = value(theme);
    }
    if (typeof evaluated.className === "function") evaluated.className = evaluated.className(theme);
    const state = {};
    for (const input of inputs){
        const value = evaluated[input];
        if (!isResponsive(value)) state[input] = value;
    }
    const snapshots = [];
    const resolve = ()=>{
        const mapped = mapFlexProps(state);
        return Object.fromEntries(properties$1.map((property)=>[
                property,
                mapped[property]
            ]));
    };
    snapshots.push({
        layout: resolve()
    });
    config.queries.forEach(({ key, query }, index)=>{
        let changed = false;
        for (const input of inputs){
            const value = evaluated[input];
            const next = Array.isArray(value) ? value[index] : isResponsive(value) ? value[key] : undefined;
            // Null entries are gaps: previous breakpoint values continue to apply.
            if (next !== null && next !== undefined) {
                state[input] = next;
                changed = true;
            }
        }
        if (changed) {
            const snapshot = {
                key,
                layout: resolve()
            };
            // A zero-width first breakpoint can use the same classes as scalar props.
            if (index === 0 && /min-width:\s*0(?:px|em|rem)\)/.test(query)) snapshots[0] = {
                layout: snapshot.layout
            };
            else snapshots.push(snapshot);
        }
    });
    // Use the mapper to preserve forwarding/stripping behavior, then consume layout styles.
    const mapped = mapFlexProps({
        ...evaluated,
        ...state
    }, ref, componentName);
    const classes = [
        mapped.className,
        "MuiFlex-classes"
    ];
    const fallback = {};
    for (const property of properties$1){
        delete mapped[property];
        const values = snapshots.map(({ layout })=>layout[property]);
        const supported = values.every((value)=>value === undefined || typeof value === "string" && flexClassValues[property].includes(value));
        let previous;
        for (const { key, layout } of snapshots){
            const current = layout[property];
            if (current === previous) continue;
            // Clear a previous axis alignment when a direction change leaves it unspecified.
            const value = current === undefined ? "initial" : current;
            if (supported) classes.push(classFor(property, value, config, key));
            else if (key === undefined) fallback[property] = value;
            else {
                const query = config.queries.find((entry)=>entry.key === key).query;
                fallback[query] = {
                    ...fallback[query],
                    [property]: value
                };
            }
            previous = current;
        }
    }
    mapped.className = classes.join(" ");
    return {
        mapped,
        fallback
    };
}

const FlexyContext = /*#__PURE__*/ createContext(undefined);
/** Version adapters supply their own MUI theme to avoid crossing theme contexts. */ function FlexyStyleProvider({ children, styling = "system", theme }) {
    const parent = useContext(FlexyContext);
    const cache = __unsafe_useEmotionCache();
    const config = useMemo(()=>getFlexClassConfig(theme), [
        theme
    ]);
    const sharesCache = parent !== undefined && parent.cache === cache;
    const styles = useMemo(()=>createFlexClassStyles(config, !sharesCache), [
        config,
        sharesCache
    ]);
    const value = useMemo(()=>({
            styling,
            theme,
            config,
            cache
        }), [
        styling,
        theme,
        config,
        cache
    ]);
    const inheritedStyles = parent?.config.signature === config.signature && parent.cache === cache;
    return /*#__PURE__*/ jsxs(FlexyContext.Provider, {
        value: value,
        children: [
            !inheritedStyles && /*#__PURE__*/ jsx(Global, {
                styles: styles
            }),
            children
        ]
    });
}
/** The version-specific normalizer moves MUI system props into sx. */ function useFlexProps(props, ref, componentName, normalize) {
    const context = useContext(FlexyContext);
    const mode = props.styling ?? context?.styling ?? "system";
    if (mode === "system") return mapFlexProps(props, ref, componentName);
    if (!context) throw new Error('Mui Flexy: styling="classes" requires a FlexyProvider inside your ThemeProvider.');
    const { mapped, fallback } = mapFlexClassProps(props, context.config, context.theme, ref, componentName);
    const normalized = normalize(mapped);
    const sx = normalized.sx;
    const entries = [
        fallback,
        ...Array.isArray(sx) ? sx : sx ? [
            sx
        ] : []
    ];
    // Shared utility selectors beat Grid defaults; explicit sx beats both. No !important.
    normalized.sx = entries.filter(Boolean).map((entry)=>(theme)=>({
                "&.MuiFlex-root.MuiFlex-root.MuiFlex-root": theme.unstable_sx(entry)
            }));
    return normalized;
}
/** MUI styled wrappers may consume sx before forwarding props to Flexy. Raise their
 * registered styles as well, so their sx declarations retain normal override priority.
 * ClassNames registers each distinct style once in the active Emotion cache.
 */ function FlexyClassOverrides({ children }) {
    const cache = __unsafe_useEmotionCache();
    const names = (children.props.className ?? "").split(/\s+/);
    if (!names.includes("MuiFlex-classes") || !cache) return children;
    const inherited = names.filter((name)=>cache.registered[name] !== undefined);
    if (!inherited.length) return children;
    const cssText = inherited.map((name)=>cache.registered[name]).join(";");
    const remaining = names.filter((name)=>!inherited.includes(name));
    return /*#__PURE__*/ jsx(ClassNames, {
        children: ({ css })=>/*#__PURE__*/ cloneElement(children, {
                className: [
                    ...remaining,
                    css(`&.MuiFlex-root.MuiFlex-root.MuiFlex-root{${cssText}}`)
                ].join(" ")
            })
    });
}

// PRAGMA: Box has a default export in some MUI versions, so we need to check for it.
// It also tends to conflict with other `Box` components in the same project.
// @ts-ignore
const MuiBox = _MuiBox?.default ?? _MuiBox;
const createFlexBox = (defaultProps = {})=>/*#__PURE__*/ forwardRef((props, ref)=>{
        return /*#__PURE__*/ jsx(FlexyClassOverrides, {
            children: /*#__PURE__*/ jsx(MuiBox, {
                ...useFlexProps({
                    ...defaultProps,
                    ...props
                }, ref, "Box", normalizeFlexProps$1)
            })
        });
    });
const FlexBox = createFlexBox();
const FlexRowBox = createFlexBox({
    row: true
});
const FlexColumnBox = createFlexBox({
    column: true
});
const normalizeFlexProps$1 = (props)=>unstable_extendSxProp(props);

const createFlexGrid = (defaultProps = {})=>/*#__PURE__*/ forwardRef((props, ref)=>/*#__PURE__*/ jsx(FlexyClassOverrides, {
            children: /*#__PURE__*/ jsx(Grid, {
                ...useFlexProps(verifyGridSizeProps({
                    ...defaultProps,
                    ...props
                }, "legacy"), ref, "Grid", normalizeFlexProps)
            })
        }));
const FlexGrid = createFlexGrid();
const FlexGridRow = createFlexGrid({
    row: true
});
const FlexGridColumn = createFlexGrid({
    column: true
});
const normalizeFlexProps = (props)=>unstable_extendSxProp(props);

/**
 * WARNING: Don't import this directly.
 * Use `MuiError` from `@mui/internal-babel-macros/MuiError.macro` instead.
 * @param {number} code
 */
function formatMuiErrorMessage$1(code) {
  // Apply babel-plugin-transform-template-literals in loose mode
  // loose mode is safe if we're concatenating primitives
  // see https://babeljs.io/docs/en/babel-plugin-transform-template-literals#loose
  /* eslint-disable prefer-template */
  let url = 'https://mui.com/production-error/?code=' + code;
  for (let i = 1; i < arguments.length; i += 1) {
    // rest params over-transpile for this case
    // eslint-disable-next-line prefer-rest-params
    url += '&args[]=' + encodeURIComponent(arguments[i]);
  }
  return 'Minified MUI error #' + code + '; visit ' + url + ' for the full message.';
  /* eslint-enable prefer-template */
}

var formatMuiErrorMessage = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: formatMuiErrorMessage$1
});

var THEME_ID = '$$material';

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

// https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
function isPlainObject(item) {
  if (typeof item !== 'object' || item === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(item);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in item) && !(Symbol.iterator in item);
}
function deepClone(source) {
  if ( /*#__PURE__*/React.isValidElement(source) || !isPlainObject(source)) {
    return source;
  }
  const output = {};
  Object.keys(source).forEach(key => {
    output[key] = deepClone(source[key]);
  });
  return output;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      if ( /*#__PURE__*/React.isValidElement(source[key])) {
        output[key] = source[key];
      } else if (isPlainObject(source[key]) &&
      // Avoid prototype pollution
      Object.prototype.hasOwnProperty.call(target, key) && isPlainObject(target[key])) {
        // Since `output` is a clone of `target` and we have narrowed `target` in this block we can cast to the same type.
        output[key] = deepmerge(target[key], source[key], options);
      } else if (options.clone) {
        output[key] = isPlainObject(source[key]) ? deepClone(source[key]) : source[key];
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word in the sentence.
// We only handle the first word.
function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error(formatMuiErrorMessage$1(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false // No need to clone deep, it's way faster.
  });
}

function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			var isInstance = false;
      try {
        isInstance = this instanceof a;
      } catch {}
			if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

// The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.
const values = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536 // large screen
};
const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: key => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === 'object') {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      // key is breakpoint
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  const breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style);
}

function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  // Check if CSS variables are used
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split('.').reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split('.').reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getStyleValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform) {
    value = transform(value, userValue, themeMapping);
  }
  return value;
}
function style$1(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;

  // false positive
  // eslint-disable-next-line react/function-component-definition
  const fn = props => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = propValueFinal => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn.propTypes = {};
  fn.filterProps = [prop];
  return fn;
}

function memoize(fn) {
  const cache = {};
  return arg => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}

const properties = {
  m: 'margin',
  p: 'padding'
};
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom']
};
const aliases = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py'
};

// memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec
const getCssProperties = memoize(prop => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
});
const marginKeys = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'marginInline', 'marginInlineStart', 'marginInlineEnd', 'marginBlock', 'marginBlockStart', 'marginBlockEnd'];
const paddingKeys = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY', 'paddingInline', 'paddingInlineStart', 'paddingInlineEnd', 'paddingBlock', 'paddingBlockStart', 'paddingBlockEnd'];
[...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;
  const themeSpacing = (_getPath = getPath(theme, themeKey, false)) != null ? _getPath : defaultValue;
  if (typeof themeSpacing === 'number') {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }
      return themeSpacing * abs;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }
  return () => undefined;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, 'spacing', 8);
}
function getValue(transformer, propValue) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }
  const abs = Math.abs(propValue);
  const transformed = transformer(abs);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === 'number') {
    return -transformed;
  }
  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return propValue => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it's doesn't worth the bundle size.
  if (keys.indexOf(prop) === -1) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map(prop => resolveCssProperty(props, keys, prop, transformer)).reduce(merge, {});
}
function margin(props) {
  return style(props, marginKeys);
}
margin.propTypes = {};
margin.filterProps = marginKeys;
function padding(props) {
  return style(props, paddingKeys);
}
padding.propTypes = {};
padding.filterProps = paddingKeys;

function compose(...styles) {
  const handlers = styles.reduce((acc, style) => {
    style.filterProps.forEach(prop => {
      acc[prop] = style;
    });
    return acc;
  }, {});

  // false positive
  // eslint-disable-next-line react/function-component-definition
  const fn = props => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn.propTypes = {};
  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);
  return fn;
}

function borderTransform(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return `${value}px solid`;
}
function createBorderStyle(prop, transform) {
  return style$1({
    prop,
    themeKey: 'borders',
    transform
  });
}
const border = createBorderStyle('border', borderTransform);
const borderTop = createBorderStyle('borderTop', borderTransform);
const borderRight = createBorderStyle('borderRight', borderTransform);
const borderBottom = createBorderStyle('borderBottom', borderTransform);
const borderLeft = createBorderStyle('borderLeft', borderTransform);
const borderColor = createBorderStyle('borderColor');
const borderTopColor = createBorderStyle('borderTopColor');
const borderRightColor = createBorderStyle('borderRightColor');
const borderBottomColor = createBorderStyle('borderBottomColor');
const borderLeftColor = createBorderStyle('borderLeftColor');
const outline = createBorderStyle('outline', borderTransform);
const outlineColor = createBorderStyle('outlineColor');

// false positive
// eslint-disable-next-line react/function-component-definition
const borderRadius = props => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4);
    const styleFromPropValue = propValue => ({
      borderRadius: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = {};
borderRadius.filterProps = ['borderRadius'];
compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);

// false positive
// eslint-disable-next-line react/function-component-definition
const gap = props => {
  if (props.gap !== undefined && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8);
    const styleFromPropValue = propValue => ({
      gap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = {};
gap.filterProps = ['gap'];

// false positive
// eslint-disable-next-line react/function-component-definition
const columnGap = props => {
  if (props.columnGap !== undefined && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8);
    const styleFromPropValue = propValue => ({
      columnGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = {};
columnGap.filterProps = ['columnGap'];

// false positive
// eslint-disable-next-line react/function-component-definition
const rowGap = props => {
  if (props.rowGap !== undefined && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8);
    const styleFromPropValue = propValue => ({
      rowGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = {};
rowGap.filterProps = ['rowGap'];
const gridColumn = style$1({
  prop: 'gridColumn'
});
const gridRow = style$1({
  prop: 'gridRow'
});
const gridAutoFlow = style$1({
  prop: 'gridAutoFlow'
});
const gridAutoColumns = style$1({
  prop: 'gridAutoColumns'
});
const gridAutoRows = style$1({
  prop: 'gridAutoRows'
});
const gridTemplateColumns = style$1({
  prop: 'gridTemplateColumns'
});
const gridTemplateRows = style$1({
  prop: 'gridTemplateRows'
});
const gridTemplateAreas = style$1({
  prop: 'gridTemplateAreas'
});
const gridArea = style$1({
  prop: 'gridArea'
});
compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);

function paletteTransform(value, userValue) {
  if (userValue === 'grey') {
    return userValue;
  }
  return value;
}
const color = style$1({
  prop: 'color',
  themeKey: 'palette',
  transform: paletteTransform
});
const bgcolor = style$1({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform
});
const backgroundColor = style$1({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform
});
compose(color, bgcolor, backgroundColor);

function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
const width = style$1({
  prop: 'width',
  transform: sizingTransform
});
const maxWidth = props => {
  if (props.maxWidth !== undefined && props.maxWidth !== null) {
    const styleFromPropValue = propValue => {
      var _props$theme, _props$theme2;
      const breakpoint = ((_props$theme = props.theme) == null || (_props$theme = _props$theme.breakpoints) == null || (_props$theme = _props$theme.values) == null ? void 0 : _props$theme[propValue]) || values[propValue];
      if (!breakpoint) {
        return {
          maxWidth: sizingTransform(propValue)
        };
      }
      if (((_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.breakpoints) == null ? void 0 : _props$theme2.unit) !== 'px') {
        return {
          maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`
        };
      }
      return {
        maxWidth: breakpoint
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ['maxWidth'];
const minWidth = style$1({
  prop: 'minWidth',
  transform: sizingTransform
});
const height = style$1({
  prop: 'height',
  transform: sizingTransform
});
const maxHeight = style$1({
  prop: 'maxHeight',
  transform: sizingTransform
});
const minHeight = style$1({
  prop: 'minHeight',
  transform: sizingTransform
});
style$1({
  prop: 'size',
  cssProperty: 'width',
  transform: sizingTransform
});
style$1({
  prop: 'size',
  cssProperty: 'height',
  transform: sizingTransform
});
const boxSizing = style$1({
  prop: 'boxSizing'
});
compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);

const defaultSxConfig = {
  // borders
  border: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderTop: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderRight: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderBottom: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderLeft: {
    themeKey: 'borders',
    transform: borderTransform
  },
  borderColor: {
    themeKey: 'palette'
  },
  borderTopColor: {
    themeKey: 'palette'
  },
  borderRightColor: {
    themeKey: 'palette'
  },
  borderBottomColor: {
    themeKey: 'palette'
  },
  borderLeftColor: {
    themeKey: 'palette'
  },
  outline: {
    themeKey: 'borders',
    transform: borderTransform
  },
  outlineColor: {
    themeKey: 'palette'
  },
  borderRadius: {
    themeKey: 'shape.borderRadius',
    style: borderRadius
  },
  // palette
  color: {
    themeKey: 'palette',
    transform: paletteTransform
  },
  bgcolor: {
    themeKey: 'palette',
    cssProperty: 'backgroundColor',
    transform: paletteTransform
  },
  backgroundColor: {
    themeKey: 'palette',
    transform: paletteTransform
  },
  // spacing
  p: {
    style: padding
  },
  pt: {
    style: padding
  },
  pr: {
    style: padding
  },
  pb: {
    style: padding
  },
  pl: {
    style: padding
  },
  px: {
    style: padding
  },
  py: {
    style: padding
  },
  padding: {
    style: padding
  },
  paddingTop: {
    style: padding
  },
  paddingRight: {
    style: padding
  },
  paddingBottom: {
    style: padding
  },
  paddingLeft: {
    style: padding
  },
  paddingX: {
    style: padding
  },
  paddingY: {
    style: padding
  },
  paddingInline: {
    style: padding
  },
  paddingInlineStart: {
    style: padding
  },
  paddingInlineEnd: {
    style: padding
  },
  paddingBlock: {
    style: padding
  },
  paddingBlockStart: {
    style: padding
  },
  paddingBlockEnd: {
    style: padding
  },
  m: {
    style: margin
  },
  mt: {
    style: margin
  },
  mr: {
    style: margin
  },
  mb: {
    style: margin
  },
  ml: {
    style: margin
  },
  mx: {
    style: margin
  },
  my: {
    style: margin
  },
  margin: {
    style: margin
  },
  marginTop: {
    style: margin
  },
  marginRight: {
    style: margin
  },
  marginBottom: {
    style: margin
  },
  marginLeft: {
    style: margin
  },
  marginX: {
    style: margin
  },
  marginY: {
    style: margin
  },
  marginInline: {
    style: margin
  },
  marginInlineStart: {
    style: margin
  },
  marginInlineEnd: {
    style: margin
  },
  marginBlock: {
    style: margin
  },
  marginBlockStart: {
    style: margin
  },
  marginBlockEnd: {
    style: margin
  },
  // display
  displayPrint: {
    cssProperty: false,
    transform: value => ({
      '@media print': {
        display: value
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: gap
  },
  rowGap: {
    style: rowGap
  },
  columnGap: {
    style: columnGap
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: 'zIndex'
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: 'shadows'
  },
  // sizing
  width: {
    transform: sizingTransform
  },
  maxWidth: {
    style: maxWidth
  },
  minWidth: {
    transform: sizingTransform
  },
  height: {
    transform: sizingTransform
  },
  maxHeight: {
    transform: sizingTransform
  },
  minHeight: {
    transform: sizingTransform
  },
  boxSizing: {},
  // typography
  fontFamily: {
    themeKey: 'typography'
  },
  fontSize: {
    themeKey: 'typography'
  },
  fontStyle: {
    themeKey: 'typography'
  },
  fontWeight: {
    themeKey: 'typography'
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: false,
    themeKey: 'typography'
  }
};

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every(object => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config) {
    const props = {
      [prop]: val,
      theme
    };
    const options = config[prop];
    if (!options) {
      return {
        [prop]: val
      };
    }
    const {
      cssProperty = prop,
      themeKey,
      transform,
      style
    } = options;
    if (val == null) {
      return null;
    }

    // TODO v6: remove, see https://github.com/mui/material-ui/pull/38123
    if (themeKey === 'typography' && val === 'inherit') {
      return {
        [prop]: val
      };
    }
    const themeMapping = getPath(theme, themeKey) || {};
    if (style) {
      return style(props);
    }
    const styleFromPropValue = propValueFinal => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, val, styleFromPropValue);
  }
  function styleFunctionSx(props) {
    var _theme$unstable_sxCon;
    const {
      sx,
      theme = {},
      nested
    } = props || {};
    if (!sx) {
      return null; // Emotion & styled-components will neglect null
    }
    const config = (_theme$unstable_sxCon = theme.unstable_sxConfig) != null ? _theme$unstable_sxCon : defaultSxConfig;

    /*
     * Receive `sxInput` as object or callback
     * and then recursively check keys & values to create media query object styles.
     * (the result will be used in `styled`)
     */
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === 'function') {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== 'object') {
        // value
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css = emptyBreakpoints;
      Object.keys(sxObject).forEach(styleKey => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if (config[styleKey]) {
              css = merge(css, getThemeValue(styleKey, value, theme, config));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, x => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css[styleKey] = styleFunctionSx({
                  sx: value,
                  theme,
                  nested: true
                });
              } else {
                css = merge(css, breakpointsValues);
              }
            }
          } else {
            css = merge(css, getThemeValue(styleKey, value, theme, config));
          }
        }
      });
      if (!nested && theme.modularCssLayers) {
        return {
          '@layer sx': removeUnusedBreakpoints(breakpointsKeys, css)
        };
      }
      return removeUnusedBreakpoints(breakpointsKeys, css);
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx;
}
const styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ['sx'];

const _excluded$5 = ["values", "unit", "step"];
const sortBreakpointsValues = values => {
  const breakpointsAsArray = Object.keys(values).map(key => ({
    key,
    val: values[key]
  })) || [];
  // Sort in ascending order
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return _extends({}, acc, {
      [obj.key]: obj.val
    });
  }, {});
};

// Keep in mind that @media is inclusive by the CSS specification.
function createBreakpoints(breakpoints) {
  const {
      // The breakpoint **start** at this value.
      // For instance with the first breakpoint xs: [xs, sm).
      values = {
        xs: 0,
        // phone
        sm: 600,
        // tablet
        md: 900,
        // small laptop
        lg: 1200,
        // desktop
        xl: 1536 // large screen
      },
      unit = 'px',
      step = 5
    } = breakpoints,
    other = _objectWithoutPropertiesLoose(breakpoints, _excluded$5);
  const sortedValues = sortBreakpointsValues(values);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values[start] === 'number' ? values[start] : start}${unit}) and ` + `(max-width:${(endIndex !== -1 && typeof values[keys[endIndex]] === 'number' ? values[keys[endIndex]] : end) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    // handle first and last key separately, for better readability
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and');
  }
  return _extends({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}

const shape = {
  borderRadius: 4
};

// The different signatures imply different meaning for their arguments that can't be expressed structurally.
// We express the difference with variable names.

function createSpacing(spacingInput = 8) {
  // Already transformed.
  if (spacingInput.mui) {
    return spacingInput;
  }

  // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons, can align to a 4dp grid.
  // https://m2.material.io/design/layout/understanding-layout.html
  const transform = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing = (...argsInput) => {
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map(argument => {
      const output = transform(argument);
      return typeof output === 'number' ? `${output}px` : output;
    }).join(' ');
  };
  spacing.mui = true;
  return spacing;
}

/**
 * A universal utility to style components with multiple color modes. Always use it from the theme object.
 * It works with:
 *  - [Basic theme](https://mui.com/material-ui/customization/dark-mode/)
 *  - [CSS theme variables](https://mui.com/material-ui/experimental-api/css-theme-variables/overview/)
 *  - Zero-runtime engine
 *
 * Tips: Use an array over object spread and place `theme.applyStyles()` last.
 *
 * ✅ [{ background: '#e5e5e5' }, theme.applyStyles('dark', { background: '#1c1c1c' })]
 *
 * 🚫 { background: '#e5e5e5', ...theme.applyStyles('dark', { background: '#1c1c1c' })}
 *
 * @example
 * 1. using with `styled`:
 * ```jsx
 *   const Component = styled('div')(({ theme }) => [
 *     { background: '#e5e5e5' },
 *     theme.applyStyles('dark', {
 *       background: '#1c1c1c',
 *       color: '#fff',
 *     }),
 *   ]);
 * ```
 *
 * @example
 * 2. using with `sx` prop:
 * ```jsx
 *   <Box sx={theme => [
 *     { background: '#e5e5e5' },
 *     theme.applyStyles('dark', {
 *        background: '#1c1c1c',
 *        color: '#fff',
 *      }),
 *     ]}
 *   />
 * ```
 *
 * @example
 * 3. theming a component:
 * ```jsx
 *   extendTheme({
 *     components: {
 *       MuiButton: {
 *         styleOverrides: {
 *           root: ({ theme }) => [
 *             { background: '#e5e5e5' },
 *             theme.applyStyles('dark', {
 *               background: '#1c1c1c',
 *               color: '#fff',
 *             }),
 *           ],
 *         },
 *       }
 *     }
 *   })
 *```
 */
function applyStyles(key, styles) {
  // @ts-expect-error this is 'any' type
  const theme = this;
  if (theme.vars && typeof theme.getColorSchemeSelector === 'function') {
    // If CssVarsProvider is used as a provider,
    // returns '* :where([data-mui-color-scheme="light|dark"]) &'
    const selector = theme.getColorSchemeSelector(key).replace(/(\[[^\]]+\])/, '*:where($1)');
    return {
      [selector]: styles
    };
  }
  if (theme.palette.mode === key) {
    return styles;
  }
  return {};
}

const _excluded$4 = ["breakpoints", "palette", "spacing", "shape"];
function createTheme$1(options = {}, ...args) {
  const {
      breakpoints: breakpointsInput = {},
      palette: paletteInput = {},
      spacing: spacingInput,
      shape: shapeInput = {}
    } = options,
    other = _objectWithoutPropertiesLoose(options, _excluded$4);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: 'ltr',
    components: {},
    // Inject component definitions.
    palette: _extends({
      mode: 'light'
    }, paletteInput),
    spacing,
    shape: _extends({}, shape, shapeInput)
  }, other);
  muiTheme.applyStyles = applyStyles;
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  muiTheme.unstable_sxConfig = _extends({}, defaultSxConfig, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}

function createMixins(breakpoints, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [breakpoints.up('xs')]: {
        '@media (orientation: landscape)': {
          minHeight: 48
        }
      },
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    }
  }, mixins);
}

var colorManipulator = {};

var interopRequireDefault = {exports: {}};

var hasRequiredInteropRequireDefault;

function requireInteropRequireDefault () {
	if (hasRequiredInteropRequireDefault) return interopRequireDefault.exports;
	hasRequiredInteropRequireDefault = 1;
	(function (module) {
		function _interopRequireDefault(e) {
		  return e && e.__esModule ? e : {
		    "default": e
		  };
		}
		module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (interopRequireDefault));
	return interopRequireDefault.exports;
}

var require$$1 = /*@__PURE__*/getAugmentedNamespace(formatMuiErrorMessage);

function clamp$1(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(val, max));
}

var clamp = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: clamp$1
});

var require$$2 = /*@__PURE__*/getAugmentedNamespace(clamp);

var hasRequiredColorManipulator;

function requireColorManipulator () {
	if (hasRequiredColorManipulator) return colorManipulator;
	hasRequiredColorManipulator = 1;

	var _interopRequireDefault = requireInteropRequireDefault();
	Object.defineProperty(colorManipulator, "__esModule", {
	  value: true
	});
	colorManipulator.alpha = alpha;
	colorManipulator.blend = blend;
	colorManipulator.colorChannel = void 0;
	colorManipulator.darken = darken;
	colorManipulator.decomposeColor = decomposeColor;
	colorManipulator.emphasize = emphasize;
	colorManipulator.getContrastRatio = getContrastRatio;
	colorManipulator.getLuminance = getLuminance;
	colorManipulator.hexToRgb = hexToRgb;
	colorManipulator.hslToRgb = hslToRgb;
	colorManipulator.lighten = lighten;
	colorManipulator.private_safeAlpha = private_safeAlpha;
	colorManipulator.private_safeColorChannel = void 0;
	colorManipulator.private_safeDarken = private_safeDarken;
	colorManipulator.private_safeEmphasize = private_safeEmphasize;
	colorManipulator.private_safeLighten = private_safeLighten;
	colorManipulator.recomposeColor = recomposeColor;
	colorManipulator.rgbToHex = rgbToHex;
	var _formatMuiErrorMessage2 = _interopRequireDefault(require$$1);
	var _clamp = _interopRequireDefault(require$$2);
	/* eslint-disable @typescript-eslint/naming-convention */

	/**
	 * Returns a number whose value is limited to the given range.
	 * @param {number} value The value to be clamped
	 * @param {number} min The lower boundary of the output range
	 * @param {number} max The upper boundary of the output range
	 * @returns {number} A number in the range [min, max]
	 */
	function clampWrapper(value, min = 0, max = 1) {
	  return (0, _clamp.default)(value, min, max);
	}

	/**
	 * Converts a color from CSS hex format to CSS rgb format.
	 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
	 * @returns {string} A CSS rgb color string
	 */
	function hexToRgb(color) {
	  color = color.slice(1);
	  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
	  let colors = color.match(re);
	  if (colors && colors[0].length === 1) {
	    colors = colors.map(n => n + n);
	  }
	  return colors ? `rgb${colors.length === 4 ? 'a' : ''}(${colors.map((n, index) => {
	    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1000) / 1000;
	  }).join(', ')})` : '';
	}
	function intToHex(int) {
	  const hex = int.toString(16);
	  return hex.length === 1 ? `0${hex}` : hex;
	}

	/**
	 * Returns an object with the type and values of a color.
	 *
	 * Note: Does not support rgb % values.
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
	 * @returns {object} - A MUI color object: {type: string, values: number[]}
	 */
	function decomposeColor(color) {
	  // Idempotent
	  if (color.type) {
	    return color;
	  }
	  if (color.charAt(0) === '#') {
	    return decomposeColor(hexToRgb(color));
	  }
	  const marker = color.indexOf('(');
	  const type = color.substring(0, marker);
	  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
	    throw new Error((0, _formatMuiErrorMessage2.default)(9, color));
	  }
	  let values = color.substring(marker + 1, color.length - 1);
	  let colorSpace;
	  if (type === 'color') {
	    values = values.split(' ');
	    colorSpace = values.shift();
	    if (values.length === 4 && values[3].charAt(0) === '/') {
	      values[3] = values[3].slice(1);
	    }
	    if (['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1) {
	      throw new Error((0, _formatMuiErrorMessage2.default)(10, colorSpace));
	    }
	  } else {
	    values = values.split(',');
	  }
	  values = values.map(value => parseFloat(value));
	  return {
	    type,
	    values,
	    colorSpace
	  };
	}

	/**
	 * Returns a channel created from the input color.
	 *
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
	 * @returns {string} - The channel for the color, that can be used in rgba or hsla colors
	 */
	const colorChannel = color => {
	  const decomposedColor = decomposeColor(color);
	  return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.indexOf('hsl') !== -1 && idx !== 0 ? `${val}%` : val).join(' ');
	};
	colorManipulator.colorChannel = colorChannel;
	const private_safeColorChannel = (color, warning) => {
	  try {
	    return colorChannel(color);
	  } catch (error) {
	    return color;
	  }
	};

	/**
	 * Converts a color object with type and values to a string.
	 * @param {object} color - Decomposed color
	 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla', 'color'
	 * @param {array} color.values - [n,n,n] or [n,n,n,n]
	 * @returns {string} A CSS color string
	 */
	colorManipulator.private_safeColorChannel = private_safeColorChannel;
	function recomposeColor(color) {
	  const {
	    type,
	    colorSpace
	  } = color;
	  let {
	    values
	  } = color;
	  if (type.indexOf('rgb') !== -1) {
	    // Only convert the first 3 values to int (i.e. not alpha)
	    values = values.map((n, i) => i < 3 ? parseInt(n, 10) : n);
	  } else if (type.indexOf('hsl') !== -1) {
	    values[1] = `${values[1]}%`;
	    values[2] = `${values[2]}%`;
	  }
	  if (type.indexOf('color') !== -1) {
	    values = `${colorSpace} ${values.join(' ')}`;
	  } else {
	    values = `${values.join(', ')}`;
	  }
	  return `${type}(${values})`;
	}

	/**
	 * Converts a color from CSS rgb format to CSS hex format.
	 * @param {string} color - RGB color, i.e. rgb(n, n, n)
	 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
	 */
	function rgbToHex(color) {
	  // Idempotent
	  if (color.indexOf('#') === 0) {
	    return color;
	  }
	  const {
	    values
	  } = decomposeColor(color);
	  return `#${values.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join('')}`;
	}

	/**
	 * Converts a color from hsl format to rgb format.
	 * @param {string} color - HSL color values
	 * @returns {string} rgb color values
	 */
	function hslToRgb(color) {
	  color = decomposeColor(color);
	  const {
	    values
	  } = color;
	  const h = values[0];
	  const s = values[1] / 100;
	  const l = values[2] / 100;
	  const a = s * Math.min(l, 1 - l);
	  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
	  let type = 'rgb';
	  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
	  if (color.type === 'hsla') {
	    type += 'a';
	    rgb.push(values[3]);
	  }
	  return recomposeColor({
	    type,
	    values: rgb
	  });
	}
	/**
	 * The relative brightness of any point in a color space,
	 * normalized to 0 for darkest black and 1 for lightest white.
	 *
	 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
	 * @returns {number} The relative brightness of the color in the range 0 - 1
	 */
	function getLuminance(color) {
	  color = decomposeColor(color);
	  let rgb = color.type === 'hsl' || color.type === 'hsla' ? decomposeColor(hslToRgb(color)).values : color.values;
	  rgb = rgb.map(val => {
	    if (color.type !== 'color') {
	      val /= 255; // normalized
	    }
	    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
	  });

	  // Truncate at 3 digits
	  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
	}

	/**
	 * Calculates the contrast ratio between two colors.
	 *
	 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
	 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
	 * @returns {number} A contrast ratio value in the range 0 - 21.
	 */
	function getContrastRatio(foreground, background) {
	  const lumA = getLuminance(foreground);
	  const lumB = getLuminance(background);
	  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
	}

	/**
	 * Sets the absolute transparency of a color.
	 * Any existing alpha values are overwritten.
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
	 * @param {number} value - value to set the alpha channel to in the range 0 - 1
	 * @returns {string} A CSS color string. Hex input values are returned as rgb
	 */
	function alpha(color, value) {
	  color = decomposeColor(color);
	  value = clampWrapper(value);
	  if (color.type === 'rgb' || color.type === 'hsl') {
	    color.type += 'a';
	  }
	  if (color.type === 'color') {
	    color.values[3] = `/${value}`;
	  } else {
	    color.values[3] = value;
	  }
	  return recomposeColor(color);
	}
	function private_safeAlpha(color, value, warning) {
	  try {
	    return alpha(color, value);
	  } catch (error) {
	    return color;
	  }
	}

	/**
	 * Darkens a color.
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
	 * @param {number} coefficient - multiplier in the range 0 - 1
	 * @returns {string} A CSS color string. Hex input values are returned as rgb
	 */
	function darken(color, coefficient) {
	  color = decomposeColor(color);
	  coefficient = clampWrapper(coefficient);
	  if (color.type.indexOf('hsl') !== -1) {
	    color.values[2] *= 1 - coefficient;
	  } else if (color.type.indexOf('rgb') !== -1 || color.type.indexOf('color') !== -1) {
	    for (let i = 0; i < 3; i += 1) {
	      color.values[i] *= 1 - coefficient;
	    }
	  }
	  return recomposeColor(color);
	}
	function private_safeDarken(color, coefficient, warning) {
	  try {
	    return darken(color, coefficient);
	  } catch (error) {
	    return color;
	  }
	}

	/**
	 * Lightens a color.
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
	 * @param {number} coefficient - multiplier in the range 0 - 1
	 * @returns {string} A CSS color string. Hex input values are returned as rgb
	 */
	function lighten(color, coefficient) {
	  color = decomposeColor(color);
	  coefficient = clampWrapper(coefficient);
	  if (color.type.indexOf('hsl') !== -1) {
	    color.values[2] += (100 - color.values[2]) * coefficient;
	  } else if (color.type.indexOf('rgb') !== -1) {
	    for (let i = 0; i < 3; i += 1) {
	      color.values[i] += (255 - color.values[i]) * coefficient;
	    }
	  } else if (color.type.indexOf('color') !== -1) {
	    for (let i = 0; i < 3; i += 1) {
	      color.values[i] += (1 - color.values[i]) * coefficient;
	    }
	  }
	  return recomposeColor(color);
	}
	function private_safeLighten(color, coefficient, warning) {
	  try {
	    return lighten(color, coefficient);
	  } catch (error) {
	    return color;
	  }
	}

	/**
	 * Darken or lighten a color, depending on its luminance.
	 * Light colors are darkened, dark colors are lightened.
	 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
	 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
	 * @returns {string} A CSS color string. Hex input values are returned as rgb
	 */
	function emphasize(color, coefficient = 0.15) {
	  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
	}
	function private_safeEmphasize(color, coefficient, warning) {
	  try {
	    return emphasize(color, coefficient);
	  } catch (error) {
	    return color;
	  }
	}

	/**
	 * Blend a transparent overlay color with a background color, resulting in a single
	 * RGB color.
	 * @param {string} background - CSS color
	 * @param {string} overlay - CSS color
	 * @param {number} opacity - Opacity multiplier in the range 0 - 1
	 * @param {number} [gamma=1.0] - Gamma correction factor. For gamma-correct blending, 2.2 is usual.
	 */
	function blend(background, overlay, opacity, gamma = 1.0) {
	  const blendChannel = (b, o) => Math.round((b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma);
	  const backgroundColor = decomposeColor(background);
	  const overlayColor = decomposeColor(overlay);
	  const rgb = [blendChannel(backgroundColor.values[0], overlayColor.values[0]), blendChannel(backgroundColor.values[1], overlayColor.values[1]), blendChannel(backgroundColor.values[2], overlayColor.values[2])];
	  return recomposeColor({
	    type: 'rgb',
	    values: rgb
	  });
	}
	return colorManipulator;
}

var colorManipulatorExports = /*@__PURE__*/ requireColorManipulator();

const common = {
  black: '#000',
  white: '#fff'
};

const grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#f5f5f5',
  A200: '#eeeeee',
  A400: '#bdbdbd',
  A700: '#616161'
};

const purple = {
  50: '#f3e5f5',
  200: '#ce93d8',
  300: '#ba68c8',
  400: '#ab47bc',
  500: '#9c27b0',
  700: '#7b1fa2'};

const red = {
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',
  700: '#d32f2f',
  800: '#c62828'};

const orange = {
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',
  700: '#f57c00',
  900: '#e65100'};

const blue = {
  50: '#e3f2fd',
  200: '#90caf9',
  400: '#42a5f5',
  700: '#1976d2',
  800: '#1565c0'};

const lightBlue = {
  300: '#4fc3f7',
  400: '#29b6f6',
  500: '#03a9f4',
  700: '#0288d1',
  900: '#01579b'};

const green = {
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50',
  700: '#388e3c',
  800: '#2e7d32',
  900: '#1b5e20'};

const _excluded$3 = ["mode", "contrastThreshold", "tonalOffset"];
const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.6)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)'
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    default: common.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
const dark = {
  text: {
    primary: common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#121212',
    default: '#121212'
  },
  action: {
    active: common.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = colorManipulatorExports.lighten(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      intent.dark = colorManipulatorExports.darken(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: blue[200],
      light: blue[50],
      dark: blue[400]
    };
  }
  return {
    main: blue[700],
    light: blue[400],
    dark: blue[800]
  };
}
function getDefaultSecondary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: purple[200],
      light: purple[50],
      dark: purple[400]
    };
  }
  return {
    main: purple[500],
    light: purple[300],
    dark: purple[700]
  };
}
function getDefaultError(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: red[500],
      light: red[300],
      dark: red[700]
    };
  }
  return {
    main: red[700],
    light: red[400],
    dark: red[800]
  };
}
function getDefaultInfo(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[700]
    };
  }
  return {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900]
  };
}
function getDefaultSuccess(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: green[400],
      light: green[300],
      dark: green[700]
    };
  }
  return {
    main: green[800],
    light: green[500],
    dark: green[900]
  };
}
function getDefaultWarning(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: orange[400],
      light: orange[300],
      dark: orange[700]
    };
  }
  return {
    main: '#ed6c02',
    // closest to orange[800] that pass 3:1.
    light: orange[500],
    dark: orange[900]
  };
}
function createPalette(palette) {
  const {
      mode = 'light',
      contrastThreshold = 3,
      tonalOffset = 0.2
    } = palette,
    other = _objectWithoutPropertiesLoose(palette, _excluded$3);
  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode);

  // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
  function getContrastText(background) {
    const contrastText = colorManipulatorExports.getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    return contrastText;
  }
  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color = _extends({}, color);
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }
    if (!color.hasOwnProperty('main')) {
      throw new Error(formatMuiErrorMessage$1(11, name ? ` (${name})` : '', mainShade));
    }
    if (typeof color.main !== 'string') {
      throw new Error(formatMuiErrorMessage$1(12, name ? ` (${name})` : '', JSON.stringify(color.main)));
    }
    addLightOrDark(color, 'light', lightShade, tonalOffset);
    addLightOrDark(color, 'dark', darkShade, tonalOffset);
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
    return color;
  };
  const modes = {
    dark,
    light
  };
  const paletteOutput = deepmerge(_extends({
    // A collection of common colors.
    common: _extends({}, common),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: 'primary'
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: 'secondary',
      mainShade: 'A400',
      lightShade: 'A200',
      darkShade: 'A700'
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: 'error'
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: 'warning'
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: 'info'
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: 'success'
    }),
    // The grey colors.
    grey,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}

const _excluded$2 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
const caseAllCaps = {
  textTransform: 'uppercase'
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

/**
 * @see @link{https://m2.material.io/design/typography/the-type-system.html}
 * @see @link{https://m2.material.io/design/typography/understanding-typography.html}
 */
function createTypography(palette, typography) {
  const _ref = typeof typography === 'function' ? typography(palette) : typography,
    {
      fontFamily = defaultFontFamily,
      // The default font size of the Material Specification.
      fontSize = 14,
      // px
      fontWeightLight = 300,
      fontWeightRegular = 400,
      fontWeightMedium = 500,
      fontWeightBold = 700,
      // Tell MUI what's the font-size on the html element.
      // 16px is the default font-size used by browsers.
      htmlFontSize = 16,
      // Apply the CSS properties to all the variants.
      allVariants,
      pxToRem: pxToRem2
    } = _ref,
    other = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  const coef = fontSize / 14;
  const pxToRem = pxToRem2 || (size => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => _extends({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight
  }, fontFamily === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing / size)}em`
  } : {}, casing, allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit'
    }
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false // No need to clone deep
  });
}

const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(',');
}

// Values from https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss
const shadows = ['none', createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];

const _excluded$1 = ["duration", "easing", "delay"];
// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
};

// Follow https://m2.material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height) {
  if (!height) {
    return 0;
  }
  const constant = height / 36;

  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);
  const mergedDuration = _extends({}, duration, inputTransitions.duration);
  const create = (props = ['all'], options = {}) => {
    const {
        duration: durationOption = mergedDuration.standard,
        easing: easingOption = mergedEasing.easeInOut,
        delay = 0
      } = options;
      _objectWithoutPropertiesLoose(options, _excluded$1);
    return (Array.isArray(props) ? props : [props]).map(animatedProp => `${animatedProp} ${typeof durationOption === 'string' ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`).join(',');
  };
  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}

// We need to centralize the zIndex definitions as they work
// like global values in the browser.
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};

const _excluded = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function createTheme(options = {}, ...args) {
  const {
      mixins: mixinsInput = {},
      palette: paletteInput = {},
      transitions: transitionsInput = {},
      typography: typographyInput = {}
    } = options,
    other = _objectWithoutPropertiesLoose(options, _excluded);
  if (options.vars &&
  // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateCssVars` is the closest identifier for checking that the `options` is a result of `extendTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  options.generateCssVars === undefined) {
    throw new Error(formatMuiErrorMessage$1(18));
  }
  const palette = createPalette(paletteInput);
  const systemTheme = createTheme$1(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows.slice(),
    typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  muiTheme.unstable_sxConfig = _extends({}, defaultSxConfig, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}

const defaultTheme = createTheme();

function useTheme() {
  const theme = useTheme$1(defaultTheme);
  return theme[THEME_ID] || theme;
}

function FlexyProvider(props) {
    const theme = useTheme();
    return /*#__PURE__*/ jsx(FlexyStyleProvider, {
        ...props,
        theme: theme
    });
}

export { FlexBox, FlexColumnBox, FlexGrid, FlexGridColumn, FlexGridRow, FlexRowBox, FlexyProvider, createFlexGrid };
