import { Map, List } from 'immutable';

// const url = require('../../images/test.jpg');

const initialState = Map({
  isFetching: false,
  isStale: true,
  updateDidFail: false,
  cards: List([]),
});

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_IMAGES':
      return state.merge({ isFetching: true });
    case 'GET_IMAGES_SUCCESS':
      return state.merge({ cards: action.res.images, isStale: false, isFetching: false });
    default:
      return state;
  }
};

export default cardReducer;
