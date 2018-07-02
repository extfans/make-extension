const traversal = require('../../traversal');

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

  return points;
};