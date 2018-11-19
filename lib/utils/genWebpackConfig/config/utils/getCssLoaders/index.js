const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getPostCssPlugins = require('./utils/getPostCssPlugins');

module.exports = function getCssLoader(forApp) {
  const inDevMode = process.env.NODE_ENV === 'development';

  const loaders = [
    {
      loader: 'css-loader',
      options: {
        modules: forApp,
        sourceMap: inDevMode,
        localIdentName: '[path][name]__[local]'
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

  loaders
    .unshift(
      inDevMode ? {
        loader: 'style-loader',
          options: {
            sourceMap: inDevMode
          }
      } : {
        loader: MiniCssExtractPlugin.loader
      }
    );

  return loaders;
}