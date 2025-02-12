import {
  Map, List, Record, fromJS,
} from 'immutable';

// const url = require('../../images/test.jpg');
const StateRecord = new Record({
  isFetching: false,
  isStale: false,
  updateDidFail: false,
});

const initialState = Map({
  state: new StateRecord({ isStale: true }),
  updateDidFail: false,
  cards: List([]),
});

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_IMAGES':
      return state.set('state', state.get('state').set('isFetching', true));
    case 'GET_IMAGES_SUCCESS':
      if (typeof action.res.images !== 'undefined') {
        return state.merge({
          cards: fromJS(action.res.images),
          state: state.get('state').set('isStale', false).set('isFetching', false),
        });
      }
      return state.merge({
        cards: fromJS([]),
        state: state.get('state')
          .set('isStale', false)
          .set('isFetching', false)
          .set('updateDidFail', true),
      });
    case 'REPLY_IMAGE':
      return state.set('cards', state.get('cards').filter(
        card => card.get('_id') !== action.formData.imageId,
      ));
    default:
      return state;
  }
};

export default cardReducer;
