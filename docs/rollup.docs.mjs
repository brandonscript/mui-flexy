import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { dirname, join } from 'path';
import copy from "rollup-plugin-copy";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { swc } from "rollup-plugin-swc3";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log("📦 Bundling packages for docs...");
console.log("🔧 Node version:", process.version);
console.log("🔧 Working directory:", process.cwd());
console.log("🔧 Root directory:", rootDir);



const packages = [
  { name: 'core', input: join(rootDir, 'packages/core/src/index.ts') },
  { name: 'v5', input: join(rootDir, 'packages/v5/src/index.ts') },
  { name: 'v6', input: join(rootDir, 'packages/v6/src/index.ts') },
  { name: 'v7', input: join(rootDir, 'packages/v7/src/index.ts') },
];

// Package bundles configuration
const packageBundles = packages.map(pkg => ({
  input: pkg.input,
  output: {
    file: `static/${pkg.name}.js`,
    format: 'es',
    sourcemap: false,
  },
  external: [
    'react',
    'react/jsx-runtime',
    'react-dom',
    '@mui/material',
    '@mui/material/Box',
    '@mui/material/Grid',
    '@mui/system',
    '@emotion/react',
    '@emotion/styled',
    // External packages should reference each other
    ...(pkg.name !== 'core' ? ['@mui-flexy/core'] : []),
  ],
  plugins: [
    // Use SWC for reliable TypeScript compilation across all environments
    swc({
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
          dynamicImport: true,
          decorators: true,
        },
        transform: {
          react: {
            runtime: "automatic",
          },
        },
        target: "esnext",
      },
      module: {
        type: "es6",
      },
      exclude: ["../node_modules/**", "../**/node_modules/**", "../dist/**", "../**/dist/**", "../**/*.test.*", "../**/*.spec.*"],
      include: ["../**/*.ts", "../**/*.tsx"],
      sourceMaps: false,
    }),
    resolve({
      preferBuiltins: false,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
      // Define process for browser compatibility
      'typeof process': JSON.stringify('undefined'),
    }),
    commonjs(),
  ],
  onwarn(warning, warn) {
    // Suppress circular dependency warnings for React ecosystem
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    // Suppress "use client" directive warnings when bundling
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
    warn(warning);
  },
}));

// Docs app configuration
const docsConfig = {
  input: "Docs.tsx",
  output: {
    file: "static/docs.js",
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
        },
        transform: {
          react: {
            runtime: "automatic",
          },
        },
      },
      exclude: ["node_modules/**", "dist/**"],
      include: ["*.tsx", "types.d.ts", "../packages/**/*.tsx"],
      sourceMaps: true,
    }),
    copy({
      targets: [
        { src: "../demos/v7/public/**/*", dest: "." },
        { src: "../flex-logo.svg", dest: "." },
        { src: "../flex-logo.png", dest: "." },
        { 
          src: "index.template.html", 
          dest: ".", 
          rename: "index.html",
          transform: (contents) => {
            const basePath = process.env.BASEPATH || ".";
            return contents.toString().replace(/__BASEPATH__/g, basePath);
          }
        },
      ],
    }),
  ],
  external: ["react", "react-dom", "react/jsx-runtime", /@mui\/.*$/, /react-syntax-highlighter\/?.*$/],
};

// Export both configurations - packages first, then docs
export default [...packageBundles, docsConfig];
