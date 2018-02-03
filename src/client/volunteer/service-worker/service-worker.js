/* eslint-disable no-restricted-globals */
// Some code taken from https://github.com/google-developer-training/pwa-training-labs.git
require('../../../offline-page-service-worker');

self.addEventListener('push', (e) => {
  let body;
  console.log(e);
  if (e.data) {
    body = e.data.text();
  } else {
    body = 'IRIS has new data!';
  }

  const options = [
    'From IRIS:',
    {
      body,
      icon: 'images/irisProposed_withoutBackground_small.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: 'explore',
          title: 'Go to the site',
        },
        {
          action: 'close',
          title: 'Close the notification',
        },
      ],
    },
  ];
  e.waitUntil(
    self.registration.showNotification(...options),
  );
});

self.addEventListener('notificationclose', (e) => {
  const { notification } = e;
  const { primaryKey } = notification.data;
  console.log(`Closed notification: ${primaryKey}`);
});

self.addEventListener('notificationclick', (e) => {
  const { notification } = e;
  const { action } = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    self.clients.openWindow('/#/');
    notification.close();
  }
  // TODO close all notifications when one is clicked
});
