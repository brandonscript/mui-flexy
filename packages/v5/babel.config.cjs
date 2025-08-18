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
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // Use automatic JSX runtime
      },
    ],
    "@babel/preset-typescript", // Adds support for TypeScript
  ],
  plugins: [],
};
