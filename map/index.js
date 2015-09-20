function map(array, func, ctx) {
	var newArray = [];

	for(var i=0; i<array.length; i++) {
		newArray.push(func.call(ctx, array[i], i, array));
	}

	return newArray;
}

module.exports = map;