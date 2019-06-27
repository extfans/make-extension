const { src, dest } = require('gulp');
const resolvePath = require('./resolvePath');

const baseFolderPath = resolvePath('browser/base/icons');
const distFolderPath = resolvePath('dist/icons');

module.exports = function genIcons() {
  return src(
      `${baseFolderPath}/*.png`
    )
    .pipe(
      dest(distFolderPath)
    );
};