// @ts-check
import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import-x";
import jestdom from "eslint-plugin-jest-dom";
import react from "eslint-plugin-react";
import _eslintPluginReactHooks from "eslint-plugin-react-hooks";
import sisPlugin from "eslint-plugin-simple-import-sort";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const eslintPluginReactHooks = fixupPluginRules(
  /** @type {import("@eslint/compat").FixupPluginDefinition} */ (_eslintPluginReactHooks)
);

const reactConfigs = {
  ...(react.configs.flat?.recommended ?? {}),
  ...(react.configs.flat?.["jsx-runtime"] ?? {}),
};

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  
  reactConfigs,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/dist/**",
      "**/build/**",
      "**/docs/static/*.js",
      "**/demos/*/dist/**",
      "*.json",
      "*.code-workspace",
      // Additional generated files
      "**/bundle.js",
      "**/bundle.js.map",
      "**/*.d.ts.map",
    ],
    plugins: {
      "import-x": importPlugin,
      "simple-import-sort": sisPlugin,
      "unused-imports": unusedImportsPlugin,
      "react-hooks": eslintPluginReactHooks,
      "jest-dom": jestdom,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
        },
      ],
      "react/require-render-return": "error",
      "react/jsx-no-useless-fragment": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-duplicates": "error",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "unused-imports/no-unused-imports": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off",
      "jest-dom/prefer-checked": "error",
      "jest-dom/prefer-enabled-disabled": "error",
      "jest-dom/prefer-required": "error",
      "jest-dom/prefer-to-have-attribute": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: "tsconfig.json",
        }),
      ],
    },
  },
  // Special configuration for package source files - enable import sorting
  {
    files: ["packages/**/*.{js,jsx,ts,tsx}"],
    ignores: ["packages/*/dist/**", "packages/*/build/**"],
    plugins: {
      "import-x": importPlugin,
      "simple-import-sort": sisPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      // Enable automatic import sorting and cleanup
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Enforce import type usage
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
          fixStyle: "separate-type-imports",
        },
      ],
      // Additional import rules for better organization
      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-duplicates": "error",
    },
  },
  // Special configuration for demo apps - allow explicit any and enable import sorting
  {
    files: ["demos/**/*.{js,jsx,ts,tsx}"],
    ignores: ["demos/*/dist/**"],
    plugins: {
      "import-x": importPlugin,
      "simple-import-sort": sisPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // Enable automatic import sorting and cleanup
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Enforce import type usage
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
          fixStyle: "separate-type-imports",
        },
      ],
      // Additional import rules for better organization
      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-duplicates": "error",
    },
  },
  // Special configuration for webpack config files
  {
    files: ["**/webpack.config.js", "**/webpack.*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        __filename: "readonly",
        module: "writable",
        require: "readonly",
        process: "readonly",
        Buffer: "readonly",
        global: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "import-x/no-commonjs": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Special configuration for babel config files
  {
    files: ["**/babel.config.js", "**/babel.*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "writable",
      },
    },
    rules: {
      "import-x/no-commonjs": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Special configuration for Node.js server files
  {
    files: ["**/dev-server.js", "**/server.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        global: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
  },
  // Special configuration for generated/built files
  {
    files: ["**/dist/**", "**/build/**", "**/docs/static/**", "**/bundle.js"],
    rules: {
      // Disable most rules for generated files
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-undef": "off",
      "no-empty": "off",
      "no-fallthrough": "off",
      "no-cond-assign": "off",
      "no-func-assign": "off",
      "no-useless-escape": "off",
      "no-prototype-builtins": "off",
      "no-unsafe-finally": "off",
      "no-control-regex": "off",
      "no-misleading-character-class": "off",
      "getter-return": "off",
      "valid-typeof": "off",
      "console": "off",
    },
  }
);
