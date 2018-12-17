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
        return state.mergeDeep({ images: fromJS(action.res.images) })
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
    case 'EDIT_IMAGE':
      if (action.payload.details.markedAsDeleted) {
        return state.set(
          'images',
          state.get('images').delete(
            state.get('images').findIndex(
              item => item.get('_id') === action.payload.imageId,
            ),
          ),
        );
      }
      return state.set('images', state.get('images').update(
        state.get('images').findIndex(item => item.get('_id') === action.payload.imageId),
        (item) => {
          let i = item;
          Object.keys(action.payload.details).forEach(
            (k) => { i = i.set(k, action.payload.details[k]); return i; },
          );
          return i;
        },
      ));
    case 'EDIT_IMAGE_FAILURE':
      console.error('Could not update image', action);
      return state;
    case 'ACCEPT_MESSAGE_SUCCESS':
      return state.set('state', state.get('state').set('isStale', true));
    default:
      return state;
  }
};

export default imagesReducer;
