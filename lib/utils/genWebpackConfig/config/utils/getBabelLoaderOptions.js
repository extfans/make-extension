const getBrowsersList = require('../../../getBrowsersList');

module.exports = function getBabelLoaderOptions() {
  const options = {
    babelrc: false,
    presets: [
      [
        'env',
        {
          modules: false,
          targets: {
            browsers: getBrowsersList()
          }
        }
      ],
      'stage-2',
      'react'
    ],
    plugins: [
      'transform-runtime',
      'transform-decorators-legacy'
    ]
  };

  if (process.env.NODE_ENV === 'production') {
    options.plugins = options.plugins
      .concat([
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ]);
  }

  return options;
}