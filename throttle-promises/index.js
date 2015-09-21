function throttlePromises(maxConcurrent, promiseArray) {
	var resultSet = [];
	var promiseIndex = 0;
	var numToComplete = promiseArray.length;
	var numComplete = 0;

	return new Promise(function(resolve) {

		/**
		 * 1. Get and execute the next promise in the array
		 * 2. On promise completion, fill the data into the result set
		 * 3. either resolve the entire result set (the end condition) or recurse
		 */
		function spinupNextPromise() {
			if(promiseArray.length > 0) {
				// Save where we are in the promise array
				var currPromiseIndex = promiseIndex;
				promiseIndex++;

				// Get and execute the next promise
				var nextPromise = promiseArray[currPromiseIndex]();
				nextPromise.then(function(data) {

					// Fill in result set
					resultSet[currPromiseIndex] = data;
					numComplete++;
					if(numComplete >= numToComplete) {

						// end condition - everything's been filled in
						resolve(resultSet);
					} else {

						// recurse
						spinupNextPromise();
					}
				});
			}
		}

		for(var i = 0; i < maxConcurrent; i ++) {
			spinupNextPromise();
		}
	});
}

module.exports = throttlePromises;