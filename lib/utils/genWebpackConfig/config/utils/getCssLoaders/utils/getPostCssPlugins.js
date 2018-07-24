const resolveId = require('postcss-import/lib/resolve-id');

const baseAliasReg = /^@\/(.*)/;
const browserAliasReg = '^~\/(.*)';

const resolvePath = require('../../../../..//resolvePath');
const resolveBrowserPath = require('../../../../../resolveBrowserPath');

const getBrowsersList = require('../../../../../getBrowsersList');

module.exports = function getPostCssPlugins() {
  return [
    require('postcss-import')({
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
    }),
    require('postcss-mixins')({

    }),
    require('postcss-simple-vars')({

    }),
    require('postcss-functions')({
      functions: Object.assign(
        {},
        require(
          resolvePath('browser/base/.postcssfunctionrc.js')
        ),
        require(
          resolveBrowserPath('.postcssfunctionrc.js')
        )
      )
    }),
    require('postcss-utilities')({

    }),
    require('postcss-calc')({

    }),
    require('autoprefixer')({
      browsers: getBrowsersList()
    })
  ];
}