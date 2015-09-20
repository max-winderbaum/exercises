function transmitter(options, callback) {
	var codes = options.codes;
	var message = options.message;
	var timeouter = options.timeouter;
	var toggle = options.toggle;
	var currChar;
	var binaries = [];

	for (var i=0; i<message.length; i++) {
		currChar = message.charAt(i);

		if (currChar === ' ') {
			binaries.push('0'); // Will become 7 0s after join operation
		} else {
			binaries.push(dotsDashesToBinary(codes[currChar]));
		}
	}

	binaryToToggles(binaries.join('000'), timeouter, toggle, callback);
}

function binaryToToggles(binaryString, timeouter, toggle, callback) {

	var done = false;
	function next() {
		toggle();
		if (done) {
			callback();
			return;
		}
		var count = 0;
		var current = binaryString.charAt(0);
		while(binaryString.length > 0) {
			if (binaryString.charAt(0) === current) {
				count++;
				binaryString = binaryString.slice(1);
			} else {
				current = binaryString.charAt(0);
				timeouter(next, count);
				return;
			}
		}
		done = true;
		timeouter(next, count);
	}

	next();
}

function dotsDashesToBinary(string) {
	var binaries = [];
	for(var i=0; i<string.length; i++) {
		if(string.charAt(i) === '.') {
			binaries.push('1');
		} else if (string.charAt(i) === '-') {
			binaries.push('111');
		}
	}

	return binaries.join('0');
}

module.exports = transmitter;