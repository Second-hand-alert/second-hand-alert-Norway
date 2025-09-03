import { regexAmazoncomProductPageA, regexAmazoncomProductPageB, productUrlCheck, prodObjAmazoncom, extractAndPrepareAmazoncom, sendObj } from '../lib.content.js'

const titleContent = document.querySelector('meta[name="title"]').getAttribute('content')

if (productUrlCheck(regexAmazoncomProductPageA, titleContent) && productUrlCheck(regexAmazoncomProductPageB, titleContent)) {
  const prodObj = extractAndPrepareAmazoncom(prodObjAmazoncom)
  sendObj(prodObj)
}

console.log('#######################################  Content at Amazon.com!')
