import { browser, regexNorliProductPage, productUrlCheck, prodObjNorli, extractAndPrepareNorli, sendObj } from '../../lib.content.js'

window.navigation.addEventListener('navigate', (event) => {
  if (productUrlCheck(regexNorliProductPage, event.destination.url)) {
    console.log('###### location changed: ' + event.destination.url)
    setTimeout(() => {
      let prodObj = prodObjNorli()
      console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2))
      prodObj = extractAndPrepareNorli(prodObj)
      sendObj(prodObj)
    }, 1200)
  }
})

console.log('Content at Norli!')
