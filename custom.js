var through = require('through'),
  str2js = require('string-to-js'),
  types = ['html', 'css', 'json'];

function isValidFile (file) {
  return types.indexOf(file.split(".").pop()) > -1;
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
  if (extensions) types = extensions;
  return partialify;
}

exports.alsoAllow = function (extensions) {
  types = types.concat(extensions);
  return partialify;
}
