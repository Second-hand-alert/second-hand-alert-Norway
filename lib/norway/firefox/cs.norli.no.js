import { prodObjNorli, extractAndPrepareNorli, sendObj } from '../../lib.content.js'

setTimeout(() => {
  const prodObj = extractAndPrepareNorli(prodObjNorli)
  sendObj(prodObj)
}, 1000)

console.log('Content at Norli!')
