function flattenWrapper(array) {
  var flattened = [];

  function flatten(curr) {
    if (isArray(curr)) {
      curr.forEach(function(item) {
        flatten(item);
      });
    } else {
      flattened.push(curr);
    }
  }

  flatten(array);
  return flattened;
}

function isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]';
}

module.exports = flattenWrapper;