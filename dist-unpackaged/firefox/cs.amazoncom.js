(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;
  const regexAmazoncomProductPageA = /(Books)/;
  const regexAmazoncomProductPageB = /:\s\d{13}:\s/;

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

  const prodObjAmazoncom = {
    type: 'CONTENT_BACKGROUND',
    title: '',
    ISBN: '',
    URL: 'https://bookis.com/no/search?books_norway&query=',
    URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
    site: 'Amazon.com',
    searchSite: 'Bookis.no',
    searchResults: null,
    available: null,
    timeStamp: null
  };

  function extractAndPrepareAmazoncom (prodObj) {
    const regexISBN = /(?<=:\s)\d{13}(?=:\s)/;
    let isbn = document.querySelector('meta[name="title"]').getAttribute('content');
    prodObj.title = document.getElementById('productTitle').innerText;
    isbn = regexISBN.exec(isbn);
    prodObj.ISBN = isbn[0];
    console.log('### Amazon.com - ISBN:  ' + prodObj.ISBN);
    console.log('### Amazon.com - Title: ' + prodObj.title);
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

  const titleContent = document.querySelector('meta[name="title"]').getAttribute('content');

  if (productUrlCheck(regexAmazoncomProductPageA, titleContent) && productUrlCheck(regexAmazoncomProductPageB, titleContent)) {
    const prodObj = extractAndPrepareAmazoncom(prodObjAmazoncom);
    sendObj(prodObj);
  }

  console.log('#######################################  Content at Amazon.com!');

}));
