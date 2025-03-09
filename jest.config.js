/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import { TS_TRANSFORM_PATTERN } from "ts-jest";

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  silent: true,
  transform: {
    [TS_TRANSFORM_PATTERN]: [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        useESM: true,
      },
    ],
  },
  // exclude: ["dist/**", "demo/**", ".rollup.cache/**"],
};
