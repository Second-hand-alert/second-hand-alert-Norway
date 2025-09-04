(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;
  const regexAkademikaProductPage = /[\d]{13}$/;

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

  const prodObjAkademika = {
    type: 'CONTENT_BACKGROUND',
    title: '',
    ISBN: '',
    URL: 'https://bookis.com/no/search?books_norway&query=',
    URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
    site: 'Akademika',
    searchSite: 'Bookis.no',
    searchResults: null,
    available: null,
    timeStamp: null
  };

  function extractAndPrepareAkademika (prodObj) {
    const regexTitle = /^.+?(?= - |$)/;
    const regexISBN = /(?<=\()\d{13}(?=\))/;
    const titleTag = document.getElementsByTagName('title')[0].innerHTML;
    prodObj.title = regexTitle.exec(titleTag)[0];
    prodObj.ISBN = regexISBN.exec(titleTag)[0];
    console.log('### Akademika - ISBN: ' + prodObj.ISBN);
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

  if (productUrlCheck(regexAkademikaProductPage, window.location.href)) {
    const prodObj = extractAndPrepareAkademika(prodObjAkademika);
    sendObj(prodObj);
  }

  console.log('#######################################  Content at Akademika!');

}));
