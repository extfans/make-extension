function is(val, type) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

exports.isString = function isString(val) {
  return is(val, 'String');
};

exports.isObject = function isObject(val) {
  return is(val, 'Object');
};

exports.isArray = function isArray(val) {
  return is(val, 'Array');
};

exports.isSrcPath = function isSrcPath(val) {
  return val.startsWith('@/') || val.startsWith('~/');
};