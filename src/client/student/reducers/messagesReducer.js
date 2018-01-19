import { Map, List, Record } from 'immutable';

const StateRecord = new Record({
  isFetching: false,
  isStale: false,
  updateDidFail: false,
});

const initialState = Map({
  state: new StateRecord({ isStale: true }),
  messages: List([]),
});

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE_SUCCESS':
      return state.set('state', state.get('state').set('isStale', true));
    case 'GET_MESSAGES':
      return state.set('state', state.get('state').set('isFetching', true));
    case 'GET_MESSAGES_SUCCESS':
      // potentially many changes, so simply gonna update things here
      return state.merge({
        messages: action.res.messages,
      }).set(
        'state',
        state.get('state')
          .set('isFetching', false)
          .set('isStale', false),
      );
    default:
      return state;
  }
};

export default messageReducer;
