(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  // ###    A: Make script work for Firefox and Chrome-based browsers          ###
  // ###    B: Define regexes for finding amount of product hits               ###
  // ###    C: Notify browser when productHits > 0                             ###
  // ###    D: Search Finn, send response to popup script and notify if        ###
  // ###       results                                                         ###
  // ###    E: Set                        ###
  // ###    F: Set data to browser.storage.local                               ###
  // ###    G: Get data from browser.storage.local and send to popup           ###
  // ###    H: Listener to message from content scripts                        ###
  // ###    I: Hello background! Just checking                                 ###

  // ###    Example of object that is sent from IKEA content-script:           ###
  // let prodObj = {
  //   type: 'CONTENT_BACKGROUND',
  //   title: '',
  //   queryPartReadable: '',
  //   URL: '',
  //   searchSite: 'FINN',
  //   searchResults: null
  // }

  // ###    A: Make script work for Firefox and Chrome-based browsers          ###
  const browser$1 = chrome;

  // ###    B: Define regexes for finding amount of product hits               ###
  const regexes = {
    FINN: /(?<=<meta name="description" content="Du finner )\d+/mu
  };

  // ###    C: Notify browser when productHits > 0                             ###
  function notifyBrowser (prodObj) {
    const options = {
      type: 'basic',
      title: prodObj.title,
      message: 'Tilgjengelig på ' + prodObj.searchSite + ': ' + prodObj.searchResults,
      iconUrl: './img/icon128.png'
    };
    browser$1.notifications.create(options);
  }

  function removeDuplicates (list) {
    const filtered = list.filter((obj1, i, array) =>
      array.findLastIndex(obj2 => (obj2.URL === obj1.URL)) === i
    );
    return filtered
  }

  function cutoffList (list) {
    if (list.length > 50) {
      list = list.reverse();
      list = list.slice(0, 50);
      list = list.reverse();
    }
    return list
  }

  // ###    D: Search Finn, send response to popup script and notify if        ###
  // ###       results                                                         ###
  function productSearchFINN (prodObj) {
    console.log('searching url: ' + prodObj.URL);
    fetch(prodObj.URL)
      .then(response => {
        console.log('searching finn');
        return response.text()
      })
      .then(html => {
        const hits = regexes.FINN.exec(html);
        prodObj.searchResults = Number(hits[0]);
        if (prodObj.searchResults > 0) {
          delete prodObj.type;
          notifyBrowser(prodObj);
          setStorageData(prodObj);
        }
      })
      .catch(error => {
        console.error('Failed to fetch ' + prodObj.searchSite + ' page: ', error);
      });
  }

  // ###    D: Search BookisNo, send response to popup script and notify if        ###
  // ###       available                                                           ###
  function productSearchBookisNo (prodObj) {
    console.log('###### BOOKIS - prodObj: ' + JSON.stringify(prodObj, null, 2));
    fetch(prodObj.URLCheckAvailability)
      .then(response => {
        console.log('###### Response from Bookis: ' + JSON.stringify(response));
        return response.json()
      })
      .then(bookisResponse => {
        console.log('###### JSON from Bookis: ' + JSON.stringify(bookisResponse, null, 2));
        console.dir(bookisResponse.data[0].availability);
        const available = bookisResponse.data[0].availability.available;
        if (available) {
          prodObj.searchResults = '✅';
          notifyBrowser(prodObj);
          setStorageData(prodObj);
        }
      })
      .catch(error => {
        console.error('Failed to fetch ' + prodObj.searchSite + ' page: ', error);
      });
  }

  // ###    E: Listener to message from content scripts and popup              ###
  function handleMessages (obj, sender, sendResponse) {
    if (obj.type === 'CONTENT_BACKGROUND') {
      console.log(obj.searchSite);
      if (obj.searchSite === 'FINN.no') {
        productSearchFINN(obj);
        sendResponse({ response: 'Response from background script to content script' });
      }
      if (obj.searchSite === 'Bookis.no') {
        productSearchBookisNo(obj);
        sendResponse({ response: 'Response from background script to content script' });
      }
      return
    } if (obj.type === 'POPUP_OPEN') {
      getStorageDataAndSend();
      sendResponse({ response: 'Background script heard you. Already sent a separate message with searchArr' });
    } else {
      console.log('## Not a recognisable message from either content or popup.');
      console.log('## Type & sender:   ' + JSON.stringify(obj.type, null, ' ') + '\n' + JSON.stringify(sender, null, ' '));
    }
  }

  // ###    F: Set data to browser.storage.local                               ###
  function setStorageData (prodObj) {
    browser$1.storage.local.get({ searchArr: null })
      .then((keyValueStore) => {
        if (keyValueStore.searchArr === null) {
          browser$1.storage.local.set({ searchArr: [prodObj] });
        } else {
          keyValueStore.searchArr.push(prodObj);
          let searchArr = keyValueStore.searchArr;
          searchArr = removeDuplicates(searchArr);
          searchArr = cutoffList(searchArr);
          browser$1.storage.local.set({ searchArr });
        }
      })
      .catch((error) => {
        console.error('Error for get or set when setting: ' + error);
      });
  }

  // ###    G: Get data from browser.storage.local and send to popup           ###
  function getStorageDataAndSend () {
    browser$1.storage.local.get({ searchArr: null })
      .then((result) => {
        browser$1.runtime.sendMessage({ type: 'BACKGROUND_POPUP', searchArr: result.searchArr });
      })
      .catch((error) => {
        console.error('Error in getStoredData: ' + error);
      });
  }

  // ###    H: Listener to message from content scripts                        ###
  browser$1.runtime.onMessage.addListener(handleMessages);

  // ###    G: Hello background! Just checking                                 ###
  console.log('Hello background.js');

  async function requestPermissions (manifest) {
    const missingSites = [];
    const actualPermissions = await browser.permissions.getAll();
    manifest.host_permissions.forEach((hostPermission) => {
      if (!actualPermissions.origins.includes(hostPermission)) {
        missingSites.push(hostPermission);
      }
    });
    if (missingSites.length > 0) {
      console.log('Sites that needs a permisson request: ' + missingSites.length);
      console.log(JSON.stringify(missingSites, '', 2));
    } else {
      console.log('All sites got their permissions');
    }
  }

  requestPermissions(browser.runtime.getManifest());

  browser.runtime.onMessage.addListener(handleMessages);

}));
