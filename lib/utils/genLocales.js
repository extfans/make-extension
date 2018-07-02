const gulp = require('gulp');
const resolvePath = require('./resolvePath');

const baseFolderPath = resolvePath('browser/base/_locales');
const distFolderPath = resolvePath('dist/_locales');

module.exports = function genLocales() {
  return gulp
    .src(
      `${baseFolderPath}/**/*.json`
    )
    .pipe(
      gulp.dest(distFolderPath)
    );
};