import { handleMessages } from '../lib.background.js'

// ###    G: Hello background! Just checking                                 ###
console.log('Hello background.js')

async function requestPermissions (manifest) {
  const missingSites = []
  const actualPermissions = await browser.permissions.getAll()
  manifest.host_permissions.forEach((hostPermission) => {
    if (!actualPermissions.origins.includes(hostPermission)) {
      missingSites.push(hostPermission)
    }
  })
  if (missingSites.length > 0) {
    console.log('Sites that needs a permisson request: ' + missingSites.length)
    console.log(JSON.stringify(missingSites, '', 2))
  } else {
    console.log('All sites got their permissions')
  }
}

requestPermissions(browser.runtime.getManifest())

browser.runtime.onMessage.addListener(handleMessages)
