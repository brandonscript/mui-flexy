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
        return direction.map((d)=>mapDirection(d, reverse));
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
    return Object.fromEntries(Object.entries(direction).map(([key, d])=>{
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
const mapFlexProps = (props, componentName = "Box")=>{
    const { x, y, row, column, flexDirection, reverse, nowrap, ...rest } = props;
    const direction = mapDirection(row ? "row" : column ? "column" : flexDirection, reverse);
    const whiteSpace = nowrap ? "nowrap" : props.whiteSpace;
    const flexProps = {
        display: "flex",
        whiteSpace
    };
    const className = `${props.className || ""} MuiFlex-root${componentName ? ` MuiFlex${componentName}-root` : ""}`;
    const wrapBaseProps = (convertedFlexProps)=>{
        return {
            ...rest,
            ...flexProps,
            ...convertedFlexProps,
            className
        };
    };
    if (typeof direction === "string") {
        return wrapBaseProps({
            flexDirection: direction,
            justifyContent: mapAlignment(direction.startsWith("column") ? y : x),
            alignItems: mapAlignment(direction.startsWith("column") ? x : y)
        });
    } else if (Array.isArray(direction)) {
        if (Array.isArray(x) && x.length !== direction.length && typeof x !== "string" || Array.isArray(y) && y.length !== direction.length && typeof y !== "string") {
            throw new Error("Invalid Flexy shorthand props. If using ResponsiveStyleValue arrays for x, y, or flexDirection,\
 all arrays must be the same length. You may only mix and match ResponsiveStyleValue arrays and strings.");
        } else {
            return wrapBaseProps({
                flexDirection: direction,
                justifyContent: direction.map((d, i)=>{
                    return stringOrArrayValue(mapAlignment(d.startsWith("column") ? y : x), i);
                }),
                alignItems: direction.map((d, i)=>{
                    return stringOrArrayValue(mapAlignment(d.startsWith("column") ? x : y), i);
                })
            });
        }
    } else if (direction && typeof direction === "object") {
        if (typeof x !== "object" && typeof x !== "string" || typeof y !== "object" && typeof y !== "string") {
            throw new Error("Invalid Flexy shorthand props. You may only mix and match ResponsiveStyleValue objects and strings.");
        }
        return wrapBaseProps({
            flexDirection: direction,
            justifyContent: mapResponsiveObject(direction, x, y),
            alignItems: mapResponsiveObject(direction, y, x)
        });
    }
    return wrapBaseProps({
        flexDirection: direction,
        justifyContent: x,
        alignItems: y
    });
};

exports.mapFlexProps = mapFlexProps;
//# sourceMappingURL=Flex.utils.cjs.map
