import { prodObjArk, extractAndPrepareArk, sendObj } from '../../lib.content.js'

const prodObj = extractAndPrepareArk(prodObjArk)
sendObj(prodObj)

console.log('Content at Ark!')
