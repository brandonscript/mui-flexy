/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import { TS_TRANSFORM_PATTERN } from "ts-jest";

/** @type {import('jest').Config} */
export default {
  // preset: "ts-jest",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  // silent: true,
  transform: {
    [TS_TRANSFORM_PATTERN]: [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        useESM: true,
      },
    ],
    // "@mui/material/styled/.*\\.js$": "babel-jest",
    // "@mui/system/createStyled/.*\\.js$": "babel-jest",
    // "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest-setup.ts"],
  // snapshotSerializers: [
  //   '@emotion/jest/serializer'
  // ]
  // transformIgnorePatterns: [
  //   "node_modules/@mui/material",
  // ],
  // moduleNameMapper: {
  //   "^@emotion/styled": "@mui/material/styles/styled.js",

  // },
  // exclude: ["dist/**", "demo/**", ".rollup.cache/**"],
};
