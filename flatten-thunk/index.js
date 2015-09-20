function flattenThunk(startFunc) {
  return function(finalCallback) {
    function callback(err, next) {
      if (typeof next !== 'function') {
        finalCallback(null, next);
      } else {
        next(callback);
      }
    }

    startFunc(callback);
  }
}

module.exports = flattenThunk;