(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  chrome;
  const regexEuroskoProductPage = /\d{3,}-\d{6,}$/;

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

  // ### ############################################################################################### ###
  // ###  FINN.no brand ID

  const finnBrandIds = [
    { brand: 'adidas', id: 9008 },
    { brand: 'asics', id: 9023 },
    { brand: 'birkenstock', id: 9046 },
    { brand: 'crocs', id: 9092 },
    { brand: 'dr. martens', id: 9110 },
    { brand: 'ecco', id: 9112 },
    { brand: 'fila', id: 9123 },
    { brand: 'merrell', id: 9246 },
    { brand: 'new balance', id: 9273 },
    { brand: 'nike', id: 9275 },
    { brand: 'åomar', id: 9310 },
    { brand: 'puma', id: 9316 },
    { brand: 'reebok', id: 9327 },
    { brand: 'rieker', id: 9330 },
    { brand: 'skechers', id: 9357 },
    { brand: 'stockholm design group', id: 571 },
    { brand: 'tamaris', id: 9377 },
    { brand: 'timberland', id: 9386 },
    { brand: 'tretorn', id: 9392 },
    { brand: 'viking', id: 9413 }
  ];

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

  document.body.addEventListener('click', (event) => {
    setTimeout(() => {
      console.log('###### event click registered: ' + window.location.href);
      if (productUrlCheck(regexEuroskoProductPage, window.location.href) && firstTime === false && newURL(window.location.href)) {
        console.log('### location changed: ' + window.location.href);
        // let prodObj = prodObjEurosko()
        const brand = document.getElementsByTagName('main')[0].getElementsByTagName('h1')[0].previousSibling.textContent.toLowerCase();
        if (finnBrandIds.some(e => e.brand === brand)) {
          console.log('brand ' + brand + ' exists');
          const brandObj = (finnBrandIds.find(e => e.brand === brand));
          console.log('brand id: ' + brandObj.id);
          // prodObjEurosko.urlPart2 = prodObjEurosko.urlPart2 + '&brand=' +
        } else {
          console.log('brand ' + brand + ' doesn\'t exist');
        }
        // prodObj = extractAndPrepareKappahl(prodObj)
        // sendObj(prodObj)
      }
    }, 1200);
  });

  // Needed for first page loaded
  if (firstTime === true) {
    firstTime = false;
    if (productUrlCheck(regexEuroskoProductPage, window.location.href)) {
      setTimeout(() => {
        const brand = document.getElementsByTagName('main')[0].getElementsByTagName('h1')[0].previousSibling.textContent.toLowerCase();
        console.log('brand: ' + brand);
        if (finnBrandIds.some(e => e.brand === brand)) {
          console.log('brand ' + brand + ' exists');
          const brandObj = (finnBrandIds.find(e => e.brand === brand));
          console.log('brand id: ' + brandObj.id);
          // prodObjEurosko.urlPart2 = prodObjEurosko.urlPart2 + '&brand=' +
        } else {
          console.log('brand ' + brand + ' doesn\'t exist');
        }
        // let prodObj = prodObjKappahl
        // prodObj = extractAndPrepareKappahl(prodObj)
        // sendObj(prodObj)
      }, 1200);
    }
  }

}));
