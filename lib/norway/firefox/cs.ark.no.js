import { regexArkProductPage, productUrlCheck, prodObjArk, extractAndPrepareArk, sendObj } from '../../lib.content.js'

window.addEventListener('popstate', (event) => {
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

// Needed for first page loaded
setTimeout(() => {
  let prodObj = prodObjArk()
  console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2))
  prodObj = extractAndPrepareArk(prodObj)
  sendObj(prodObj)
}, 1200)

console.log('#######################################  Content at Ark!')
