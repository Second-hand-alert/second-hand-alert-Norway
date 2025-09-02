import { prodObjBokkilden, extractAndPrepareBokkilden, sendObj } from '../lib.content.js'

console.log(document.querySelector('meta[property="books:isbn"]'))

if (document.querySelector('meta[property="books:isbn"]')) {
  const prodObj = extractAndPrepareBokkilden(prodObjBokkilden)
  sendObj(prodObj)
}

console.log('#######################################  Content at Bokkilden!')
