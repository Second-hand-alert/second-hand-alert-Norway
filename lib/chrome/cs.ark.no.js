import { browser, regexArkProductPage, productUrlCheck, prodObjArk, extractAndPrepareArk, sendObj } from '../lib.content.js'

window.navigation.addEventListener('navigate', (event) => {
  if (productUrlCheck(regexArkProductPage, event.destination.url)) {
    console.log('###### location changed: ' + event.destination.url)
    setTimeout(() => {
      let prodObj = prodObjArk()
      console.log('#### Ark prodObj now: ' + JSON.stringify(prodObj, null, 2))
      prodObj = extractAndPrepareArk(prodObj)
      sendObj(prodObj)
    }, 1200)
  }
})

console.log('#######################################  Content at Ark!')
