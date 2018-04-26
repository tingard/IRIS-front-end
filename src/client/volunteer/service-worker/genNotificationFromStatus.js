function genNotificationFromStatus(pushMessage) {
  const options = ['From IRIS'];
  const template = {
    body: pushMessage.message ? pushMessage.message : 'IRIS has new data!',
    icon: 'images/irisProposed_withoutBackground_100x100.png',
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
  };
  if (pushMessage.status) {
    switch (pushMessage.status) {
      case 'NEW_MESSAGE':
        template.actions[0].action = 'view';
        template.actions[0].title = 'See message';
        if (pushMessage.id) {
          template.data = {
            url: `/#/messages/${pushMessage.id}`,
          };
        } else {
          template.data = {
            url: '/#/messages',
          };
        }
        options.push(template);
        break;
      default:
        options.push(template);
    }
  }
  return options;
}

module.exports = genNotificationFromStatus;
