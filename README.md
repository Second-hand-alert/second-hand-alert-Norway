# Second-hand alert!
Browser extension to give you an alert when second hand/used alternatives to new products are available.

## Description

When in store.com, notify you if there is a used alternative at secondhand-store.com.

## Moving parts

### Packaging / bundling

* [Rollup](https://rollupjs.org/es-module-syntax/#importing)
* Extension packager (Chrome, Firefox)

### Browser extension (Chrome first)

* [Content script](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts)
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

### Scrape content from a HTML page

[Cheerio](https://github.com/cheeriojs/cheerio)

