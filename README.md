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

To support other file types use the custom version. You can either augment the default supported file types or specify a completely custom list.

```
var b = require('browserify')(),
	fs = require('fs'),
	p = require('partialify/custom');

b.add('./entry.js');

b.transform(p.alsoAllow('xml'));
// or
b.transform(p.alsoAllow(['xml', 'csv']));
// or
b.transform(p.onlyAllow(['xml', 'csv']));

b.bundle().pipe(fs.createWriteStream('./bundle.js'));
```