import { regexHellyhansenProductPage, productUrlCheck } from '../lib.content.js'

if (productUrlCheck(regexHellyhansenProductPage, window.location.href)) {
  console.log('### ########################## Hello PRODUCT at Helly Hansen in Firefox! ###')
}

console.log('### ########################## Hello content at Helly Hansen in Firefox! ###')
