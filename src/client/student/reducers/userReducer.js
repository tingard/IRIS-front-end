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
      return state.merge({
        firstName: action.res.firstName || state.get('firstName'),
        lastName: action.res.lastName || state.get('lastName'),
        email: action.res.email || state.get('email'),
        submittedImages: action.res.submittedImages || state.get('submittedImages'),
        isFetching: false,
        isStale: false,
      });
    default:
      return state;
  }
};

export default userReducer;
