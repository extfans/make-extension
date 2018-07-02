module.exports = function dev() {
  const gulp = require('gulp');
  const gulpWatch = require('gulp-watch');

  const webpack = require('webpack');

  const cleanDist = require('../utils/cleanDist');

  const genIcons = require('../utils/genIcons');
  const genLocales = require('../utils/genLocales');

  const genManifestTemplate = require('../utils/genManifestTemplate');
  const genWebpackConfig = require('../utils/genWebpackConfig');

  const genManifest = require('../utils/genManifest');

  const resolvePath = require('../utils/resolvePath');
  const resolveBrowserPath = require('../utils/resolveBrowserPath');

  let manifestTemplate;
  let webpackStats;

  gulp.task(
    'cleanDist',
    cleanDist
  );

  gulp.task(
    'genIcons',
    ['cleanDist'],
    genIcons
  );

  gulp.task(
    'genLocales',
    ['cleanDist'],
    genLocales
  );

  gulp.task(
    'genManifestTemplate',
    () => {
      manifestTemplate = genManifestTemplate();
    }
  );

  gulp.task(
    'runWebpack',
    ['genManifestTemplate'],
    cb => {
      const webpackConfig = genWebpackConfig(manifestTemplate);
      const compiler = webpack(webpackConfig);

      let isFirst = true;

      compiler
        .watch(
          {

          },
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

            require('jsonfile')
              .writeFileSync(
                require('../utils/resolvePath')('dd.json'),
                webpackStats,
                {
                  spaces: 2
                }
              );

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
    }
  );

  gulp.task(
    'genManifest',
    ['runWebpack'],
    () => {
      genManifest(
        manifestTemplate,
        webpackStats
      );
    }
  );

  gulp.task(
    'default',
    [
      'cleanDist',
      'genIcons',
      'genLocales',
      'genManifestTemplate',
      'runWebpack',
      'genManifest'
    ],
    () => {
      const baseFolderPath = resolvePath('browser/base');
      const browserFolderPath = resolveBrowserPath('');

      gulpWatch(
        `${baseFolderPath}/manifest.json`,
        () => {
          manifestTemplate = genManifestTemplate();

          genManifest(
            manifestTemplate,
            webpackStats
          );
        }
      );

      gulpWatch(
        `${browserFolderPath}/manifest/*.json`,
        () => {
          manifestTemplate = genManifestTemplate();

          genManifest(
            manifestTemplate,
            webpackStats
          );
        }
      );

      gulpWatch(
        `${baseFolderPath}/icons/*.png`,
        genIcons
      );

      gulpWatch(
        `${baseFolderPath}/_locales/**/*.json`,
        genLocales
      );
    }
  );

  gulp.start('default');
};