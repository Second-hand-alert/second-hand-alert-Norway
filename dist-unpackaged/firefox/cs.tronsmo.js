(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;
  const regexTronsmoProductPage = /^(ISBN: )/;

  // For SPA-sites, content script triggers on every page. This function to check if it's a product page.
  // Can also be used where the start of the URL isn't simple-regexed as a product page
  function productUrlCheck (regexUrlCheck, url) {
    // check if url matches regex test and return true/false
    if (regexUrlCheck.test(url)) {
      console.log('### Book product page TRUE --> ' + url);
      return true
    } else {
      console.log('### Book product page FALSE --> ' + url);
      return false
    }
  }

  const prodObjTronsmo = {
    type: 'CONTENT_BACKGROUND',
    title: '',
    ISBN: '',
    URL: 'https://bookis.com/no/search?books_norway&query=',
    URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
    site: 'Tronsmo',
    searchSite: 'Bookis.no',
    searchResults: null,
    available: null,
    timeStamp: null
  };

  function extractAndPrepareTronsmo (prodObj) {
    const regexISBN = /\d{13}/;
    prodObj.title = document.querySelectorAll('h1.wp-block-post-title')[0].innerText;
    let isbn = document.querySelectorAll('.wc-block-components-product-sku.wc-block-grid__product-sku.wp-block-woocommerce-product-sku.product_meta')[0].innerText;
    isbn = regexISBN.exec(isbn);
    prodObj.ISBN = isbn;
    prodObj.timeStamp = Date.now();
    prodObj.URL = prodObj.URL + prodObj.ISBN;
    prodObj.URLCheckAvailability = prodObj.URLCheckAvailability + prodObj.ISBN;
    console.log(JSON.stringify(prodObj, null, ' '));
    return prodObj
  }

  // ### ############################################################################################### ###
  // ### Function for sending product object to background script
  function sendObj (obj) {
    console.log('Sending object: ' + obj);
    const sending = browser.runtime.sendMessage(obj);
    sending
      .then(response => {
        console.log('Response to ' + obj.site + ' content-script from background: ' + JSON.stringify(response, null, ' '));
      })
      .catch(error => {
        console.error('Error sending from ' + obj.site + ' content-script to background: ', error);
      });
  }

  const possibleISBN = document.querySelectorAll('.wc-block-components-product-sku.wc-block-grid__product-sku.wp-block-woocommerce-product-sku.product_meta')[0].innerText;

  if (productUrlCheck(regexTronsmoProductPage, possibleISBN)) {
    const prodObj = extractAndPrepareTronsmo(prodObjTronsmo);
    sendObj(prodObj);
  }

  console.log('#######################################  Content at Tronsmo!');

}));
