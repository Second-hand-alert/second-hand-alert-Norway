# Second hand alert

**Alert when second hand alternative is available!**

Second-hand alternative alert. Browser addon to give you an alert when second hand/used alternatives to new products are available.

## Description

When in store.com, notify you if there is a used alternative at secondhand-store.com.

## Moving parts

### Preparing, Packaging and Publishing

#### Chrome

[How to pack it (using zip)](https://developer.chrome.com/docs/webstore/prepare). Chrome webstore [Before you publish](https://developer.chrome.com/docs/webstore) have some pointers. And there is a [Chrome extension develop guide](https://developer.chrome.com/docs/extensions/develop).

#### Firefox

Need to install [web-ext](https://extensionworkshop.com/extension-basics/): `sudo npm install --global web-ext`. Also some pointers on how to make it work on Firefox for Android.

#### Safari OSX/iOS

Need to use [Xcode](https://developer.apple.com/documentation/safariservices/developing-a-safari-web-extension), but maybe it can be done on something that is inherited from main here.

### Browser extension (Chrome first)

* [Content script](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts)
* Background script
* Popup script and page
* [manifest.json](https://developer.chrome.com/docs/extensions/reference/manifest)
* ...

You can define a content script for each 

### Notification API

The [notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

To use notifications on mobile browsers, it seems you need to use [getNotifications()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/getNotifications) and [showNotification()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification) form a service worker. And the service worker need https.

So i.e. [ngrok](https://ngrok.com/) needs to be set up like done on the [geo-search-helper repo](https://github.com/eklem/geo-search-helper?tab=readme-ov-file#set-up-ngrok-account).

### Service worker

The notification part needs a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

### Analytics

[Plausible.io](https://plausible.io/)

### Get data from FINN

[fetchAPI](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Get content from a HTML page

Using built in dom-parser and regex

