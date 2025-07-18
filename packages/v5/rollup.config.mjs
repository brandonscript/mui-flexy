import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: ["src/index.ts"],
  output: [
    {
      dir: "dist",
      format: "es",
      exports: "named",
      sourcemap: true,
      strict: false,
      preserveModules: true,
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
    peerDepsExternal(),
    resolve({
      extensions: [".ts", ".tsx"],
      dedupe: ["react", "react-dom", "@mui/material", "@mui/system", "@emotion/*"],
    }),

    babel({
      extensions: [".ts", ".tsx"],
      babelHelpers: "bundled",
      exclude: ["node_modules/**", "dist/**"],
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
    replace({
      preventAssignment: true,
      delimiters: ["", ""],
      include: ["src/**/*.ts", "src/**/*.tsx"],
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
  external: ["react", "react-dom", /^@mui\/.*$/, "@mui-flexy/core"],
}; 