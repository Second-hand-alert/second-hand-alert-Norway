(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  chrome;
  const regexHellyhansenProductPage = /(?<=-)\d{4,}(?=\?)|(?<=-)\d{4,}/;

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

  if (productUrlCheck(regexHellyhansenProductPage, window.location.href)) {
    console.log('### ########################## Hello PRODUCT at Helly Hansen in Firefox! ###');
  }

  console.log('### ########################## Hello content at Helly Hansen in Firefox! ###');

}));
