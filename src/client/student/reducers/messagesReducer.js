import {
  Map, List, Record, fromJS,
} from 'immutable';

const StateRecord = new Record({
  isFetching: false,
  isStale: false,
  updateDidFail: false,
});

export const initialState = Map({
  state: new StateRecord({ isStale: true }),
  messages: List([]),
});

// // Example message chain
// {
//   _id: '',
//   student: { _id: '', name: 'Test-student-name', bio: '' },
//   volunteer: { _id: '', name: 'Test-volunteer-name' },
//   image: {
//     _id: '',
//     difficulty: 1,
//     note: 'Falcon Heavy',
//     question: 'Was this awesome?',
//     url: 'https://...',
//   },
//   __v: 0,
//   flagged: false,
//   markedAsDeleted: false,
//   startDate: '2018-02-19T21:26:05.433Z',
//   messages: [
//     {
//       message: 'test-image-reply',
//       fromId: '',
//       fromType: 'volunteer',
//       _id: '',
//       sendDate: '2018-02-19T21:26:05.434Z',
//     },
//   ],
// };

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE_SUCCESS':
      return state.set('state', state.get('state').set('isStale', true));
    case 'GET_MESSAGES':
      return state.set('state', state.get('state').set('isFetching', true));
    case 'GET_MESSAGES_SUCCESS':
      // potentially many changes, so simply gonna update things here
      return state.merge({
        messages: fromJS(action.res.messages),
      }).set(
        'state',
        state.get('state')
          .set('isFetching', false)
          .set('isStale', false),
      );
    case 'ACCEPT_MESSAGE_SUCCESS':
      return state.set('state', state.get('state').set('isStale', true));
    default:
      return state;
  }
};

export default messageReducer;
