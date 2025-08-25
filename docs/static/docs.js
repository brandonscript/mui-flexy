import { jsx, jsxs } from 'react/jsx-runtime';
import React, { useState, useEffect, useMemo } from 'react';

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React.createContext && /*#__PURE__*/React.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/React.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/React.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var {
        attr,
        size,
        title
      } = props,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/React.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/React.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/React.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaGithub (props) {
  return GenIcon({"attr":{"viewBox":"0 0 496 512"},"child":[{"tag":"path","attr":{"d":"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"},"child":[]}]})(props);
}

// THIS FILE IS AUTO GENERATED
function HiOutlineExternalLink (props) {
  return GenIcon({"attr":{"fill":"none","viewBox":"0 0 24 24","strokeWidth":"2","stroke":"currentColor","aria-hidden":"true"},"child":[{"tag":"path","attr":{"strokeLinecap":"round","strokeLinejoin":"round","d":"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"},"child":[]}]})(props);
}

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var FLEXBOX_TAB_TITLE = "Interactive FlexBox sandbox";
var FLEXGRID_TAB_TITLE = "Interactive FlexGrid sandbox";
var FLEXGRID2_TAB_TITLE = "Interactive FlexGrid2 sandbox";
// Code display component with proper styling
var DemoCode = function(param) {
    var _param_inline = param.inline, inline = _param_inline === void 0 ? false : _param_inline, code = param.code, children = param.children;
    var content = (children === null || children === void 0 ? void 0 : children.toString()) || code || "";
    if (inline) {
        return /*#__PURE__*/ jsx("code", {
            style: {
                backgroundColor: "#f5f5f5",
                padding: "2px 4px",
                borderRadius: "4px",
                fontSize: "0.875rem",
                fontFamily: "Consolas, Monaco, 'Courier New', monospace",
                color: "#24292f"
            },
            children: content
        });
    }
    return /*#__PURE__*/ jsx("pre", {
        style: {
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            margin: "16px 0",
            fontSize: "0.875rem",
            fontFamily: "Consolas, Monaco, 'Courier New', monospace",
            padding: "10px",
            overflowX: "auto"
        },
        children: content
    });
};
// Demo container styling
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
var createDemoInner = function(FlexBox, styled) {
    return styled(FlexBox)({
        minHeight: 200,
        border: "1.5px solid #e2ebf8",
        borderRadius: "4px",
        flexGrow: 1,
        gap: "6px",
        padding: "4px",
        backgroundColor: "#fff",
        // Remove any potential conflicting styles
        "& > span": {
            backgroundColor: "#f5f5f5",
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingTop: "4px",
            paddingBottom: "4px",
            borderRadius: "4px",
            fontSize: "1.2em",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "40px",
            minHeight: "40px",
            // Add border to better visualize alignment
            border: "1px solid #ddd",
            // Ensure the spans don't interfere with parent flex alignment
            flexShrink: 0
        }
    });
};
// FlexGrid demo styling
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
var createFlexGridDemo = function(FlexGrid, styled) {
    return styled(FlexGrid)({
        minHeight: 200,
        border: "1.5px solid #e2ebf8",
        borderRadius: "4px",
        backgroundColor: "#fff",
        padding: "4px",
        "& .grid-item": {
            backgroundColor: "#f5f5f5",
            padding: "8px",
            borderRadius: "4px",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60px",
            border: "1px solid #ddd",
            textAlign: "center"
        }
    });
};
// Version configurations
var versions = [
    {
        key: "v5",
        label: "MUI v5",
        version: "5",
        packageName: "@mui-flexy/v5"
    },
    {
        key: "v6",
        label: "MUI v6",
        version: "6",
        packageName: "@mui-flexy/v6"
    },
    {
        key: "v7",
        label: "MUI v7",
        version: "7",
        packageName: "@mui-flexy/v7"
    }
];
// Shared loading component to avoid visual jumps
var LoadingComponent = function(param) {
    param.message;
    return /*#__PURE__*/ jsxs("div", {
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fafafa",
            zIndex: 9999
        },
        children: [
            /*#__PURE__*/ jsx("div", {
                style: {
                    width: "60px",
                    height: "4px",
                    backgroundColor: "#007FFF",
                    borderRadius: "2px",
                    animation: "loading-bar 1.5s ease-in-out infinite"
                }
            }),
            /*#__PURE__*/ jsx("style", {
                children: "\n      @keyframes loading-bar {\n        0% { transform: scaleX(0); }\n        50% { transform: scaleX(1); }\n        100% { transform: scaleX(0); }\n      }\n    "
            })
        ]
    });
};
// Complete alignment options based on the core types
var xRowOptions = [
    {
        value: "left",
        label: "left"
    },
    {
        value: "center",
        label: "center"
    },
    {
        value: "right",
        label: "right"
    },
    {
        value: "space-between",
        label: "space-between"
    },
    {
        value: "space-around",
        label: "space-around"
    },
    {
        value: "space-evenly",
        label: "space-evenly"
    },
    {
        value: "flex-start",
        label: "flex-start"
    },
    {
        value: "flex-end",
        label: "flex-end"
    }
];
var yRowOptions = [
    {
        value: "top",
        label: "top"
    },
    {
        value: "center",
        label: "center"
    },
    {
        value: "bottom",
        label: "bottom"
    },
    {
        value: "stretch",
        label: "stretch"
    },
    {
        value: "baseline",
        label: "baseline"
    },
    {
        value: "flex-start",
        label: "flex-start"
    },
    {
        value: "flex-end",
        label: "flex-end"
    }
];
var xColumnOptions = [
    {
        value: "left",
        label: "left"
    },
    {
        value: "center",
        label: "center"
    },
    {
        value: "right",
        label: "right"
    },
    {
        value: "stretch",
        label: "stretch"
    },
    {
        value: "baseline",
        label: "baseline"
    },
    {
        value: "flex-start",
        label: "flex-start"
    },
    {
        value: "flex-end",
        label: "flex-end"
    }
];
var yColumnOptions = [
    {
        value: "top",
        label: "top"
    },
    {
        value: "center",
        label: "center"
    },
    {
        value: "bottom",
        label: "bottom"
    },
    {
        value: "space-between",
        label: "space-between"
    },
    {
        value: "space-around",
        label: "space-around"
    },
    {
        value: "space-evenly",
        label: "space-evenly"
    },
    {
        value: "flex-start",
        label: "flex-start"
    },
    {
        value: "flex-end",
        label: "flex-end"
    }
];
// Emojis
var rowEmoji = "🚣";
var columnEmoji = "🏛";
// Global cache for loaded libraries
var libraryCache = {};
var loadingPromises = {};
// Lazy loading component for each version
var VersionContent = function(param) {
    var version = param.version;
    var _useState = _sliced_to_array(useState(libraryCache[version] || null), 2), libraries = _useState[0], setLibraries = _useState[1];
    var _useState1 = _sliced_to_array(useState(!libraryCache[version]), 2), loading = _useState1[0], setLoading = _useState1[1];
    var _useState2 = _sliced_to_array(useState(null), 2), error = _useState2[0], setError = _useState2[1];
    useEffect(function() {
        var loadLibraries = function() {
            return _async_to_generator(function() {
                var cachedLibraries, loadingStartTime, loadingPromise, librariesData, loadingDuration, minLoadingTime, err1, loadingDuration1, minLoadingTime1;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            // If libraries are already cached, use them immediately
                            if (libraryCache[version]) {
                                setLibraries(libraryCache[version]);
                                setLoading(false);
                                return [
                                    2
                                ];
                            }
                            if (!loadingPromises[version]) return [
                                3,
                                4
                            ];
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                3,
                                ,
                                4
                            ]);
                            return [
                                4,
                                loadingPromises[version]
                            ];
                        case 2:
                            cachedLibraries = _state.sent();
                            setLibraries(cachedLibraries);
                            setLoading(false);
                            return [
                                2
                            ];
                        case 3:
                            _state.sent();
                            setError("Failed to load libraries for ".concat(version));
                            setLoading(false);
                            return [
                                2
                            ];
                        case 4:
                            // Track loading start time for minimum display duration
                            loadingStartTime = Date.now();
                            _state.label = 5;
                        case 5:
                            _state.trys.push([
                                5,
                                9,
                                12,
                                13
                            ]);
                            setLoading(true);
                            setError(null);
                            // Create loading promise and store it
                            loadingPromise = function() {
                                return _async_to_generator(function() {
                                    var Styles, _ref, Material, FlexComponents, _Material_default, _Material_default1, StylesModule, SystemModule, MaterialModule, SystemModuleResolved, simpleStyled, librariesData;
                                    return _ts_generator(this, function(_state) {
                                        switch(_state.label){
                                            case 0:
                                                return [
                                                    4,
                                                    Promise.all([
                                                        import("@mui/material_".concat(version)),
                                                        import("@mui-flexy/".concat(version))
                                                    ])
                                                ];
                                            case 1:
                                                _ref = _sliced_to_array.apply(void 0, [
                                                    _state.sent(),
                                                    2
                                                ]), Material = _ref[0], FlexComponents = _ref[1];
                                                if (!(version === "v5")) return [
                                                    3,
                                                    3
                                                ];
                                                return [
                                                    4,
                                                    import("@mui/styles_".concat(version))
                                                ];
                                            case 2:
                                                StylesModule = _state.sent();
                                                Styles = _object_spread_props(_object_spread({}, StylesModule.default || StylesModule), {
                                                    createTheme: Material.createTheme || ((_Material_default = Material.default) === null || _Material_default === void 0 ? void 0 : _Material_default.createTheme),
                                                    responsiveFontSizes: (StylesModule.default || StylesModule).responsiveFontSizes || function(theme) {
                                                        return theme;
                                                    },
                                                    ThemeProvider: (StylesModule.default || StylesModule).ThemeProvider,
                                                    CssBaseline: Material.CssBaseline || ((_Material_default1 = Material.default) === null || _Material_default1 === void 0 ? void 0 : _Material_default1.CssBaseline)
                                                });
                                                return [
                                                    3,
                                                    5
                                                ];
                                            case 3:
                                                return [
                                                    4,
                                                    import("@mui/system_".concat(version))
                                                ];
                                            case 4:
                                                SystemModule = _state.sent();
                                                MaterialModule = Material.default || Material;
                                                SystemModuleResolved = SystemModule.default || SystemModule;
                                                // Create a simple styled function that just applies sx props
                                                simpleStyled = function(Component) {
                                                    return function(styles) {
                                                        return function(props) {
                                                            return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, props), {
                                                                sx: _object_spread({}, styles, props.sx)
                                                            }));
                                                        };
                                                    };
                                                };
                                                Styles = {
                                                    styled: simpleStyled,
                                                    createTheme: MaterialModule.createTheme,
                                                    responsiveFontSizes: function(theme) {
                                                        return theme;
                                                    },
                                                    ThemeProvider: SystemModuleResolved.ThemeProvider,
                                                    CssBaseline: MaterialModule.CssBaseline
                                                };
                                                _state.label = 5;
                                            case 5:
                                                librariesData = {
                                                    Material: Material.default || Material,
                                                    Styles: Styles,
                                                    FlexBox: FlexComponents.FlexBox,
                                                    FlexGrid: FlexComponents.FlexGrid
                                                };
                                                // Only add FlexGrid2 for v6
                                                if (version === "v6") {
                                                    librariesData.FlexGrid2 = FlexComponents.FlexGrid2;
                                                }
                                                // Cache the libraries
                                                libraryCache[version] = librariesData;
                                                return [
                                                    2,
                                                    librariesData
                                                ];
                                        }
                                    });
                                })();
                            }();
                            loadingPromises[version] = loadingPromise;
                            return [
                                4,
                                loadingPromise
                            ];
                        case 6:
                            librariesData = _state.sent();
                            setLibraries(librariesData);
                            // Ensure loading is displayed for at least 500ms
                            loadingDuration = Date.now() - loadingStartTime;
                            minLoadingTime = 500; // 500ms
                            if (!(loadingDuration < minLoadingTime)) return [
                                3,
                                8
                            ];
                            return [
                                4,
                                new Promise(function(resolve) {
                                    return setTimeout(resolve, minLoadingTime - loadingDuration);
                                })
                            ];
                        case 7:
                            _state.sent();
                            _state.label = 8;
                        case 8:
                            return [
                                3,
                                13
                            ];
                        case 9:
                            err1 = _state.sent();
                            console.error("Error loading libraries for ".concat(version, ":"), err1);
                            setError("Failed to load libraries for ".concat(version));
                            // Ensure loading is displayed for at least 500ms even on error
                            loadingDuration1 = Date.now() - loadingStartTime;
                            minLoadingTime1 = 500; // 500ms
                            if (!(loadingDuration1 < minLoadingTime1)) return [
                                3,
                                11
                            ];
                            return [
                                4,
                                new Promise(function(resolve) {
                                    return setTimeout(resolve, minLoadingTime1 - loadingDuration1);
                                })
                            ];
                        case 10:
                            _state.sent();
                            _state.label = 11;
                        case 11:
                            return [
                                3,
                                13
                            ];
                        case 12:
                            setLoading(false);
                            // Clean up loading promise
                            delete loadingPromises[version];
                            return [
                                7
                            ];
                        case 13:
                            return [
                                2
                            ];
                    }
                });
            })();
        };
        loadLibraries();
    }, [
        version
    ]);
    if (loading) {
        return /*#__PURE__*/ jsx(LoadingComponent, {
            message: "Loading modules..."
        });
    }
    if (error) {
        return /*#__PURE__*/ jsx("div", {
            style: {
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                backgroundColor: "#fafafa"
            },
            children: /*#__PURE__*/ jsxs("div", {
                style: {
                    padding: "24px",
                    textAlign: "center",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    maxWidth: "400px",
                    width: "90%",
                    border: "1px solid #ffcdd2"
                },
                children: [
                    /*#__PURE__*/ jsxs("div", {
                        style: {
                            fontSize: "16px",
                            color: "#d32f2f",
                            fontWeight: 500,
                            marginBottom: "8px"
                        },
                        children: [
                            "Error loading ",
                            version,
                            " libraries"
                        ]
                    }),
                    /*#__PURE__*/ jsx("div", {
                        style: {
                            fontSize: "14px",
                            color: "#666",
                            fontWeight: 400
                        },
                        children: error
                    })
                ]
            })
        });
    }
    if (!libraries) {
        return /*#__PURE__*/ jsx("div", {
            style: {
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                backgroundColor: "#fafafa"
            },
            children: /*#__PURE__*/ jsx("div", {
                style: {
                    padding: "24px",
                    textAlign: "center",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    maxWidth: "300px",
                    width: "90%"
                },
                children: /*#__PURE__*/ jsx("div", {
                    style: {
                        fontSize: "14px",
                        color: "#666",
                        fontWeight: 400
                    },
                    children: "Libraries not loaded"
                })
            })
        });
    }
    return /*#__PURE__*/ jsx(VersionApp, {
        version: version,
        libraries: libraries
    });
};
// Main version-specific app component
var VersionApp = function(param) {
    var version = param.version, libraries = param.libraries;
    var Material = libraries.Material, Styles = libraries.Styles, FlexBox = libraries.FlexBox, FlexGrid = libraries.FlexGrid, _libraries_FlexGrid2 = libraries.FlexGrid2, FlexGrid2 = _libraries_FlexGrid2 === void 0 ? null : _libraries_FlexGrid2;
    var _useState = _sliced_to_array(useState(0), 2), selectedTab = _useState[0], setSelectedTab = _useState[1];
    var _useState1 = _sliced_to_array(useState("row"), 2), direction = _useState1[0], setDirection = _useState1[1];
    var _useState2 = _sliced_to_array(useState({
        x: "center",
        y: "center",
        row: true,
        column: false,
        nowrap: false,
        reverse: false
    }), 2), flexBoxProps = _useState2[0], setFlexBoxProps = _useState2[1];
    var _useState3 = _sliced_to_array(useState({
        rows: 2,
        columns: 3,
        spacing: 2,
        useTemplate: false
    }), 2), flexGridProps = _useState3[0], setFlexGridProps = _useState3[1];
    var _useState4 = _sliced_to_array(useState({
        x: "left",
        y: "stretch"
    }), 2), flexGridItemProps = _useState4[0], setFlexGridItemProps = _useState4[1];
    // Update flexBoxProps when direction changes
    useEffect(function() {
        setFlexBoxProps(function(prev) {
            return _object_spread_props(_object_spread({}, prev), {
                row: direction === "row",
                column: direction === "column"
            });
        });
    }, [
        direction
    ]);
    // Handle tab switching when version changes
    useEffect(function() {
        // Prevent infinite loops by checking if the tab switch is actually necessary
        if (selectedTab === 2 && version !== "v6") {
            // If user is on FlexGrid2 tab (index 2) and switches to v5/v7, go to FlexGrid tab (index 1)
            console.log("Switching from FlexGrid2 tab to FlexGrid tab for ".concat(version));
            setSelectedTab(1);
        } else if (selectedTab === 1 && version === "v6") {
            // If user is on FlexGrid tab (index 1) and switches to v6, go to FlexGrid2 tab (index 2)
            console.log("Switching from FlexGrid tab to FlexGrid2 tab for ".concat(version));
            setSelectedTab(2);
        }
    }, [
        version
    ]); // Only run when version changes, not when selectedTab changes
    // Determine current options based on direction
    var isColumn = direction === "column";
    var xOptions = isColumn ? xColumnOptions : xRowOptions;
    var yOptions = isColumn ? yColumnOptions : yRowOptions;
    var currentVersion = versions.find(function(v) {
        return v.key === version;
    });
    // Create styled components for this version (memoized to prevent re-creation on each render)
    var FlexBoxInner = useMemo(function() {
        return createDemoInner(FlexBox, Styles.styled);
    }, [
        FlexBox,
        Styles.styled
    ]);
    var FlexGridDemo = useMemo(function() {
        return createFlexGridDemo(FlexGrid, Styles.styled);
    }, [
        FlexGrid,
        Styles.styled
    ]);
    var FlexGrid2Demo = useMemo(function() {
        return version === "v6" && FlexGrid2 ? createFlexGridDemo(FlexGrid2, Styles.styled) : null;
    }, [
        version,
        FlexGrid2,
        Styles.styled
    ]);
    var generateFlexBoxCode = function() {
        var propsArray = [];
        if (flexBoxProps.x !== "center") propsArray.push('x="'.concat(flexBoxProps.x, '"'));
        if (flexBoxProps.y !== "center") propsArray.push('y="'.concat(flexBoxProps.y, '"'));
        if (flexBoxProps.row) propsArray.push("row");
        if (flexBoxProps.column) propsArray.push("column");
        if (flexBoxProps.nowrap) propsArray.push("nowrap");
        if (flexBoxProps.reverse) propsArray.push("reverse");
        var propsString = propsArray.length > 0 ? " ".concat(propsArray.join(" ")) : "";
        return "<FlexBox".concat(propsString, ">\n  <span>").concat(isColumn ? columnEmoji : rowEmoji, "</span>\n  <span>").concat(isColumn ? columnEmoji : rowEmoji, "</span>\n  <span>").concat(isColumn ? columnEmoji : rowEmoji, "</span>\n  <span>").concat(isColumn ? columnEmoji : "🚤", "</span>\n</FlexBox>");
    };
    var generateFlexGridCode = function() {
        var gridComponent = selectedTab === 2 ? "FlexGrid2" : "FlexGrid";
        var containerProps = flexGridProps.useTemplate ? 'sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gridGap: '.concat(flexGridProps.spacing, " }}") : "container spacing={".concat(flexGridProps.spacing, "}");
        var baseItemProps = selectedTab === 2 || selectedTab === 1 && version === "v7" ? "size={4}" : "item xs={4}";
        // Add x and y props to the item props
        var itemPropsArray = [
            baseItemProps
        ];
        if (flexGridItemProps.x !== "left") itemPropsArray.push('x="'.concat(flexGridItemProps.x, '"'));
        if (flexGridItemProps.y !== "stretch") itemPropsArray.push('y="'.concat(flexGridItemProps.y, '"'));
        var itemProps = itemPropsArray.join(" ");
        return "<".concat(gridComponent, " ").concat(containerProps, ">\n  <").concat(gridComponent, " ").concat(itemProps, '>\n    <div className="grid-item">Grid 1</div>\n  </').concat(gridComponent, ">\n  <").concat(gridComponent, " ").concat(itemProps, '>\n    <div className="grid-item">Grid 2</div>\n  </').concat(gridComponent, ">\n  <").concat(gridComponent, " ").concat(itemProps, '>\n    <div className="grid-item">Grid 3</div>\n  </').concat(gridComponent, ">\n</").concat(gridComponent, ">");
    };
    var renderFlexGridItems = function() {
        var totalItems = flexGridProps.rows * flexGridProps.columns;
        var itemSize = Math.floor(12 / flexGridProps.columns);
        return Array.from({
            length: totalItems
        }, function(_, i) {
            // For v6 and FlexGrid2 tab (index 2)
            if (version === "v6" && selectedTab === 2 && FlexGrid2Demo) {
                return /*#__PURE__*/ jsx(FlexGrid2Demo, {
                    size: itemSize,
                    x: flexGridItemProps.x,
                    y: flexGridItemProps.y,
                    children: /*#__PURE__*/ jsxs("div", {
                        className: "grid-item",
                        children: [
                            "Grid ",
                            i + 1
                        ]
                    })
                }, i);
            } else if (version === "v7" && selectedTab === 1) {
                return /*#__PURE__*/ jsx(FlexGridDemo, {
                    size: itemSize,
                    x: flexGridItemProps.x,
                    y: flexGridItemProps.y,
                    children: /*#__PURE__*/ jsxs("div", {
                        className: "grid-item",
                        children: [
                            "Grid ",
                            i + 1
                        ]
                    })
                }, i);
            } else if (version === "v5" && selectedTab === 1) {
                return /*#__PURE__*/ jsx(FlexGridDemo, {
                    item: true,
                    xs: itemSize,
                    x: flexGridItemProps.x,
                    y: flexGridItemProps.y,
                    children: /*#__PURE__*/ jsxs("div", {
                        className: "grid-item",
                        children: [
                            "Grid ",
                            i + 1
                        ]
                    })
                }, i);
            } else {
                return /*#__PURE__*/ jsx(FlexGridDemo, {
                    item: true,
                    xs: itemSize,
                    x: flexGridItemProps.x,
                    y: flexGridItemProps.y,
                    children: /*#__PURE__*/ jsxs("div", {
                        className: "grid-item",
                        children: [
                            "Grid ",
                            i + 1
                        ]
                    })
                }, i);
            }
        });
    };
    // Create theme for this version
    var theme = Styles.responsiveFontSizes(Styles.createTheme({
        palette: {
            primary: {
                main: "#007FFF"
            }
        },
        typography: {
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Inter"',
                '"San Francisco"',
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(",")
        },
        shadows: [
            "none",
            "0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.12)",
            "0px 2px 6px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.12)",
            "0px 3px 12px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.12)",
            "0px 4px 16px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12)",
            "0px 6px 20px rgba(0, 0, 0, 0.08), 0px 3px 10px rgba(0, 0, 0, 0.12)",
            "0px 8px 24px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(0, 0, 0, 0.12)",
            "0px 10px 28px rgba(0, 0, 0, 0.08), 0px 5px 14px rgba(0, 0, 0, 0.12)",
            "0px 12px 32px rgba(0, 0, 0, 0.08), 0px 6px 16px rgba(0, 0, 0, 0.12)",
            "0px 14px 36px rgba(0, 0, 0, 0.08), 0px 7px 18px rgba(0, 0, 0, 0.12)",
            "0px 16px 40px rgba(0, 0, 0, 0.08), 0px 8px 20px rgba(0, 0, 0, 0.12)",
            "0px 18px 44px rgba(0, 0, 0, 0.08), 0px 9px 22px rgba(0, 0, 0, 0.12)",
            "0px 20px 48px rgba(0, 0, 0, 0.08), 0px 10px 24px rgba(0, 0, 0, 0.12)",
            "0px 22px 52px rgba(0, 0, 0, 0.08), 0px 11px 26px rgba(0, 0, 0, 0.12)",
            "0px 24px 56px rgba(0, 0, 0, 0.08), 0px 12px 28px rgba(0, 0, 0, 0.12)",
            "0px 26px 60px rgba(0, 0, 0, 0.08), 0px 13px 30px rgba(0, 0, 0, 0.12)",
            "0px 28px 64px rgba(0, 0, 0, 0.08), 0px 14px 32px rgba(0, 0, 0, 0.12)",
            "0px 30px 68px rgba(0, 0, 0, 0.08), 0px 15px 34px rgba(0, 0, 0, 0.12)",
            "0px 32px 72px rgba(0, 0, 0, 0.08), 0px 16px 36px rgba(0, 0, 0, 0.12)",
            "0px 34px 76px rgba(0, 0, 0, 0.08), 0px 17px 38px rgba(0, 0, 0, 0.12)",
            "0px 36px 80px rgba(0, 0, 0, 0.08), 0px 18px 40px rgba(0, 0, 0, 0.12)",
            "0px 38px 84px rgba(0, 0, 0, 0.08), 0px 19px 42px rgba(0, 0, 0, 0.12)",
            "0px 40px 88px rgba(0, 0, 0, 0.08), 0px 20px 44px rgba(0, 0, 0, 0.12)",
            "0px 42px 92px rgba(0, 0, 0, 0.08), 0px 21px 46px rgba(0, 0, 0, 0.12)",
            "0px 44px 96px rgba(0, 0, 0, 0.08), 0px 22px 48px rgba(0, 0, 0, 0.12)"
        ]
    }));
    return /*#__PURE__*/ jsxs(Styles.ThemeProvider, {
        theme: theme,
        children: [
            /*#__PURE__*/ jsx(Styles.CssBaseline, {}),
            /*#__PURE__*/ jsx(Material.Container, {
                maxWidth: "lg",
                sx: {
                    py: 4
                },
                children: /*#__PURE__*/ jsxs(Material.Box, {
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    children: [
                        /*#__PURE__*/ jsxs(Material.Box, {
                            children: [
                                /*#__PURE__*/ jsxs(Material.Box, {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mb: 2,
                                    children: [
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            component: "img",
                                            src: "apple-touch-icon.png",
                                            alt: "mui-flexy logo",
                                            sx: {
                                                width: 100,
                                                height: 100
                                            }
                                        }),
                                        /*#__PURE__*/ jsxs(Material.Typography, {
                                            variant: "h4",
                                            component: "h1",
                                            children: [
                                                currentVersion.label,
                                                " + mui-flexy"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs(Material.Typography, {
                                    variant: "h6",
                                    color: "text.secondary",
                                    gutterBottom: true,
                                    children: [
                                        "Compatible with @mui/material v",
                                        currentVersion.version
                                    ]
                                }),
                                /*#__PURE__*/ jsx(Material.Box, {
                                    sx: {
                                        mt: 1,
                                        mb: 2,
                                        p: 2,
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: 1,
                                        borderLeft: "4px solid #007FFF"
                                    },
                                    children: /*#__PURE__*/ jsxs(Material.Typography, {
                                        variant: "body2",
                                        sx: {
                                            fontStyle: "italic",
                                            color: "text.secondary"
                                        },
                                        children: [
                                            "Getting started? Check out the",
                                            " ",
                                            /*#__PURE__*/ jsxs(Material.Link, {
                                                href: "https://github.com/brandonscript/mui-flexy#getting-started",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                color: "primary",
                                                sx: {
                                                    fontStyle: "normal",
                                                    fontWeight: 600
                                                },
                                                children: [
                                                    "README ",
                                                    /*#__PURE__*/ jsx(HiOutlineExternalLink, {
                                                        size: 16,
                                                        style: {
                                                            verticalAlign: "text-bottom"
                                                        }
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ jsxs(Material.Typography, {
                                    variant: "body1",
                                    component: "div",
                                    sx: {
                                        mt: 2
                                    },
                                    children: [
                                        "mui-flexy extends MUI's Box and Grid components to allow you to easily align and distribute flexbox items in a space in a way that doesn't make you want to pull your hair out trying to remember whether to use",
                                        /*#__PURE__*/ jsx(DemoCode, {
                                            inline: true,
                                            children: "justify-content"
                                        }),
                                        " or ",
                                        /*#__PURE__*/ jsx(DemoCode, {
                                            inline: true,
                                            children: "align-items"
                                        }),
                                        ". Using a simple and consistent x, y coordinate system, you can stop worrying about the CSS working group's choices and get on with your life of centering divs and building forms.",
                                        /*#__PURE__*/ jsx("br", {}),
                                        /*#__PURE__*/ jsx("br", {}),
                                        "Simply use ",
                                        /*#__PURE__*/ jsx(DemoCode, {
                                            inline: true,
                                            children: "<FlexBox />"
                                        }),
                                        " or",
                                        " ",
                                        /*#__PURE__*/ jsx(DemoCode, {
                                            inline: true,
                                            children: "<".concat(version === "v6" ? "FlexGrid2" : "FlexGrid", " />")
                                        }),
                                        " as you would Box or Grid. The default axis is ",
                                        /*#__PURE__*/ jsx(DemoCode, {
                                            inline: true,
                                            children: "row"
                                        }),
                                        ", but for good hygiene, you might want to set",
                                        " ",
                                        /*#__PURE__*/ jsx(DemoCode, {
                                            inline: true,
                                            children: "row"
                                        }),
                                        " anyway. If you want a column, just pass a",
                                        " ",
                                        /*#__PURE__*/ jsx(DemoCode, {
                                            inline: true,
                                            children: "column"
                                        }),
                                        " prop."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx(Material.Box, {
                            sx: {
                                borderBottom: 1,
                                borderColor: "divider"
                            },
                            children: /*#__PURE__*/ jsxs(Material.Tabs, {
                                value: selectedTab,
                                onChange: function(_, newValue) {
                                    return setSelectedTab(newValue);
                                },
                                role: "tablist",
                                children: [
                                    /*#__PURE__*/ jsx(Material.Tab, {
                                        label: "FlexBox",
                                        role: "tab"
                                    }),
                                    /*#__PURE__*/ jsx(Material.Tab, {
                                        label: "FlexGrid",
                                        role: "tab",
                                        sx: {
                                            display: version === "v6" ? "none" : "flex"
                                        }
                                    }),
                                    /*#__PURE__*/ jsx(Material.Tab, {
                                        label: "FlexGrid2",
                                        role: "tab",
                                        sx: {
                                            display: version === "v6" ? "flex" : "none"
                                        }
                                    })
                                ]
                            })
                        }),
                        selectedTab === 0 && /*#__PURE__*/ jsxs(Material.Paper, {
                            elevation: 2,
                            sx: {
                                p: 3
                            },
                            children: [
                                /*#__PURE__*/ jsx(Material.Typography, {
                                    variant: "h5",
                                    component: "h2",
                                    gutterBottom: true,
                                    children: FLEXBOX_TAB_TITLE
                                }),
                                /*#__PURE__*/ jsxs(Material.Box, {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    mb: 3,
                                    alignItems: "flex-end",
                                    children: [
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 140
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "X alignment"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexBoxProps.x,
                                                        label: "X alignment",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexBoxProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    x: e.target.value
                                                                });
                                                            });
                                                        },
                                                        children: xOptions.map(function(option) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: option.value,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: option.label
                                                            }, option.value);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 140
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "Y alignment"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexBoxProps.y,
                                                        label: "Y alignment",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexBoxProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    y: e.target.value
                                                                });
                                                            });
                                                        },
                                                        children: yOptions.map(function(option) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: option.value,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: option.label
                                                            }, option.value);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 140
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem",
                                                            color: "rgba(0, 0, 0, 0.6)",
                                                            pointerEvents: "none",
                                                            zIndex: 1,
                                                            backgroundColor: "transparent"
                                                        },
                                                        children: "Direction"
                                                    }),
                                                    /*#__PURE__*/ jsxs(Material.Box, {
                                                        sx: {
                                                            display: "flex",
                                                            gap: 0.5,
                                                            alignItems: "center",
                                                            height: 32,
                                                            mt: 0
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ jsx(Material.FormControlLabel, {
                                                                control: /*#__PURE__*/ jsx(Material.Radio, {
                                                                    size: "small",
                                                                    checked: direction === "row",
                                                                    onChange: function() {
                                                                        console.log("Row radio clicked");
                                                                        setDirection("row");
                                                                    },
                                                                    value: "row"
                                                                }),
                                                                label: "row",
                                                                sx: {
                                                                    "& .MuiFormControlLabel-label": {
                                                                        fontSize: "0.875rem"
                                                                    },
                                                                    margin: 0
                                                                }
                                                            }),
                                                            /*#__PURE__*/ jsx(Material.FormControlLabel, {
                                                                control: /*#__PURE__*/ jsx(Material.Radio, {
                                                                    size: "small",
                                                                    checked: direction === "column",
                                                                    onChange: function() {
                                                                        console.log("Column radio clicked");
                                                                        setDirection("column");
                                                                    },
                                                                    value: "column"
                                                                }),
                                                                label: "column",
                                                                sx: {
                                                                    "& .MuiFormControlLabel-label": {
                                                                        fontSize: "0.875rem"
                                                                    },
                                                                    margin: 0
                                                                }
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                height: 32,
                                                display: "flex",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ jsx(Material.FormControlLabel, {
                                                control: /*#__PURE__*/ jsx(Material.Switch, {
                                                    size: "small",
                                                    checked: Boolean(flexBoxProps.nowrap),
                                                    onChange: function(e) {
                                                        return setFlexBoxProps(function(prev) {
                                                            return _object_spread_props(_object_spread({}, prev), {
                                                                nowrap: e.target.checked
                                                            });
                                                        });
                                                    }
                                                }),
                                                label: "nowrap",
                                                sx: {
                                                    "& .MuiFormControlLabel-label": {
                                                        fontSize: "0.875rem"
                                                    },
                                                    margin: 0,
                                                    height: "100%",
                                                    alignItems: "center"
                                                }
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                height: 32,
                                                display: "flex",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ jsx(Material.FormControlLabel, {
                                                control: /*#__PURE__*/ jsx(Material.Switch, {
                                                    size: "small",
                                                    checked: Boolean(flexBoxProps.reverse),
                                                    onChange: function(e) {
                                                        return setFlexBoxProps(function(prev) {
                                                            return _object_spread_props(_object_spread({}, prev), {
                                                                reverse: e.target.checked
                                                            });
                                                        });
                                                    }
                                                }),
                                                label: "reverse",
                                                sx: {
                                                    "& .MuiFormControlLabel-label": {
                                                        fontSize: "0.875rem"
                                                    },
                                                    margin: 0,
                                                    height: "100%",
                                                    alignItems: "center"
                                                }
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx(DemoCode, {
                                    code: generateFlexBoxCode()
                                }),
                                /*#__PURE__*/ jsxs(FlexBoxInner, {
                                    "data-testid": "demo-flexbox",
                                    x: flexBoxProps.x,
                                    y: flexBoxProps.y,
                                    row: flexBoxProps.row,
                                    column: flexBoxProps.column,
                                    nowrap: flexBoxProps.nowrap,
                                    reverse: flexBoxProps.reverse,
                                    children: [
                                        /*#__PURE__*/ jsx("span", {
                                            children: isColumn ? columnEmoji : rowEmoji
                                        }),
                                        /*#__PURE__*/ jsx("span", {
                                            children: isColumn ? columnEmoji : rowEmoji
                                        }),
                                        /*#__PURE__*/ jsx("span", {
                                            children: isColumn ? columnEmoji : rowEmoji
                                        }),
                                        /*#__PURE__*/ jsx("span", {
                                            children: isColumn ? columnEmoji : "🚤"
                                        })
                                    ]
                                })
                            ]
                        }),
                        selectedTab === 1 && version !== "v6" && /*#__PURE__*/ jsxs(Material.Paper, {
                            elevation: 2,
                            sx: {
                                p: 3
                            },
                            children: [
                                /*#__PURE__*/ jsx(Material.Typography, {
                                    variant: "h5",
                                    component: "h2",
                                    gutterBottom: true,
                                    children: FLEXGRID_TAB_TITLE
                                }),
                                /*#__PURE__*/ jsxs(Material.Box, {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    mb: 2,
                                    alignItems: "flex-end",
                                    children: [
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 110
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "Rows"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridProps.rows,
                                                        label: "Rows",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    rows: Number(e.target.value)
                                                                });
                                                            });
                                                        },
                                                        children: Array.from({
                                                            length: 5
                                                        }, function(_, i) {
                                                            return i + 1;
                                                        }).map(function(num) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: num,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: num
                                                            }, num);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 110
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "Columns"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridProps.columns,
                                                        label: "Columns",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    columns: Number(e.target.value)
                                                                });
                                                            });
                                                        },
                                                        children: Array.from({
                                                            length: 5
                                                        }, function(_, i) {
                                                            return i + 1;
                                                        }).map(function(num) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: num,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: num
                                                            }, num);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 110
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "Spacing"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridProps.spacing,
                                                        label: "Spacing",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    spacing: Number(e.target.value)
                                                                });
                                                            });
                                                        },
                                                        children: [
                                                            0,
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5
                                                        ].map(function(num) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: num,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: num
                                                            }, num);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                height: 32,
                                                display: "flex",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ jsx(Material.FormControlLabel, {
                                                control: /*#__PURE__*/ jsx(Material.Switch, {
                                                    size: "small",
                                                    checked: flexGridProps.useTemplate,
                                                    onChange: function(e) {
                                                        return setFlexGridProps(function(prev) {
                                                            return _object_spread_props(_object_spread({}, prev), {
                                                                useTemplate: e.target.checked
                                                            });
                                                        });
                                                    }
                                                }),
                                                label: "Use grid template",
                                                sx: {
                                                    "& .MuiFormControlLabel-label": {
                                                        fontSize: "0.875rem"
                                                    },
                                                    margin: 0,
                                                    height: "100%",
                                                    alignItems: "center"
                                                }
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs(Material.Box, {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    mb: 3,
                                    alignItems: "flex-end",
                                    children: [
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 140
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "X alignment"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridItemProps.x,
                                                        label: "X alignment",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridItemProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    x: e.target.value
                                                                });
                                                            });
                                                        },
                                                        children: xRowOptions.map(function(option) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: option.value,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: option.label
                                                            }, option.value);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 140
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "Y alignment"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridItemProps.y,
                                                        label: "Y alignment",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridItemProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    y: e.target.value
                                                                });
                                                            });
                                                        },
                                                        children: yRowOptions.map(function(option) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: option.value,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: option.label
                                                            }, option.value);
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx(DemoCode, {
                                    code: generateFlexGridCode()
                                }),
                                flexGridProps.useTemplate ? /*#__PURE__*/ jsx(FlexGridDemo, {
                                    sx: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                        gridGap: flexGridProps.spacing
                                    },
                                    children: renderFlexGridItems()
                                }) : /*#__PURE__*/ jsx(FlexGridDemo, {
                                    container: true,
                                    spacing: flexGridProps.spacing,
                                    children: renderFlexGridItems()
                                })
                            ]
                        }),
                        selectedTab === 2 && version === "v6" && FlexGrid2Demo && /*#__PURE__*/ jsxs(Material.Paper, {
                            elevation: 2,
                            sx: {
                                p: 3
                            },
                            children: [
                                /*#__PURE__*/ jsx(Material.Typography, {
                                    variant: "h5",
                                    component: "h2",
                                    gutterBottom: true,
                                    children: FLEXGRID2_TAB_TITLE
                                }),
                                /*#__PURE__*/ jsxs(Material.Box, {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    mb: 2,
                                    alignItems: "flex-end",
                                    children: [
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 110
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "Rows"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridProps.rows,
                                                        label: "Rows",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    rows: Number(e.target.value)
                                                                });
                                                            });
                                                        },
                                                        children: Array.from({
                                                            length: 5
                                                        }, function(_, i) {
                                                            return i + 1;
                                                        }).map(function(num) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: num,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: num
                                                            }, num);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 110
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "Columns"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridProps.columns,
                                                        label: "Columns",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    columns: Number(e.target.value)
                                                                });
                                                            });
                                                        },
                                                        children: Array.from({
                                                            length: 5
                                                        }, function(_, i) {
                                                            return i + 1;
                                                        }).map(function(num) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: num,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: num
                                                            }, num);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 110
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "Spacing"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridProps.spacing,
                                                        label: "Spacing",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    spacing: Number(e.target.value)
                                                                });
                                                            });
                                                        },
                                                        children: [
                                                            0,
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5
                                                        ].map(function(num) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: num,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: num
                                                            }, num);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                height: 32,
                                                display: "flex",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ jsx(Material.FormControlLabel, {
                                                control: /*#__PURE__*/ jsx(Material.Switch, {
                                                    size: "small",
                                                    checked: flexGridProps.useTemplate,
                                                    onChange: function(e) {
                                                        return setFlexGridProps(function(prev) {
                                                            return _object_spread_props(_object_spread({}, prev), {
                                                                useTemplate: e.target.checked
                                                            });
                                                        });
                                                    }
                                                }),
                                                label: "Use grid template",
                                                sx: {
                                                    "& .MuiFormControlLabel-label": {
                                                        fontSize: "0.875rem"
                                                    },
                                                    margin: 0,
                                                    height: "100%",
                                                    alignItems: "center"
                                                }
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs(Material.Box, {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    mb: 3,
                                    alignItems: "flex-end",
                                    children: [
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 140
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "X alignment"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridItemProps.x,
                                                        label: "X alignment",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridItemProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    x: e.target.value
                                                                });
                                                            });
                                                        },
                                                        children: xRowOptions.map(function(option) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: option.value,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: option.label
                                                            }, option.value);
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Material.Box, {
                                            sx: {
                                                minWidth: 140
                                            },
                                            children: /*#__PURE__*/ jsxs(Material.FormControl, {
                                                fullWidth: true,
                                                size: "small",
                                                margin: "none",
                                                children: [
                                                    /*#__PURE__*/ jsx(Material.InputLabel, {
                                                        sx: {
                                                            fontSize: "0.875rem"
                                                        },
                                                        children: "Y alignment"
                                                    }),
                                                    /*#__PURE__*/ jsx(Material.Select, {
                                                        value: flexGridItemProps.y,
                                                        label: "Y alignment",
                                                        sx: {
                                                            height: 32,
                                                            "& .MuiSelect-select": {
                                                                padding: "6px 12px",
                                                                fontSize: "0.875rem"
                                                            }
                                                        },
                                                        onChange: function(e) {
                                                            return setFlexGridItemProps(function(prev) {
                                                                return _object_spread_props(_object_spread({}, prev), {
                                                                    y: e.target.value
                                                                });
                                                            });
                                                        },
                                                        children: yRowOptions.map(function(option) {
                                                            return /*#__PURE__*/ jsx(Material.MenuItem, {
                                                                value: option.value,
                                                                dense: true,
                                                                sx: {
                                                                    fontSize: "0.875rem",
                                                                    minHeight: 32,
                                                                    padding: "4px 12px"
                                                                },
                                                                children: option.label
                                                            }, option.value);
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx(DemoCode, {
                                    code: generateFlexGridCode()
                                }),
                                flexGridProps.useTemplate ? /*#__PURE__*/ jsx(FlexGrid2Demo, {
                                    sx: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                        gridGap: flexGridProps.spacing
                                    },
                                    children: renderFlexGridItems()
                                }) : /*#__PURE__*/ jsx(FlexGrid2Demo, {
                                    container: true,
                                    spacing: flexGridProps.spacing,
                                    children: renderFlexGridItems()
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
// Preload all versions function
var preloadAllVersions = function() {
    return _async_to_generator(function() {
        var versionsList, preloadPromises, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    versionsList = [
                        "v5",
                        "v6",
                        "v7"
                    ];
                    // Start loading all versions simultaneously
                    preloadPromises = versionsList.map(function(version) {
                        return _async_to_generator(function() {
                            var Styles, _ref, Material, FlexComponents, _Material_default, _Material_default1, StylesModule, SystemModule, MaterialModule, SystemModuleResolved, simpleStyled, librariesData, err;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        // Skip if already cached
                                        if (libraryCache[version]) return [
                                            2,
                                            libraryCache[version]
                                        ];
                                        // Skip if already loading
                                        if (loadingPromises[version]) return [
                                            2,
                                            loadingPromises[version]
                                        ];
                                        _state.label = 1;
                                    case 1:
                                        _state.trys.push([
                                            1,
                                            7,
                                            ,
                                            8
                                        ]);
                                        return [
                                            4,
                                            Promise.all([
                                                import("@mui/material_".concat(version)),
                                                import("@mui-flexy/".concat(version))
                                            ])
                                        ];
                                    case 2:
                                        _ref = _sliced_to_array.apply(void 0, [
                                            _state.sent(),
                                            2
                                        ]), Material = _ref[0], FlexComponents = _ref[1];
                                        if (!(version === "v5")) return [
                                            3,
                                            4
                                        ];
                                        return [
                                            4,
                                            import("@mui/styles_".concat(version))
                                        ];
                                    case 3:
                                        StylesModule = _state.sent();
                                        Styles = _object_spread_props(_object_spread({}, StylesModule.default || StylesModule), {
                                            createTheme: Material.createTheme || ((_Material_default = Material.default) === null || _Material_default === void 0 ? void 0 : _Material_default.createTheme),
                                            responsiveFontSizes: (StylesModule.default || StylesModule).responsiveFontSizes || function(theme) {
                                                return theme;
                                            },
                                            ThemeProvider: (StylesModule.default || StylesModule).ThemeProvider,
                                            CssBaseline: Material.CssBaseline || ((_Material_default1 = Material.default) === null || _Material_default1 === void 0 ? void 0 : _Material_default1.CssBaseline)
                                        });
                                        return [
                                            3,
                                            6
                                        ];
                                    case 4:
                                        return [
                                            4,
                                            import("@mui/system_".concat(version))
                                        ];
                                    case 5:
                                        SystemModule = _state.sent();
                                        MaterialModule = Material.default || Material;
                                        SystemModuleResolved = SystemModule.default || SystemModule;
                                        // Create a simple styled function that just applies sx props
                                        simpleStyled = function(Component) {
                                            return function(styles) {
                                                return function(props) {
                                                    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, props), {
                                                        sx: _object_spread({}, styles, props.sx)
                                                    }));
                                                };
                                            };
                                        };
                                        Styles = {
                                            styled: simpleStyled,
                                            createTheme: MaterialModule.createTheme,
                                            responsiveFontSizes: function(theme) {
                                                return theme;
                                            },
                                            ThemeProvider: SystemModuleResolved.ThemeProvider,
                                            CssBaseline: MaterialModule.CssBaseline
                                        };
                                        _state.label = 6;
                                    case 6:
                                        librariesData = {
                                            Material: Material.default || Material,
                                            Styles: Styles,
                                            FlexBox: FlexComponents.FlexBox,
                                            FlexGrid: FlexComponents.FlexGrid
                                        };
                                        // Only add FlexGrid2 for v6
                                        if (version === "v6") {
                                            librariesData.FlexGrid2 = FlexComponents.FlexGrid2;
                                        }
                                        // Cache the libraries
                                        libraryCache[version] = librariesData;
                                        return [
                                            2,
                                            librariesData
                                        ];
                                    case 7:
                                        err = _state.sent();
                                        console.error("Error preloading libraries for ".concat(version, ":"), err);
                                        throw err;
                                    case 8:
                                        return [
                                            2
                                        ];
                                }
                            });
                        })();
                    });
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        Promise.all(preloadPromises)
                    ];
                case 2:
                    _state.sent();
                    return [
                        3,
                        4
                    ];
                case 3:
                    err = _state.sent();
                    console.error("Error preloading some versions:", err);
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    })();
};
var App = function() {
    var _useState = _sliced_to_array(useState("v7"), 2), selectedVersion = _useState[0], setSelectedVersion = _useState[1];
    var _useState1 = _sliced_to_array(useState(null), 2), headerLibraries = _useState1[0], setHeaderLibraries = _useState1[1];
    var _useState2 = _sliced_to_array(useState(true), 2), appLoading = _useState2[0], setAppLoading = _useState2[1];
    useEffect(function() {
        var loadAppWithPreloading = function() {
            return _async_to_generator(function() {
                var loadingStartTime, _ref, Material, System, loadingDuration, minLoadingTime, err, loadingDuration1, minLoadingTime1;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            // Track loading start time for minimum display duration
                            loadingStartTime = Date.now();
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                5,
                                8,
                                9
                            ]);
                            return [
                                4,
                                Promise.all([
                                    import('@mui/material_v7'),
                                    import('@mui/system_v7')
                                ])
                            ];
                        case 2:
                            _ref = _sliced_to_array.apply(void 0, [
                                _state.sent(),
                                2
                            ]), Material = _ref[0], System = _ref[1];
                            setHeaderLibraries({
                                Material: Material.default || Material,
                                Styles: {
                                    createTheme: Material.createTheme,
                                    ThemeProvider: System.ThemeProvider
                                }
                            });
                            // Start preloading all versions in parallel (this will continue in background)
                            preloadAllVersions();
                            // Ensure loading is displayed for at least 500ms
                            loadingDuration = Date.now() - loadingStartTime;
                            minLoadingTime = 500; // 500ms
                            if (!(loadingDuration < minLoadingTime)) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                new Promise(function(resolve) {
                                    return setTimeout(resolve, minLoadingTime - loadingDuration);
                                })
                            ];
                        case 3:
                            _state.sent();
                            _state.label = 4;
                        case 4:
                            return [
                                3,
                                9
                            ];
                        case 5:
                            err = _state.sent();
                            console.error("Error loading application:", err);
                            // Ensure loading is displayed for at least 500ms even on error
                            loadingDuration1 = Date.now() - loadingStartTime;
                            minLoadingTime1 = 500; // 500ms
                            if (!(loadingDuration1 < minLoadingTime1)) return [
                                3,
                                7
                            ];
                            return [
                                4,
                                new Promise(function(resolve) {
                                    return setTimeout(resolve, minLoadingTime1 - loadingDuration1);
                                })
                            ];
                        case 6:
                            _state.sent();
                            _state.label = 7;
                        case 7:
                            return [
                                3,
                                9
                            ];
                        case 8:
                            setAppLoading(false);
                            return [
                                7
                            ];
                        case 9:
                            return [
                                2
                            ];
                    }
                });
            })();
        };
        loadAppWithPreloading();
    }, []);
    if (appLoading || !headerLibraries) {
        return /*#__PURE__*/ jsx(LoadingComponent, {
            message: "Loading application..."
        });
    }
    var Material = headerLibraries.Material, Styles = headerLibraries.Styles;
    // Create header theme with the same typography and softened shadows
    var headerTheme = Styles.createTheme({
        palette: {
            primary: {
                main: "#007FFF"
            }
        },
        typography: {
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Inter"',
                '"San Francisco"',
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(",")
        },
        shadows: [
            "none",
            "0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.12)",
            "0px 2px 6px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.12)",
            "0px 3px 12px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.12)",
            "0px 4px 16px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12)",
            "0px 6px 20px rgba(0, 0, 0, 0.08), 0px 3px 10px rgba(0, 0, 0, 0.12)",
            "0px 8px 24px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(0, 0, 0, 0.12)",
            "0px 10px 28px rgba(0, 0, 0, 0.08), 0px 5px 14px rgba(0, 0, 0, 0.12)",
            "0px 12px 32px rgba(0, 0, 0, 0.08), 0px 6px 16px rgba(0, 0, 0, 0.12)",
            "0px 14px 36px rgba(0, 0, 0, 0.08), 0px 7px 18px rgba(0, 0, 0, 0.12)",
            "0px 16px 40px rgba(0, 0, 0, 0.08), 0px 8px 20px rgba(0, 0, 0, 0.12)",
            "0px 18px 44px rgba(0, 0, 0, 0.08), 0px 9px 22px rgba(0, 0, 0, 0.12)",
            "0px 20px 48px rgba(0, 0, 0, 0.08), 0px 10px 24px rgba(0, 0, 0, 0.12)",
            "0px 22px 52px rgba(0, 0, 0, 0.08), 0px 11px 26px rgba(0, 0, 0, 0.12)",
            "0px 24px 56px rgba(0, 0, 0, 0.08), 0px 12px 28px rgba(0, 0, 0, 0.12)",
            "0px 26px 60px rgba(0, 0, 0, 0.08), 0px 13px 30px rgba(0, 0, 0, 0.12)",
            "0px 28px 64px rgba(0, 0, 0, 0.08), 0px 14px 32px rgba(0, 0, 0, 0.12)",
            "0px 30px 68px rgba(0, 0, 0, 0.08), 0px 15px 34px rgba(0, 0, 0, 0.12)",
            "0px 32px 72px rgba(0, 0, 0, 0.08), 0px 16px 36px rgba(0, 0, 0, 0.12)",
            "0px 34px 76px rgba(0, 0, 0, 0.08), 0px 17px 38px rgba(0, 0, 0, 0.12)",
            "0px 36px 80px rgba(0, 0, 0, 0.08), 0px 18px 40px rgba(0, 0, 0, 0.12)",
            "0px 38px 84px rgba(0, 0, 0, 0.08), 0px 19px 42px rgba(0, 0, 0, 0.12)",
            "0px 40px 88px rgba(0, 0, 0, 0.08), 0px 20px 44px rgba(0, 0, 0, 0.12)",
            "0px 42px 92px rgba(0, 0, 0, 0.08), 0px 21px 46px rgba(0, 0, 0, 0.12)",
            "0px 44px 96px rgba(0, 0, 0, 0.08), 0px 22px 48px rgba(0, 0, 0, 0.12)"
        ]
    });
    return /*#__PURE__*/ jsx(Styles.ThemeProvider, {
        theme: headerTheme,
        children: /*#__PURE__*/ jsxs("div", {
            children: [
                /*#__PURE__*/ jsx(Material.AppBar, {
                    position: "sticky",
                    color: "default",
                    elevation: 1,
                    "data-testid": "app-bar",
                    sx: {
                        top: 0,
                        zIndex: 1100
                    },
                    children: /*#__PURE__*/ jsxs(Material.Toolbar, {
                        children: [
                            /*#__PURE__*/ jsx(Material.Box, {
                                component: "img",
                                src: "apple-touch-icon.png",
                                alt: "mui-flexy logo",
                                sx: {
                                    width: 28,
                                    height: 28,
                                    filter: "grayscale(100%) brightness(1.4)",
                                    mr: 1
                                }
                            }),
                            /*#__PURE__*/ jsx(Material.Typography, {
                                component: "h2",
                                variant: "h6",
                                sx: {
                                    flexGrow: 1,
                                    color: "text.disabled"
                                },
                                children: "docs"
                            }),
                            versions.map(function(version) {
                                return /*#__PURE__*/ jsx(Material.Button, {
                                    color: selectedVersion === version.key ? "primary" : "inherit",
                                    onClick: function() {
                                        return setSelectedVersion(version.key);
                                    },
                                    sx: {
                                        mx: 0.5,
                                        fontWeight: selectedVersion === version.key ? "bold" : "normal"
                                    },
                                    children: version.label
                                }, version.key);
                            }),
                            /*#__PURE__*/ jsx(Material.IconButton, {
                                component: "a",
                                href: "https://github.com/brandonscript/mui-flexy",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                color: "inherit",
                                sx: {
                                    ml: 1
                                },
                                "aria-label": "View source on GitHub",
                                children: /*#__PURE__*/ jsx(FaGithub, {})
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx(VersionContent, {
                    version: selectedVersion
                })
            ]
        })
    });
};

export { FLEXBOX_TAB_TITLE, FLEXGRID2_TAB_TITLE, FLEXGRID_TAB_TITLE, App as default };
//# sourceMappingURL=docs.js.map
