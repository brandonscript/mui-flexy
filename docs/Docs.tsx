import React, { useEffect, useMemo, useState } from "react";

import type { BaseFlexProps } from "../packages/core/dist";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _Any = any;

export const FLEXBOX_TAB_TITLE = "Interactive FlexBox sandbox";
export const FLEXGRID_TAB_TITLE = "Interactive FlexGrid sandbox";
export const FLEXGRID2_TAB_TITLE = "Interactive FlexGrid2 sandbox";

// Code display component with proper styling
const DemoCode = ({
  inline = false,
  code,
  children,
}: {
  inline?: boolean;
  code?: string;
  children?: React.ReactNode;
}) => {
  const content = children?.toString() || code || "";

  if (inline) {
    return (
      <code
        style={{
          backgroundColor: "#f5f5f5",
          padding: "2px 4px",
          borderRadius: "4px",
          fontSize: "0.875rem",
          fontFamily: "Consolas, Monaco, 'Courier New', monospace",
          color: "#24292f",
        }}
      >
        {content}
      </code>
    );
  }

  return (
    <pre
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        margin: "16px 0",
        fontSize: "0.875rem",
        fontFamily: "Consolas, Monaco, 'Courier New', monospace",
        padding: "10px",
        overflowX: "auto",
      }}
    >
      {content}
    </pre>
  );
};

// Demo container styling
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const createDemoInner = (FlexBox: _Any, styled: Function) =>
  styled(FlexBox)({
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
      flexShrink: 0,
    },
  });

// FlexGrid demo styling
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const createFlexGridDemo = (FlexGrid: _Any, styled: Function) =>
  styled(FlexGrid)({
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
      textAlign: "center",
    },
  });

// Version configurations
const versions = [
  { key: "v5", label: "MUI v5", version: "5", packageName: "@mui-flexy/v5" },
  { key: "v6", label: "MUI v6", version: "6", packageName: "@mui-flexy/v6" },
  { key: "v7", label: "MUI v7", version: "7", packageName: "@mui-flexy/v7" },
];

// Shared loading component to avoid visual jumps
const LoadingComponent = ({ message }: { message: string }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafafa",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        width: "60px",
        height: "4px",
        backgroundColor: "#007FFF",
        borderRadius: "2px",
        animation: "loading-bar 1.5s ease-in-out infinite",
      }}
    ></div>
    <style>{`
      @keyframes loading-bar {
        0% { transform: scaleX(0); }
        50% { transform: scaleX(1); }
        100% { transform: scaleX(0); }
      }
    `}</style>
  </div>
);

// Complete alignment options based on the core types
const xRowOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
  { value: "space-between", label: "Space Between" },
  { value: "space-around", label: "Space Around" },
  { value: "space-evenly", label: "Space Evenly" },
  { value: "flex-start", label: "Flex Start" },
  { value: "flex-end", label: "Flex End" },
];

const yRowOptions = [
  { value: "top", label: "Top" },
  { value: "center", label: "Center" },
  { value: "bottom", label: "Bottom" },
  { value: "stretch", label: "Stretch" },
  { value: "baseline", label: "Baseline" },
  { value: "flex-start", label: "Flex Start" },
  { value: "flex-end", label: "Flex End" },
];

const xColumnOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
  { value: "stretch", label: "Stretch" },
  { value: "baseline", label: "Baseline" },
  { value: "flex-start", label: "Flex Start" },
  { value: "flex-end", label: "Flex End" },
];

const yColumnOptions = [
  { value: "top", label: "Top" },
  { value: "center", label: "Center" },
  { value: "bottom", label: "Bottom" },
  { value: "space-between", label: "Space Between" },
  { value: "space-around", label: "Space Around" },
  { value: "space-evenly", label: "Space Evenly" },
  { value: "flex-start", label: "Flex Start" },
  { value: "flex-end", label: "Flex End" },
];

// Emojis
const rowEmoji = "🚣";
const columnEmoji = "🏛";

// Global cache for loaded libraries
const libraryCache: Record<string, any> = {};
const loadingPromises: Record<string, Promise<any> | undefined> = {};

// Lazy loading component for each version
const VersionContent = ({ version }: { version: string }) => {
  const [libraries, setLibraries] = useState<any>(libraryCache[version] || null);
  const [loading, setLoading] = useState(!libraryCache[version]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLibraries = async () => {
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
        const loadingPromise = (async () => {
          // Load all required libraries for this version
          let Styles;
          const [Material, FlexComponents] = await Promise.all([
            import(`@mui/material_${version}`),
            import(`@mui-flexy/${version}`),
          ]);

          // Handle different styling approaches per version
          if (version === "v5") {
            const StylesModule = await import(`@mui/styles_${version}`);
            Styles = {
              ...(StylesModule.default || StylesModule),
              createTheme: Material.createTheme || Material.default?.createTheme,
              responsiveFontSizes:
                (StylesModule.default || StylesModule).responsiveFontSizes || ((theme: any) => theme),
              ThemeProvider: (StylesModule.default || StylesModule).ThemeProvider,
              CssBaseline: Material.CssBaseline || Material.default?.CssBaseline,
            };
          } else {
            // v6 and v7 use @mui/system for styling
            const SystemModule = await import(`@mui/system_${version}`);
            const MaterialModule = Material.default || Material;
            const SystemModuleResolved = SystemModule.default || SystemModule;

            // Create a simple styled function that just applies sx props
            const simpleStyled = (Component: any) => (styles: any) => {
              return (props: any) =>
                React.createElement(Component, {
                  ...props,
                  sx: { ...styles, ...props.sx },
                });
            };

            Styles = {
              styled: simpleStyled,
              createTheme: MaterialModule.createTheme,
              responsiveFontSizes: (theme: any) => theme, // No responsiveFontSizes in system
              ThemeProvider: SystemModuleResolved.ThemeProvider,
              CssBaseline: MaterialModule.CssBaseline,
            };
          }

          const librariesData: any = {
            Material: Material.default || Material,
            Styles,
            FlexBox: FlexComponents.FlexBox,
            FlexGrid: FlexComponents.FlexGrid,
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
          await new Promise((resolve) => setTimeout(resolve, minLoadingTime - loadingDuration));
        }
      } catch (err) {
        console.error(`Error loading libraries for ${version}:`, err);
        setError(`Failed to load libraries for ${version}`);

        // Ensure loading is displayed for at least 500ms even on error
        const loadingDuration = Date.now() - loadingStartTime;
        const minLoadingTime = 500; // 500ms

        if (loadingDuration < minLoadingTime) {
          await new Promise((resolve) => setTimeout(resolve, minLoadingTime - loadingDuration));
        }
      } finally {
        setLoading(false);
        // Clean up loading promise
        delete loadingPromises[version];
      }
    };

    loadLibraries();
  }, [version]);

  if (loading) {
    return <LoadingComponent message="Loading modules..." />;
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          backgroundColor: "#fafafa",
        }}
      >
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "90%",
            border: "1px solid #ffcdd2",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              color: "#d32f2f",
              fontWeight: 500,
              marginBottom: "8px",
            }}
          >
            Error Loading {version.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#666",
              fontWeight: 400,
            }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!libraries) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          backgroundColor: "#fafafa",
        }}
      >
        <div
          style={{
            padding: "24px",
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "300px",
            width: "90%",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#666",
              fontWeight: 400,
            }}
          >
            Libraries not loaded
          </div>
        </div>
      </div>
    );
  }

  return <VersionApp version={version} libraries={libraries} />;
};

// Main version-specific app component
const VersionApp = ({ version, libraries }: { version: string; libraries: any }) => {
  const { Material, Styles, FlexBox, FlexGrid, FlexGrid2 = null } = libraries;

  const [selectedTab, setSelectedTab] = useState(0);
  const [direction, setDirection] = useState<"row" | "column">("row");
  const [flexBoxProps, setFlexBoxProps] = useState<BaseFlexProps>({
    x: "center",
    y: "center",
    row: true,
    column: false,
    nowrap: false,
    reverse: false,
  });

  const [flexGridProps, setFlexGridProps] = useState({
    rows: 2,
    columns: 3,
    spacing: 2,
    useTemplate: false,
  });

  // Update flexBoxProps when direction changes
  useEffect(() => {
    setFlexBoxProps((prev) => ({
      ...prev,
      row: direction === "row",
      column: direction === "column",
    }));
  }, [direction]);

  // Handle tab switching when version changes
  useEffect(() => {
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
  }, [version]); // Only run when version changes, not when selectedTab changes

  // Determine current options based on direction
  const isColumn = direction === "column";
  const xOptions = isColumn ? xColumnOptions : xRowOptions;
  const yOptions = isColumn ? yColumnOptions : yRowOptions;

  const currentVersion = versions.find((v) => v.key === version)!;

  // Create styled components for this version (memoized to prevent re-creation on each render)
  const FlexBoxInner = useMemo(() => createDemoInner(FlexBox, Styles.styled), [FlexBox, Styles.styled]);
  const FlexGridDemo = useMemo(() => createFlexGridDemo(FlexGrid, Styles.styled), [FlexGrid, Styles.styled]);
  const FlexGrid2Demo = useMemo(
    () => (version === "v6" && FlexGrid2 ? createFlexGridDemo(FlexGrid2, Styles.styled) : null),
    [version, FlexGrid2, Styles.styled],
  );

  const generateFlexBoxCode = () => {
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

  const generateFlexGridCode = () => {
    const gridComponent = selectedTab === 2 ? "FlexGrid2" : "FlexGrid";
    const containerProps = flexGridProps.useTemplate
      ? `sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gridGap: ${flexGridProps.spacing} }}`
      : `container spacing={${flexGridProps.spacing}}`;

    const itemProps = selectedTab === 2 || (selectedTab === 1 && version === "v7") ? `size={4}` : `item xs={4}`;

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

  const renderFlexGridItems = () => {
    const totalItems = flexGridProps.rows * flexGridProps.columns;
    const itemSize = Math.floor(12 / flexGridProps.columns);

    return Array.from({ length: totalItems }, (_, i) => {
      // For v6 and FlexGrid2 tab (index 2)
      if (version === "v6" && selectedTab === 2 && FlexGrid2Demo) {
        return (
          <FlexGrid2Demo key={i} size={itemSize}>
            <div className="grid-item">Grid {i + 1}</div>
          </FlexGrid2Demo>
        );
      }
      // For v7 and FlexGrid tab (index 1) - uses new Grid2 API with size prop
      else if (version === "v7" && selectedTab === 1) {
        return (
          <FlexGridDemo key={i} size={itemSize}>
            <div className="grid-item">Grid {i + 1}</div>
          </FlexGridDemo>
        );
      }
      // For v5 and FlexGrid tab (index 1) - uses legacy Grid API with item and xs props
      else if (version === "v5" && selectedTab === 1) {
        return (
          <FlexGridDemo key={i} item xs={itemSize}>
            <div className="grid-item">Grid {i + 1}</div>
          </FlexGridDemo>
        );
      }
      // Fallback - use v5 style for backwards compatibility
      else {
        return (
          <FlexGridDemo key={i} item xs={itemSize}>
            <div className="grid-item">Grid {i + 1}</div>
          </FlexGridDemo>
        );
      }
    });
  };

  // Create theme for this version
  const theme = Styles.responsiveFontSizes(
    Styles.createTheme({
      palette: {
        primary: {
          main: "#007FFF",
        },
      },
    }),
  );

  return (
    <Styles.ThemeProvider theme={theme}>
      <Styles.CssBaseline />

      {/* Main content */}
      <Material.Container maxWidth="lg" sx={{ py: 4 }}>
        <Material.Box display="flex" flexDirection="column" gap={4}>
          {/* Title and Description */}
          <Material.Box>
            <Material.Box display="flex" alignItems="center" gap={2} mb={2}>
              <Material.Box
                component="img"
                src="apple-touch-icon.png"
                alt="mui-flexy logo"
                sx={{ width: 100, height: 100 }}
              />
              <Material.Typography variant="h4" component="h1">
                {currentVersion.label} + mui-flexy
              </Material.Typography>
            </Material.Box>
            <Material.Typography variant="h6" color="text.secondary" gutterBottom>
              Compatible with @mui/material v{currentVersion.version}
            </Material.Typography>
            <Material.Typography variant="body1" component="div" sx={{ mt: 2 }}>
              mui-flexy for MUI is a component wrapper for flexbox styles that allows you to easily align and distribute
              flexy items in a space in a way that doesn't make you want to pull your hair out trying to remember
              whether to use <DemoCode inline>justify-content</DemoCode> or <DemoCode inline>align-items</DemoCode>.
              Using a simple and consistent x, y coordinate system, you can stop worrying about the CSS working group's
              choices and get on with your life of centering divs.
              <br />
              <br />
              Simply use <DemoCode inline>&lt;FlexBox /&gt;</DemoCode> or{" "}
              <DemoCode inline>{`<${version === "v6" ? "FlexGrid2" : "FlexGrid"} />`}</DemoCode> as you would Box or
              Grid. The default axis is <DemoCode inline>row</DemoCode>, but for good hygiene, you might want to set{" "}
              <DemoCode inline>row</DemoCode> anyway. If you want a column, just pass a{" "}
              <DemoCode inline>column</DemoCode> prop.
            </Material.Typography>
          </Material.Box>

          {/* Tab Navigation */}
          <Material.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Material.Tabs
              value={selectedTab}
              onChange={(_: any, newValue: any) => setSelectedTab(newValue)}
              role="tablist"
            >
              <Material.Tab label="FlexBox" role="tab" />
              <Material.Tab label="FlexGrid" role="tab" sx={{ display: version === "v6" ? "none" : "flex" }} />
              <Material.Tab label="FlexGrid2" role="tab" sx={{ display: version === "v6" ? "flex" : "none" }} />
            </Material.Tabs>
          </Material.Box>

          {selectedTab === 0 && (
            <Material.Paper elevation={2} sx={{ p: 3 }}>
              <Material.Typography variant="h5" component="h2" gutterBottom>
                {FLEXBOX_TAB_TITLE}
              </Material.Typography>

              {/* FlexBox Controls */}
              <Material.Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="flex-end">
                <Material.Box sx={{ minWidth: 140 }}>
                  <Material.FormControl fullWidth size="small" margin="none">
                    <Material.InputLabel sx={{ fontSize: "0.875rem" }}>X alignment</Material.InputLabel>
                    <Material.Select
                      value={flexBoxProps.x}
                      label="X Alignment"
                      sx={{
                        height: 32,
                        "& .MuiSelect-select": {
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                        },
                      }}
                      onChange={(e: any) =>
                        setFlexBoxProps((prev) => ({
                          ...prev,
                          x: e.target.value as
                            | "left"
                            | "right"
                            | "center"
                            | "flex-start"
                            | "flex-end"
                            | "space-between"
                            | "space-around"
                            | "space-evenly",
                        }))
                      }
                    >
                      {xOptions.map((option) => (
                        <Material.MenuItem
                          key={option.value}
                          value={option.value}
                          dense
                          sx={{
                            fontSize: "0.875rem",
                            minHeight: 32,
                            padding: "4px 12px",
                          }}
                        >
                          {option.label}
                        </Material.MenuItem>
                      ))}
                    </Material.Select>
                  </Material.FormControl>
                </Material.Box>

                <Material.Box sx={{ minWidth: 140 }}>
                  <Material.FormControl fullWidth size="small" margin="none">
                    <Material.InputLabel sx={{ fontSize: "0.875rem" }}>Y Alignment</Material.InputLabel>
                    <Material.Select
                      value={flexBoxProps.y}
                      label="Y alignment"
                      sx={{
                        height: 32,
                        "& .MuiSelect-select": {
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                        },
                      }}
                      onChange={(e: any) =>
                        setFlexBoxProps((prev) => ({
                          ...prev,
                          y: e.target.value as
                            | "top"
                            | "bottom"
                            | "center"
                            | "flex-start"
                            | "flex-end"
                            | "space-between"
                            | "space-around"
                            | "space-evenly",
                        }))
                      }
                    >
                      {yOptions.map((option) => (
                        <Material.MenuItem
                          key={option.value}
                          value={option.value}
                          dense
                          sx={{
                            fontSize: "0.875rem",
                            minHeight: 32,
                            padding: "4px 12px",
                          }}
                        >
                          {option.label}
                        </Material.MenuItem>
                      ))}
                    </Material.Select>
                  </Material.FormControl>
                </Material.Box>

                <Material.Box sx={{ minWidth: 140 }}>
                  <Material.FormControl fullWidth size="small" margin="none">
                    <Material.InputLabel
                      sx={{
                        fontSize: "0.875rem",
                        color: "rgba(0, 0, 0, 0.6)",
                        pointerEvents: "none",
                        zIndex: 1,
                        backgroundColor: "transparent",
                      }}
                    >
                      Direction
                    </Material.InputLabel>
                    <Material.Box sx={{ display: "flex", gap: 0.5, alignItems: "center", height: 32, mt: 0 }}>
                      <Material.FormControlLabel
                        control={
                          <Material.Radio
                            size="small"
                            checked={direction === "row"}
                            onChange={() => {
                              console.log("Row radio clicked");
                              setDirection("row");
                            }}
                            value="row"
                          />
                        }
                        label="row"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.875rem",
                          },
                          margin: 0,
                        }}
                      />
                      <Material.FormControlLabel
                        control={
                          <Material.Radio
                            size="small"
                            checked={direction === "column"}
                            onChange={() => {
                              console.log("Column radio clicked");
                              setDirection("column");
                            }}
                            value="column"
                          />
                        }
                        label="column"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.875rem",
                          },
                          margin: 0,
                        }}
                      />
                    </Material.Box>
                  </Material.FormControl>
                </Material.Box>

                <Material.Box sx={{ height: 32, display: "flex", alignItems: "center" }}>
                  <Material.FormControlLabel
                    control={
                      <Material.Switch
                        size="small"
                        checked={Boolean(flexBoxProps.nowrap)}
                        onChange={(e: any) => setFlexBoxProps((prev) => ({ ...prev, nowrap: e.target.checked }))}
                      />
                    }
                    label="nowrap"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.875rem",
                      },
                      margin: 0,
                      height: "100%",
                      alignItems: "center",
                    }}
                  />
                </Material.Box>

                <Material.Box sx={{ height: 32, display: "flex", alignItems: "center" }}>
                  <Material.FormControlLabel
                    control={
                      <Material.Switch
                        size="small"
                        checked={Boolean(flexBoxProps.reverse)}
                        onChange={(e: any) => setFlexBoxProps((prev) => ({ ...prev, reverse: e.target.checked }))}
                      />
                    }
                    label="reverse"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.875rem",
                      },
                      margin: 0,
                      height: "100%",
                      alignItems: "center",
                    }}
                  />
                </Material.Box>
              </Material.Box>

              {/* FlexBox Demo */}
              <DemoCode code={generateFlexBoxCode()} />

              <FlexBoxInner
                data-testid="demo-flexbox"
                x={flexBoxProps.x}
                y={flexBoxProps.y}
                row={flexBoxProps.row}
                column={flexBoxProps.column}
                nowrap={flexBoxProps.nowrap}
                reverse={flexBoxProps.reverse}
              >
                <span>{isColumn ? columnEmoji : rowEmoji}</span>
                <span>{isColumn ? columnEmoji : rowEmoji}</span>
                <span>{isColumn ? columnEmoji : rowEmoji}</span>
                <span>{isColumn ? columnEmoji : "🚤"}</span>
              </FlexBoxInner>
            </Material.Paper>
          )}

          {selectedTab === 1 && version !== "v6" && (
            <Material.Paper elevation={2} sx={{ p: 3 }}>
              <Material.Typography variant="h5" component="h2" gutterBottom>
                {FLEXGRID_TAB_TITLE}
              </Material.Typography>

              {/* FlexGrid Controls */}
              <Material.Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="flex-end">
                <Material.Box sx={{ minWidth: 110 }}>
                  <Material.FormControl fullWidth size="small" margin="none">
                    <Material.InputLabel sx={{ fontSize: "0.875rem" }}>Rows</Material.InputLabel>
                    <Material.Select
                      value={flexGridProps.rows}
                      label="Rows"
                      sx={{
                        height: 32,
                        "& .MuiSelect-select": {
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                        },
                      }}
                      onChange={(e: any) => setFlexGridProps((prev) => ({ ...prev, rows: Number(e.target.value) }))}
                    >
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                        <Material.MenuItem
                          key={num}
                          value={num}
                          dense
                          sx={{
                            fontSize: "0.875rem",
                            minHeight: 32,
                            padding: "4px 12px",
                          }}
                        >
                          {num}
                        </Material.MenuItem>
                      ))}
                    </Material.Select>
                  </Material.FormControl>
                </Material.Box>

                <Material.Box sx={{ minWidth: 110 }}>
                  <Material.FormControl fullWidth size="small" margin="none">
                    <Material.InputLabel sx={{ fontSize: "0.875rem" }}>Columns</Material.InputLabel>
                    <Material.Select
                      value={flexGridProps.columns}
                      label="Columns"
                      sx={{
                        height: 32,
                        "& .MuiSelect-select": {
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                        },
                      }}
                      onChange={(e: any) => setFlexGridProps((prev) => ({ ...prev, columns: Number(e.target.value) }))}
                    >
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                        <Material.MenuItem
                          key={num}
                          value={num}
                          dense
                          sx={{
                            fontSize: "0.875rem",
                            minHeight: 32,
                            padding: "4px 12px",
                          }}
                        >
                          {num}
                        </Material.MenuItem>
                      ))}
                    </Material.Select>
                  </Material.FormControl>
                </Material.Box>

                <Material.Box sx={{ minWidth: 110 }}>
                  <Material.FormControl fullWidth size="small" margin="none">
                    <Material.InputLabel sx={{ fontSize: "0.875rem" }}>Spacing</Material.InputLabel>
                    <Material.Select
                      value={flexGridProps.spacing}
                      label="Spacing"
                      sx={{
                        height: 32,
                        "& .MuiSelect-select": {
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                        },
                      }}
                      onChange={(e: any) => setFlexGridProps((prev) => ({ ...prev, spacing: Number(e.target.value) }))}
                    >
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <Material.MenuItem
                          key={num}
                          value={num}
                          dense
                          sx={{
                            fontSize: "0.875rem",
                            minHeight: 32,
                            padding: "4px 12px",
                          }}
                        >
                          {num}
                        </Material.MenuItem>
                      ))}
                    </Material.Select>
                  </Material.FormControl>
                </Material.Box>

                <Material.Box sx={{ height: 32, display: "flex", alignItems: "center" }}>
                  <Material.FormControlLabel
                    control={
                      <Material.Switch
                        size="small"
                        checked={flexGridProps.useTemplate}
                        onChange={(e: any) => setFlexGridProps((prev) => ({ ...prev, useTemplate: e.target.checked }))}
                      />
                    }
                    label="Use Grid Template"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.875rem",
                      },
                      margin: 0,
                      height: "100%",
                      alignItems: "center",
                    }}
                  />
                </Material.Box>
              </Material.Box>

              {/* FlexGrid Demo */}
              <DemoCode code={generateFlexGridCode()} />

              {flexGridProps.useTemplate ? (
                <FlexGridDemo
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gridGap: flexGridProps.spacing,
                  }}
                >
                  {renderFlexGridItems()}
                </FlexGridDemo>
              ) : (
                <FlexGridDemo container spacing={flexGridProps.spacing}>
                  {renderFlexGridItems()}
                </FlexGridDemo>
              )}
            </Material.Paper>
          )}

          {selectedTab === 2 && version === "v6" && FlexGrid2Demo && (
            <Material.Paper elevation={2} sx={{ p: 3 }}>
              <Material.Typography variant="h5" component="h2" gutterBottom>
                {FLEXGRID2_TAB_TITLE}
              </Material.Typography>

              {/* FlexGrid2 Controls */}
              <Material.Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="flex-end">
                <Material.Box sx={{ minWidth: 110 }}>
                  <Material.FormControl fullWidth size="small" margin="none">
                    <Material.InputLabel sx={{ fontSize: "0.875rem" }}>Rows</Material.InputLabel>
                    <Material.Select
                      value={flexGridProps.rows}
                      label="Rows"
                      sx={{
                        height: 32,
                        "& .MuiSelect-select": {
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                        },
                      }}
                      onChange={(e: any) => setFlexGridProps((prev) => ({ ...prev, rows: Number(e.target.value) }))}
                    >
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                        <Material.MenuItem
                          key={num}
                          value={num}
                          dense
                          sx={{
                            fontSize: "0.875rem",
                            minHeight: 32,
                            padding: "4px 12px",
                          }}
                        >
                          {num}
                        </Material.MenuItem>
                      ))}
                    </Material.Select>
                  </Material.FormControl>
                </Material.Box>

                <Material.Box sx={{ minWidth: 110 }}>
                  <Material.FormControl fullWidth size="small" margin="none">
                    <Material.InputLabel sx={{ fontSize: "0.875rem" }}>Columns</Material.InputLabel>
                    <Material.Select
                      value={flexGridProps.columns}
                      label="Columns"
                      sx={{
                        height: 32,
                        "& .MuiSelect-select": {
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                        },
                      }}
                      onChange={(e: any) => setFlexGridProps((prev) => ({ ...prev, columns: Number(e.target.value) }))}
                    >
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                        <Material.MenuItem
                          key={num}
                          value={num}
                          dense
                          sx={{
                            fontSize: "0.875rem",
                            minHeight: 32,
                            padding: "4px 12px",
                          }}
                        >
                          {num}
                        </Material.MenuItem>
                      ))}
                    </Material.Select>
                  </Material.FormControl>
                </Material.Box>

                <Material.Box sx={{ minWidth: 110 }}>
                  <Material.FormControl fullWidth size="small" margin="none">
                    <Material.InputLabel sx={{ fontSize: "0.875rem" }}>Spacing</Material.InputLabel>
                    <Material.Select
                      value={flexGridProps.spacing}
                      label="Spacing"
                      sx={{
                        height: 32,
                        "& .MuiSelect-select": {
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                        },
                      }}
                      onChange={(e: any) => setFlexGridProps((prev) => ({ ...prev, spacing: Number(e.target.value) }))}
                    >
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <Material.MenuItem
                          key={num}
                          value={num}
                          dense
                          sx={{
                            fontSize: "0.875rem",
                            minHeight: 32,
                            padding: "4px 12px",
                          }}
                        >
                          {num}
                        </Material.MenuItem>
                      ))}
                    </Material.Select>
                  </Material.FormControl>
                </Material.Box>

                <Material.Box sx={{ height: 32, display: "flex", alignItems: "center" }}>
                  <Material.FormControlLabel
                    control={
                      <Material.Switch
                        size="small"
                        checked={flexGridProps.useTemplate}
                        onChange={(e: any) => setFlexGridProps((prev) => ({ ...prev, useTemplate: e.target.checked }))}
                      />
                    }
                    label="Use Grid Template"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.875rem",
                      },
                      margin: 0,
                      height: "100%",
                      alignItems: "center",
                    }}
                  />
                </Material.Box>
              </Material.Box>

              {/* FlexGrid2 Demo */}
              <DemoCode code={generateFlexGridCode()} />

              {flexGridProps.useTemplate ? (
                <FlexGrid2Demo
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gridGap: flexGridProps.spacing,
                  }}
                >
                  {renderFlexGridItems()}
                </FlexGrid2Demo>
              ) : (
                <FlexGrid2Demo container spacing={flexGridProps.spacing}>
                  {renderFlexGridItems()}
                </FlexGrid2Demo>
              )}
            </Material.Paper>
          )}
        </Material.Box>
      </Material.Container>
    </Styles.ThemeProvider>
  );
};

// Preload all versions function
const preloadAllVersions = async (): Promise<void> => {
  const versionsList = ["v5", "v6", "v7"];

  // Start loading all versions simultaneously
  const preloadPromises = versionsList.map(async (version) => {
    // Skip if already cached
    if (libraryCache[version]) return libraryCache[version];

    // Skip if already loading
    if (loadingPromises[version]) return loadingPromises[version];

    try {
      // Load all required libraries for this version
      let Styles;
      const [Material, FlexComponents] = await Promise.all([
        import(`@mui/material_${version}`),
        import(`@mui-flexy/${version}`),
      ]);

      // Handle different styling approaches per version
      if (version === "v5") {
        const StylesModule = await import(`@mui/styles_${version}`);
        Styles = {
          ...(StylesModule.default || StylesModule),
          createTheme: Material.createTheme || Material.default?.createTheme,
          responsiveFontSizes: (StylesModule.default || StylesModule).responsiveFontSizes || ((theme: any) => theme),
          ThemeProvider: (StylesModule.default || StylesModule).ThemeProvider,
          CssBaseline: Material.CssBaseline || Material.default?.CssBaseline,
        };
      } else {
        // v6 and v7 use @mui/system for styling
        const SystemModule = await import(`@mui/system_${version}`);
        const MaterialModule = Material.default || Material;
        const SystemModuleResolved = SystemModule.default || SystemModule;

        // Create a simple styled function that just applies sx props
        const simpleStyled = (Component: any) => (styles: any) => {
          return (props: any) =>
            React.createElement(Component, {
              ...props,
              sx: { ...styles, ...props.sx },
            });
        };

        Styles = {
          styled: simpleStyled,
          createTheme: MaterialModule.createTheme,
          responsiveFontSizes: (theme: any) => theme,
          ThemeProvider: SystemModuleResolved.ThemeProvider,
          CssBaseline: MaterialModule.CssBaseline,
        };
      }

      const librariesData: any = {
        Material: Material.default || Material,
        Styles,
        FlexBox: FlexComponents.FlexBox,
        FlexGrid: FlexComponents.FlexGrid,
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

const App = () => {
  const [selectedVersion, setSelectedVersion] = useState("v7");
  const [headerLibraries, setHeaderLibraries] = useState<any>(null);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const loadAppWithPreloading = async () => {
      // Track loading start time for minimum display duration
      const loadingStartTime = Date.now();

      try {
        // Load header libraries (v7 Material-UI for the header)
        const [Material, System] = await Promise.all([import("@mui/material_v7"), import("@mui/system_v7")]);

        setHeaderLibraries({
          Material: Material.default || Material,
          Styles: {
            createTheme: Material.createTheme,
            ThemeProvider: System.ThemeProvider,
          },
        });

        // Start preloading all versions in parallel (this will continue in background)
        preloadAllVersions();

        // Ensure loading is displayed for at least 500ms
        const loadingDuration = Date.now() - loadingStartTime;
        const minLoadingTime = 500; // 500ms

        if (loadingDuration < minLoadingTime) {
          await new Promise((resolve) => setTimeout(resolve, minLoadingTime - loadingDuration));
        }
      } catch (err) {
        console.error("Error loading application:", err);

        // Ensure loading is displayed for at least 500ms even on error
        const loadingDuration = Date.now() - loadingStartTime;
        const minLoadingTime = 500; // 500ms

        if (loadingDuration < minLoadingTime) {
          await new Promise((resolve) => setTimeout(resolve, minLoadingTime - loadingDuration));
        }
      } finally {
        setAppLoading(false);
      }
    };

    loadAppWithPreloading();
  }, []);

  if (appLoading || !headerLibraries) {
    return <LoadingComponent message="Loading application..." />;
  }

  const { Material, Styles } = headerLibraries;

  return (
    <div>
      {/* Header with version tabs */}
      <Material.AppBar
        position="sticky"
        color="default"
        elevation={1}
        data-testid="app-bar"
        sx={{ top: 0, zIndex: 1100 }}
      >
        <Material.Toolbar>
          <Material.Typography component="h2" variant="h6" sx={{ flexGrow: 1 }}>
            mui-flexy documentation
          </Material.Typography>
          {versions.map((version) => (
            <Material.Button
              key={version.key}
              color={selectedVersion === version.key ? "primary" : "inherit"}
              onClick={() => setSelectedVersion(version.key)}
              sx={{
                mx: 0.5,
                fontWeight: selectedVersion === version.key ? "bold" : "normal",
              }}
            >
              {version.label}
            </Material.Button>
          ))}
        </Material.Toolbar>
      </Material.AppBar>

      {/* Version-specific content */}
      <VersionContent version={selectedVersion} />
    </div>
  );
};

export default App;
