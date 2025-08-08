import React, { useState, useEffect, useMemo } from 'react';

const FLEXBOX_TAB_TITLE = "Interactive FlexBox sandbox";
const FLEXGRID_TAB_TITLE = "Interactive FlexGrid sandbox";
const FLEXGRID2_TAB_TITLE = "Interactive FlexGrid2 sandbox";
// Code display component with proper styling
const DemoCode = ({ inline = false, code, children })=>{
    const content = children?.toString() || code || "";
    if (inline) {
        return /*#__PURE__*/ React.createElement("code", {
            style: {
                backgroundColor: "#f5f5f5",
                padding: "2px 4px",
                borderRadius: "4px",
                fontSize: "0.875rem",
                fontFamily: "Consolas, Monaco, 'Courier New', monospace",
                color: "#24292f"
            }
        }, content);
    }
    return /*#__PURE__*/ React.createElement("pre", {
        style: {
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            margin: "16px 0",
            fontSize: "0.875rem",
            fontFamily: "Consolas, Monaco, 'Courier New', monospace",
            padding: "10px",
            overflowX: "auto"
        }
    }, content);
};
// Demo container styling
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const createDemoInner = (FlexBox, styled)=>styled(FlexBox)({
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
// FlexGrid demo styling
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const createFlexGridDemo = (FlexGrid, styled)=>styled(FlexGrid)({
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
// Version configurations
const versions = [
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
const LoadingComponent = ({ message })=>/*#__PURE__*/ React.createElement("div", {
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
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: {
            width: "60px",
            height: "4px",
            backgroundColor: "#007FFF",
            borderRadius: "2px",
            animation: "loading-bar 1.5s ease-in-out infinite"
        }
    }), /*#__PURE__*/ React.createElement("style", null, `
      @keyframes loading-bar {
        0% { transform: scaleX(0); }
        50% { transform: scaleX(1); }
        100% { transform: scaleX(0); }
      }
    `));
// Complete alignment options based on the core types
const xRowOptions = [
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
const yRowOptions = [
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
const xColumnOptions = [
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
const yColumnOptions = [
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
const rowEmoji = "🚣";
const columnEmoji = "🏛";
// Global cache for loaded libraries
const libraryCache = {};
const loadingPromises = {};
// Lazy loading component for each version
const VersionContent = ({ version })=>{
    const [libraries, setLibraries] = useState(libraryCache[version] || null);
    const [loading, setLoading] = useState(!libraryCache[version]);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const loadLibraries = async ()=>{
            // If libraries are already cached, use them immediately
            if (libraryCache[version]) {
                setLibraries(libraryCache[version]);
                setLoading(false);
                return;
            }
            // If there's already a loading promise for this version, wait for it
            if (loadingPromises[version]) {
                try {
                    const cachedLibraries = await loadingPromises[version];
                    setLibraries(cachedLibraries);
                    setLoading(false);
                    return;
                } catch (err) {
                    setError(`Failed to load libraries for ${version}`);
                    setLoading(false);
                    return;
                }
            }
            // Track loading start time for minimum display duration
            const loadingStartTime = Date.now();
            try {
                setLoading(true);
                setError(null);
                // Create loading promise and store it
                const loadingPromise = (async ()=>{
                    // Load all required libraries for this version
                    let Styles;
                    const [Material, FlexComponents] = await Promise.all([
                        import(`@mui/material_${version}`),
                        import(`@mui-flexy/${version}`)
                    ]);
                    // Handle different styling approaches per version
                    if (version === "v5") {
                        const StylesModule = await import(`@mui/styles_${version}`);
                        Styles = {
                            ...StylesModule.default || StylesModule,
                            createTheme: Material.createTheme || Material.default?.createTheme,
                            responsiveFontSizes: (StylesModule.default || StylesModule).responsiveFontSizes || ((theme)=>theme),
                            ThemeProvider: (StylesModule.default || StylesModule).ThemeProvider,
                            CssBaseline: Material.CssBaseline || Material.default?.CssBaseline
                        };
                    } else {
                        // v6 and v7 use @mui/system for styling
                        const SystemModule = await import(`@mui/system_${version}`);
                        const MaterialModule = Material.default || Material;
                        const SystemModuleResolved = SystemModule.default || SystemModule;
                        // Create a simple styled function that just applies sx props
                        const simpleStyled = (Component)=>(styles)=>{
                                return (props)=>/*#__PURE__*/ React.createElement(Component, {
                                        ...props,
                                        sx: {
                                            ...styles,
                                            ...props.sx
                                        }
                                    });
                            };
                        Styles = {
                            styled: simpleStyled,
                            createTheme: MaterialModule.createTheme,
                            responsiveFontSizes: (theme)=>theme,
                            ThemeProvider: SystemModuleResolved.ThemeProvider,
                            CssBaseline: MaterialModule.CssBaseline
                        };
                    }
                    const librariesData = {
                        Material: Material.default || Material,
                        Styles,
                        FlexBox: FlexComponents.FlexBox,
                        FlexGrid: FlexComponents.FlexGrid
                    };
                    // Only add FlexGrid2 for v6
                    if (version === "v6") {
                        librariesData.FlexGrid2 = FlexComponents.FlexGrid2;
                    }
                    // Cache the libraries
                    libraryCache[version] = librariesData;
                    return librariesData;
                })();
                loadingPromises[version] = loadingPromise;
                const librariesData = await loadingPromise;
                setLibraries(librariesData);
                // Ensure loading is displayed for at least 500ms
                const loadingDuration = Date.now() - loadingStartTime;
                const minLoadingTime = 500; // 500ms
                if (loadingDuration < minLoadingTime) {
                    await new Promise((resolve)=>setTimeout(resolve, minLoadingTime - loadingDuration));
                }
            } catch (err) {
                console.error(`Error loading libraries for ${version}:`, err);
                setError(`Failed to load libraries for ${version}`);
                // Ensure loading is displayed for at least 500ms even on error
                const loadingDuration = Date.now() - loadingStartTime;
                const minLoadingTime = 500; // 500ms
                if (loadingDuration < minLoadingTime) {
                    await new Promise((resolve)=>setTimeout(resolve, minLoadingTime - loadingDuration));
                }
            } finally{
                setLoading(false);
                // Clean up loading promise
                delete loadingPromises[version];
            }
        };
        loadLibraries();
    }, [
        version
    ]);
    if (loading) {
        return /*#__PURE__*/ React.createElement(LoadingComponent, {
            message: "Loading modules..."
        });
    }
    if (error) {
        return /*#__PURE__*/ React.createElement("div", {
            style: {
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                backgroundColor: "#fafafa"
            }
        }, /*#__PURE__*/ React.createElement("div", {
            style: {
                padding: "24px",
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "400px",
                width: "90%",
                border: "1px solid #ffcdd2"
            }
        }, /*#__PURE__*/ React.createElement("div", {
            style: {
                fontSize: "16px",
                color: "#d32f2f",
                fontWeight: 500,
                marginBottom: "8px"
            }
        }, "Error Loading ", version.toUpperCase()), /*#__PURE__*/ React.createElement("div", {
            style: {
                fontSize: "14px",
                color: "#666",
                fontWeight: 400
            }
        }, error)));
    }
    if (!libraries) {
        return /*#__PURE__*/ React.createElement("div", {
            style: {
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                backgroundColor: "#fafafa"
            }
        }, /*#__PURE__*/ React.createElement("div", {
            style: {
                padding: "24px",
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "300px",
                width: "90%"
            }
        }, /*#__PURE__*/ React.createElement("div", {
            style: {
                fontSize: "14px",
                color: "#666",
                fontWeight: 400
            }
        }, "Libraries not loaded")));
    }
    return /*#__PURE__*/ React.createElement(VersionApp, {
        version: version,
        libraries: libraries
    });
};
// Main version-specific app component
const VersionApp = ({ version, libraries })=>{
    const { Material, Styles, FlexBox, FlexGrid, FlexGrid2 = null } = libraries;
    const [selectedTab, setSelectedTab] = useState(0);
    const [direction, setDirection] = useState("row");
    const [flexBoxProps, setFlexBoxProps] = useState({
        x: "center",
        y: "center",
        row: true,
        column: false,
        nowrap: false,
        reverse: false
    });
    const [flexGridProps, setFlexGridProps] = useState({
        rows: 2,
        columns: 3,
        spacing: 2,
        useTemplate: false
    });
    const [flexGridItemProps, setFlexGridItemProps] = useState({
        x: "left",
        y: "stretch"
    });
    // Update flexBoxProps when direction changes
    useEffect(()=>{
        setFlexBoxProps((prev)=>({
                ...prev,
                row: direction === "row",
                column: direction === "column"
            }));
    }, [
        direction
    ]);
    // Handle tab switching when version changes
    useEffect(()=>{
        // Prevent infinite loops by checking if the tab switch is actually necessary
        if (selectedTab === 2 && version !== "v6") {
            // If user is on FlexGrid2 tab (index 2) and switches to v5/v7, go to FlexGrid tab (index 1)
            console.log(`Switching from FlexGrid2 tab to FlexGrid tab for ${version}`);
            setSelectedTab(1);
        } else if (selectedTab === 1 && version === "v6") {
            // If user is on FlexGrid tab (index 1) and switches to v6, go to FlexGrid2 tab (index 2)
            console.log(`Switching from FlexGrid tab to FlexGrid2 tab for ${version}`);
            setSelectedTab(2);
        }
    }, [
        version
    ]); // Only run when version changes, not when selectedTab changes
    // Determine current options based on direction
    const isColumn = direction === "column";
    const xOptions = isColumn ? xColumnOptions : xRowOptions;
    const yOptions = isColumn ? yColumnOptions : yRowOptions;
    const currentVersion = versions.find((v)=>v.key === version);
    // Create styled components for this version (memoized to prevent re-creation on each render)
    const FlexBoxInner = useMemo(()=>createDemoInner(FlexBox, Styles.styled), [
        FlexBox,
        Styles.styled
    ]);
    const FlexGridDemo = useMemo(()=>createFlexGridDemo(FlexGrid, Styles.styled), [
        FlexGrid,
        Styles.styled
    ]);
    const FlexGrid2Demo = useMemo(()=>version === "v6" && FlexGrid2 ? createFlexGridDemo(FlexGrid2, Styles.styled) : null, [
        version,
        FlexGrid2,
        Styles.styled
    ]);
    const generateFlexBoxCode = ()=>{
        const propsArray = [];
        if (flexBoxProps.x !== "center") propsArray.push(`x="${flexBoxProps.x}"`);
        if (flexBoxProps.y !== "center") propsArray.push(`y="${flexBoxProps.y}"`);
        if (flexBoxProps.row) propsArray.push("row");
        if (flexBoxProps.column) propsArray.push("column");
        if (flexBoxProps.nowrap) propsArray.push("nowrap");
        if (flexBoxProps.reverse) propsArray.push("reverse");
        const propsString = propsArray.length > 0 ? ` ${propsArray.join(" ")}` : "";
        return `<FlexBox${propsString}>\n  <span>${isColumn ? columnEmoji : rowEmoji}</span>\n  <span>${isColumn ? columnEmoji : rowEmoji}</span>\n  <span>${isColumn ? columnEmoji : rowEmoji}</span>\n  <span>${isColumn ? columnEmoji : "🚤"}</span>\n</FlexBox>`;
    };
    const generateFlexGridCode = ()=>{
        const gridComponent = selectedTab === 2 ? "FlexGrid2" : "FlexGrid";
        const containerProps = flexGridProps.useTemplate ? `sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gridGap: ${flexGridProps.spacing} }}` : `container spacing={${flexGridProps.spacing}}`;
        const baseItemProps = selectedTab === 2 || selectedTab === 1 && version === "v7" ? `size={4}` : `item xs={4}`;
        // Add x and y props to the item props
        const itemPropsArray = [
            baseItemProps
        ];
        if (flexGridItemProps.x !== "left") itemPropsArray.push(`x="${flexGridItemProps.x}"`);
        if (flexGridItemProps.y !== "stretch") itemPropsArray.push(`y="${flexGridItemProps.y}"`);
        const itemProps = itemPropsArray.join(" ");
        return `<${gridComponent} ${containerProps}>
  <${gridComponent} ${itemProps}>
    <div className="grid-item">Grid 1</div>
  </${gridComponent}>
  <${gridComponent} ${itemProps}>
    <div className="grid-item">Grid 2</div>
  </${gridComponent}>
  <${gridComponent} ${itemProps}>
    <div className="grid-item">Grid 3</div>
  </${gridComponent}>
</${gridComponent}>`;
    };
    const renderFlexGridItems = ()=>{
        const totalItems = flexGridProps.rows * flexGridProps.columns;
        const itemSize = Math.floor(12 / flexGridProps.columns);
        return Array.from({
            length: totalItems
        }, (_, i)=>{
            // For v6 and FlexGrid2 tab (index 2)
            if (version === "v6" && selectedTab === 2 && FlexGrid2Demo) {
                return /*#__PURE__*/ React.createElement(FlexGrid2Demo, {
                    key: i,
                    size: itemSize,
                    x: flexGridItemProps.x,
                    y: flexGridItemProps.y
                }, /*#__PURE__*/ React.createElement("div", {
                    className: "grid-item"
                }, "Grid ", i + 1));
            } else if (version === "v7" && selectedTab === 1) {
                return /*#__PURE__*/ React.createElement(FlexGridDemo, {
                    key: i,
                    size: itemSize,
                    x: flexGridItemProps.x,
                    y: flexGridItemProps.y
                }, /*#__PURE__*/ React.createElement("div", {
                    className: "grid-item"
                }, "Grid ", i + 1));
            } else if (version === "v5" && selectedTab === 1) {
                return /*#__PURE__*/ React.createElement(FlexGridDemo, {
                    key: i,
                    item: true,
                    xs: itemSize,
                    x: flexGridItemProps.x,
                    y: flexGridItemProps.y
                }, /*#__PURE__*/ React.createElement("div", {
                    className: "grid-item"
                }, "Grid ", i + 1));
            } else {
                return /*#__PURE__*/ React.createElement(FlexGridDemo, {
                    key: i,
                    item: true,
                    xs: itemSize,
                    x: flexGridItemProps.x,
                    y: flexGridItemProps.y
                }, /*#__PURE__*/ React.createElement("div", {
                    className: "grid-item"
                }, "Grid ", i + 1));
            }
        });
    };
    // Create theme for this version
    const theme = Styles.responsiveFontSizes(Styles.createTheme({
        palette: {
            primary: {
                main: "#007FFF"
            }
        }
    }));
    return /*#__PURE__*/ React.createElement(Styles.ThemeProvider, {
        theme: theme
    }, /*#__PURE__*/ React.createElement(Styles.CssBaseline, null), /*#__PURE__*/ React.createElement(Material.Container, {
        maxWidth: "lg",
        sx: {
            py: 4
        }
    }, /*#__PURE__*/ React.createElement(Material.Box, {
        display: "flex",
        flexDirection: "column",
        gap: 4
    }, /*#__PURE__*/ React.createElement(Material.Box, null, /*#__PURE__*/ React.createElement(Material.Box, {
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 2
    }, /*#__PURE__*/ React.createElement(Material.Box, {
        component: "img",
        src: "apple-touch-icon.png",
        alt: "mui-flexy logo",
        sx: {
            width: 100,
            height: 100
        }
    }), /*#__PURE__*/ React.createElement(Material.Typography, {
        variant: "h4",
        component: "h1"
    }, currentVersion.label, " + mui-flexy")), /*#__PURE__*/ React.createElement(Material.Typography, {
        variant: "h6",
        color: "text.secondary",
        gutterBottom: true
    }, "Compatible with @mui/material v", currentVersion.version), /*#__PURE__*/ React.createElement(Material.Typography, {
        variant: "body1",
        component: "div",
        sx: {
            mt: 2
        }
    }, "mui-flexy for MUI is a component wrapper for flexbox styles that allows you to easily align and distribute flexy items in a space in a way that doesn't make you want to pull your hair out trying to remember whether to use ", /*#__PURE__*/ React.createElement(DemoCode, {
        inline: true
    }, "justify-content"), " or ", /*#__PURE__*/ React.createElement(DemoCode, {
        inline: true
    }, "align-items"), ". Using a simple and consistent x, y coordinate system, you can stop worrying about the CSS working group's choices and get on with your life of centering divs.", /*#__PURE__*/ React.createElement("br", null), /*#__PURE__*/ React.createElement("br", null), "Simply use ", /*#__PURE__*/ React.createElement(DemoCode, {
        inline: true
    }, "<FlexBox />"), " or", " ", /*#__PURE__*/ React.createElement(DemoCode, {
        inline: true
    }, `<${version === "v6" ? "FlexGrid2" : "FlexGrid"} />`), " as you would Box or Grid. The default axis is ", /*#__PURE__*/ React.createElement(DemoCode, {
        inline: true
    }, "row"), ", but for good hygiene, you might want to set", " ", /*#__PURE__*/ React.createElement(DemoCode, {
        inline: true
    }, "row"), " anyway. If you want a column, just pass a", " ", /*#__PURE__*/ React.createElement(DemoCode, {
        inline: true
    }, "column"), " prop.")), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            borderBottom: 1,
            borderColor: "divider"
        }
    }, /*#__PURE__*/ React.createElement(Material.Tabs, {
        value: selectedTab,
        onChange: (_, newValue)=>setSelectedTab(newValue),
        role: "tablist"
    }, /*#__PURE__*/ React.createElement(Material.Tab, {
        label: "FlexBox",
        role: "tab"
    }), /*#__PURE__*/ React.createElement(Material.Tab, {
        label: "FlexGrid",
        role: "tab",
        sx: {
            display: version === "v6" ? "none" : "flex"
        }
    }), /*#__PURE__*/ React.createElement(Material.Tab, {
        label: "FlexGrid2",
        role: "tab",
        sx: {
            display: version === "v6" ? "flex" : "none"
        }
    }))), selectedTab === 0 && /*#__PURE__*/ React.createElement(Material.Paper, {
        elevation: 2,
        sx: {
            p: 3
        }
    }, /*#__PURE__*/ React.createElement(Material.Typography, {
        variant: "h5",
        component: "h2",
        gutterBottom: true
    }, FLEXBOX_TAB_TITLE), /*#__PURE__*/ React.createElement(Material.Box, {
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        alignItems: "flex-end"
    }, /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 140
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "X alignment"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexBoxProps.x,
        label: "X alignment",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexBoxProps((prev)=>({
                    ...prev,
                    x: e.target.value
                }))
    }, xOptions.map((option)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: option.value,
            value: option.value,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, option.label))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 140
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "Y alignment"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexBoxProps.y,
        label: "Y alignment",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexBoxProps((prev)=>({
                    ...prev,
                    y: e.target.value
                }))
    }, yOptions.map((option)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: option.value,
            value: option.value,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, option.label))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 140
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem",
            color: "rgba(0, 0, 0, 0.6)",
            pointerEvents: "none",
            zIndex: 1,
            backgroundColor: "transparent"
        }
    }, "Direction"), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            height: 32,
            mt: 0
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControlLabel, {
        control: /*#__PURE__*/ React.createElement(Material.Radio, {
            size: "small",
            checked: direction === "row",
            onChange: ()=>{
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
    }), /*#__PURE__*/ React.createElement(Material.FormControlLabel, {
        control: /*#__PURE__*/ React.createElement(Material.Radio, {
            size: "small",
            checked: direction === "column",
            onChange: ()=>{
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
    })))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            height: 32,
            display: "flex",
            alignItems: "center"
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControlLabel, {
        control: /*#__PURE__*/ React.createElement(Material.Switch, {
            size: "small",
            checked: Boolean(flexBoxProps.nowrap),
            onChange: (e)=>setFlexBoxProps((prev)=>({
                        ...prev,
                        nowrap: e.target.checked
                    }))
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
    })), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            height: 32,
            display: "flex",
            alignItems: "center"
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControlLabel, {
        control: /*#__PURE__*/ React.createElement(Material.Switch, {
            size: "small",
            checked: Boolean(flexBoxProps.reverse),
            onChange: (e)=>setFlexBoxProps((prev)=>({
                        ...prev,
                        reverse: e.target.checked
                    }))
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
    }))), /*#__PURE__*/ React.createElement(DemoCode, {
        code: generateFlexBoxCode()
    }), /*#__PURE__*/ React.createElement(FlexBoxInner, {
        "data-testid": "demo-flexbox",
        x: flexBoxProps.x,
        y: flexBoxProps.y,
        row: flexBoxProps.row,
        column: flexBoxProps.column,
        nowrap: flexBoxProps.nowrap,
        reverse: flexBoxProps.reverse
    }, /*#__PURE__*/ React.createElement("span", null, isColumn ? columnEmoji : rowEmoji), /*#__PURE__*/ React.createElement("span", null, isColumn ? columnEmoji : rowEmoji), /*#__PURE__*/ React.createElement("span", null, isColumn ? columnEmoji : rowEmoji), /*#__PURE__*/ React.createElement("span", null, isColumn ? columnEmoji : "🚤"))), selectedTab === 1 && version !== "v6" && /*#__PURE__*/ React.createElement(Material.Paper, {
        elevation: 2,
        sx: {
            p: 3
        }
    }, /*#__PURE__*/ React.createElement(Material.Typography, {
        variant: "h5",
        component: "h2",
        gutterBottom: true
    }, FLEXGRID_TAB_TITLE), /*#__PURE__*/ React.createElement(Material.Box, {
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 2,
        alignItems: "flex-end"
    }, /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 110
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "Rows"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridProps.rows,
        label: "Rows",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridProps((prev)=>({
                    ...prev,
                    rows: Number(e.target.value)
                }))
    }, Array.from({
        length: 5
    }, (_, i)=>i + 1).map((num)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: num,
            value: num,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, num))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 110
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "Columns"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridProps.columns,
        label: "Columns",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridProps((prev)=>({
                    ...prev,
                    columns: Number(e.target.value)
                }))
    }, Array.from({
        length: 5
    }, (_, i)=>i + 1).map((num)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: num,
            value: num,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, num))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 110
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "Spacing"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridProps.spacing,
        label: "Spacing",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridProps((prev)=>({
                    ...prev,
                    spacing: Number(e.target.value)
                }))
    }, [
        0,
        1,
        2,
        3,
        4,
        5
    ].map((num)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: num,
            value: num,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, num))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            height: 32,
            display: "flex",
            alignItems: "center"
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControlLabel, {
        control: /*#__PURE__*/ React.createElement(Material.Switch, {
            size: "small",
            checked: flexGridProps.useTemplate,
            onChange: (e)=>setFlexGridProps((prev)=>({
                        ...prev,
                        useTemplate: e.target.checked
                    }))
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
    }))), /*#__PURE__*/ React.createElement(Material.Box, {
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        alignItems: "flex-end"
    }, /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 140
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "X alignment"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridItemProps.x,
        label: "X alignment",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridItemProps((prev)=>({
                    ...prev,
                    x: e.target.value
                }))
    }, xRowOptions.map((option)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: option.value,
            value: option.value,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, option.label))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 140
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "Y alignment"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridItemProps.y,
        label: "Y alignment",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridItemProps((prev)=>({
                    ...prev,
                    y: e.target.value
                }))
    }, yRowOptions.map((option)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: option.value,
            value: option.value,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, option.label)))))), /*#__PURE__*/ React.createElement(DemoCode, {
        code: generateFlexGridCode()
    }), flexGridProps.useTemplate ? /*#__PURE__*/ React.createElement(FlexGridDemo, {
        sx: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gridGap: flexGridProps.spacing
        }
    }, renderFlexGridItems()) : /*#__PURE__*/ React.createElement(FlexGridDemo, {
        container: true,
        spacing: flexGridProps.spacing
    }, renderFlexGridItems())), selectedTab === 2 && version === "v6" && FlexGrid2Demo && /*#__PURE__*/ React.createElement(Material.Paper, {
        elevation: 2,
        sx: {
            p: 3
        }
    }, /*#__PURE__*/ React.createElement(Material.Typography, {
        variant: "h5",
        component: "h2",
        gutterBottom: true
    }, FLEXGRID2_TAB_TITLE), /*#__PURE__*/ React.createElement(Material.Box, {
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 2,
        alignItems: "flex-end"
    }, /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 110
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "Rows"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridProps.rows,
        label: "Rows",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridProps((prev)=>({
                    ...prev,
                    rows: Number(e.target.value)
                }))
    }, Array.from({
        length: 5
    }, (_, i)=>i + 1).map((num)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: num,
            value: num,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, num))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 110
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "Columns"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridProps.columns,
        label: "Columns",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridProps((prev)=>({
                    ...prev,
                    columns: Number(e.target.value)
                }))
    }, Array.from({
        length: 5
    }, (_, i)=>i + 1).map((num)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: num,
            value: num,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, num))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 110
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "Spacing"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridProps.spacing,
        label: "Spacing",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridProps((prev)=>({
                    ...prev,
                    spacing: Number(e.target.value)
                }))
    }, [
        0,
        1,
        2,
        3,
        4,
        5
    ].map((num)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: num,
            value: num,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, num))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            height: 32,
            display: "flex",
            alignItems: "center"
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControlLabel, {
        control: /*#__PURE__*/ React.createElement(Material.Switch, {
            size: "small",
            checked: flexGridProps.useTemplate,
            onChange: (e)=>setFlexGridProps((prev)=>({
                        ...prev,
                        useTemplate: e.target.checked
                    }))
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
    }))), /*#__PURE__*/ React.createElement(Material.Box, {
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        alignItems: "flex-end"
    }, /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 140
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "X alignment"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridItemProps.x,
        label: "X alignment",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridItemProps((prev)=>({
                    ...prev,
                    x: e.target.value
                }))
    }, xRowOptions.map((option)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: option.value,
            value: option.value,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, option.label))))), /*#__PURE__*/ React.createElement(Material.Box, {
        sx: {
            minWidth: 140
        }
    }, /*#__PURE__*/ React.createElement(Material.FormControl, {
        fullWidth: true,
        size: "small",
        margin: "none"
    }, /*#__PURE__*/ React.createElement(Material.InputLabel, {
        sx: {
            fontSize: "0.875rem"
        }
    }, "Y alignment"), /*#__PURE__*/ React.createElement(Material.Select, {
        value: flexGridItemProps.y,
        label: "Y alignment",
        sx: {
            height: 32,
            "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.875rem"
            }
        },
        onChange: (e)=>setFlexGridItemProps((prev)=>({
                    ...prev,
                    y: e.target.value
                }))
    }, yRowOptions.map((option)=>/*#__PURE__*/ React.createElement(Material.MenuItem, {
            key: option.value,
            value: option.value,
            dense: true,
            sx: {
                fontSize: "0.875rem",
                minHeight: 32,
                padding: "4px 12px"
            }
        }, option.label)))))), /*#__PURE__*/ React.createElement(DemoCode, {
        code: generateFlexGridCode()
    }), flexGridProps.useTemplate ? /*#__PURE__*/ React.createElement(FlexGrid2Demo, {
        sx: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gridGap: flexGridProps.spacing
        }
    }, renderFlexGridItems()) : /*#__PURE__*/ React.createElement(FlexGrid2Demo, {
        container: true,
        spacing: flexGridProps.spacing
    }, renderFlexGridItems())))));
};
// Preload all versions function
const preloadAllVersions = async ()=>{
    const versionsList = [
        "v5",
        "v6",
        "v7"
    ];
    // Start loading all versions simultaneously
    const preloadPromises = versionsList.map(async (version)=>{
        // Skip if already cached
        if (libraryCache[version]) return libraryCache[version];
        // Skip if already loading
        if (loadingPromises[version]) return loadingPromises[version];
        try {
            // Load all required libraries for this version
            let Styles;
            const [Material, FlexComponents] = await Promise.all([
                import(`@mui/material_${version}`),
                import(`@mui-flexy/${version}`)
            ]);
            // Handle different styling approaches per version
            if (version === "v5") {
                const StylesModule = await import(`@mui/styles_${version}`);
                Styles = {
                    ...StylesModule.default || StylesModule,
                    createTheme: Material.createTheme || Material.default?.createTheme,
                    responsiveFontSizes: (StylesModule.default || StylesModule).responsiveFontSizes || ((theme)=>theme),
                    ThemeProvider: (StylesModule.default || StylesModule).ThemeProvider,
                    CssBaseline: Material.CssBaseline || Material.default?.CssBaseline
                };
            } else {
                // v6 and v7 use @mui/system for styling
                const SystemModule = await import(`@mui/system_${version}`);
                const MaterialModule = Material.default || Material;
                const SystemModuleResolved = SystemModule.default || SystemModule;
                // Create a simple styled function that just applies sx props
                const simpleStyled = (Component)=>(styles)=>{
                        return (props)=>/*#__PURE__*/ React.createElement(Component, {
                                ...props,
                                sx: {
                                    ...styles,
                                    ...props.sx
                                }
                            });
                    };
                Styles = {
                    styled: simpleStyled,
                    createTheme: MaterialModule.createTheme,
                    responsiveFontSizes: (theme)=>theme,
                    ThemeProvider: SystemModuleResolved.ThemeProvider,
                    CssBaseline: MaterialModule.CssBaseline
                };
            }
            const librariesData = {
                Material: Material.default || Material,
                Styles,
                FlexBox: FlexComponents.FlexBox,
                FlexGrid: FlexComponents.FlexGrid
            };
            // Only add FlexGrid2 for v6
            if (version === "v6") {
                librariesData.FlexGrid2 = FlexComponents.FlexGrid2;
            }
            // Cache the libraries
            libraryCache[version] = librariesData;
            return librariesData;
        } catch (err) {
            console.error(`Error preloading libraries for ${version}:`, err);
            throw err;
        }
    });
    // Wait for all versions to load
    try {
        await Promise.all(preloadPromises);
    } catch (err) {
        console.error("Error preloading some versions:", err);
    }
};
const App = ()=>{
    const [selectedVersion, setSelectedVersion] = useState("v7");
    const [headerLibraries, setHeaderLibraries] = useState(null);
    const [appLoading, setAppLoading] = useState(true);
    useEffect(()=>{
        const loadAppWithPreloading = async ()=>{
            // Track loading start time for minimum display duration
            const loadingStartTime = Date.now();
            try {
                // Load header libraries (v7 Material-UI for the header)
                const [Material, System] = await Promise.all([
                    import('@mui/material_v7'),
                    import('@mui/system_v7')
                ]);
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
                const loadingDuration = Date.now() - loadingStartTime;
                const minLoadingTime = 500; // 500ms
                if (loadingDuration < minLoadingTime) {
                    await new Promise((resolve)=>setTimeout(resolve, minLoadingTime - loadingDuration));
                }
            } catch (err) {
                console.error("Error loading application:", err);
                // Ensure loading is displayed for at least 500ms even on error
                const loadingDuration = Date.now() - loadingStartTime;
                const minLoadingTime = 500; // 500ms
                if (loadingDuration < minLoadingTime) {
                    await new Promise((resolve)=>setTimeout(resolve, minLoadingTime - loadingDuration));
                }
            } finally{
                setAppLoading(false);
            }
        };
        loadAppWithPreloading();
    }, []);
    if (appLoading || !headerLibraries) {
        return /*#__PURE__*/ React.createElement(LoadingComponent, {
            message: "Loading application..."
        });
    }
    const { Material, Styles } = headerLibraries;
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(Material.AppBar, {
        position: "sticky",
        color: "default",
        elevation: 1,
        "data-testid": "app-bar",
        sx: {
            top: 0,
            zIndex: 1100
        }
    }, /*#__PURE__*/ React.createElement(Material.Toolbar, null, /*#__PURE__*/ React.createElement(Material.Typography, {
        component: "h2",
        variant: "h6",
        sx: {
            flexGrow: 1
        }
    }, "mui-flexy documentation"), versions.map((version)=>/*#__PURE__*/ React.createElement(Material.Button, {
            key: version.key,
            color: selectedVersion === version.key ? "primary" : "inherit",
            onClick: ()=>setSelectedVersion(version.key),
            sx: {
                mx: 0.5,
                fontWeight: selectedVersion === version.key ? "bold" : "normal"
            }
        }, version.label)))), /*#__PURE__*/ React.createElement(VersionContent, {
        version: selectedVersion
    }));
};

export { FLEXBOX_TAB_TITLE, FLEXGRID2_TAB_TITLE, FLEXGRID_TAB_TITLE, App as default };
//# sourceMappingURL=docs.js.map
