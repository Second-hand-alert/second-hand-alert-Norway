(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  const browser$1 = chrome;

  function format (arr) {
    // need an if-statement to check if arr.response === null, and then make a placeholder HTML to draw
    console.log('array to format: ' + JSON.stringify(arr, null, ' '));
    let HTML = '';
    if (arr === null) {
      HTML = `
      <div class="searchItem">
        <h2>Her kommer produktlinker til brukte alternativer når vi finner det.</h2>
      </div>
    `;
    } else if (arr !== null) {
      if (arr.length > 1) {
        arr.reverse();
      }
      for (let i = 0; i < arr.length; i++) {
        const objHTML = `
        <div class="searchItem">
          <h2>${arr[i].title}</h2>
          <p class="searchHits"><em>${arr[i].searchResults}</em> produkter p&aring; ${arr[i].searchSite}:<br /><a target="_blank" href="${arr[i].URL}">${arr[i].queryPartReadable}</a></p>
        </div>
      `;
        HTML += (objHTML);
      }
    }
    const list = document.getElementById('list');
    list.innerHTML = HTML;
  }

  function sendMessage () {
    browser$1.runtime.sendMessage({ type: 'POPUP_OPEN' })
      .then((response) => {
        console.info('Popup-js received response from background: ', JSON.stringify(response, null, ' '));
      })
      .catch((error) => {
        console.warn('Popup.js could not send/receive message to/freom background', error);
      });
  }

  function handleMessage (obj, sender, sendResponse) {
    console.log('## Type:      ' + obj.type);
    console.log('## Sender:    ' + JSON.stringify(sender, null, ' '));
    format(obj.searchArr);
  }

  console.log('Hello popup.js!');

  // Trigger script when opened
  browser.runtime.onMessage.addListener(handleMessage);
  sendMessage();
  console.log('Hello popup.js!');

}));
