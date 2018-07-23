const replace = require('gulp-replace');
const resolveBrowserPath = require('../../resolveBrowserPath');

module.exports = function wrapReplaceTask(gulp) {
  const i18n = require(
    resolveBrowserPath('.i18n.js')
  );

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