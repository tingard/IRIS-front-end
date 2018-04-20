/* eslint-disable no-restricted-globals */
// Some code taken from https://github.com/google-developer-training/pwa-training-labs.git
require('../../common-resources/offline-page-service-worker');
const genNotificationFromStatus = require('./genNotificationFromStatus');

async function sendStatus(status) {
  // Exit early if we don't have access to the client.
  // Eg, if it's cross-origin.
  console.log('sending status');
  // Send a message to the client.
  self.clients.matchAll().catch(() => []).then(
    l => l.map(client => client.postMessage(status)),
  );
}

self.addEventListener('push', (e) => {
  let msg;
  if (e.data) {
    msg = JSON.parse(e.data.text());
    console.log(msg);
  } else {
    msg = { status: 'NO_STATUS', message: 'IRIS has new data!' };
  }
  console.log(genNotificationFromStatus(msg)[1]);
  e.waitUntil(sendStatus(msg));
  // We have to always send a notification
  e.waitUntil(
    self.registration.showNotification(...genNotificationFromStatus(msg)),
  );
});

self.addEventListener('notificationclick', (e) => {
  if (e.action === 'close') {
    e.notification.close();
  } else if (e.action === 'view') {
    e.waitUntil(
      self.clients.matchAll().then((clients) => {
        let found = false;
        for (let i = 0; i < clients.length; i += 1) {
          if (clients[i].url === e.notification.data.url) {
          // We already have a window to use, focus it.
            found = true;
            clients[i].focus();
            break;
          }
        }
        if (!found) {
          if (clients.length) {
            clients[0].navigate(e.notification.data.url);
            clients[0].focus();
          }
        }
      }).then(() => e.notification.close()),
    );
  } else {
    e.waitUntil(
      self.clients.matchAll().then((clients) => {
        if (clients.length) {
          clients[0].focus();
        }
      }).then(() => e.notification.close()),
    );
  }
  // TODO close all notifications when one is clicked
});
