const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
            sourceMap: inDevMode
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
  } else {
    loaders
      .unshift(
       {
        loader: MiniCssExtractPlugin.loader,
        options: {

        }
       } 
      );
  }

  return loaders;
}