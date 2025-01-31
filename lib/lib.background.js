// ###    A: Make script work for Firefox and Chrome-based browsers          ###
// ###    B: Define regexes for finding amount of product hits               ###
// ###    C: Notify browser when productHits > 0                             ###
// ###    D: Search Finn, send response to popup script and notify if        ###
// ###       results                                                         ###
// ###    E: Set                        ###
// ###    F: Set data to browser.storage.local                               ###
// ###    G: Get data from browser.storage.local and send to popup           ###
// ###    H: Listener to message from content scripts                        ###
// ###    I: Hello background! Just checking                                 ###

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
const browser = chrome

// ###    B: Define regexes for finding amount of product hits               ###
const regexes = {
  FINN: /(?<=<meta name="description" content="Du finner )\d+/mu
}

// ###    C: Notify browser when productHits > 0                             ###
function notifyBrowser (prodObj) {
  const options = {
    type: 'basic',
    title: prodObj.title,
    message: 'Treff på ' + prodObj.searchSite + ': ' + prodObj.searchResults,
    iconUrl: './img/icon128.png'
  }
  browser.notifications.create(options)
}

function removeDuplicates (list) {
  const filtered = list.filter((obj1, i, array) =>
    array.findLastIndex(obj2 => (obj2.URL === obj1.URL)) === i
  )
  return filtered
}

function cutoffList (list) {
  if (list.length > 50) {
    list = list.reverse()
    list = list.slice(0, 50)
    list = list.reverse()
  }
  return list
}

// ###    D: Search Finn, send response to popup script and notify if        ###
// ###       results                                                         ###
function productSearch (prodObj) {
  fetch(prodObj.URL)
    .then(response => {
      return response.text()
    })
    .then(html => {
      const hits = regexes.FINN.exec(html)
      prodObj.searchResults = Number(hits[0])
      if (prodObj.searchResults > 0) {
        delete prodObj.type
        notifyBrowser(prodObj)
        setStorageData(prodObj)
      }
    })
    .catch(error => {
      console.error('Failed to fetch ' + prodObj.searchSite + ' page: ', error)
    })
}

// ###    E: Listener to message from content scripts and popup              ###
function handleMessages (obj, sender, sendResponse) {
  if (obj.type === 'CONTENT_BACKGROUND') {
    productSearch(obj)
    sendResponse({ response: 'Response from background script to content script' })
    return
  } if (obj.type === 'POPUP_OPEN') {
    getStorageDataAndSend()
    sendResponse({ response: 'Background script heard you. Already sent a separate message with searchArr' })
  } else {
    console.log('## Not a recognisable message from either content or popup.')
    console.log('## Type & sender:   ' + JSON.stringify(obj.type, null, ' ') + '\n' + JSON.stringify(sender, null, ' '))
  }
}

// ###    F: Set data to browser.storage.local                               ###
function setStorageData (prodObj) {
  browser.storage.local.get({ searchArr: null })
    .then((keyValueStore) => {
      if (keyValueStore.searchArr === null) {
        browser.storage.local.set({ searchArr: [prodObj] })
      } else {
        keyValueStore.searchArr.push(prodObj)
        let searchArr = keyValueStore.searchArr
        searchArr = removeDuplicates(searchArr)
        searchArr = cutoffList(searchArr)
        browser.storage.local.set({ searchArr })
      }
    })
    .catch((error) => {
      console.error('Error for get or set when setting: ' + error)
    })
}

// ###    G: Get data from browser.storage.local and send to popup           ###
function getStorageDataAndSend () {
  browser.storage.local.get({ searchArr: null })
    .then((result) => {
      browser.runtime.sendMessage({ type: 'BACKGROUND_POPUP', searchArr: result.searchArr })
    })
    .catch((error) => {
      console.error('Error in getStoredData: ' + error)
    })
}

// ###    H: Listener to message from content scripts                        ###
browser.runtime.onMessage.addListener(handleMessages)

// ###    I: Hello background! Just checking                                 ###
console.log('Hello background.js')

export { regexes, handleMessages }
