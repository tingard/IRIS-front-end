import Immutable from 'immutable';

const initialState = Immutable.Map({
  uname: 'Ka1-el',
  email: 'kal@elmail.krypton',
  points: 9001,
  rating: 4.245,
  title: 'Head Squark',
  level: {
    physics: 3,
    biology: 1,
    chemistry: 1,
    maths: 2,
    computerScience: 0,
    other: 0,
  },
  bio: 'I\'m an Astrophysics PhD student at the institute of cosmology and gravitation in Portsmouth',
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
