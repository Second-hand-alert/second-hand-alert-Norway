import { browser, regexNorliProductPage, productUrlCheck, prodObjNorli, extractAndPrepareNorli, sendObj } from '../lib.content.js'

// let firstTime = true

// window.navigation.addEventListener('navigate', (event) => {
//   if (firstTime === false && productUrlCheck(regexNorliProductPage, event.destination.url)) {
//     console.log('###### location changed: ' + event.destination.url)
//     setTimeout(() => {
//       let prodObj = prodObjNorli()
//       console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2))
//       prodObj = extractAndPrepareNorli(prodObj)
//       sendObj(prodObj)
//     }, 1200)
//   }
// })

// // Needed for first page loaded
// setTimeout(() => {
//   if (firstTime && productUrlCheck(regexNorliProductPage, window.location.href)) {
//     firstTime = false
//     let prodObj = prodObjNorli()
//     console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2))
//     prodObj = extractAndPrepareNorli(prodObj)
//     sendObj(prodObj)
//   }
// }, 1200)

// console.log('Content at Norli!')

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
    if (event.key === 'enter' && productUrlCheck(regexNorliProductPage, window.location.href) && firstTime === false && newURL(window.location.href) === true) {
      console.log('###### location changed: ' + window.location.href)
      let prodObj = prodObjNorli()
      console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2))
      prodObj = extractAndPrepareNorli(prodObj)
      sendObj(prodObj)
    }
  }, 1200)
})

document.body.addEventListener('click', (event) => {
  setTimeout(() => {
    console.log('###### event click registered: ' + window.location.href)
    if (productUrlCheck(regexNorliProductPage, window.location.href) && firstTime === false && newURL(window.location.href)) {
      console.log('###### location changed: ' + window.location.href)
      let prodObj = prodObjNorli()
      console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2))
      prodObj = extractAndPrepareNorli(prodObj)
      sendObj(prodObj)
    }
  }, 1200)
})

// Needed for first page loaded
if (firstTime === true) {
  firstTime = false
  if (productUrlCheck(regexNorliProductPage, window.location.href)) {
    setTimeout(() => {
      let prodObj = prodObjNorli()
      console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2))
      prodObj = extractAndPrepareNorli(prodObj)
      sendObj(prodObj)
    }, 1200)
  }
}

console.log('Content at Norli!')