const { join } = require("path");
const merge = require("webpack-merge");
const common = require("../webpack.common");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**
 * Webpack Main Process Config :
 * Executed with `webpack --watch` for development
 */
const config = (module.exports = merge(
  common.config,
  {
    target: "electron",
    devtool: "inline-source-map",

    entry: {
      main: join(common.paths.source, "main/main.dev.ts")
    },

    output: {
      path: common.paths.build,
      filename: "[name].js",

      // Write absolute modules paths in sourcemaps
      devtoolModuleFilenameTemplate: "[absolute-resource-path]"
    },

    plugins: [
      new CopyWebpackPlugin([
        { from: "./package.json" },
        { from: "./src/assets" }
      ])
    ]
  },
  // If production, use clean from production config
  common.isProduction ? {} : common.parts.clean(common.paths.build),
  common.parts.compileTypescript(),
  common.parts.lint()
));
