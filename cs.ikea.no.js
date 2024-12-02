let titleTag = document.getElementsByTagName("title")[0].innerHTML
let regexIkeaNoNo = /^.+?(?=, )/gu
let title = ''

if (typeof browser === "undefined") {
  var browser = chrome
}

title = regexIkeaNoNo.exec(titleTag)

alert('Hallo Ikea produkt-side for: ' + title)

browser.runtime.sendMessage( title )
