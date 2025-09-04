import { regexAmazoncoukProductPageA, regexAmazoncoukProductPageB, productUrlCheck, prodObjAmazoncouk, extractAndPrepareAmazoncouk, sendObj } from '../lib.content.js'

const titleContent = document.querySelector('meta[name="title"]').getAttribute('content')

if (productUrlCheck(regexAmazoncoukProductPageA, titleContent) && productUrlCheck(regexAmazoncoukProductPageB, titleContent)) {
  const prodObj = extractAndPrepareAmazoncouk(prodObjAmazoncouk)
  sendObj(prodObj)
}

console.log('#######################################  Content at Amazon.co.uk!')
