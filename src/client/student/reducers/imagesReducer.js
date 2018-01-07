import Immutable from 'immutable';

const initialState = Immutable.Map({
  isFetching: true,
  lastUpdated: null,
  isStale: true,
  images: Immutable.List([]),
});

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_IMAGES_REQUEST':
      return state.set('isFetching', true);
    case 'GET_IMAGES_SUCCESS':
      // potentially many changes, so simply gonna update things here
      if (action.res.success) {
        return state.merge({
          images: action.res.images,
          isFetching: false,
          isStale: false,
        });
      }
      console.warn('Could not fetch images, API failure');
      return state.merge({
        isFetching: false,
        isStale: true,
      });
    default:
      return state;
  }
};

export default imagesReducer;
