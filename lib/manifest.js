import { writeFileSync } from 'fs'
import { manifest, browserSpecificFirefox, backgroundChrome, backgroundFirefox, contentScriptsNorway } from './lib.manifest.json.js'
import packageJSON from '../package.json' with { type: 'json' }

const chromeManifestNorway = { ...manifest, ...backgroundChrome, ...contentScriptsNorway }
chromeManifestNorway.version = packageJSON.version

const firefoxManifestNorway = { ...manifest, ...browserSpecificFirefox, ...backgroundFirefox, ...contentScriptsNorway }
firefoxManifestNorway.version = packageJSON.version

// Norway, Chrome
writeFileSync('./dist-unpackaged/chrome/manifest.json', JSON.stringify(chromeManifestNorway, null, 2))

// Norway, Firefox
writeFileSync('./dist-unpackaged/firefox/manifest.json', JSON.stringify(firefoxManifestNorway, null, 2))
