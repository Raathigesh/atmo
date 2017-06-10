var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, '../node_modules');

var dir_client = path.resolve(__dirname, '../src/client');
var dir_dist = path.resolve(__dirname, '../dist');

module.exports = {
  entry: [
		path.resolve(dir_client, 'index.jsx')
	],
  output: {
    path: dir_dist, // for standalone building
    publicPath: '/', // for hot building
    filename: 'bundle.js'
  },
  resolve: {
   extensions: ['', '.js', '.jsx']
 },
  module: {
    loaders: [
      {test: /src(\\|\/).+\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
     new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse('false')),
    })
  ],
  stats: {
    colors: true // Nice colored output
  }
};
