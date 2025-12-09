import { prodObjKattnakken, extractAndPrepareKattnakken, sendObj } from '../lib.content.js'

const prodObj = extractAndPrepareKattnakken(prodObjKattnakken)
sendObj(prodObj)
