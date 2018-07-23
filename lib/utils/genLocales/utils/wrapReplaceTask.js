const fs = require('fs');
const replace = require('gulp-replace');
const resolveBrowserPath = require('../../resolveBrowserPath');

module.exports = function wrapReplaceTask(gulp) {
  const i18nPath = resolveBrowserPath('.i18n.js');

  if (!fs.existsSync(i18nPath)) {
    return gulp
  }

  const i18n = require(i18nPath);

  Object.keys(
    i18n
  )
  .forEach(
    key => {
      gulp = gulp.pipe(
        replace(
          `{{${key}}}`,
          i18n[key]
        )
      );
    }
  );

  return gulp;
}