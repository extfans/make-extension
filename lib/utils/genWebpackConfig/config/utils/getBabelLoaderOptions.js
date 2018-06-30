const getBrowsersList = require('../../../getBrowsersList');

module.exports = function getBabelLoaderOptions() {
  const options = {
    babelrc: false,
    presets: [
      [
        require.resolve('babel-preset-env'),
        {
          modules: false,
          targets: {
            browsers: getBrowsersList()
          }
        }
      ],
      require.resolve('babel-preset-stage-2'),
      require.resolve('babel-preset-react')
    ],
    plugins: [
      'babel-plugin-transform-runtime',
      'babel-plugin-transform-decorators-legacy'
    ]
  };

  if (process.env.NODE_ENV === 'production') {
    options.plugins = options.plugins
      .concat([
        'babel-plugin-transform-react-remove-prop-types',
        'babel-plugin-transform-react-constant-elements',
        'babel-plugin-transform-react-inline-elements'
      ]);
  }

  options.plugins = options.plugins.map(require.resolve);

  return options;
}