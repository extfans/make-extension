const { src, dest } = require('gulp');
const wrapReplaceTask = require('./utils/wrapReplaceTask');

const resolvePath = require('../resolvePath');

const baseFolderPath = resolvePath('browser/base/_locales');
const distFolderPath = resolvePath('dist/_locales');

module.exports = function genLocales() {
  return wrapReplaceTask(
      src(
        `${baseFolderPath}/**/*.json`
      )
  )
  .pipe(
    dest(distFolderPath)
  );
};