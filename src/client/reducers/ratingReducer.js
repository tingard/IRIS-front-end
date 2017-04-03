import Immutable from 'immutable';

const initialState = Immutable.List.of(
  {
    _key: Math.random(), // provided by server when data initially loaded in
    rating: Math.min(Math.floor(Math.random() * 20) / 2, 5),
    message: 'Thanks for your help!',
    timestamp: '2016-12-21 10:20:42',
  },
  {
    _key: Math.random(),
    rating: 1.5,
    message: 'Thank you for the reply, it\'s cleared everything up.',
    timestamp: '2016-12-21 10:24:13',
  },
  {
    _key: Math.random(),
    rating: 2,
    message: 'Thank you for the reply, it\'s cleared everything up.',
    timestamp: '2016-12-21 10:24:13',
  },
  {
    _key: Math.random(),
    rating: 1.5,
    message: 'Your reply was useful, but you didn\'t really describe the image',
    timestamp: '2016-12-21 10:27:02',
  },
  {
    _key: Math.random(), // provided by server when data initially loaded in
    rating: 3,
    message: 'Thanks for your help!',
    timestamp: '2016-12-21 10:20:42',
  },
  {
    _key: Math.random(),
    rating: 1,
    message: 'Your reply was useful, but you didn\'t really describe the image',
    timestamp: '2016-12-21 10:27:02',
  },
);

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ratingReducer;
