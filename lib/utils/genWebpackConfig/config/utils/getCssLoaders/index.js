const ExtractTextPlugin = require('extract-text-webpack-plugin');
const getPostCssPlugins = require('./utils/getPostCssPlugins');

module.exports = function getCssLoader(forApp) {
  const inDevMode = process.env.NODE_ENV === 'development';

  const loaders = [
    {
      loader: 'css-loader',
      options: {
        modules: forApp,
        sourceMap: inDevMode
      }
    }
  ];

  if (forApp) {
    loaders[0].options.importLoaders = 1;

    loaders
      .push(
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: inDevMode,
            plugins: getPostCssPlugins
          }
        }
      );
  }

  if (inDevMode) {
    loaders
      .unshift(
        {
          loader: 'style-loader',
          options: {
            sourceMap: inDevMode
          }
        }
      );

    return loaders;
  }

  return ExtractTextPlugin
    .extract({
      use: loaders,
      fallback: 'style-loader'
    });
}