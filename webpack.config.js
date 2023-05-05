const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const Package = require("./package.json");

const isProd = process.argv.indexOf("--prod") !== -1;
const filename = Package.name + (isProd ? ".min" : "");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: path.join(__dirname, `src/index.tsx`),
  },
  output: {
    path: path.join(__dirname, "dist"),
    chunkFilename: "chunks/[id].js",
    publicPath: "",
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.dist.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: isProd,
          mangle: isProd,
        },
        exclude: [/\.min\.js$/gi], // skip pre-minified libs
      }),
    ],
  },
};
