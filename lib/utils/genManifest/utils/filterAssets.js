const { isString } = require('../../typeCheck');
const getExtName = require('../../getExtName');

module.exports = function filterAssets(assets, type) {
  if (isString(assets)) {
    if (type === 'js') {
      assets = [assets];
    } else {
      assets = [];
    }
    return assets;
  }

  return assets
    .filter(
      asset => {
        return getExtName(asset) === type;
      }
    );
};