// @ts-check
import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import-x";
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
      "*.json",
      "*.code-workspace",
    ],
    plugins: {
      "import-x": importPlugin,
      "simple-import-sort": sisPlugin,
      "unused-imports": unusedImportsPlugin,
      "react-hooks": eslintPluginReactHooks,
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
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-duplicates": "error",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "unused-imports/no-unused-imports": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off",
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
  }
);
