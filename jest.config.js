/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import { TS_TRANSFORM_PATTERN } from "ts-jest";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);

const mapModules = (version) => {
  const packageDir = resolve(`packages/${version}`);
  const materialDir = dirname(require.resolve("@mui/material/package.json", { paths: [packageDir] }));
  // Resolve transitive utilities through each MUI version, including pnpm's isolated layout.
  const utilsDir = dirname(require.resolve("@mui/utils/package.json", { paths: [materialDir] }));
  return {
    "^@mui/material$": `<rootDir>/packages/${version}/node_modules/@mui/material`,
    "^@mui/material/(.*)$": `<rootDir>/packages/${version}/node_modules/@mui/material/$1`,
    "^@mui/system$": `<rootDir>/packages/${version}/node_modules/@mui/system`,
    "^@mui/system/(.*)$": `<rootDir>/packages/${version}/node_modules/@mui/system/$1`,
    "^@mui/styles$": `<rootDir>/packages/${version}/node_modules/@mui/styles`,
    "^@mui/styles/(.*)$": `<rootDir>/packages/${version}/node_modules/@mui/styles/$1`,
    "^@mui/utils$": utilsDir,
    "^@mui/utils/(.*)$": `${utilsDir}/$1`,
    "^@emotion/react$": `<rootDir>/packages/${version}/node_modules/@emotion/react`,
    "^@emotion/styled$": `<rootDir>/packages/${version}/node_modules/@emotion/styled`,
    "^@emotion/cache$": `<rootDir>/packages/${version}/node_modules/@emotion/cache`,
    "^react$": `<rootDir>/packages/${version}/node_modules/react`,
    "^react-dom$": `<rootDir>/packages/${version}/node_modules/react-dom`,
  };
};

/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest-setup.ts"],
  transform: {
    [TS_TRANSFORM_PATTERN]: [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        useESM: false,
      },
    ],
  },
  moduleNameMapper: {
    "^@mui-flexy/core$": "<rootDir>/packages/core/src",
    "^@mui-flexy/v5$": "<rootDir>/packages/v5/src",
    "^@mui-flexy/v6$": "<rootDir>/packages/v6/src",
    "^@mui-flexy/v7$": "<rootDir>/packages/v7/src",
    "^@mui-flexy/v9$": "<rootDir>/packages/v9/src",
  },
  projects: [
    {
      displayName: "core-tests",
      testMatch: ["<rootDir>/tests/unit/core/**/*.test.{ts,tsx}"],
      preset: "ts-jest",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
      moduleNameMapper: {
        "^@mui-flexy/core$": "<rootDir>/packages/core/src",
      },
    },
    {
      displayName: "v5-tests",
      testMatch: ["<rootDir>/tests/unit/v5/**/*.test.{ts,tsx}"],
      preset: "ts-jest",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
      transform: {
        [TS_TRANSFORM_PATTERN]: [
          "ts-jest",
          {
            tsconfig: "<rootDir>/tests/unit/v5/tsconfig.json",
            useESM: false,
          },
        ],
      },
      moduleNameMapper: {
        "^@mui-flexy/core$": "<rootDir>/packages/core/src",
        "^@mui-flexy/v5$": "<rootDir>/packages/v5/src",
        ...mapModules("v5"),
      },
    },
    {
      displayName: "v6-tests",
      testMatch: ["<rootDir>/tests/unit/v6/**/*.test.{ts,tsx}"],
      preset: "ts-jest",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
      transform: {
        [TS_TRANSFORM_PATTERN]: [
          "ts-jest",
          {
            tsconfig: "<rootDir>/tests/unit/v6/tsconfig.json",
            useESM: false,
          },
        ],
      },
      moduleNameMapper: {
        "^@mui-flexy/core$": "<rootDir>/packages/core/src",
        "^@mui-flexy/v6$": "<rootDir>/packages/v6/src",
        ...mapModules("v6"),
      },
    },
    {
      displayName: "v7-tests",
      testMatch: ["<rootDir>/tests/unit/v7/**/*.test.{ts,tsx}"],
      preset: "ts-jest",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
      transform: {
        [TS_TRANSFORM_PATTERN]: [
          "ts-jest",
          {
            tsconfig: "<rootDir>/tests/unit/v7/tsconfig.json",
            useESM: false,
          },
        ],
      },
      moduleNameMapper: {
        "^@mui-flexy/core$": "<rootDir>/packages/core/src",
        "^@mui-flexy/v7$": "<rootDir>/packages/v7/src",
        ...mapModules("v7"),
      },
    },
    {
      displayName: "v9-tests",
      testMatch: ["<rootDir>/tests/unit/v9/**/*.test.{ts,tsx}"],
      preset: "ts-jest",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
      transform: {
        [TS_TRANSFORM_PATTERN]: [
          "ts-jest",
          {
            tsconfig: "<rootDir>/tests/unit/v9/tsconfig.json",
            useESM: false,
          },
        ],
      },
      moduleNameMapper: {
        "^@mui-flexy/core$": "<rootDir>/packages/core/src",
        "^@mui-flexy/v9$": "<rootDir>/packages/v9/src",
        ...mapModules("v9"),
      },
    },
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/fixtures/", "/docs/", "/playwright-report/", "/test-results/"],
  collectCoverageFrom: [
    "packages/*/src/**/*.{ts,tsx}",
    "!packages/*/src/**/*.test.{ts,tsx}",
    "!packages/*/src/**/*.d.ts",
    "!tests/**/*",
  ],
};
