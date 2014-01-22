var partialify = require('partialify');

module.exports = function (exts) {
	partialify.extensions = {};
	exts.forEach(function (ext) {
		partialify.extensions[ext] = 1;
	})

	return partialify.bind(partialify);
};
