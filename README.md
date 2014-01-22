partialify
==========

require()-able HTML, CSS, JSON and (potentially) more

Supports HTML, CSS and JSON out of the box.

```
var b = require('browserify')(),
	fs = require('fs'),
	p = require('partialify');

b.add('./entry.js');
b.transform(p);
b.bundle().pipe(fs.createWriteStream('./bundle.js'));
```

To support other file types use the custom version. Note you must specify all supported types in this scenario.

```
var b = require('browserify')(),
	fs = require('fs'),
	p = require('partialify/custom')(['html', 'css', 'json', 'hbs']);

b.add('./entry.js');
b.transform(p);
b.bundle().pipe(fs.createWriteStream('./bundle.js'));
```