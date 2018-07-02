const gulp = require('gulp');
const resolvePath = require('./resolvePath');

const baseFolderPath = resolvePath('browser/base/icons');
const distFolderPath = resolvePath('dist/icons');

module.exports = function genIcons() {
  return gulp
    .src(
      `${baseFolderPath}/*.png`
    )
    .pipe(
      gulp.dest(distFolderPath)
    );
};