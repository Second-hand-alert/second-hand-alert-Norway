(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser = chrome;
  const regexNorliProductPage = /^(https:\/\/www\.norli\.no\/boker\/)/;

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

  function prodObjNorli () {
    return {
      type: 'CONTENT_BACKGROUND',
      title: '',
      ISBN: '',
      URL: 'https://bookis.com/no/search?books_norway&query=',
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

  // let firstTime = true

  // window.navigation.addEventListener('navigate', (event) => {
  //   if (firstTime === false && productUrlCheck(regexNorliProductPage, event.destination.url)) {
  //     console.log('###### location changed: ' + event.destination.url)
  //     setTimeout(() => {
  //       let prodObj = prodObjNorli()
  //       console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2))
  //       prodObj = extractAndPrepareNorli(prodObj)
  //       sendObj(prodObj)
  //     }, 1200)
  //   }
  // })

  // // Needed for first page loaded
  // setTimeout(() => {
  //   if (firstTime && productUrlCheck(regexNorliProductPage, window.location.href)) {
  //     firstTime = false
  //     let prodObj = prodObjNorli()
  //     console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2))
  //     prodObj = extractAndPrepareNorli(prodObj)
  //     sendObj(prodObj)
  //   }
  // }, 1200)

  // console.log('Content at Norli!')

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
      console.log('###### event keyup registered: ' + window.location.href);
      if (event.key === 'enter' && productUrlCheck(regexNorliProductPage, window.location.href) && firstTime === false && newURL(window.location.href) === true) {
        console.log('###### location changed: ' + window.location.href);
        let prodObj = prodObjNorli();
        console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2));
        prodObj = extractAndPrepareNorli(prodObj);
        sendObj(prodObj);
      }
    }, 1200);
  });

  document.body.addEventListener('click', (event) => {
    setTimeout(() => {
      console.log('###### event click registered: ' + window.location.href);
      if (productUrlCheck(regexNorliProductPage, window.location.href) && firstTime === false && newURL(window.location.href)) {
        console.log('###### location changed: ' + window.location.href);
        let prodObj = prodObjNorli();
        console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2));
        prodObj = extractAndPrepareNorli(prodObj);
        sendObj(prodObj);
      }
    }, 1200);
  });

  // Needed for first page loaded
  if (firstTime === true) {
    firstTime = false;
    if (productUrlCheck(regexNorliProductPage, window.location.href)) {
      setTimeout(() => {
        let prodObj = prodObjNorli();
        console.log('#### Norli prodObj now: ' + JSON.stringify(prodObj, null, 2));
        prodObj = extractAndPrepareNorli(prodObj);
        sendObj(prodObj);
      }, 1200);
    }
  }

  console.log('Content at Norli!');

}));
