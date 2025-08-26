import { prodObjAdlibris, extractAndPrepareAdlibris, sendObj } from '../lib.content.js'

const prodObj = extractAndPrepareAdlibris(prodObjAdlibris)
sendObj(prodObj)
