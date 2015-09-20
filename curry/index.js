function curry(func) {
  var neededCount = func.length;

  function curryWrapper(currentArgs, currentArgCount) {
    return function() {
      var nextArgs = [].concat.apply(currentArgs, arguments);
      var nextArgCount = currentArgCount + arguments.length;
      if (nextArgCount >= neededCount) {
        var result = func.apply(this, nextArgs)
        return result;
      } else {
        return curryWrapper(nextArgs, nextArgCount);
      }
    }
  }

  return curryWrapper([], 0);
}
module.exports = curry;