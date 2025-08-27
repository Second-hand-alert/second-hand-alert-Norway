# How to add a new store

## Which files needs to be added:

* `./lib/<browser>/cs.<sitename>.js`

## What needs to be added to which files

### Manifest.json

Add content script pointer (regex matching and JS-file pointer) to `lib.manifest.json.js`

### Content extraction

Add two functions to `./lib/lib.content.js`:

* `prodObj<sitename>`
* `extractAndPrepare<sitename>`

And remember to export them.

### Content scripts

Add `cs.<sitename>.js` to `./lib/<browser>/` and import functions. If needed craete eventListeners.

### Rollup config

Add bundle rule for <sitename> for all browsers to `./rollup.config.js`