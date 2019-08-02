module.exports = function dev() {
  const { series, parallel, watch } = require('gulp');

  const webpack = require('webpack');

  const cleanDist = require('../utils/cleanDist');

  const genIcons = require('../utils/genIcons');
  const genLocales = require('../utils/genLocales');

  const genManifestTemplate = require('../utils/genManifestTemplate');
  const genWebpackConfig = require('../utils/genWebpackConfig');

  const genManifest = require('../utils/genManifest');

  const resolvePath = require('../utils/resolvePath');
  const resolveBrowserPath = require('../utils/resolveBrowserPath');

  let manifestTemplate = null;
  let webpackStats = null;

  const devTask = series(
    cleanDist,
    parallel(
      genIcons,
      genLocales,
      series(
        async () => {
          manifestTemplate = genManifestTemplate();
        },
        cb => {
          let webpackConfig = null;
          try {
            webpackConfig = genWebpackConfig(manifestTemplate);
          } catch(e) {
            cb(e);
            return;
          }

          let compiler = null;
          try {
            compiler = webpack(webpackConfig);
          } catch (e) {
            console.log(e);
            cb(e);
            return;
          }

          let isFirst = true;

          compiler
            .watch(
              {},
              (err, stats) => {
                if (err) {
                  if (isFirst) {
                    isFirst = false;

                    cb(err);
                  }
                  return;
                }

                if (stats.hasErrors()) {
                  return;
                }

                webpackStats = stats.toJson({
                  all: false,
                  entrypoints: true
                });

                if (isFirst) {
                  isFirst = false;

                  cb();
                } else {
                  genManifest(
                    manifestTemplate,
                    webpackStats
                  );
                }
              }
            );
        },
        async () => {
          genManifest(
            manifestTemplate,
            webpackStats
          );
        }
      ),
    ),
    cb => {
      const baseFolderPath = resolvePath('browser/base');
      const browserFolderPath = resolveBrowserPath('');

      watch(
        `${baseFolderPath}/icons/*.png`,
        genIcons
      );

      watch(
        `${baseFolderPath}/_locales/**/*.json`,
        genLocales
      );

      watch(
        [
          `${baseFolderPath}/manifest.json`,
          `${browserFolderPath}/manifest/*.json`
        ],
        async () => {
          manifestTemplate = genManifestTemplate();

          genManifest(
            manifestTemplate,
            webpackStats
          );
        }
      );

      cb();
    }
  );

  devTask();
};