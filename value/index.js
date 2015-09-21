function value(thing) {
	if (typeof thing === 'function') {
		return value(thing());
	} else {
		return thing;
	}
}

module.exports = value;