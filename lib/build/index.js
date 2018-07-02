module.exports = function build() {
  const chalk = require('chalk');

  const gulp = require('gulp');

  const webpack = require('webpack');

  const cleanDist = require('../utils/cleanDist');

  const genIcons = require('../utils/genIcons');
  const genLocales = require('../utils/genLocales');

  const genManifestTemplate = require('../utils/genManifestTemplate');
  const genWebpackConfig = require('../utils/genWebpackConfig');

  const genManifest = require('../utils/genManifest');

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
      
      webpack(
        webpackConfig,
        (err, stats) => {
          if (err) {
            cb(err);

            return;
          }

          let curWebpackStats = stats.toJson();

          if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'));
            console.log(
              chalk.red(
                curWebpackStats.errors
              )
            );

            process.exit(1);
            return;
          }

          webpackStats = curWebpackStats;

          cb();
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
    ]
  );

  gulp.start('default');
};