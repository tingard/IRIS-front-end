import Immutable from 'immutable';

const initialState = Immutable.List.of(
  {
    from: 'nobody@example.com',
    messageType: 'message',
    message: 'Thanks for the quick reply! Could you clear up what you meant by "it\'s a white square"?',
    messageDate: '2016-12-6 22:33:12',
    key: 0,
  },
  {
    from: 'nobody@example.com',
    messageType: 'review',
    messageDate: '2016-12-8 22:33:12',
    message: '4',
    key: 1,
  },
);

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default messageReducer;
