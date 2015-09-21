function once(func) {
	var called = false;

	return function() {
		if (!called) {
			called = true;
			func.apply(this, [].slice.call(arguments));
		}
	}
}

module.exports = once;