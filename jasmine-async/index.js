function itWill(func) {
	var options = func();
	it(options.desc, function() {
		var completed = false;
		var done = function() {
			completed = true;
		};
		runs(function() {
			options.setup(done)
		});
		waitsFor(function() {
			return completed;
		});
		runs(options.test);
	});
}

module.exports = itWill;