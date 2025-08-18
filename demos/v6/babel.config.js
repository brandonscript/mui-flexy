module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions"],
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
