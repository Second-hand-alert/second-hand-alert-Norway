# Build documentation

## Install, build and package

```console
npm install
npm run manifest
npm run build
npm run package
```

## Structure

The build process is mostly rollup, but the different versions of manifest.json is a custom JavaScript thing. Directly in the `./lib`-folder you all functions and variables to build the browser extension for different browsers and countries. Files in `./lib/<country>/<browser>/` imports the correct functions and variables needed for rollup to build to `./dist-unpackaged/<country>/<browser>/`. zip-chrome and web-ext is used to package the browser extensions into the `./dist`-folder.

## Tools used (dev-dependencies)

* `"@arrow-js/core": "^1.0.0-alpha.10"`
  To populate popup.html with content. Bundled together with lib.popup.js to become popup.js
* `"@rollup/plugin-node-resolve": "^16.0.0"`
   Rollup-plugin for popup.js
* `"bestzip": "^2.2.1"`
  Packing extension for Chrome
* `rollup": "^4.32.1"`
  Bundling tool for content scripts, background.js and popup.js
* `"standard": "^17.1.2"`
  Used for ensuring good coding practice. Not all files are possible to keep in line with StandardJS standard.
* `"web-ext": "^8.3.0"`
  Testing and packing extension for Firefox
* `manifest.js`
  Custom build-script for manifest.json