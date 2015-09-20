
function sequence(funcs) {

  return function(lastCallback) {
    var funcIndex = 0;
    var callback = function(err, data) {
      funcIndex++;
      if (funcIndex >= funcs.length) {
        lastCallback(err, data);
      }

      funcs[funcIndex](callback, data);
    };

    funcs[funcIndex](callback);
  }
}

function parallel(funcs) {
  return function(lastCallback) {
    var funcsCompleted = 0;
    var funcResults = [];

    var index = 0;
    var callbackWrapper = function() {
      var currentIndex = index;
      index++;

        return function(err, data) {
          funcResults[currentIndex] = data;
          funcsCompleted++;
          if (funcsCompleted === funcs.length) {
            lastCallback(null, funcResults);
          }
        }
    };

    funcs.forEach(function(func) {
      func(callbackWrapper());
    });
  }
}

function race(funcs) {
  return function(winnerCallback) {
    var winnerFound = false;
    var callback = function(err, data) {
      if (!winnerFound) {
        winnerFound = true;
        winnerCallback(null, data);
      }
    }

    funcs.forEach(function(func) {
      func(callback);
    });
  }
}

module.exports = {
  sequence: sequence,
  parallel: parallel,
  race: race
}