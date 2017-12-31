import Immutable from 'immutable';

const initialState = Immutable.Map({
  uname: 'Ka1-el',
  email: 'kal@elmail.krypton',
  images: 9001,
  rating: 4.245,
  bio: 'I\'m not actually V.I., just like talking to people',
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
