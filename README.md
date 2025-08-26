
# Second-hand alert - Norway

## Purpose of library

Second-hand alert - Norway is a browser extension that gives you an alert when second hand/used alternatives to new products are available. Browse a connected store and get get a link to a second-hand alternative when available.

## About-page - secondhandalert.xyz

The about/help-page is separate from the plugin to easier update install instructions and can be found on [secondhandalert.xyz](https://secondhandalert.xyz). The `?` in the top right corner of the browser extension points to this site.

## Note for reviewers

Build and structure documentation for reviewers and developers.

### Install, build and package

```console
npm install
npm run build
npm run package
```

### File structure

The build process is mostly Rollup with `./rollup.config.js`, but the different versions of manifest.json is a custom JavaScript thing. Directly under the `./lib`-folder you have all functions and variables to build the browser extension for different browsers. Files in `./lib/<browser>/` imports the correct functions and variables needed for rollup to build to `./dist-unpackaged/<browser>/`. zip-chrome and web-ext is used to package the browser extensions into the `./dist`-folder.

### Tools used (dev-dependencies)
All external libraries listed in package.json, but also here:

* `"@arrow-js/core": "^1.0.0-alpha.10"`
  To populate popup.html with content. Pulls info from background.js. Bundled together with lib.popup.js to become popup.js. Not used in content scripts.
* `"@rollup/plugin-node-resolve": "^16.0.0"`
   Rollup-plugin for popup.js
* `"bestzip": "^2.2.1"`
  Packing extension for Chrome
* `rollup": "^4.32.1"`
  Bundling tool for content scripts, background.js and popup.js
* `"standard": "^17.1.2"`
  Used for ensuring good coding practice. Not all files are possible to keep in line with StandardJS.
* `"web-ext": "^8.3.0"`
  Testing and packing extension for Firefox
* `manifest.js`
  Custom build-script for manifest.json