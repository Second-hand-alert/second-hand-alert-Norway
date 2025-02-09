import { writeFileSync } from 'fs'
import { manifest, backgroundChrome } from '../../lib.manifest.json.js'
import packageJSON from '../../../package.json' with { type: 'json' }

const chromeManifest = { ...manifest, ...backgroundChrome }
chromeManifest.version = packageJSON.version

// Norway, Chrome & Firefox
writeFileSync('./dist-unpackaged/norway/chrome/manifest.json', JSON.stringify(chromeManifest, null, 2))
