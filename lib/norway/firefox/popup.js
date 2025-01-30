import { handleMessage, sendMessage } from '../../lib.popup.js'

console.log('Hello popup.js!')

// Trigger script when opened
browser.runtime.onMessage.addListener(handleMessage)
sendMessage()
console.log('Hello popup.js!')
