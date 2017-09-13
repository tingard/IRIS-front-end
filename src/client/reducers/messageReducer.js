import Immutable from 'immutable';

const initialState = Immutable.List.of(
  {
    _key: Math.random(), // to provided by server when data initially loaded in
    imageUrl: 'images/test.jpg',
    from: 'nobody@example.com',
    messageType: 'message',
    message: 'Thanks for the quick reply! Could you clear up what you meant by "it\'s a white square"?',
    messageDate: '2016-12-6 22:33:12',
  },
  {
    _key: Math.random(),
    imageUrl: 'images/test2.jpg',
    from: 'nobody@example.com',
    messageType: 'review',
    messageDate: '2016-12-8 22:33:12',
    message: 'So It looks like you just replied with the template response?',
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
