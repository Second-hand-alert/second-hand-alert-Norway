const titleTag = document.getElementsByTagName("title")[0].innerHTML;
const regexIkeaNoNo = RegExp('.+(?=,)', 'gu');

const title = regexIkeaNoNo.exec(titleTag)

alert('Hallo Ikea produkt-side for: ' + title)

