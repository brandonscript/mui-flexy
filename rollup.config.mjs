import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";

export default {
  input: ["src/index.tsx"],
  output: [
    {
      dir: "dist",
      format: "es",
      exports: "named",
      sourcemap: true,
      strict: false,
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].js",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].cjs",
    },
  ],
  plugins: [
    json(),
    resolve({
      extensions: [".ts", ".tsx"],
    }),
    swc({
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
          dynamicImport: true,
          decorators: true,
          optionalChaining: true,
          nullishCoalescing: true,
        },
        transform: {
          react: {
            runtime: "automatic",
          },
        },
        globals: {
          "react/jsx-runtime": "jsxRuntime",
          "react-dom/client": "ReactDOM",
          react: "React",
        },
      },
      exclude: ["node_modules/**", "dist/**", "demo/**", "tests/**"],
      include: ["src/**"],
    }),
  ],
  external: ["react", "react-dom", "@mui/material", "@mui/material/OverridableComponent"],
};
