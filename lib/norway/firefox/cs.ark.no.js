import { regexArkProductPage, productUrlCheck, prodObjArk, extractAndPrepareArk, sendObj } from '../../lib.content.js'

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
    console.log('###### event keyup registered: ' + window.location.href)
    if (event.code === 'enter' && productUrlCheck(regexArkProductPage, window.location.href) && firstTime === false && newURL(window.location.href) === true) {
      console.log('###### location changed: ' + window.location.href)
      let prodObj = prodObjArk()
      console.log('#### Ark prodObj now: ' + JSON.stringify(prodObj, null, 2))
      prodObj = extractAndPrepareArk(prodObj)
      sendObj(prodObj)
    }
  }, 1200)
})

document.body.addEventListener('click', (event) => {
  setTimeout(() => {
    console.log('###### event click registered: ' + window.location.href)
    if (productUrlCheck(regexArkProductPage, window.location.href) && firstTime === false && newURL(window.location.href)) {
      console.log('###### location changed: ' + window.location.href)
      let prodObj = prodObjArk()
      console.log('#### Ark prodObj now: ' + JSON.stringify(prodObj, null, 2))
      prodObj = extractAndPrepareArk(prodObj)
      sendObj(prodObj)
    }
  }, 1200)
})

// Needed for first page loaded
if (firstTime === true) {
  firstTime = false
  if (productUrlCheck(regexArkProductPage, window.location.href)) {
    setTimeout(() => {
      let prodObj = prodObjArk()
      console.log('#### Ark prodObj now: ' + JSON.stringify(prodObj, null, 2))
      prodObj = extractAndPrepareArk(prodObj)
      sendObj(prodObj)
    }, 1200)
  }
}

console.log('#######################################  Content at Ark!')
