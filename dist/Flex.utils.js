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
const mapFlexProps = (props, componentName = "Box")=>{
    const { x, y, row, column, flexDirection, reverse, nowrap, ...rest } = props;
    const axis = row ? "row" : column && !row ? "column" : flexDirection;
    const direction = mapDirection(axis, reverse);
    const whiteSpace = nowrap ? "nowrap" : props.whiteSpace;
    const flexProps = {
        display: "flex",
        whiteSpace
    };
    const className = `${props.className || ""} MuiFlex-root${componentName ? ` MuiFlex${componentName}-root` : ""}`;
    const alignments = resolveAlignment(direction, x, y);
    return {
        ...rest,
        ...flexProps,
        ...alignments,
        flexDirection: direction,
        className
    };
};

export { mapFlexProps };
//# sourceMappingURL=Flex.utils.js.map
