var partialify = require('../');
var customPartialify = require('../custom');

var test = require('tape');
var browserify = require('browserify');

var vm = require('vm');
var fs = require('fs');
var path = require('path');

var html = fs.readFileSync(__dirname + '/fixtures/fixture.html', 'utf8');
var css = fs.readFileSync(__dirname + '/fixtures/fixture.css', 'utf8');
var json = fs.readFileSync(__dirname + '/fixtures/fixture.json', 'utf8');
var xml = fs.readFileSync(__dirname + '/fixtures/fixture.xml', 'utf8');

test('require() an HTML file', function (t) {
  t.plan(1);

  var b = browserify();
  b.add(__dirname + '/runners/html.js');
  b.transform(partialify);

  b.bundle(function (err, src) {
    if (err) t.fail(err);
    vm.runInNewContext(src, { console: { log: log } });
  });

  function log (msg) {
    t.equal(html, msg);
  }

});

test('require() a CSS file', function (t) {
  t.plan(1);

  var b = browserify();
  b.add(__dirname + '/runners/css.js');
  b.transform(partialify);

  b.bundle(function (err, src) {
    if (err) t.fail(err);
    vm.runInNewContext(src, { console: { log: log } });
  });

  function log (msg) {
    t.equal(css, msg);
  }

});

test('require() a JSON file', function (t) {
  t.plan(1);

  var b = browserify();
  b.add(__dirname + '/runners/json.js');
  b.transform(partialify);

  b.bundle(function (err, src) {
    if (err) t.fail(err);
    vm.runInNewContext(src, { console: { log: log } });
  });

  function log (msg) {
    t.equal(json, msg);
  }

});

test('require() an XML file', function (t) {
  t.plan(1);

  var b = browserify();
  b.add(__dirname + '/runners/xml.js');
  b.transform(customPartialify.alsoAllow('xml'));

  b.bundle(function (err, src) {
    if (err) t.fail(err);
    vm.runInNewContext(src, { console: { log: log } });
  });

  function log (msg) {
    t.equal(xml, msg);
  }

});
