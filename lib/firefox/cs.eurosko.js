// import { regexKappahlProductPage, productUrlCheck, prodObjKappahl, extractAndPrepareKappahl, sendObj } from '../lib.content.js'
import { finnBrandIds, regexEuroskoProductPage, productUrlCheck, prodObjEurosko, extractAndPrepareEurosko, sendObj } from '../lib.content.js'

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

document.body.addEventListener('click', (event) => {
  setTimeout(() => {
    console.log('###### event click registered: ' + window.location.href)
    if (productUrlCheck(regexEuroskoProductPage, window.location.href) && firstTime === false && newURL(window.location.href)) {
      console.log('### location changed: ' + window.location.href)
      let prodObj = prodObjEurosko()
      const brand = document.getElementsByTagName('main')[0].getElementsByTagName('h1')[0].previousSibling.textContent.toLowerCase()
      if (finnBrandIds.some(e => e.brand === brand)) {
        console.log('brand ' + brand + ' exists')
        const brandObj = (finnBrandIds.find(e => e.brand === brand))
        console.log('brand id: ' + brandObj.id)
        prodObjEurosko.urlPart2 = prodObjEurosko.urlPart2 + '&brand=' + brandObj.id
        // prodObjEurosko.urlPart2 = prodObjEurosko.urlPart2 + '&brand=' +
      } else {
        console.log('brand ' + brand + ' doesn\'t exist')
      }
      prodObj = extractAndPrepareEurosko(prodObj)
      sendObj(prodObj)
    }
  }, 1200)
})

// Needed for first page loaded
if (firstTime === true) {
  firstTime = false
  if (productUrlCheck(regexEuroskoProductPage, window.location.href)) {
    setTimeout(() => {
      const brand = document.getElementsByTagName('main')[0].getElementsByTagName('h1')[0].previousSibling.textContent.toLowerCase()
      console.log('brand: ' + brand)
      if (finnBrandIds.some(e => e.brand === brand)) {
        console.log('brand ' + brand + ' exists')
        const brandObj = (finnBrandIds.find(e => e.brand === brand))
        console.log('brand id: ' + brandObj.id)
        // prodObjEurosko.urlPart2 = prodObjEurosko.urlPart2 + '&brand=' +
      } else {
        console.log('brand ' + brand + ' doesn\'t exist')
      }
      // let prodObj = prodObjKappahl
      // prodObj = extractAndPrepareKappahl(prodObj)
      // sendObj(prodObj)
    }, 1200)
  }
}
