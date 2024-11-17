let titleTag = document.getElementsByTagName("title")[0].innerHTML
let regexIkeaNoNo = RegExp('.+(?=,)', 'gu')

let title = regexIkeaNoNo.exec(titleTag)

alert('Hallo Ikea produkt-side for: ' + title)

