import { List, Map, Record } from 'immutable';

const StateRecord = new Record({
  isFetching: false,
  isStale: false,
});

export const initialState = Map({
  state: new StateRecord({ isStale: true }),
  licences: new List([]),
});

const licencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LICENCE':
    case 'PURCHASE_LICENCE':
      return state;
    default:
      return state;
  }
};

export default licencesReducer;
