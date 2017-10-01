import Immutable from 'immutable';

const initialState = Immutable.List.of(
  {
    _key: Math.random(), // to provided by server when data initially loaded in
    id: 'UtYQD7rur5',
    imageUrl: 'images/test.jpg',
    from: 'SomeUsername',
    type: 'message',
    message: 'Thanks for the quick reply! Could you clear up what you meant by "it\'s a white square"?',
    date: '2016-12-6 22:33:12',
  },
  {
    _key: Math.random(),
    id: 'oeZleHOnKz',
    imageUrl: 'images/test2.jpg',
    from: 'SomeUsername', // TODO: should this be here?
    type: 'review',
    date: '2016-12-8 22:33:12',
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
