import Immutable from 'immutable';

const initialState = Immutable.List.of(
  {
    _key: Math.random(), // to provided by server when data initially loaded in
    id: 'UtYQD7rur5',
    imageID: 'Adf39csdNa',
    imageUrl: 'images/test.jpg',
    imageNote: 'galaxy image',
    from: 'SomeUsername',
    type: 'message',
    messageChain: [
      {
        fromMe: false, // 1 if volunteer sent it, else 0
        date: Date.now() - (3600000 * 3),
        message: 'It\'s a white square...?',
      },
      {
        fromMe: true,
        date: Date.now() - 3600000,
        message: 'Thanks for the quick reply! Could you clear up what you meant by "it\'s a white square"?',
      },
    ],
  },
  {
    _key: Math.random(),
    id: 'oeZleHOnKz',
    imageID: '19i3O3a09h',
    imageUrl: 'images/test2.png',
    imageNote: 'no idea',
    other: 'keenStudent',
    messageChain: [
      {
        fromMe: false,
        date: Date.now() - (60000 * 25),
        message: 'Insert Response Here.',
      },
      {
        fromMe: true,
        date: Date.now() - (60000 * 23),
        message: 'So It looks like you just replied with the template response?',
      },
      {
        fromMe: false,
        date: Date.now() - (60000 * 18),
        message: 'Ah sorry. So I did!',
      },
      {
        fromMe: true,
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
