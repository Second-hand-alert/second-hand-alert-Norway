const browser = chrome

function format (arr) {
  // need an if-statement to check if arr.response === null, and then make a placeholder HTML to draw
  console.log('array to format: ' + JSON.stringify(arr, null, ' '))
  arr = arr.reverse()
  let HTML = ''

  for (let i = 0; i < arr.length; i++) {
    const objHTML = `
      <div class="searchItem">
        <h2><a target="_blank" href="${arr[i].URL}">${arr[i].queryPartReadable}</a></h2>
        <p class="searchHits"><em>${arr[i].searchResults}</em> hits on ${arr[i].searchSite} for product: </p>
        <p class="productName"><i>${arr[i].title}</i></p>
      </div>
    `
    HTML += (objHTML)

    const list = document.getElementById('list')
    list.innerHTML = HTML
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
