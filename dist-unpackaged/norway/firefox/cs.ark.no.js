(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;

  function prodObjArk () {
    return {
      type: 'CONTENT_BACKGROUND',
      title: '',
      ISBN: '',
      URL: 'https://bookis.com/no/search?books_norway[query]=',
      URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
      site: 'ARK',
      searchSite: 'Bookis.no',
      searchResults: null,
      available: null,
      timeStamp: null
    }
  }

  function extractAndPrepareArk (prodObj) {
    prodObj.title = document.querySelector('meta[property="og:title"]').getAttribute('content');
    prodObj.ISBN = document.querySelector('meta[name="evg:sku"]').getAttribute('content');
    console.log('### ARK - ISBN: ' + prodObj.ISBN);
    prodObj.timeStamp = Date.now();
    prodObj.URL = prodObj.URL + prodObj.ISBN;
    prodObj.URLCheckAvailability = prodObj.URLCheckAvailability + prodObj.ISBN;
    console.log(JSON.stringify(prodObj, null, ' '));
    return prodObj
  }

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

  setTimeout(() => {
    const prodObj = extractAndPrepareArk(prodObjArk);
    sendObj(prodObj);
  }, 1000);

  console.log('Content at Ark!');

}));
