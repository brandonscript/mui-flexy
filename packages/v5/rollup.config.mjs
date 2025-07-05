import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { swc } from "@rollup/plugin-swc";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const extensions = [".ts", ".tsx"];

export default [
  // ES Module build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve({ extensions }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
      swc({
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          target: "es2020",
        },
        module: {
          type: "es6",
        },
      }),
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { targets: { node: "18" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
        plugins: ["@emotion/babel-plugin"],
      }),
      terser(),
    ],
    external: (id) => {
      return (
        id.startsWith("@mui/") ||
        id.startsWith("@emotion/") ||
        id.startsWith("react") ||
        id.startsWith("@mui-flexy/")
      );
    },
  },
  // CommonJS build
  {
    input: "src/index.ts",
    output: {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve({ extensions }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
      swc({
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          target: "es2020",
        },
        module: {
          type: "commonjs",
        },
      }),
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { targets: { node: "18" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
        plugins: ["@emotion/babel-plugin"],
      }),
      terser(),
    ],
    external: (id) => {
      return (
        id.startsWith("@mui/") ||
        id.startsWith("@emotion/") ||
        id.startsWith("react") ||
        id.startsWith("@mui-flexy/")
      );
    },
  },
]; 