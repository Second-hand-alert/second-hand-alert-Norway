let titleTag = ''
let regexPolarnopyretNo = ''
let productPage = false
const productPageRegex = /\d{5,10}-\d{3,5}$/gu
let title = ''
let currentUrl = location.href;
let firstTime = true


// Function for getting URL and title from page
const getUrlTitle= function () {
  console.log('url changed: ' + location.href)
  titleTag = document.getElementsByTagName("title")[0].innerHTML
  regexPolarnopyretNo = RegExp('.+(?=-)', 'gu')
  title = regexPolarnopyretNo.exec(titleTag)
  if (productPageRegex.test(location.href)) {
    productPage = true
  } else {
    productPage = false
  }
  
  alert('Hallo Polarn O. Pyret side: ' + title + '\n' + location.href + '\nFørste POP-sidevisning: ' + firstTime + '\nProduct page: ' + productPage)
} 

// Get URL and title of page the first time entering polarnopyret.no
if (firstTime === true) {
  setTimeout(function () {
    getUrlTitle()
    firstTime = false
  }, 500) // Delay of 1.5 seconds
}

// If event, check if transition is a "new page", meaning the URL has been rewritten
const checkPageTransition = () => {
    requestAnimationFrame(() => {
        if (currentUrl !== location.href) {
          setTimeout(function () {
            getUrlTitle()
          }, 500) // Delay of 1.5 seconds
        }
        currentUrl = location.href
    }, true)
};

// Event listeners
document.body.addEventListener("click", checkPageTransition)
document.body.addEventListener("keyup", e => {
    if ((e.code === "Enter" || e.code === "Space") && firstTime === false) checkPageTransition()
})
