import { browser, regexAkademikaProductPage, productUrlCheck, prodObjAkademika, extractAndPrepareAkademika, sendObj } from '../lib.content.js'

if (productUrlCheck(regexAkademikaProductPage, window.location.href)) {
  const prodObj = extractAndPrepareAkademika(prodObjAkademika)
  sendObj(prodObj)
}

console.log('#######################################  Content at Akademika!')
