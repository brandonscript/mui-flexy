module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-react", // Adds support for JSX
    "@babel/preset-typescript", // Adds support for TypeScript
  ],
  plugins: [],
};
