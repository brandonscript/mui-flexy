import alias from "@rollup/plugin-alias";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";

import { version as muiVersion } from "../node_modules/@mui/material/package.json";

const muiMajorVersion = Number(muiVersion.split(".")[0]);

console.log("muiVersion", muiVersion);

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
    // alias({
    //   entries: async () => {
    //     if (muiMajorVersion > 5) return {};
    //     return {
    //       "@mui/material/Grid2": import.meta.resolve("@mui/material/Unstable_Grid2"),
    //       "@mui/material/Grid2/index.js": import.meta.resolve(
    //         "@mui/material/Unstable_Grid2/index.js"
    //       ),
    //     };
    //   },
    // }),
    json(),
    resolve({
      extensions: [".ts", ".tsx"],
    }),
    cjs(),
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
  external: [
    "react",
    "react-dom",
    /^@mui\/.*$/,
    // "@mui/material/OverridableComponent",
    // "@mui/styled-engine",
    // "@mui/utils",
  ],
};
