const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [path.resolve("../demo/node_modules/")],
    alias: {
      react: path.resolve("../node_modules/react"),
      "react-dom": path.resolve("../node_modules/react-dom"),
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