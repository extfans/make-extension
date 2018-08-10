const webpack = require('webpack');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./base');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(
  baseWebpackConfig,
  {
    devtool: false,
    output: {
      filename: 'static/js/[name].[chunkhash].js',
      chunkFilename: 'static/js/[id].[chunkhash].js'
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            reduce_vars: false,
            reduce_funcs: false
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
      new ExtractTextPlugin({
        filename: 'static/css/[name].[contenthash].css',
        allChunks: true
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        minChunks: 2,
        async: true,
        children: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      })
    ]
  }
);