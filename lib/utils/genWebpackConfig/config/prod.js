const merge = require('webpack-merge');

const baseWebpackConfig = require('./base');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(
  baseWebpackConfig,
  {
    devtool: false,
    output: {
      filename: 'static/js/[name].[chunkhash].js',
      chunkFilename: 'static/js/[id].[chunkhash].js'
    },
    optimization: {
      minimize: true,
      minimizer: [
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
          cssProcessorPluginOptions: {
            preset: [
              'default',
              {
                normalizeUrl: false
              }
            ]
          }
        })
      ],
      runtimeChunk: {
        name: 'runtime'
      },
      flagIncludedChunks: true,
      occurrenceOrder: true,
      providedExports: true,
      usedExports: true,
      concatenateModules: true
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css'
      })
    ]
  }
);