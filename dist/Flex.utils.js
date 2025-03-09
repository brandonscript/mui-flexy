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
    } else if (Array.isArray(alignment)) {
        return alignment.map((a)=>mapAlignment(a));
    } else if (typeof alignment === "object") {
        return Object.fromEntries(Object.entries(alignment).map(([k, a])=>[
                k,
                mapAlignment(a)
            ]));
    }
};
const mapDirection = (direction, reverse = false)=>{
    if (!direction) return "row";
    if (typeof direction === "string") {
        if (![
            "row",
            "row-reverse",
            "column",
            "column-reverse"
        ].includes(direction)) {
            console.warn(`Using { flex-direction: ${direction} } with mui-flexy shorthand is not recommended \
because it can cause unexpected alignment and orientation anomalies.`);
        }
        switch(direction){
            case "row":
            case "column":
                return `${direction}${reverse ? "-reverse" : ""}`;
            default:
                return direction;
        }
    } else if (Array.isArray(direction)) {
        return direction.map((d)=>!d ? "row" : mapDirection(d, reverse));
    } else if (typeof direction === "object") {
        return Object.fromEntries(Object.entries(direction).map(([k, d])=>[
                k,
                mapDirection(d, reverse)
            ]));
    }
};
const stringOrArrayValue = (value, index)=>{
    if (typeof value === "string") {
        return value;
    } else if (Array.isArray(value)) {
        return value?.[index];
    }
};
const mapResponsiveObject = (direction, main, cross)=>{
    return Object.fromEntries(Object.entries(direction ?? []).map(([key, d])=>{
        if (typeof d !== "string") {
            throw new Error("Values for a flex direction ResponsiveStyleObject must be strings, e.g. { xs: 'row', sm: 'column' }");
        }
        if (d.startsWith("column")) {
            return [
                key,
                typeof cross === "string" ? cross : mapAlignment(cross)?.[key]
            ];
        } else {
            return [
                key,
                typeof main === "string" ? main : mapAlignment(main)?.[key]
            ];
        }
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
    if (typeof direction === "object") {
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
const resolveDirection = (row, column, reverse = false, fallback = "row")=>{
    /* Maps boolean responsive row/column props to flexDirection values */ const rowIsNullOrUndefined = row === null || row === undefined;
    const columnIsNullOrUndefined = column === null || column === undefined;
    if (rowIsNullOrUndefined && columnIsNullOrUndefined) {
        return mapDirection(fallback, reverse);
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
    const rowIsArray = Array.isArray(row);
    const columnIsArray = Array.isArray(column);
    const rowIsObject = typeof row === "object" && !rowIsArray && !rowIsNullOrUndefined;
    const columnIsObject = typeof column === "object" && !columnIsArray && !columnIsNullOrUndefined;
    if ([
        !rowIsObject,
        !columnIsObject,
        !rowIsArray,
        !columnIsArray
    ].every(Boolean)) {
        return mapDirection(chooseColumn ? "column" : chooseRow ? "row" : fallback, reverse);
    }
    const rowIsFalsy = !row || rowIsArray && !row.length || rowIsObject && !Object.keys(row).length;
    const columnIsFalsy = !column || columnIsArray && !column.length || columnIsObject && !Object.keys(column).length;
    if (rowIsArray && columnIsFalsy) {
        return row.map((r)=>resolveDirection(r, column, reverse, fallback));
    }
    if (columnIsArray && rowIsFalsy) {
        return column.map((c)=>resolveDirection(row, c, reverse, fallback));
    }
    if (rowIsArray && columnIsArray) {
        const composite = [];
        if (row.length !== column.length) {
            console.warn(`When using Array type ResponsiveFlexDirection for both 'row' and 'column', they should be the same length (have the same number of breakpoints) - got row=${JSON.stringify(row)} and column=${JSON.stringify(column)}. You probably want to use just one or the other.`);
            const longestLength = Math.max(row.length, column.length);
            for(let i = 0; i < longestLength; i++){
                const r = row[i] ?? (column[i] === "column" ? "row" : "column");
                const c = column[i] ?? (row[i] === "row" ? "column" : "row");
                composite.push(resolveDirection(r, c, reverse, fallback));
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
            return resolveDirection(r, c, reverse, fallback);
        });
    }
    if (rowIsObject && columnIsFalsy) {
        return Object.fromEntries(Object.entries(row).filter(([, r])=>![
                null,
                undefined
            ].includes(r)).map(([k, r])=>[
                k,
                resolveDirection(r, undefined, reverse, fallback)
            ]));
    }
    if (columnIsObject && rowIsFalsy) {
        return Object.fromEntries(Object.entries(column).filter(([, r])=>![
                null,
                undefined
            ].includes(r)).map(([k, c])=>[
                k,
                resolveDirection(undefined, c, reverse, fallback)
            ]));
    }
    if (rowIsObject && columnIsObject) {
        const composite = {};
        const keys = new Set([
            ...Object.keys(row),
            ...Object.keys(column)
        ]);
        for (const key of keys){
            const r = row[key];
            const c = column[key];
            if ([
                null,
                undefined
            ].includes(r) && [
                null,
                undefined
            ].includes(c)) {
                continue;
            }
            composite[key] = resolveDirection(r, c, reverse, fallback);
        }
        return composite;
    }
};
const mapFlexProps = (props, ref, componentName = "Box")=>{
    const { x, y, row, column, flexDirection, reverse, nowrap, ...rest } = props;
    const direction = resolveDirection(row, column, reverse, flexDirection);
    const whiteSpace = nowrap ? "nowrap" : props.whiteSpace;
    const flexProps = {
        display: rest.display || "flex",
        whiteSpace
    };
    const className = `${props.className || ""} MuiFlex-root${componentName ? ` MuiFlex${componentName}-root` : ""}`;
    const alignments = resolveAlignment(direction, x, y);
    return {
        ...rest,
        ...flexProps,
        ...alignments,
        flexDirection: direction,
        className,
        ref
    };
};

export { mapFlexProps };
//# sourceMappingURL=Flex.utils.js.map
