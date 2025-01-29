import { handleMessages } from '../../lib.background.js'

browser.runtime.onMessage.addListener(handleMessages)
console.log('Hello background.js')
