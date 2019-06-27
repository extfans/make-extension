const fs = require('fs-extra')

const resolvePath = require('./resolvePath');

const distFolderPath = resolvePath('dist');

module.exports = function cleanDist(cb) {
  fs.emptyDir(
    distFolderPath,
    cb
  );
}