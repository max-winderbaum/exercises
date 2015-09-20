function Middleware() {
	this._funcs = [];
}

Middleware.prototype.use = function(func) {
	this._funcs.push(func);
};

Middleware.prototype.go = function(callback) {
	var that = this;
	var index = 0;
	function nextFunc() {
		if (index >= that._funcs.length) {
			callback.apply(that);
			return;
		}
		that._funcs[index].call(that, nextFunc);
		index++;
	}
	nextFunc(0);
};

module.exports = Middleware;