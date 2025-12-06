(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;
  const regexHellyhansenProductPage = /(?<=-)\d{4,}(?=\?)?/;

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

  function prodObjHellyhansen () {
    return {
      type: 'CONTENT_BACKGROUND',
      title: '',
      queryPartReadable: '',
      queryPart: '',
      URL: '',
      urlPart1: 'https://www.finn.no/recommerce/forsale/search?brand=9159&q=',
      urlPart2: '&sort=PRICE_ASC&for_rent=0&trade_type=1&trade_type=2',
      site: 'Helly Hansen',
      searchSite: 'FINN.no',
      searchResults: null,
      timeStamp: null
    }
  }

  function extractAndPrepareHellyhansen (prodObj) {
    console.log('extracting...');
    const regexHellyhansen = /.+((?= Herre+)|(?= Dame+)|(?= Barn+)|(?= Jente+)|(?= Gutt+))|.+/;
    prodObj.title = document.getElementsByTagName('h1')[0].textContent;
    console.log(prodObj.title);
    prodObj.queryPartReadable = regexHellyhansen.exec(prodObj.title)[0];
    prodObj.queryPartReadable = prodObj.queryPartReadable.replaceAll('™', '').replaceAll('®', '');
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

  let firstTime = true;
  let currentUrl = window.location.href;

  const newURL = function (location) {
    if (currentUrl !== location) {
      currentUrl = location;
      console.log('new url!');
      return true
    } else {
      console.log('old url!');
      return false
    }
  };

  document.body.addEventListener('keyup', (event) => {
    setTimeout(() => {
      if (event.key === 'enter' && productUrlCheck(regexHellyhansenProductPage, window.location.href) && firstTime === false && newURL(window.location.href) === true) {
        console.log('###location changed: ' + window.location.href);
        let prodObj = prodObjHellyhansen();
        prodObj = extractAndPrepareHellyhansen(prodObj);
        sendObj(prodObj);
      }
    }, 1200);
  });

  document.body.addEventListener('click', (event) => {
    setTimeout(() => {
      console.log('###### event click registered: ' + window.location.href);
      if (productUrlCheck(regexHellyhansenProductPage, window.location.href) && firstTime === false && newURL(window.location.href)) {
        console.log('### location changed: ' + window.location.href);
        let prodObj = prodObjHellyhansen();
        prodObj = extractAndPrepareHellyhansen(prodObj);
        sendObj(prodObj);
      }
    }, 1200);
  });

  // Needed for first page loaded
  if (firstTime === true) {
    firstTime = false;
    if (productUrlCheck(regexHellyhansenProductPage, window.location.href)) {
      setTimeout(() => {
        let prodObj = prodObjHellyhansen;
        prodObj = extractAndPrepareHellyhansen(prodObj);
        sendObj(prodObj);
      }, 1200);
    }
  }

  console.log('Content at Helly Hansen!');

}));
