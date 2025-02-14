import { prodObjArk, extractAndPrepareArk, sendObj } from '../../lib.content.js'

setTimeout(() => {
  const prodObj = extractAndPrepareArk(prodObjArk)
  sendObj(prodObj)
}, 1000)

console.log('Content at Ark!')
