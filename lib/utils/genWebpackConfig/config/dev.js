const merge = require('webpack-merge');

const baseWebpackConfig = require('./base');

module.exports = merge(
  baseWebpackConfig,
  {
    devtool: '#cheap-module-eval-source-map',
    output: {
      filename: 'static/js/[id].js',
      chunkFilename: 'static/js/[id].js'
    },
    plugins: [],
    performance: {
      hints: false
    }
  }
);