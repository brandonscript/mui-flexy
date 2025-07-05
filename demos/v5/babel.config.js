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
    "@babel/preset-react", // Adds support for JSX
    "@babel/preset-typescript", // Adds support for TypeScript
  ],
  plugins: [],
};
