import { Map, List, Record } from 'immutable';

const StateRecord = new Record({
  isFetching: false,
  isStale: false,
  updateDidFail: false,
});

export const initialState = Map({
  state: new StateRecord({ isStale: true }),
  lastUpdated: null,
  images: List([]),
});

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_IMAGES':
      return state.set('state', state.get('state').set('isFetching', true));
    case 'GET_IMAGES_SUCCESS':
      // potentially many changes, so simply gonna update things here
      if (action.res.success) {
        return state.merge({ images: action.res.images })
          .set(
            'state',
            state.get('state')
              .set('isFetching', false)
              .set('isStale', false),
          );
      }
      console.warn('Could not fetch images, API failure');
      return state.set(
        'state',
        state.get('state')
          .set('isFetching', false)
          .set('isStale', true),
      );
    default:
      return state;
  }
};

export default imagesReducer;
