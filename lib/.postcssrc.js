const resolveId = require('postcss-import/lib/resolve-id');

const baseAliasReg = /^@\/(.*)/;
const browserAliasReg = '^~\/(.*)';

const resolvePath = require('./utils/resolvePath');
const resolveBrowserPath = require('./utils/resolveBrowserPath');

const getBrowsersList = require('./utils/getBrowsersList');

module.exports = () => {
  return {
    'plugins': {
      'postcss-import': {
        resolve(id, basedir, importOptions) {
          if (id.startsWith('@/')) {
            const matches = id.match(baseAliasReg);

            return resolvePath('browser/base/src/' + matches[1]);
          } else if (id.startsWith('~/')) {
            const matches = id.match(browserAliasReg);

            return resolveBrowserPath('src/' + matches[1]);
          }

          return resolveId(id, basedir, importOptions);
        }
      },
      'postcss-mixins': {},
      'postcss-simple-vars': {},
      'postcss-functions': {
        functions: {}
      },
      'postcss-utilities': {},
      'postcss-calc': {},
      'autoprefixer': {
        browsers: getBrowsersList()
      }
    }
  }
}