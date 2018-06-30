module.exports = function build() {
  const gulp = require('gulp');

  const cleanDist = require('../utils/cleanDist');
  const genManifest = require('../utils/genManifest');
  const genLocales = require('../utils/genLocales');
  const genIcons = require('../utils/genIcons');
  const genExtraStatic = require('../utils/genExtraStatic');

  // 重建产出目录
  gulp.task('cleanDist', cleanDist);

  // 产出manifest
  gulp.task('genManifest', ['cleanDist'], genManifest);

  // 产出不由webpack管理的其他静态资源文件
  gulp.task('genIcons', ['cleanDist'], genIcons);
  gulp.task('genLocales', ['cleanDist'], genLocales);

  gulp.task('genExtraStatic', ['cleanDist'], genExtraStatic);

  // 执行webpack构建
  gulp.task('runWebpack', ['cleanDist'], cb => {
    require('./runWebpack')(cb);
  });

  gulp.task(
    'default',
    [
      'cleanDist',
      'genManifest', 'genIcons', 'genLocales', 'genExtraStatic',
      'runWebpack'
    ]
  );
};