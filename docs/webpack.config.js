const path = require("path");

module.exports = {
  entry: "./Docs.tsx",
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "docs.js",
    clean: true,
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-dom/client": "ReactDOM",
    "@mui/material": "@mui/material",
    "@mui/material/Box": "@mui/material/Box",
    "@mui/material/Grid": "@mui/material/Grid",
    "@mui/material/Grid2": "@mui/material/Grid2",
    "@mui/system": "@mui/system",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@mui-flexy/v5": path.resolve(__dirname, "../packages/v5/src"),
      "@mui-flexy/v6": path.resolve(__dirname, "../packages/v6/src"),
      "@mui-flexy/v7": path.resolve(__dirname, "../packages/v7/src"),
      // Add alias for demos/shared
      "demos-shared": path.resolve(__dirname, "../demos/shared"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3003,
    open: false, // Don't auto-open browser
    hot: true,
    liveReload: true,
    client: {
      logging: "info",
    },
    devMiddleware: {
      writeToDisk: false,
      publicPath: "/static/",
    },
  },
};
