// Firefox undestand 'browser', Chrome needs 'chrome'
if (typeof browser === "undefined") {
  var browser = chrome
}
// Setting other variables
let productObject = {
  title: '',
  queryPartReadable: '',
  queryPart: '',
  type: 'CONTENT_BACKGROUND'
}

// ### Regex-test + extraction done to get something searchable
function extractIkea() {
  let regexStandard = /^.+?(?=, )/gmu
  let testMeasurement =  /(\d+x\d+x\d+\scm)|(\d+x\d+\scm)/gmu
  let regexMeasurement = /\d\d+/gmu

  productObject.title = document.getElementsByTagName("title")[0].innerHTML
  productObject.queryPartReadable = regexStandard.exec(productObject.title)

  if (testMeasurement.test(productObject.title)) {
    console.log('Measurement in title')

    let measurement = []
    let i
    // Populate measurement with all matches
    while ((i = regexMeasurement.exec(productObject.title)) !== null) {
        i.forEach((match) => {
          measurement.push(match)
        })
      }
    productObject.queryPartReadable.push(...measurement)  
  }
  // Populate queryPart, join to string with '+'
  productObject.queryPartReadable = productObject.queryPartReadable.join(' ')
  // Create queryPart to use in the actual query
  productObject.queryPart = productObject.queryPartReadable.replaceAll(' ', '+')
  console.log(JSON.stringify(productObject))
}

extractIkea()

// Object sent to backgroiund.js should have message type, product title and the text part of the query
// browser.runtime.sendMessage(productObject)
