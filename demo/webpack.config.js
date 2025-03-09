const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const muiVersion = require("../node_modules/@mui/material/package.json").version;

const muiMajorVersion = Number(muiVersion.split(".")[0]);

console.log("@mui/material version", muiVersion);

module.exports = {
  output: {
    path: path.join(path.resolve(__dirname, ".."), "/docs"),
    filename: "app.bundle.js",
  },
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
      ...(muiMajorVersion < 6
        ? {
            "@mui/material/Grid2": path.resolve(
              __dirname,
              "../demo/node_modules/@mui/material/Unstable_Grid2"
            ),
          }
        : {}),
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
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
        },
      },
    ],
  },
  stats: {
    modules: false,
  },
};
