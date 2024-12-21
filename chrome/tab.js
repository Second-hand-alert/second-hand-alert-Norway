// Extension will be included in index.html and get needed info from background.js
if (typeof browser === "undefined") {
  var browser = chrome
}

let message2 = ''

browser.runtime.onMessage.addListener((prodObj) => {
  console.log('Type: ' + prodObj.type)
  if (data.type === 'BACKGROUND_POPUP') {
    console.log(JSON.stringify(prodObj, null, ' '))
  } else {
    console.log('Popup.js: Wrong recipient')
  }
})

console.log('Hello popup.js!')
window.blur()
