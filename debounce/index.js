function debounce(func, duration) {
  var currentTimer;
  return function() {
    var args = [].slice.call(arguments);
    var that = this;
    if (currentTimer) {
      clearTimeout(currentTimer);
      currentTimer = undefined;
    }
    currentTimer = setTimeout(function() {
      func.apply(that, args);
    }, duration);
  }
}

module.exports = debounce;