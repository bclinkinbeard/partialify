var through = require('through'),
  str2js = require('string-to-js'),
  types = ['html', 'css'];

function isValidFile (file) {
  return types.some(function (type) {
    return file.substr(-(type.length)) === type;
  });
}

function partialify (file) {

  if (!isValidFile(file)) return through();

  var buffer = "";

  return through(function (chunk) {
      buffer += chunk.toString();
    },
    function () {
      this.queue(str2js(buffer));
      this.queue(null);
    });

};

exports.onlyAllow = function (extensions) {
  if (extensions) {
    if (!Array.isArray(extensions)) extensions = Array.prototype.slice.call(arguments, 0);
    
    types = extensions;
  }
  return partialify;
}

exports.alsoAllow = function (extensions) {
  if (!Array.isArray(extensions)) extensions = Array.prototype.slice.call(arguments, 0);
  types = types.concat(extensions);
  return partialify;
}
