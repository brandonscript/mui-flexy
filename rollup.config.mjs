import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { readFileSync } from "fs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const muiPkg = JSON.parse(readFileSync("./node_modules/@mui/material/package.json", "utf8"));

const muiVersion = muiPkg?.version;

// eslint-disable-next-line no-undef
console.log("rollup building mui-flexy for @mui/material version", muiVersion);

const aliasEntries = muiVersion => [
  {
    find: "@mui/material/Grid2",
    replacement: `@mui/material/${muiVersion < 6 ? "Unstable_Grid2" : muiVersion >= 7 ? "Grid" : "Grid2"}`,
  },
  {
    find: "@mui/material/Unstable_Grid2",
    replacement: `@mui/material/${muiVersion < 6 ? "Unstable_Grid2" : muiVersion >= 7 ? "Grid" : "Grid2"}`,
  },
];

const replaceEntries = muiVersion => ({
  preventAssignment: true,
  delimiters: ["", ""],
  include: ["src/**/*.ts", "src/**/*.tsx"],
  "process.env.NODE_ENV": JSON.stringify("production"),
  ...(muiVersion < 6
    ? {
        "@mui/material/Grid2": "@mui/material/Unstable_Grid2",
      }
    : muiVersion >= 7
    ? {
        "@mui/material/Grid2": "@mui/material/Grid",
        "@mui/material/Unstable_Grid2": "@mui/material/Grid",
      }
    : {
        "@mui/material/Unstable_Grid2": "@mui/material/Grid2",
      }),
});

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
      entryFileNames: "[name].js",
      globals: {
        "react/jsx-runtime": "jsxRuntime",
        "react-dom/client": "ReactDOM",
        react: "React",
      },
    },
    // Removed CommonJS support as of v1.2.0
    // {
    //   dir: "dist/cjs",
    //   format: "cjs",
    //   exports: "named",
    //   sourcemap: true,
    //   strict: false,
    //   preserveModules: true,
    //   preserveModulesRoot: "src",
    //   entryFileNames: "[name].cjs",
    // },
  ],
  plugins: [
    json(),
    peerDepsExternal(),
    resolve({
      extensions: [".ts", ".tsx"],
      dedupe: ["react", "react-dom", "@mui/material", "@mui/system", "@emotion/*"],
    }),
    alias({
      entries: aliasEntries(muiVersion),
    }),
    babel({
      extensions: [".ts", ".tsx"],
      babelHelpers: "bundled",
      exclude: ["node_modules/**", "dist/**", "demo/**", "tests/**"],
      include: ["src/**"],
      presets: [
        "@babel/preset-env",
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
        "@babel/preset-typescript",
      ],
    }),
    replace(replaceEntries(muiVersion)),
  ],
  external: ["react", "react-dom", /^@mui\/.*$/],
};
