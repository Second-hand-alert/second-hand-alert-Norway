if (typeof browser === 'undefined') {
  var browser = chrome
}

function productFound(message) {
  console.log('Product to search Finn for: ' + message)
}

browser.runtime.onMessage.addListener(productFound);
console.log('Hello background.js')