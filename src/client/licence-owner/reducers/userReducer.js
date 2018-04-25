/* eslint-disable no-underscore-dangle */
import { Map, Record } from 'immutable';

const StateRecord = new Record({
  isFetching: false,
  isStale: false,
});

export const initialState = Map({
  state: new StateRecord({ isStale: true }),
  name: '',
  email: '',
  emailNotifications: false,
  browserNotifications: false,
  activeSince: '',
});

const userReducer = (state = initialState, action) => {
  let midState;
  switch (action.type) {
    case 'GET_USER_DETAILS':
      return state.set('state', state.get('state').set('isFetching', true));
    case 'GET_USER_DETAILS_SUCCESS':
      // potentially many changes, so simply gonna update things here
      return state.mergeDeep(action.res.student)
        .set(
          'state',
          state.get('state')
            .set('isFetching', false)
            .set('isStale', false),
        );
    case 'GET_USER_DETAILS_FAILURE':
      return state; // .set('state', state.get('state').set('isFetching', false));
    case 'SET_USER_DETAILS':
      midState = state.merge(action.details);
      return midState.set('state', midState.get('state').set('updateDidSucceed', true));
    case 'LOGOUT_SUCCESS':
      /* eslint-disable no-restricted-globals */
      location.reload();
      /* eslint-enable no-restricted-globals */
      return state;
    default:
      return state;
  }
};

export default userReducer;
