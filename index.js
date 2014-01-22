var through = require('through'),
	str2js = require('string-to-js'),
	types = {
		html: 1,
		css: 1,
		json: 1
	};

module.exports = function partialify (file) {
	var exts = this.extensions || types;

	if (!exts[file.split(".").pop()]) return through();

	var buffer = "";

	return through(function (chunk) {
			buffer += chunk.toString();
		},
		function () {
			this.queue(str2js(buffer));
			this.queue(null);
		});

};
