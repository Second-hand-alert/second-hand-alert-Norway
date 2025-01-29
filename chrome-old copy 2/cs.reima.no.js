// Needs a different approach than Plarn O. Pyret
// Single page application but the eventListeners aren't always working

// document.body.addEventListener('click', function (event) {
//   // Log the state data to the console
//   setTimeout(function () {
//     console.log('### URL:' + document.location.href)
//   }, 100)
// })

// window.addEventListener('popstate', function (event) {
//   console.log('### going back/forward')
//   console.log('### URL:' + document.location.href)
// })

// This one actually works most times, compared to the two others
// Better than 'click' event listener, and you don't need 'popstate'
window.navigation.addEventListener('navigate', (event) => {
  console.log('###### location changed: ' + event.destination.url)
})

console.log('### ### Hello Reima.no! First page 😀')
console.log('### ### URL: ' + window.location.href)
