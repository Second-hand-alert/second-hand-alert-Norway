let url = ''
let productHits = ''
let regexFinnHits = /(?<=<meta name="description" content="Du finner )\d+/gmu

// chrome if browser is undefined (for Chrome)
if (typeof browser === "undefined") {
  var browser = chrome
}

function productFound(message) {
  console.log('Product to search Finn for: ' + message)
  message = encodeURI(message.URL)
  let options = {
    type: 'basic',
    title: message,
    message: 'Hits on FInn: ' + productHits,
    iconUrl: './img/icon128.png',
  }
  productSearch(message)
  browser.notifications.create(options)
}

function productSearch(querytext) {
  // hello FINN search
  url = 'https://www.finn.no/bap/forsale/search.html?category=0.78&for_rent=0&q=' + querytext + '&trade_type=1&trade_type=2'
  console.log(url)
  fetch(url)
    .then(response => {
      // When the page is loaded convert it to text
      return response.text()
    })
    .then(html => {
      productHits = regexFinnHits.exec(html)
      console.log(productHits[0])
    })
    .catch(error => {
      console.error('Failed to fetch page: ', error)
    })
}

// chrome.runtime.onMessage.addListener(productFound)
browser.runtime.onMessage.addListener((data) => {
  console.log('data object: ' + JSON.stringify(data, null, '  '))
  console.log('Type: ' + data.type)
  if (data.type === 'CONTENT_BACKGROUND') {
    console.log('Title: ' + data.title)
    productFound(data.title)
  }
})

console.log('Hello background.js')
