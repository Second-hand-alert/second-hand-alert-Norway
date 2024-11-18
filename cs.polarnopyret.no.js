let productPage = false
const productPageRegex = /\d{5,10}-\d{3,5}$/gu
let title = ''
let currentUrl = location.href
let firstTime = true


// Function for getting URL and title from page
const getUrlTitle= function () {
  console.log('url changed: ' + location.href)
  title = document.getElementsByTagName("title")[0].innerHTML
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
  }, 800) // Delay to get page title loaded
}

// If event, check if transition is a "new page", meaning the URL has been rewritten
const checkPageTransition = () => {
    requestAnimationFrame(() => {
        if (currentUrl !== location.href) {
          setTimeout(function () {
            getUrlTitle()
          }, 800) // Delay to get page title loaded
        }
        currentUrl = location.href
    }, true)
};

// Event listeners for mouse and keyboard events
document.body.addEventListener("click", checkPageTransition)
document.body.addEventListener("keyup", e => {
    if ((e.code === "Enter" || e.code === "Space") && firstTime === false) checkPageTransition()
})
