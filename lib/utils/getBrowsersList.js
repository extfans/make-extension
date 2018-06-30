const resolveBrowserPath = require('./resolveBrowserPath');
const fs = require('fs');

module.exports = function getBrowsersList() {
  return fs
    .readFileSync(
      resolveBrowserPath(
        '.browserslistrc'
      ),
      'UTF-8'
    )
    .trim()
    .split('\n');
}