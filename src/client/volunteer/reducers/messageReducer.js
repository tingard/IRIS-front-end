import { Map, List } from 'immutable';

const initialState = Map({
  isFetching: false,
  isStale: true,
  messages: List([]),
});

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGES':
      return state.merge({ isFetching: true });
    case 'GET_MESSAGES_SUCCESS':
      return state.merge({
        messages: action.res.messages,
        isFetching: false,
        isStale: false,
      });
    case 'REPLY_IMAGE':
      console.log('Sending reply to server...');
      return state;
    case 'REPLY_IMAGE_SUCCESS':
      console.log('you have replied to an image!!');
      return state;
    default:
      return state;
  }
};

export default messageReducer;
