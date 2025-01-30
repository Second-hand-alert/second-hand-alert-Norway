import { handleMessages } from '../../lib.background.js'

browser.runtime.onMessage.addListener(handleMessages)

// ###    G: Hello background! Just checking                                 ###
console.log('Hello background.js')
