import { productUrlCheck, regexTronsmoProductPage, prodObjTronsmo, extractAndPrepareTronsmo, sendObj } from '../lib.content.js'

const possibleISBN = document.querySelectorAll('.wc-block-components-product-sku.wc-block-grid__product-sku.wp-block-woocommerce-product-sku.product_meta')[0].innerText

if (productUrlCheck(regexTronsmoProductPage, possibleISBN)) {
  const prodObj = extractAndPrepareTronsmo(prodObjTronsmo)
  sendObj(prodObj)
}

console.log('#######################################  Content at Tronsmo!')
