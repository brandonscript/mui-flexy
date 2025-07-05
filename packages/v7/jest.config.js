export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/../../jest-setup.ts"],
  moduleNameMapper: {
    "^@mui-flexy/core$": "<rootDir>/../core/src/index.ts",
    "^@mui-flexy/test-utils$": "<rootDir>/../test-utils/src/index.ts",
  },
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/**/*.test.{ts,tsx}", "!src/**/*.spec.{ts,tsx}"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
