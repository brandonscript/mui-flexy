import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import swc from "@rollup/plugin-swc";
// import terser from "@rollup/plugin-terser";
import fs from "fs";
import copy from "rollup-plugin-copy";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// Detect if we're running from docs directory or root directory
const isRunningFromDocs = fs.existsSync("./Docs.tsx");
const inputPath = isRunningFromDocs ? "Docs.tsx" : "docs/Docs.tsx";
const outputPath = isRunningFromDocs ? "static/docs.js" : "docs/static/docs.js";

export default {
  input: inputPath,
  output: {
    file: outputPath,
    format: "es",
    name: "mui-flexy",
    sourcemap: true,
    inlineDynamicImports: true,
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
  plugins: [
    json(),
    peerDepsExternal(),
    resolve({
      extensions: [".ts", ".tsx"],
      browser: true,
      preferBuiltins: false,
      dedupe: ["react", "react-dom"],
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("development"),
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
          react: "React",
        },
      },
      exclude: ["node_modules/**", "dist/**"],
      include: isRunningFromDocs ? ["*.tsx", "../packages/**/*.tsx"] : ["src/**", "docs/**/*.tsx"],
      sourceMaps: true,
    }),
    copy({
      targets: isRunningFromDocs ? [
        { src: "../demos/v7/public/**/*", dest: "." },
        { src: "../flex-logo.svg", dest: "." },
        { src: "../flex-logo.png", dest: "." },
      ] : [
        { src: "demos/v7/public/**/*", dest: "docs" },
        { src: "flex-logo.svg", dest: "docs" },
        { src: "flex-logo.png", dest: "docs" },
      ],
    }),
    // terser({
    //   compress: {
    //     drop_debugger: true,
    //   },
    // }),
  ],
  external: ["react", "react-dom", "react/jsx-runtime", /@mui\/.*$/, /react-syntax-highlighter\/?.*$/],
};
