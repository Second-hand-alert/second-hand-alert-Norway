import { writeFileSync } from 'fs'
import { manifest, browserSpecificFirefox, backgroundChrome, backgroundFirefox, contentScripts } from './lib.manifest.json.js'
import packageJSON from '../package.json' with { type: 'json' }

const chromeManifest = { ...manifest, ...backgroundChrome, ...contentScripts }
chromeManifest.version = packageJSON.version

const firefoxManifest = { ...manifest, ...browserSpecificFirefox, ...backgroundFirefox, ...contentScripts }
firefoxManifest.version = packageJSON.version

// Norway, Chrome
writeFileSync('./dist-unpackaged/chrome/manifest.json', JSON.stringify(chromeManifest, null, 2))

// Norway, Firefox
writeFileSync('./dist-unpackaged/firefox/manifest.json', JSON.stringify(firefoxManifest, null, 2))
