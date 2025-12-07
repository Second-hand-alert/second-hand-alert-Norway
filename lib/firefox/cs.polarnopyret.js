import { regexPolarnopyretProductPage, productUrlCheck, prodObjPolarnopyret, extractAndPreparePolarnopyret, sendObj } from '../lib.content.js'

let firstTime = true
let currentUrl = window.location.href

const newURL = function (location) {
  if (currentUrl !== location) {
    currentUrl = location
    console.log('new url!')
    return true
  } else {
    console.log('old url!')
    return false
  }
}

document.body.addEventListener('keyup', (event) => {
  setTimeout(() => {
    if (event.key === 'enter' && productUrlCheck(regexPolarnopyretProductPage, window.location.href) && firstTime === false && newURL(window.location.href) === true) {
      console.log('###location changed: ' + window.location.href)
      let prodObj = prodObjPolarnopyret()
      prodObj = extractAndPreparePolarnopyret(prodObj)
      sendObj(prodObj)
    }
  }, 1200)
})

document.body.addEventListener('click', (event) => {
  setTimeout(() => {
    console.log('###### event click registered: ' + window.location.href)
    if (productUrlCheck(regexPolarnopyretProductPage, window.location.href) && firstTime === false && newURL(window.location.href)) {
      console.log('### location changed: ' + window.location.href)
      let prodObj = prodObjPolarnopyret()
      prodObj = extractAndPreparePolarnopyret(prodObj)
      sendObj(prodObj)
    }
  }, 1200)
})

// Needed for first page loaded
if (firstTime === true) {
  firstTime = false
  if (productUrlCheck(regexPolarnopyretProductPage, window.location.href)) {
    setTimeout(() => {
      let prodObj = prodObjPolarnopyret
      prodObj = extractAndPreparePolarnopyret(prodObj)
      sendObj(prodObj)
    }, 1200)
  }
}

console.log('Content at Helly Hansen!')
