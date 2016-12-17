import Immutable from 'immutable';

const initialState = Immutable.Map({
  uname: 'Ka1-el',
  points: 9001,
  levels: {
    physics: 3,
    biology: 1,
    chemistry: 1,
    maths: 2,
    other: 0,
  },
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
