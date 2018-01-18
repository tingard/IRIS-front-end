/* eslint-disable no-underscore-dangle */
import Immutable from 'immutable';

const initialState = Immutable.Map({
  isFetching: false,
  isStale: true,
  firstName: '',
  lastName: '',
  email: '',
  activeSince: '',
  submittedImages: 0,
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_DETAILS':
      return state.set('isFetching', true).set('isStale', false);
    case 'GET_USER_DETAILS_SUCCESS':
      // potentially many changes, so simply gonna update things here
      return state.mergeDeep(action.res.student)
        .set('isFetching', false)
        .set('isStale', false)
        .set('id', action.res.student._id)
        .remove('_id');
    default:
      return state;
  }
};

export default userReducer;
