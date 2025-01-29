import { handleMessages } from '../../lib.background.js'

const browser = chrome
browser.runtime.onMessage.addListener(handleMessages)

// ###    G: Hello background! Just checking                                 ###
console.log('Hello background.js')
