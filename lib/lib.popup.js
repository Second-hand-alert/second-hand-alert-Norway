import { html } from '@arrow-js/core'
const browser = chrome

function format (arr) {
  // need an if-statement to check if arr.response === null, and then make a placeholder HTML to draw
  console.log('array to format: ' + JSON.stringify(arr, null, 2))
  if (arr === null) {
    const appElement = document.getElementById('list')
    const template = html`
      <div class="searchItem">
        <h2>Her kommer produktlinker til brukte alternativer n&aring;r vi finner det.</h2>
      </div>
    `
    template(appElement)
  } else if (arr !== null) {
    if (arr.length > 1) {
      arr.reverse()
    }
    const appElement = document.getElementById('list')
    console.log('array length: ' + arr.length)
    let tempTemplate = ''
    for (let i = 0; i < arr.length; i++) {
      console.log('Array item number: ' + i + ' ' + arr[i].searchSite)
      if (arr[i].searchSite === 'FINN.no') {
        const item = `
          <div class="searchItem">
            <h2>${arr[i].title}</h2>
            <p class="searchHits"><em>${arr[i].searchResults}</em> produkter p&aring; ${arr[i].searchSite}:<br /><a target="_blank" href="${arr[i].URL}">${arr[i].queryPartReadable}</a></p>
          </div>
        `
        console.log('FINN item: ' + item)
        tempTemplate += item
      } else if (arr[i].searchSite === 'Bookis.no') {
        const item = `
          <div class="searchItem">
            <h2>${arr[i].title}</h2>
            <p class="searchHits">${arr[i].searchResults} tilgjengelig p&aring; ${arr[i].searchSite}:<br /><a target="_blank" href="${arr[i].URL}">${arr[i].ISBN}</a></p>
          </div>
        `
        console.log('Bookis item: ' + item)
        tempTemplate += item
      }
    }
    const template = html`${tempTemplate}`
    template(appElement)
  }
}

function sendMessage () {
  browser.runtime.sendMessage({ type: 'POPUP_OPEN' })
    .then((response) => {
      console.info('Popup-js received response from background: ', JSON.stringify(response, null, ' '))
    })
    .catch((error) => {
      console.warn('Popup.js could not send/receive message to/freom background', error)
    })
}

function handleMessage (obj, sender, sendResponse) {
  console.log('## Type:      ' + obj.type)
  console.log('## Sender:    ' + JSON.stringify(sender, null, ' '))
  format(obj.searchArr)
}

// Trigger script when opened
export { browser, handleMessage, sendMessage }
