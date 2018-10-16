const getBrowsersList = require('../../../getBrowsersList');

module.exports = function getBabelLoaderOptions() {
  const options = {
    babelrc: false,
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules: false,
          targets: {
            browsers: getBrowsersList()
          }
        }
      ],
      require.resolve('@babel/preset-react')
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-transform-runtime',
        {
          useESModules: true
        }
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ]
    ]
  };

  if (process.env.NODE_ENV === 'production') {
    options.plugins = options.plugins
      .concat([
        'babel-plugin-transform-react-remove-prop-types',
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements'
      ]);
  }

  options.plugins = options.plugins.map(
    plugin => {
      if (Array.isArray(plugin)) {
        plugin[0] = require.resolve(plugin[0]);
      } else {
        plugin = require.resolve(plugin);
      }

      return plugin;
    }
  );

  return options;
}