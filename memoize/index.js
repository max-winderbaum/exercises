function memoize(func) {
	var cached = {};
	return function() {
		var args = [].slice.call(arguments);

		// Note: doesn't work for circular references
		if (!cached[JSON.stringify(args)]) {
			cached[JSON.stringify(args)] = func.apply(null, args);
		}
		return cached;
	}
}

module.exports = memoize;