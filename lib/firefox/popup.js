let searchArr = []

function format(arr) {
  arr = arr.reverse()
  let HTML = ``

  for (let i = 0; i < arr.length; i++) {
    let objHTML = `
      <div class="searchItem">
        <h2><a target="_blank" href="${arr[i].URL}">${arr[i].title}</a></h2>
        <p class="searchHits"><em>${arr[i].searchResults}</em> treff p&aring; ${arr[i].searchSite} med s&oslash;k p&aring;:<br/>'${arr[i].queryPartReadable}'</p>
      </div>
    `
    // console.log(arr[i]);
    HTML +=(objHTML)

    const list = document.getElementById('list')
    list.innerHTML = HTML
  }
}

// Trigger script when opened
chrome.runtime.sendMessage({type: 'POPUP_OPEN'})
  .then((response) => {
    console.info("Popup-js received response from background: ", JSON.stringify(response, null, ' '))
    return response
  }).then((arr) => {
    format(arr)
  })
  .catch((error) => {
    console.warn("Popup.js could not send message to background", error)
  })

console.log('Hello popup.js!')