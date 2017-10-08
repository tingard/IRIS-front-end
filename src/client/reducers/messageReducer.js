import Immutable from 'immutable';

const initialState = Immutable.List.of(
  {
    _key: Math.random(), // to provided by server when data initially loaded in
    id: 'UtYQD7rur5',
    imageUrl: 'images/test.jpg',
    from: 'SomeUsername',
    type: 'message',
    messageChain: [
      {
        fromMe: true, // 1 if volunteer sent it, else 0
        date: '2016-12-4 18:13:59',
        message: 'It\'s a white square...?',
      },
      {
        fromMe: false,
        date: '2016-12-6 22:33:12',
        message: 'Thanks for the quick reply! Could you clear up what you meant by "it\'s a white square"?',
      },
    ],
    date: '2016-12-6 22:33:12',
  },
  {
    _key: Math.random(),
    id: 'oeZleHOnKz',
    imageUrl: 'images/test2.png',
    other: 'keenStudent',
    messageChain: [
      {
        fromMe: true,
        date: '2016-12-1 22:33:12',
        message: 'Insert Response Here.',
      },
      {
        fromMe: false,
        date: '2016-12-8 22:33:12',
        message: 'So It looks like you just replied with the template response?',
      },
      {
        fromMe: true,
        date: '2016-12-8 23:32:03',
        message: 'Ah sorry. So I did!',
      },
      {
        fromMe: false,
        date: '2016-12-8 22:33:12',
        message: 'Okay, could you describe the image properly?',
      },
    ],
  },
);

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'reply-image':
      console.log('you have replied to an image!!');
      return state;
    default:
      return state;
  }
};

export default messageReducer;
