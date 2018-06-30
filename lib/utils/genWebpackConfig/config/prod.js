const webpack = require('webpack');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./base');

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(
  baseWebpackConfig,
  {
    devtool: false,
    output: {
      filename: 'static/js/[name].[chunkhash].js',
      chunkFilename: 'static/js/[id].[chunkhash].js'
    },
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: false,
        parallel: true
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
      new OptimizeCSSAssetsPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[id].[contenthash].css'
      })
      // new webpack.optimize.ModuleConcatenationPlugin(),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'manifest',
      //   minChunks: Infinity
      // })
    ]
  }
);