const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "node_modules/swagger-ui-dist/swagger-ui.css",
          to: "swagger-ui/swagger-ui.css",
        },
        {
          from: "node_modules/swagger-ui-dist/swagger-ui-bundle.js",
          to: "swagger-ui/swagger-ui-bundle.js",
        },
        {
          from: "node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js",
          to: "swagger-ui/swagger-ui-standalone-preset.js",
        },
        {
          from: "node_modules/swagger-ui-dist/favicon-16x16.png",
          to: "swagger-ui/favicon-16x16.png",
        },
        {
          from: "node_modules/swagger-ui-dist/favicon-32x32.png",
          to: "swagger-ui/favicon-32x32.png",
        },
      ],
    }),
  ],
};
