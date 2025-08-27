(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;

  const prodObjAdlibris = {
    type: 'CONTENT_BACKGROUND',
    title: '',
    ISBN: '',
    URL: 'https://bookis.com/no/search?books_norway&query=',
    URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
    site: 'AdLibris',
    searchSite: 'Bookis.no',
    searchResults: null,
    available: null,
    timeStamp: null
  };

  function extractAndPrepareAdlibris (prodObj) {
    const regexTitle = /^.+?(?= - |$)/;
    const regexISBN = /(?<=\()\d{13}(?=\))/;
    const titleTag = document.getElementsByTagName('title')[0].innerHTML;
    prodObj.title = regexTitle.exec(titleTag)[0];
    prodObj.ISBN = regexISBN.exec(titleTag)[0];
    console.log('### AdLibris - ISBN: ' + prodObj.ISBN);
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

  const prodObj = extractAndPrepareAdlibris(prodObjAdlibris);
  sendObj(prodObj);

  console.log('#######################################  Content at AdLibris!');

}));
