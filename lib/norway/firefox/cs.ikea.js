import { prodObjIkea, extractAndPrepareIkea, sendObj } from '../../lib.content.js'

const prodObj = extractAndPrepareIkea(prodObjIkea)
sendObj(prodObj)
