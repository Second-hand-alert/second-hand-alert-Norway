import { browser, prodObjBokkilden, extractAndPrepareBokkilden, sendObj } from '../lib.content.js'

if (document.querySelector('meta[property="books:isbn"]')) {
  const prodObj = extractAndPrepareBokkilden(prodObjBokkilden)
  sendObj(prodObj)
}

console.log('#######################################  Content at Bokkilden!')
