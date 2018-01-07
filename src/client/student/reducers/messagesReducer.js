import Immutable from 'immutable';

const initialState = Immutable.Map({
  isFetching: true,
  lastUpdated: null,
  isStale: true,
  messages: Immutable.List([]),
});

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGES':
      return state.set('isFetching', true);
    case 'GET_MESSAGES_SUCCESS':
      // potentially many changes, so simply gonna update things here
      return state.merge({
        messages: action.res.messages,
        isFetching: false,
        isStale: false,
      });
    default:
      return state;
  }
};

export default messageReducer;
