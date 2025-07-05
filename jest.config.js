/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import { TS_TRANSFORM_PATTERN } from "ts-jest";

/** @type {import('jest').Config} */
export default {
  // Root configuration for monorepo
  projects: ["<rootDir>/packages/core", "<rootDir>/packages/v5", "<rootDir>/packages/v6", "<rootDir>/packages/v7"],

  // Global settings
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Transform configuration
  transform: {
    [TS_TRANSFORM_PATTERN]: [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        useESM: true,
      },
    ],
  },

  // Global setup
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest-setup.ts"],

  // Module resolution for monorepo
  moduleNameMapper: {
    "^@mui-flexy/core$": "<rootDir>/packages/core/src",
    "^@mui-flexy/core/(.*)$": "<rootDir>/packages/core/src/$1",
  },

  // Coverage collection
  collectCoverageFrom: [
    "packages/*/src/**/*.{ts,tsx}",
    "!packages/*/src/**/*.d.ts",
    "!packages/*/src/**/*.test.{ts,tsx}",
  ],

  // Test match patterns
  testMatch: ["<rootDir>/packages/*/src/**/*.test.{ts,tsx}"],

  // Ignore patterns
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/lib/", "/build/"],

  // Transform ignore patterns
  transformIgnorePatterns: ["node_modules/(?!(@mui|@emotion)/)"],
};
