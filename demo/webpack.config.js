/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const muiVersion = require("@mui/material/version").default;
const muiMajorVersion = require("@mui/material/version").major;

console.log("@mui/material version", muiVersion);

const grid2Resolve = path.resolve(
  `./node_modules/@mui/material/${muiMajorVersion < 6 ? "Unstable_Grid2" : muiMajorVersion >= 7 ? "Grid" : "Grid2"}`,
);

console.log("Demo webpack.config.js using Grid2 path", grid2Resolve);

// verify the Grid2 resolve path exists and is a directory
if (!path.isAbsolute(grid2Resolve)) {
  throw new Error(`Grid2 resolve path doesn't exist: ${grid2Resolve}`);
}

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/template.html",
    }),
  ],
  devServer: {
    port: 8472,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [path.resolve("../demo/node_modules/")],
    alias: {
      react: path.resolve("../node_modules/react"),
      "react-dom": path.resolve("../node_modules/react-dom"),
      "@mui/material/Grid2": grid2Resolve,
      "@mui/material/Unstable_Grid2": grid2Resolve,
    },
  },
  resolveLoader: {
    modules: [path.resolve("../demo/node_modules/")],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }], "@babel/preset-typescript"],
        },
      },
    ],
  },
  stats: {
    modules: false,
  },
};
