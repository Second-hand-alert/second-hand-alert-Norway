// ###    A: Make script work for Firefox and Chrome-based browsers          ###
// ###    B: Define global variables and objects                             ###
// ###    C: Define regexes for finding amount of product hits               ###
// ###    D: Notify browser when productHits > 0                             ###
// ###    E: Search Finn, send response to popup script and notify if        ###
// ###       results                                                         ###
// ###    F: Listener to message from content scripts                        ###
// ###    G: Hello background! Just checking                                 ###

// ###    Example of object that is sent from content-script:                ###
// let prodObj = {
//   type: 'CONTENT_BACKGROUND',
//   title: '',
//   queryPartReadable: '',
//   URL: '',
//   searchSite: 'FINN',
//   searchResults: null
// }

// ###    A: Make script work for Firefox and Chrome-based browsers          ###
if (typeof browser === "undefined") {
  var browser = chrome
}

let prodArr = []

// ###    C: Define regexes for finding amount of product hits               ###
let regexes = {
  FINN: /(?<=<meta name="description" content="Du finner )\d+/mu
}

// ###    D: Notify browser when productHits > 0                             ###
function notifyBrowser(prodObj) {
  prodObj.type = 'BACKGROUND_POPUP'
  console.log(JSON.stringify(prodObj, null, ' '))
  let options = {
    type: 'basic',
    title: prodObj.title,
    message: 'Treff på ' + prodObj.searchSite + ': ' + prodObj.searchResults,
    iconUrl: './img/icon128.png',
  }
  console.log(options)
  browser.notifications.create(options)
}

// ###    E: Search Finn, send response to popup script and notify if        ###
// ###       results                                                         ###
function productSearch(prodObj) {
  // hello FINN search
  console.log(prodObj.URL)
  fetch(prodObj.URL)
    .then(response => {
      // When the page is loaded convert it to text
      return response.text()
    })
    .then(html => {
      let hits = regexes.FINN.exec(html)
      console.log(html)
      console.log('Hits: ' + hits)
      prodObj.searchResults =  Number(hits[0])
      console.log(JSON.stringify(prodObj, null, ' '))
      prodArr.push(prodObj)
      // Notify if results
      if (prodObj.searchResults > 0) {
        notifyBrowser(prodObj)
      }
      console.log(JSON.stringify(prodArr, null, ' '))
    })
    .catch(error => {
      console.error('Failed to fetch ' + prodObj.searchSite + ' page: ', error)
    })
}

// ###    F: Listener to message from content scripts                        ###
function handleMessages(obj, sender, sendResponse) {
  // console.log('Reciving product object: ' + JSON.stringify(obj, null, '  '))
  console.log('Type: ' + obj.type)
  if (obj.type === 'CONTENT_BACKGROUND') {
    console.log('Object from content')
    productSearch(obj)
    sendResponse({ response: 'Response from background script to content script' })
  } if (obj.type === 'POPUP_OPEN') {
    console.log('Background.js: Popup just opened, sending response to popup!')
    sendResponse(prodArr)
  } else {
    console.log('Not a recognisable message from either content or popup.')
  }
}
browser.runtime.onMessage.addListener(handleMessages)

// ###    G: Hello background! Just checking                                 ###
console.log('Hello background.js')
