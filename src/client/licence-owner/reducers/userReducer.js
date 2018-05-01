/* eslint-disable no-underscore-dangle */
import { Map, List, Record } from 'immutable';

const StateRecord = new Record({
  isFetching: false,
  isStale: false,
});

export const initialState = Map({
  state: new StateRecord({ isStale: true }),
  _id: '',
  emailVerified: false,
  emailNotifications: true,
  browserNotifications: true,
  creationDate: '',
  students: new List([]),
  licences: new List([]),
  email: '',
  name: '',
});


const userReducer = (state = initialState, action) => {
  let midState;
  switch (action.type) {
    case 'GET_USER_DETAILS':
      return state.set('state', state.get('state').set('isFetching', true));
    case 'GET_USER_DETAILS_SUCCESS':
      // potentially many changes, so simply gonna update things here
      return state.mergeDeep(action.res.licenceOwner)
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
