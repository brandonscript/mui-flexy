const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "../shared"),
          path.resolve(__dirname, "../../packages"),
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@mui-flexy/core": path.resolve(__dirname, "../../packages/core/src"),
      "@mui-flexy/v6": path.resolve(__dirname, "../../packages/v6/src"),
    },
    modules: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "../../node_modules"), "node_modules"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    host: "127.0.0.1", // Force IPv4 only, disable IPv6
    port: 3006,
    hot: true,
    open: false, // Disable auto-opening browser (especially for Playwright tests)
    allowedHosts: "all", // Allow Playwright to access the server
  },
};
