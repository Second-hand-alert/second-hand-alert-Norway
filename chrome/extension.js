// Extension will be included in index.html and get needed info from background.js
if (typeof browser === "undefined") {
  var browser = chrome
}

let message2 = ''

browser.runtime.onMessage.addListener((data) => {
  console.log('Type: ' + data.type)
  if (data.type === 'BACKGROUND_POPUP') {
    console.log('Title: ' + data.title)
    message2 = 'Correct recipient'
  } else {
    console.log('Wrong recipient')
    message2 = 'Wrong recipient'
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const basic = document.getElementById('basic')

  basic.addEventListener('click', () => {
    let options = {
      type: 'basic',
      title: 'Basic Notification',
      message: 'This is a Basic Notification ' + message2,
      iconUrl: './img/icon128.png',
    }
    chrome.notifications.create(options)
  })
})
