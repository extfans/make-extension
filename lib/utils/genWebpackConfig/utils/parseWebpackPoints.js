const traversal = require('../../traversal');

const resolvePath = require('../../resolvePath');
const resolveBrowserPath = require('../../resolveBrowserPath');

const { isSrcPath } = require('../../typeCheck');
const parseWebpackPoint = require('../../parseWebpackPoint');

module.exports = function parseWebpackPoints(manifestTemplate) {
  const points = [];

  traversal(
    manifestTemplate,
    str => {
      if (isSrcPath(str)) {
        const point = parseWebpackPoint(str);

        points.push(point);
      }
    }
  );

  const extraPoints = [
    ...require(resolvePath('browser/base/.pointrc.js')),
    ...require(resolveBrowserPath('.pointrc.js'))
  ]
  .map(
    path => {
      return parseWebpackPoint(path);
    }
  );

  return points.concat(extraPoints);
};