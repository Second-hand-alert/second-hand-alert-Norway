import { sendMessage } from '../lib.popup.js'

console.log('Hello popup.js!')
const browser = chrome
sendMessage(browser)
