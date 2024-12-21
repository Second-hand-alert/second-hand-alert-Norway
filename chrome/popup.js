// Trigger script when opened
// chrome.browserAction.onClicked
chrome.runtime.sendMessage({type: 'POPUP_OPEN'})
  .then((response) => {
    console.info("Popup-js received response from background: ", JSON.stringify(response, null, ' '))
  })
  .catch((error) => {
    console.warn("Popup.js could not send message to background", error)
  })

console.log('Hello popup.js!')