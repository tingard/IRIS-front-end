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
        date: Date.now() - (3600000 * 3),
        message: 'It\'s a white square...?',
      },
      {
        fromMe: false,
        date: Date.now() - 3600000,
        message: 'Thanks for the quick reply! Could you clear up what you meant by "it\'s a white square"?',
      },
    ],
  },
  {
    _key: Math.random(),
    id: 'oeZleHOnKz',
    imageUrl: 'images/test2.png',
    other: 'keenStudent',
    messageChain: [
      {
        fromMe: true,
        date: Date.now() - (60000 * 25),
        message: 'Insert Response Here.',
      },
      {
        fromMe: false,
        date: Date.now() - (60000 * 23),
        message: 'So It looks like you just replied with the template response?',
      },
      {
        fromMe: true,
        date: Date.now() - (60000 * 18),
        message: 'Ah sorry. So I did!',
      },
      {
        fromMe: false,
        date: Date.now() - (100),
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
