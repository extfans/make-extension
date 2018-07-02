const webpack = require('webpack');
const merge = require('webpack-merge');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const baseWebpackConfig = require('./base');

module.exports = merge(
  baseWebpackConfig,
  {
    devtool: 'cheap-module-eval-source-map',
    output: {
      filename: 'static/js/[id].js',
      chunkFilename: 'static/js/[id].js'
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin()
    ],
    performance: {
      hints: false
    }
  }
);