import { Map, List } from 'immutable';

const initialState = Map({
  isFetching: false,
  isStale: true,
  didFail: false,
  ratings: List([]),
});

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ratingReducer;
