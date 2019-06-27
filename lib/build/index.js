module.exports = function build() {
  const chalk = require('chalk');

  const { parallel, series } = require('gulp');

  const webpack = require('webpack');

  const cleanDist = require('../utils/cleanDist');

  const genIcons = require('../utils/genIcons');
  const genLocales = require('../utils/genLocales');

  const genManifestTemplate = require('../utils/genManifestTemplate');
  const genWebpackConfig = require('../utils/genWebpackConfig');

  const genManifest = require('../utils/genManifest');

  let manifestTemplate = null;
  let webpackStats = null;

  const buildTask = series(
    cleanDist,
    parallel(
      genIcons,
      genLocales,
      series(
        async () => {
          manifestTemplate = genManifestTemplate();
        },
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
    
        },
        async () => {
          genManifest(
            manifestTemplate,
            webpackStats
          );
        }
      )
    ),
  );

  buildTask();
};