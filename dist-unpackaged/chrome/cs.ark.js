(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;
  const regexArkProductPage = /^(https:\/\/www\.ark\.no\/produkt\/boker\/)/;

  // For SPA-sites, content script triggers on every page. This function to check if it's a product page.
  // Can also be used where the start of the URL isn't simple-regexed as a product page
  function productUrlCheck (regexUrlCheck, url) {
    // check if url matches regex test and return true/false
    if (regexUrlCheck.test(url)) {
      console.log('### Product product page TRUE --> ' + url);
      return true
    } else {
      console.log('### Product page FALSE --> ' + url);
      return false
    }
  }

  function prodObjArk () {
    return {
      type: 'CONTENT_BACKGROUND',
      title: '',
      ISBN: '',
      URL: 'https://bookis.com/no/search?books_norway&query=',
      URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
      site: 'ARK',
      searchSite: 'Bookis.no',
      searchResults: null,
      available: null,
      timeStamp: null
    }
  }

  function extractAndPrepareArk (prodObj) {
    console.log('################## prodobj in extractAndPrepareArk: ' + JSON.stringify(prodObj, null, 2));
    prodObj.title = document.querySelector('meta[property="og:title"]').getAttribute('content');
    prodObj.ISBN = document.querySelector('meta[name="evg:sku"]').getAttribute('content');
    console.log('### ARK - ISBN: ' + prodObj.ISBN);
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

  window.navigation.addEventListener('navigate', (event) => {
    if (productUrlCheck(regexArkProductPage, event.destination.url)) {
      console.log('###### location changed: ' + event.destination.url);
      setTimeout(() => {
        let prodObj = prodObjArk();
        console.log('#### Ark prodObj now: ' + JSON.stringify(prodObj, null, 2));
        prodObj = extractAndPrepareArk(prodObj);
        sendObj(prodObj);
      }, 1200);
    }
  });

  console.log('#######################################  Content at Ark!');

}));
