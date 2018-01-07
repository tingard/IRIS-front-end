import { Map } from 'immutable';

const initialState = Map({
  isFetching: false,
  isStale: false,
  firstName: '',
  lastName: '',
  email: '',
  points: 0,
  rating: 0,
  emailNotifications: false,
  browserNotifications: false,
  level: Map({
    physics: 1,
    biology: 1,
    chemistry: 1,
    maths: 1,
    computerScience: 1,
    other: 1,
  }),
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
        emailNotifications: action.res.emailNotifications || state.get('emailNotifications'),
        browserNotifications: action.res.browserNotifications || state.get('browserNotifications'),
        level: state.get('level').merge(action.res.level),
        isFetching: false,
        isStale: false,
      });
    default:
      return state;
  }
};

export default userReducer;
