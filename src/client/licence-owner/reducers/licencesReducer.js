import { List, Map, Record } from 'immutable';

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

const licencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PURCHASE_LICENCE':
    case 'CANCEL_LICENCE':
    case 'LINK_LICENCE':
    default:
      return state;
  }
};

export default licencesReducer;
