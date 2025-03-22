import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import swc from "@rollup/plugin-swc";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "docs/Docs.tsx",
  output: {
    file: "docs/static/docs.js",
    format: "es",
    name: "MuiFlexy",
    sourcemap: true,
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
      include: ["src/**", "demo/src/**", "docs/**/*.tsx"],
      sourceMaps: true,
    }),
    copy({
      targets: [{ src: "demo/public/**/*", dest: "docs" }],
    }),
    terser({
      compress: {
        drop_debugger: true,
      },
    }),
  ],
  external: ["react", "react-dom", /@mui\/.*$/, /react-syntax-highlighter\/?.*$/],
};
