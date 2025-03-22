/** @type {import("prettier").Config} */
module.exports = {
  plugins: [],
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  bracketSpacing: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
    },
  ],
};
