import { prodObjBergans, extractAndPrepareBergans, sendObj } from '../lib.content.js'

const prodObj = extractAndPrepareBergans(prodObjBergans)
sendObj(prodObj)
