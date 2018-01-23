/* eslint-disable no-underscore-dangle */
import { Map, Record } from 'immutable';

const StateRecord = new Record({
  isFetching: false,
  isStale: false,
  updateDidFail: false,
});

const initialState = Map({
  id: '',
  state: new StateRecord({ isStale: true }),
  name: '',
  email: '',
  points: 0,
  rating: 0,
  emailNotifications: false,
  browserNotifications: false,
  levels: Map({
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
      return state.set(
        'state',
        state.get('state').set('isFetching', true).set('isStale', false),
      );
    case 'GET_USER_DETAILS_SUCCESS':
      // potentially many changes, so simply gonna update things here
      return state.mergeDeep(action.res.volunteer)
        .set('state',
          state.get('state')
            .set('isFetching', false)
            .set('isStale', false),
        )
        .set('id', action.res.volunteer._id)
        .remove('_id');
    case 'SET_USER_DETAILS':
      return state.mergeDeep(action.details);
    case 'SET_USER_DETAILS_SUCCESS':
      return state;
    default:
      return state;
  }
};

export default userReducer;
