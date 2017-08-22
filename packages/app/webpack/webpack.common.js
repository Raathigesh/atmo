const webpack = require("webpack");
const CleanWebpack = require("clean-webpack-plugin");
const HtmlWebpack = require("html-webpack-plugin");
const RewriteImportPlugin = require("less-plugin-rewrite-import");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { join, resolve } = require("path");

const projectRoot = (exports.projectRoot = join(__dirname, ".."));
const isProduction = (exports.isProduction =
  process.env.NODE_ENV === "production");

/**
 * Configuration common paths
 */
const paths = (exports.paths = {
  source: join(projectRoot, "src"),
  images: join(projectRoot, "src/renderer/assets/images"),
  build: join(projectRoot, "app")
});

/**
 * Common configuration between development and production
 */
const config = (exports.config = {
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "../../theme.config$": join(__dirname, "../semantic/theme.config")
    }
  }
});

/**
 * Configuration splitted in functions for modularity
 */
const parts = (exports.parts = {
  lint: () => ({
    module: {
      loaders: [
        {
          test: /\.tsx$/,
          enforce: "pre",
          loader: "tslint-loader"
        }
      ]
    }
  }),

  rendererHotReload: () => ({
    devServer: {
      hot: true,
      host: "localhost",
      port: 8080,
      historyApiFallback: true
    },

    entry: {
      renderer: [
        // "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:8080"
        // "webpack/hot/only-dev-server"
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  }),

  compileTypescript: () => ({
    module: {
      loaders: [
        {
          test: /\.(tsx|ts)?$/,
          loaders: ["awesome-typescript-loader"]
        }
      ]
    }
  }),

  compileJavaScript: () => ({
    module: {
      loaders: [
        {
          test: /\.js?$/,
          include: /prettier/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          }
        }
      ]
    }
  }),

  // Define a variable statically during build process
  setFreeVariable: (key, value) => ({
    plugins: [
      new webpack.DefinePlugin({
        [key]: JSON.stringify(value)
      })
    ]
  }),

  // Minify and optimize code by removing unused code, such as
  // conditions involving variables statically resolved
  // after using setFreeVariable
  minify: () => ({
    plugins: [
      /*new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }) */
    ]
  }),

  loadImages: paths => ({
    module: {
      loaders: [
        {
          test: /\.(png|jpg|gif)$/,
          loader: "file-loader",
          include: paths
        }
      ]
    }
  }),

  loadFonts: paths => ({
    module: {
      loaders: [
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: "url-loader",
          query: {
            name: "fonts/[hash].[ext]"
          },
          include: paths
        }
      ]
    }
  }),

  setupStyles: () => ({
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"]
        },
        {
          test: /\.less/,
          loaders: ["style-loader", "css-loader", "less-loader"]
        }
      ]
    }
  }),

  setupProdStyles: paths => ({
    module: {
      loaders: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader"]
          })
        },
        {
          test: /\.less/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "less-loader"]
          })
        }
      ]
    }
  }),

  createHtmlIndex: template => ({
    plugins: [
      new HtmlWebpack({
        template,

        // Do not append chunks to body as we use `require`
        // directly in template to load renderer chunk
        excludeChunks: ["main"],
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      })
    ]
  }),

  extractCss: () => ({
    plugins: [new ExtractTextPlugin("styles.css")]
  }),

  extractBundle: options => ({
    entry: [options.entry],
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, "manifest"]
      })
    ]
  }),

  clean: path => ({
    plugins: [
      new CleanWebpack([path], {
        root: process.cwd()
      })
    ]
  })
});
