function memoize(func) {
	var cached;
	return function() {
		if (!cached) {
			cached = func([].slice.apply(this, arguments));
		}
		return cached;
	}
}