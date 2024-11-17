let titleTag = document.getElementsByTagName("title")[0].innerHTML;
let regexPolarnopyretNo = RegExp('.+(?=-)', 'gu');

let title = regexPolarnopyretNo.exec(titleTag)

let firstTime = true

if (firstTime === true) {
  setTimeout(function () {
    console.log('url changed: ' + location.href);
    titleTag = document.getElementsByTagName("title")[0].innerHTML;
    regexPolarnopyretNo = RegExp('.+(?=-)', 'gu');
    title = regexPolarnopyretNo.exec(titleTag)
    alert('Hallo Polarn O. Pyret side: ' + title + '\n' + location.href + '\nOg en POP-side ble akkurat lastet')
  }, 500); // Delay of 1.5 seconds
}

// console.log('Hallo Polarn O. Pyret produkt-side for: ' + title)
// alert('Hallo Polarn O. Pyret produkt-side for: ' + title)

// window.addEventListener("click", notifyExtension);

// function notifyExtension(e) {
//   alert('Hallo Polarn O. Pyret side: \n' + title)
// }

// window.addEventListener('load', function () {
//   let titleTag = document.getElementsByTagName("title")[0].innerHTML;
//   let regexPolarnopyretNo = RegExp('.+(?=-)', 'gu');

//   let title = regexPolarnopyretNo.exec(titleTag)
//   alert('It\'s loaded!\n' + 'Hallo Polarn O. Pyret side: \n' + title)
// })

// alert('It\'s loaded!\n' + 'Hallo Polarn O. Pyret!')

let currentUrl = location.href;
const checkPageTransition = () => {
    requestAnimationFrame(() => {
        if (currentUrl !== location.href) {
          setTimeout(function () {
            console.log('url changed: ' + location.href);
            titleTag = document.getElementsByTagName("title")[0].innerHTML;
            regexPolarnopyretNo = RegExp('.+(?=-)', 'gu');
            title = regexPolarnopyretNo.exec(titleTag)
            alert('Hallo Polarn O. Pyret side: ' + title + '\n' + location.href)
          }, 500); // Delay of 1.5 seconds
        }
        currentUrl = location.href;
    }, true);
};


document.body.addEventListener("click", checkPageTransition);
document.body.addEventListener("keyup", e => {
    if ((e.code === "Enter" || e.code === "Space") && firstTime === false) checkPageTransition()
});

// alert('It\'s loaded!\n' + 'Hallo Polarn O. Pyret side: \n' + title)
