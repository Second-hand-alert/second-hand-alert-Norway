const browser = chrome

const regexAkademikaProductPage = /\d{13}$/
const regexArkProductPage = /^(https:\/\/www\.ark\.no\/produkt\/boker\/)/
const regexNorliProductPage = /^(https:\/\/www\.norli\.no\/boker\/)/

// For SPA-sites, content script triggers on every page. This function to check if it's a product page
function productUrlCheck (regexUrlCheck, url) {
  // check if url matches regex test and return true/false
  if (regexUrlCheck.test(url)) {
    console.log('### Book product page TRUE --> ' + url)
    return true
  } else {
    console.log('### Book product page FALSE --> ' + url)
    return false
  }
}

const prodObjIkea = {
  type: 'CONTENT_BACKGROUND',
  title: '',
  queryPartReadable: '',
  queryPart: '',
  URL: '',
  urlPart1: 'https://www.finn.no/bap/forsale/search.html?category=0.78&q=',
  urlPart2: '&sort=PRICE_ASC&for_rent=0&trade_type=1&trade_type=2',
  site: 'IKEA',
  searchSite: 'FINN.no',
  searchResults: null,
  timeStamp: null
}

const prodObjAdlibris = {
  type: 'CONTENT_BACKGROUND',
  title: '',
  ISBN: '',
  URL: 'https://bookis.com/no/search?books_norway&query=',
  URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
  site: 'AdLibris',
  searchSite: 'Bookis.no',
  searchResults: null,
  available: null,
  timeStamp: null
}

const prodObjAkademika = {
  type: 'CONTENT_BACKGROUND',
  title: '',
  ISBN: '',
  URL: 'https://bookis.com/no/search?books_norway&query=',
  URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
  site: 'Akademika',
  searchSite: 'Bookis.no',
  searchResults: null,
  available: null,
  timeStamp: null
}

function prodObjArk () {
  return {
    type: 'CONTENT_BACKGROUND',
    title: '',
    ISBN: '',
    URL: 'https://bookis.com/no/search?books_norway&query=',
    URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
    site: 'ARK',
    searchSite: 'Bookis.no',
    searchResults: null,
    available: null,
    timeStamp: null
  }
}

const prodObjBokkilden = {
  type: 'CONTENT_BACKGROUND',
  title: '',
  ISBN: '',
  URL: 'https://bookis.com/no/search?books_norway&query=',
  URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
  site: 'Bokkilden',
  searchSite: 'Bookis.no',
  searchResults: null,
  available: null,
  timeStamp: null
}

function prodObjNorli () {
  return {
    type: 'CONTENT_BACKGROUND',
    title: '',
    ISBN: '',
    URL: 'https://bookis.com/no/search?books_norway&query=',
    URLCheckAvailability: 'https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=',
    site: 'Norli',
    searchSite: 'Bookis.no',
    searchResults: null,
    available: null,
    timeStamp: null
  }
}

function extractAndPrepareIkea (prodObj) {
  const regexStandard = /^.+?(?=, )/gmu
  const testMeasurement = /(\d+x\d+x\d+\scm)|(\d+x\d+\scm)|(\d+\scm)/gmu
  const regexMeasurement = /[\d]+(?=x)|[\d]+(?=\scm)/gu

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

function extractAndPrepareAdlibris (prodObj) {
  const regexTitle = /^.+?(?= - |$)/
  const regexISBN = /(?<=\()\d{13}(?=\))/
  const titleTag = document.getElementsByTagName('title')[0].innerHTML
  prodObj.title = regexTitle.exec(titleTag)[0]
  prodObj.ISBN = regexISBN.exec(titleTag)[0]
  console.log('### AdLibris - ISBN: ' + prodObj.ISBN)
  prodObj.timeStamp = Date.now()
  prodObj.URL = prodObj.URL + prodObj.ISBN
  prodObj.URLCheckAvailability = prodObj.URLCheckAvailability + prodObj.ISBN
  console.log(JSON.stringify(prodObj, null, ' '))
  return prodObj
}

function extractAndPrepareAkademika (prodObj) {
  const regexTitle = /^.+?(?= - |$)/
  const regexISBN = /(?<=\()\d{13}(?=\))/
  const titleTag = document.getElementsByTagName('title')[0].innerHTML
  prodObj.title = regexTitle.exec(titleTag)[0]
  prodObj.ISBN = regexISBN.exec(titleTag)[0]
  console.log('### Akademika - ISBN: ' + prodObj.ISBN)
  prodObj.timeStamp = Date.now()
  prodObj.URL = prodObj.URL + prodObj.ISBN
  prodObj.URLCheckAvailability = prodObj.URLCheckAvailability + prodObj.ISBN
  console.log(JSON.stringify(prodObj, null, ' '))
  return prodObj
}

function extractAndPrepareArk (prodObj) {
  console.log('################## prodobj in extractAndPrepareArk: ' + JSON.stringify(prodObj, null, 2))
  prodObj.title = document.querySelector('meta[property="og:title"]').getAttribute('content')
  prodObj.ISBN = document.querySelector('meta[name="evg:sku"]').getAttribute('content')
  console.log('### ARK - ISBN: ' + prodObj.ISBN)
  prodObj.timeStamp = Date.now()
  prodObj.URL = prodObj.URL + prodObj.ISBN
  prodObj.URLCheckAvailability = prodObj.URLCheckAvailability + prodObj.ISBN
  console.log(JSON.stringify(prodObj, null, ' '))
  return prodObj
}

function extractAndPrepareBokkilden (prodObj) {
  console.log('################## prodobj in extractAndPrepareBokkilden: ' + JSON.stringify(prodObj, null, 2))
  prodObj.title = document.querySelector('meta[property="og:title"]').getAttribute('content')
  prodObj.ISBN = document.querySelector('meta[property="books:isbn"]').getAttribute('content')
  console.log('### Bokkilden - ISBN: ' + prodObj.ISBN)
  prodObj.timeStamp = Date.now()
  prodObj.URL = prodObj.URL + prodObj.ISBN
  prodObj.URLCheckAvailability = prodObj.URLCheckAvailability + prodObj.ISBN
  console.log(JSON.stringify(prodObj, null, ' '))
  return prodObj
}

function extractAndPrepareNorli (prodObj) {
  const regexISBN = /\d{13}/
  prodObj.title = document.querySelector('meta[property="og:title"]').getAttribute('content')
  let isbn = document.querySelector('meta[property="og:image"]').getAttribute('content')
  isbn = regexISBN.exec(isbn)
  prodObj.ISBN = isbn[0]
  prodObj.timeStamp = Date.now()
  prodObj.URL = prodObj.URL + prodObj.ISBN
  prodObj.URLCheckAvailability = prodObj.URLCheckAvailability + prodObj.ISBN
  console.log(JSON.stringify(prodObj, null, ' '))
  return prodObj
}

function sendObj (obj) {
  console.log('Sending object: ' + obj)
  const sending = browser.runtime.sendMessage(obj)
  sending
    .then(response => {
      console.log('Response to ' + obj.site + ' content-script from background: ' + JSON.stringify(response, null, ' '))
    })
    .catch(error => {
      console.error('Error sending from ' + obj.site + ' content-script to background: ', error)
    })
}

export { browser, regexAkademikaProductPage, regexArkProductPage, regexNorliProductPage, productUrlCheck, prodObjIkea, prodObjAdlibris, prodObjAkademika, prodObjArk, prodObjBokkilden, prodObjNorli, extractAndPrepareIkea, extractAndPrepareAdlibris, extractAndPrepareAkademika, extractAndPrepareArk, extractAndPrepareBokkilden, extractAndPrepareNorli, sendObj }
