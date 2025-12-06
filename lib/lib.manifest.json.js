const manifest = {
  manifest_version: 3,
  name: 'Second-hand alert',
  version: '0.0.1',
  description: 'Get an alert if a product you are browsing in a webstore is available used, somewhere else.',
  icons: {
    16: './img/icon16.png',
    32: './img/icon32.png',
    48: './img/icon48.png',
    64: './img/icon64.png',
    128: './img/icon128.png'
  },
  permissions: [
    'notifications',
    'storage'
  ],
  action: {
    default_popup: './popup.html',
    default_icon: './img/icon48.png'
  },
  host_permissions: [
    '*://*.finn.no/*',
    '*://*.amazonaws.com/*',
    '*://*.ikea.com/*',
    '*://*.abebooks.com/*',
    '*://*.adlibris.com/*',
    '*://*.akademika.no/*',
    '*://*.amazon.com/*',
    '*://*.amazon.co.uk/*',
    '*://*.ark.no/*',
    '*://*.bokkilden.no/*',
    '*://*.norli.no/*',
    '*://*.tronsmo.no/*',
    '*://*.barnashus.no/*',
    '*://*.bergans.com/*',
    '*://*.didriksons.com/*',
    '*://*.gullkorn.no/*',
    '*://*.hellyhansen.com/*',
    '*://*.kappahl.com/*',
    '*://*.kattnakken.no/*',
    '*://*.polarnopyret.no/*',
    '*://*.reima.com/*'
  ]
}

const browserSpecificFirefox = {
  browser_specific_settings: {
    gecko: {
      id: '{8808a52c-1c1f-4fa9-a951-30e748a6f014}',
      strict_min_version: '128.0',
      data_collection_permissions: {
        required: [
          'websiteContent'
        ]
      }
    },
    gecko_android: {
      strict_min_version: '128.0'
    }
  }
}

const contentScripts = {
  content_scripts: [
    // ### Furniture stores ###
    {
      matches: ['*://*.ikea.com/no/no/p*'],
      js: ['cs.ikea.js']
    },
    // ### Book stores ###
    {
      matches: ['*://*.abebooks.com/*'],
      js: ['cs.abebooks.js']
    },
    {
      matches: ['*://*.adlibris.com/nb/bok*'],
      js: ['cs.adlibris.js']
    },
    {
      matches: ['*://*.akademika.no/*'],
      js: ['cs.akademika.js']
    },
    {
      matches: ['*://*.amazon.com/*'],
      js: ['cs.amazoncom.js']
    },
    {
      matches: ['*://*.amazon.co.uk/*'],
      js: ['cs.amazoncouk.js']
    },
    {
      matches: ['*://*.ark.no/*'],
      js: ['cs.ark.js']
    },
    {
      matches: ['*://*.bokkilden.no/*'],
      js: ['cs.bokkilden.js']
    },
    {
      matches: ['*://*.norli.no/*'],
      js: ['cs.norli.js']
    },
    {
      matches: ['*://*.tronsmo.no/produkt*'],
      js: ['cs.tronsmo.js']
    },
    // ### Clothes stores ###
    {
      matches: ['*://*.barnashus.no/*'],
      js: ['cs.barnashus.js']
    },
    {
      matches: ['*://*.bergans.com/no/p*'],
      js: ['cs.bergans.js']
    },
    {
      matches: ['*://*.didriksons.com/no*'],
      js: ['cs.didriksons.js']
    },
    {
      matches: ['*://*.gullkorn.com/*'],
      js: ['cs.gullkorn.js']
    },
    {
      matches: ['*://*.hellyhansen.com/*'],
      js: ['cs.hellyhansen.js']
    },
    {
      matches: ['*://*.hellyhansen.com/*'],
      js: ['cs.hellyhansen.js']
    },
    {
      matches: ['*://*.kappahl.com/nb-no*'],
      js: ['cs.kappahl.js']
    },
    {
      matches: ['*://*.kattnakken.no/*'],
      js: ['cs.kattnakken.js']
    },
    {
      matches: ['*://*.polarnopyret.no/*'],
      js: ['cs.polarnopyret.js']
    },
    {
      matches: ['*://*.reima.com/nb-NO*'],
      js: ['cs.reima.js']
    }
  ]
}

const backgroundChrome = {
  background: {
    service_worker: './background.js',
    type: 'module'
  }
}

const backgroundFirefox = {
  background: {
    scripts: [
      'background.js']
  }
}

export { manifest, browserSpecificFirefox, backgroundChrome, backgroundFirefox, contentScripts }
