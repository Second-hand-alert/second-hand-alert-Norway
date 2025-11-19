(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;

  // ### ############################################################################################### ###
  // ### Product objects as variables or functions. Variables for sites with pages, functions for SPA
  const prodObjIkea = {
    type: 'CONTENT_BACKGROUND',
    title: '',
    queryPartReadable: '',
    queryPart: '',
    URL: '',
    urlPart1: 'https://www.finn.no/recommerce/forsale/search?category=0.78&q=',
    urlPart2: '&sort=PRICE_ASC&for_rent=0&trade_type=1&trade_type=2',
    site: 'IKEA',
    searchSite: 'FINN.no',
    searchResults: null,
    timeStamp: null
  };

  // ### ############################################################################################### ###
  // ### Extract content from page and prepare for background-script stuff
  function extractAndPrepareIkea (prodObj) {
    const regexStandard = /^.+?(?=, )/gmu;
    const testMeasurement = /(\d+x\d+x\d+\scm)|(\d+x\d+\scm)|(\d+\scm)/gmu;
    const regexMeasurement = /[\d]+(?=x)|[\d]+(?=\scm)/gu;

    // prodObj.title = document.getElementsByTagName('title')[0].innerHTML
    prodObj.title = document.getElementById('pip-buy-module-content').getElementsByTagName('h1')[0].textContent;
    prodObj.queryPartReadable = regexStandard.exec(prodObj.title);

    // Check if measurement in title
    if (testMeasurement.test(prodObj.title)) {
      const measurement = [];
      let i;
      // Populate measurement with all matches
      while ((i = regexMeasurement.exec(prodObj.title)) !== null) {
        i.forEach((match) => {
          console.log('measurement: ' + match);
          measurement.push(match);
        });
      }
      prodObj.queryPartReadable.push(...measurement);
    }
    prodObj.timeStamp = Date.now();
    // Populate queryPart, join to string with '+'
    prodObj.queryPartReadable = prodObj.queryPartReadable.join(' ');
    // Create queryPart to use in the actual query
    prodObj.queryPart = prodObj.queryPartReadable.replaceAll(' ', '+');
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

  const prodObj = extractAndPrepareIkea(prodObjIkea);
  sendObj(prodObj);

}));
