const resolvePath = require('../../resolvePath');
const resolveBrowserPath = require('../../resolveBrowserPath');

const webpack = require('webpack');

const getBabelLoaderOptions = require('./utils/getBabelLoaderOptions');
const getCssLoaders = require('./utils/getCssLoaders');

const baseWebpackConfig = {
  mode: 'none',
  // 别名
  resolve: {
    alias: {
      // 实现用import '@/'来从src文件夹开始定位
      '@': resolvePath('browser/base/src'),
      // 实现用import '~/'来从目标浏览器的src文件夹开始定位
      '~': resolveBrowserPath('src')
    }
  },
  output: {
    // 用于存放编译后文件的文件夹
    path: resolvePath('dist'),
    // 资源访问前缀
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: getBabelLoaderOptions()
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: getCssLoaders(true)
      },
      {
        test: /\.css$/,
        include: resolvePath('node_modules'),
        use: getCssLoaders(false)
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/imgs/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: 'static/audios/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
};

baseWebpackConfig.plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG', 'BROWSER'])
];

module.exports = baseWebpackConfig;