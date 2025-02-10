const browser = chrome

const prodObjIkea = {
  type: 'CONTENT_BACKGROUND',
  title: '',
  queryPartReadable: '',
  queryPart: '',
  URL: '',
  urlPart1: 'https://www.finn.no/bap/forsale/search.html?category=0.78&q=',
  urlPart2: '&sort=PRICE_ASC&for_rent=0&trade_type=1&trade_type=2',
  site: 'IKEA',
  searchSite: 'FINN',
  searchResults: null,
  timeStamp: null
}

function extractAndPrepareIkea (prodObj) {
  const regexStandard = /^.+?(?=, )/gmu
  const testMeasurement = /(\d+x\d+x\d+\scm)|(\d+x\d+\scm)/gmu
  const regexMeasurement = /[\d\d+]+/gu

  prodObj.title = document.getElementsByTagName('title')[0].innerHTML
  prodObj.queryPartReadable = regexStandard.exec(prodObj.title)

  // Check if measurement in title
  if (testMeasurement.test(prodObj.title)) {
    const measurement = []
    let i
    // Populate measurement with all matches
    while ((i = regexMeasurement.exec(prodObj.title)) !== null) {
      i.forEach((match) => {
        console.log('measurement: ' + match)
        measurement.push(match)
      })
    }
    prodObj.queryPartReadable.push(...measurement)
  }
  prodObj.timeStamp = Date.now()
  // Populate queryPart, join to string with '+'
  prodObj.queryPartReadable = prodObj.queryPartReadable.join(' ')
  // Create queryPart to use in the actual query
  prodObj.queryPart = prodObj.queryPartReadable.replaceAll(' ', '+')
  // Create URL and delete key/values not needed
  prodObj.URL = encodeURI(prodObj.urlPart1 + prodObj.queryPart + prodObj.urlPart2)
  delete prodObj.queryPart
  delete prodObj.urlPart1
  delete prodObj.urlPart2
  console.log(JSON.stringify(prodObj, null, ' '))
  return prodObj
}

function sendObj (obj) {
  console.log('Sending object: ' + obj)
  const sending = browser.runtime.sendMessage(obj)
  sending
    .then(response => {
      console.log('Response to cs.ikea from background: ' + JSON.stringify(response, null, ' '))
    })
    .catch(error => {
      console.error('Error sending from cs.ikea to background: ', error)
    })
}

export { browser, prodObjIkea, extractAndPrepareIkea, sendObj }
