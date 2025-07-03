import { objectWithoutProperties as _objectWithoutProperties, objectSpread2 as _objectSpread2, typeof as _typeof, slicedToArray as _slicedToArray, toConsumableArray as _toConsumableArray, createForOfIteratorHelper as _createForOfIteratorHelper } from './_virtual/_rollupPluginBabelHelpers.js';

var _excluded = ["x", "y", "row", "column", "flexDirection", "reverse", "nowrap"];
// @ts-ignore

// eslint-disable-next-line @typescript-eslint/no-explicit-any

var _mapAlignment = function mapAlignment(alignment) {
  if (!alignment) return;
  if (typeof alignment === "string") {
    switch (alignment) {
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
    return alignment.map(_mapAlignment);
  }
  if (_typeof(alignment) === "object") {
    var mapped = {};
    for (var _i = 0, _Object$entries = Object.entries(alignment); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      mapped[key] = _mapAlignment(value);
    }
    return mapped;
  }
  return alignment;
};
var _mapDirection = function mapDirection(direction) {
  var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!direction) return "row";
  if (typeof direction === "string") {
    if (!["row", "row-reverse", "column", "column-reverse"].includes(direction)) {
      console.warn("Using { flex-direction: ".concat(direction, " } with mui-flexy shorthand is not recommended because it can cause unexpected alignment and orientation anomalies."));
    }
    switch (direction) {
      case "row":
      case "column":
        return "".concat(direction).concat(reverse ? "-reverse" : "");
      default:
        return direction;
    }
  } else if (Array.isArray(direction)) {
    return direction.map(function (d) {
      return !d ? "row" : _mapDirection(d, reverse);
    });
  } else if (_typeof(direction) === "object") {
    var mapped = {};
    for (var _i2 = 0, _Object$entries2 = Object.entries(direction); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        key = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];
      mapped[key] = _mapDirection(value, reverse);
    }
    return mapped;
  }
};
var stringOrArrayValue = function stringOrArrayValue(value, index) {
  if (typeof value === "string") {
    return value;
  } else if (Array.isArray(value)) {
    return value === null || value === void 0 ? void 0 : value[index];
  }
};
var mapResponsiveObject = function mapResponsiveObject(direction, main, cross) {
  return Object.fromEntries(Object.entries(direction !== null && direction !== void 0 ? direction : []).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      d = _ref2[1];
    if (typeof d !== "string") {
      throw new Error("Values for a flex direction ResponsiveStyleObject must be strings, e.g. { xs: 'row', sm: 'column' }");
    }
    if (d.startsWith("column")) {
      var _mapAlignment2;
      return [key, typeof cross === "string" ? cross : (_mapAlignment2 = _mapAlignment(cross)) === null || _mapAlignment2 === void 0 ? void 0 : _mapAlignment2[key]];
    } else {
      var _mapAlignment3;
      return [key, typeof main === "string" ? main : (_mapAlignment3 = _mapAlignment(main)) === null || _mapAlignment3 === void 0 ? void 0 : _mapAlignment3[key]];
    }
  }));
};
var resolveAlignment = function resolveAlignment(direction, x, y) {
  if (typeof direction === "string") {
    var isColumn = direction.startsWith("column");
    return {
      justifyContent: _mapAlignment(isColumn ? y : x),
      alignItems: _mapAlignment(isColumn ? x : y)
    };
  }
  if (Array.isArray(direction)) {
    return {
      justifyContent: direction.map(function (d, i) {
        return stringOrArrayValue(_mapAlignment(d !== null && d !== void 0 && d.startsWith("column") ? y : x), i);
      }),
      alignItems: direction.map(function (d, i) {
        return stringOrArrayValue(_mapAlignment(d !== null && d !== void 0 && d.startsWith("column") ? x : y), i);
      })
    };
  }
  if (_typeof(direction) === "object") {
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
var _resolveDirection = function resolveDirection(row, column) {
  var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var fallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "row";
  /* Maps boolean responsive row/column props to flexDirection values */

  var rowIsNullOrUndefined = row === null || row === undefined;
  var columnIsNullOrUndefined = column === null || column === undefined;
  if (rowIsNullOrUndefined && columnIsNullOrUndefined) {
    return _mapDirection(fallback, reverse);
  }
  var rowIsFalse = row === false;
  var columnIsFalse = column === false;
  var chooseRow = [true, "row"].includes(row) || columnIsFalse || columnIsNullOrUndefined;
  var chooseColumn = [true, "column"].includes(column) || rowIsFalse || rowIsNullOrUndefined;
  if (rowIsFalse && !columnIsFalse) {
    chooseRow = false;
    chooseColumn = true;
  } else if (columnIsFalse && !rowIsFalse) {
    chooseColumn = false;
    chooseRow = true;
  } else if (chooseRow && chooseColumn) {
    chooseColumn = false;
  }
  var rowIsArray = Array.isArray(row);
  var columnIsArray = Array.isArray(column);
  var rowIsObject = _typeof(row) === "object" && !rowIsArray && !rowIsNullOrUndefined;
  var columnIsObject = _typeof(column) === "object" && !columnIsArray && !columnIsNullOrUndefined;
  if ([!rowIsObject, !columnIsObject, !rowIsArray, !columnIsArray].every(Boolean)) {
    return _mapDirection(chooseColumn ? "column" : chooseRow ? "row" : fallback, reverse);
  }
  var rowIsFalsy = !row || rowIsArray && !row.length || rowIsObject && !Object.keys(row).length;
  var columnIsFalsy = !column || columnIsArray && !column.length || columnIsObject && !Object.keys(column).length;
  if (rowIsArray && columnIsFalsy) {
    return row.map(function (r) {
      return _resolveDirection(r, column, reverse, fallback);
    });
  }
  if (columnIsArray && rowIsFalsy) {
    return column.map(function (c) {
      return _resolveDirection(row, c, reverse, fallback);
    });
  }
  if (rowIsArray && columnIsArray) {
    var composite = [];
    if (row.length !== column.length) {
      console.warn("When using Array type ResponsiveFlexDirection for both 'row' and 'column', they should be the same length (have the same number of breakpoints) - got row=".concat(JSON.stringify(row), " and column=").concat(JSON.stringify(column), ". You probably want to use just one or the other."));
      var longestLength = Math.max(row.length, column.length);
      for (var i = 0; i < longestLength; i++) {
        var _row$i, _column$i;
        var r = (_row$i = row[i]) !== null && _row$i !== void 0 ? _row$i : column[i] === "column" ? "row" : "column";
        var c = (_column$i = column[i]) !== null && _column$i !== void 0 ? _column$i : row[i] === "row" ? "column" : "row";
        composite.push(_resolveDirection(r, c, reverse, fallback));
      }
      return composite;
    }

    // if any of the values in each array are both true for the same array index, warn in the console and default to 'row'
    return row.map(function (r, i) {
      var c = column[i];
      if (r && c) {
        console.warn("When using Array type ResponsiveFlexDirection for both 'row' and 'column', they cannot not both be true for the same breakpoint index - got row=".concat(JSON.stringify(row), " and column=").concat(JSON.stringify(column), ". Defaulting to 'row' for conflicting indices."));
        c = false;
      }
      return _resolveDirection(r, c, reverse, fallback);
    });
  }
  if (rowIsObject && columnIsFalsy) {
    return Object.fromEntries(Object.entries(row).filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        r = _ref4[1];
      return ![null, undefined].includes(r);
    }).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        k = _ref6[0],
        r = _ref6[1];
      return [k, _resolveDirection(r, undefined, reverse, fallback)];
    }));
  }
  if (columnIsObject && rowIsFalsy) {
    return Object.fromEntries(Object.entries(column).filter(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
        r = _ref8[1];
      return ![null, undefined].includes(r);
    }).map(function (_ref9) {
      var _ref0 = _slicedToArray(_ref9, 2),
        k = _ref0[0],
        c = _ref0[1];
      return [k, _resolveDirection(undefined, c, reverse, fallback)];
    }));
  }
  if (rowIsObject && columnIsObject) {
    var _composite = {};
    var keys = new Set([].concat(_toConsumableArray(Object.keys(row)), _toConsumableArray(Object.keys(column))));
    var _iterator = _createForOfIteratorHelper(keys),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        var _r = row[key];
        var _c = column[key];
        if ([null, undefined].includes(_r) && [null, undefined].includes(_c)) {
          // if both are empty, omit the key
          continue;
        }
        _composite[key] = _resolveDirection(_r, _c, reverse, fallback);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return _composite;
  }
};
var mapFlexProps = function mapFlexProps(props, ref) {
  var componentName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Box";
  var x = props.x,
    y = props.y,
    row = props.row,
    column = props.column,
    flexDirection = props.flexDirection,
    reverse = props.reverse,
    nowrap = props.nowrap,
    rest = _objectWithoutProperties(props, _excluded);
  var direction = _resolveDirection(row, column, reverse, flexDirection);
  var whiteSpace = nowrap ? "nowrap" : props.whiteSpace;
  var flexProps = {
    display: rest.display || "flex",
    whiteSpace: whiteSpace
  };
  var className = "".concat(props.className || "", " MuiFlex-root").concat(componentName ? " MuiFlex".concat(componentName, "-root") : "");
  var alignments = resolveAlignment(direction, x, y);
  return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, rest), flexProps), alignments), {}, {
    flexDirection: direction,
    className: className,
    ref: ref
  });
};

export { mapFlexProps };
//# sourceMappingURL=Flex.utils.js.map
