import { writeFileSync } from 'fs'
import { manifest, backgroundFirefox } from '../../lib.manifest.json.js'
import packageJSON from '../../../package.json' with { type: 'json' }

const firefoxManifest = { ...manifest, ...backgroundFirefox }
firefoxManifest.version = packageJSON.version

// Norway, Firefox
writeFileSync('./dist-unpackaged/norway/firefox/manifest.json', JSON.stringify(firefoxManifest, null, 2))
