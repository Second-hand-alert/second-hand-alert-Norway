import { browser, regexAbebooksProductPage, productUrlCheck, prodObjAbebooks, extractAndPrepareAbebooks, sendObj } from '../lib.content.js'

if (productUrlCheck(regexAbebooksProductPage, window.location.href)) {
  const prodObj = extractAndPrepareAbebooks(prodObjAbebooks)
  sendObj(prodObj)
}

console.log('#######################################  Content at Abebooks!')
