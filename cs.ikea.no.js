let titleTag = document.getElementsByTagName("title")[0].innerHTML
let regexIkeaNoNo = /^.+?(?=, )/gu
let title = ''

title = regexIkeaNoNo.exec(titleTag)

alert('Hallo Ikea produkt-side for: ' + title)
console.dir(title)
