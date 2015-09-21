function throttlePromises(maxConcurrent, promiseArray) {
	var resultSet = [];
	var lastChunk = false;
	return new Promise(function(resolve) {
		function next() {
			var chunk = grabChunk(promiseArray, maxConcurrent);
			console.log(Promise.all.toString());
			Promise.all(chunk).then(function(results) {
				console.log(executing);
				resultSet = resultSet.concat(results);
				if (lastChunk) {
					resolve(resultSet);
					return;
				}
				next();
			});
		}
		next();
	});

	function grabChunk(promiseArray, size) {
		if (promiseArray.length <= size) {
			lastChunk = true;
		}
		var chunk = [];
		var current;
		for(var i=0; i<size; i++) {
			current = promiseArray.shift();
			if (current) {
				chunk.push(current());
			}
		}
		return chunk;
	}
}



module.exports = throttlePromises;