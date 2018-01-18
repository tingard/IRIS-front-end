import { Map, List, Record } from 'immutable';

// this state contains all possible flags which impact on UX (i.e. alert rendering etc...)
// for instance, if sendMessageDidFail then all messages in pendingMessages should be
// marked as not sent. Or if imageReplyDidSucceed then show a success box until it's
// dismissed, then reflect the dismissal in state.
const StateRecord = new Record({
  isFetching: false,
  isStale: false,
  updateDidFail: false,
  sendMessageDidFail: false,
  imageReplyDidSucceed: false,
  imageReplyDidFail: false,
});

const initialState = Map({
  state: new StateRecord({ isStale: true }),
  messages: List([]),
  pendingMessages: List([]),
});

// TODO: check if action.success?
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGES':
      return state.set('state', new StateRecord({ isFetching: true }));
    case 'GET_MESSAGES_SUCCESS':
      return state.merge({
        messages: action.res.messages,
        pendingMessages: [],
      }).set('state', state.get('state').set('isStale', false).set('isFetching', false));
    case 'REPLY_IMAGE':
      console.log('Sending reply to server...');
      return state;
    case 'REPLY_IMAGE_SUCCESS':
      console.log('you have replied to an image!!');
      return state;
    case 'SEND_MESSAGE':
      // SEND_MESSAGE is triggered on image reply too, so catch that here somewhere
      console.log(action);
      if (action.message.messageId || false) {
        return state.set(
          'pendingMessages',
          state.get('pendingMessages')
            .push(Map({
              chainId: action.message.messageId,
              message: action.message.message,
              fromType: 'volunteer',
              sendDate: (new Date()).toISOString(),
            })),
        );
      }
      return state;
    case 'SEND_MESSAGE_FAILURE':
      return state.set(
        'state',
        state.get('state')
          .set('sendMessageDidFail', true),
      );
    case 'SEND_MESSAGE_SUCCESS':
      // TODO: could mark stale here and trigger a fetch, but it will interrupt UX
      return state.set(
        'state',
        state.get('state')
          .set('sendMessageDidFail', false),
      );
    default:
      return state;
  }
};

export default messageReducer;
