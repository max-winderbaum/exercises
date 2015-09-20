function merkleWrapper(array, hash) {
	makeEven(array);

	function merkle(array) {
		if (array.length === 1) {
			return array[0];
		}

		var merkled = [];
		for(var i=0; i<array.length; i = i + 2) {
			merkled.push(hash(array[i] + array[i+1]));
		}
		return merkle(merkled);
	}

	return merkle(array);
}

function makeEven(array) {
	if (array.length % 2 === 1) {
		array.push(array[array.length - 1]);
	}
}

module.exports = merkleWrapper;