(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;

  const prodObjBergans = {
    type: 'CONTENT_BACKGROUND',
    title: '',
    queryPartReadable: '',
    queryPart: '',
    URL: '',
    urlPart1: 'https://www.finn.no/recommerce/forsale/search?brand=1541&q=',
    urlPart2: '&sort=PRICE_ASC&for_rent=0&trade_type=1&trade_type=2',
    site: 'Bergans',
    searchSite: 'FINN.no',
    searchResults: null,
    timeStamp: null
  };

  function extractAndPrepareBergans (prodObj) {
    prodObj.title = document.getElementsByTagName('h1')[0].textContent;
    console.log(prodObj.title);
    prodObj.queryPartReadable = prodObj.title;
    prodObj.queryPart = prodObj.queryPartReadable.replaceAll(' ', '+');
    prodObj.timeStamp = Date.now();
    // Create URL and delete key/values not needed
    prodObj.URL = encodeURI(prodObj.urlPart1 + prodObj.queryPart + prodObj.urlPart2);
    delete prodObj.queryPart;
    delete prodObj.urlPart1;
    delete prodObj.urlPart2;
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

  const prodObj = extractAndPrepareBergans(prodObjBergans);
  sendObj(prodObj);

}));
