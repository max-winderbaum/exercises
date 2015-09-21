function throttle(func, milliseconds) {
	var waiting, args, ctx, queue = 0;

	function processQueue() {
		if (queue > 0) {
			waiting = true;
			func.apply(ctx, args);

			setTimeout(function() {
				processQueue();
			}, milliseconds + 1);
		} else {
			waiting = false;
		}
	}

	return function() {
		queue++;
		args = [].slice.call(arguments);
		ctx = this;
		if (!waiting) {
			processQueue();
		}
	}
}

module.exports = throttle;