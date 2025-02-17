(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;

  function prodObjNorli () {
    return {
      type: 'CONTENT_BACKGROUND',
      title: '',
      ISBN: '',
      URL: 'https://bookis.com/no/search?books_norway[query]=',
      URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
      site: 'Norli',
      searchSite: 'Bookis.no',
      searchResults: null,
      available: null,
      timeStamp: null
    }
  }

  function extractAndPrepareNorli (prodObj) {
    const regexISBN = /\d{13}/;
    prodObj.title = document.querySelector('meta[property="og:title"]').getAttribute('content');
    let isbn = document.querySelector('meta[property="og:image"]').getAttribute('content');
    isbn = regexISBN.exec(isbn);
    prodObj.ISBN = isbn[0];
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
    const prodObj = extractAndPrepareNorli(prodObjNorli);
    sendObj(prodObj);
  }, 1000);

  console.log('Content at Norli!');

}));
