import Immutable from 'immutable';

// const url = require('../../images/test.jpg');

const initialState = Immutable.Map({
  images: [
    {
      owner: 'tingard',
      message: 'Can someone describe this image for me?',
      imageUrl: 'images/test.jpg',
      tag: 'physics',
      level: 2,
      replyCount: 0,
    },
    {
      owner: 'tingard',
      message: 'What is this a plot of?',
      imageUrl: 'images/test2.png',
      tag: 'physics',
      level: 2,
      replyCount: 3,
    },
    {
      owner: 'tingard',
      message: 'What is this a plot of?',
      imageUrl: 'images/test2.png',
      tag: 'physics',
      level: 2,
      replyCount: 3,
    },
    {
      owner: 'tingard',
      message: 'What is this a plot of?',
      imageUrl: 'images/test2.png',
      tag: 'physics',
      level: 2,
      replyCount: 3,
    },
    {
      owner: 'tingard',
      message: 'What is this a plot of?',
      imageUrl: 'images/test2.png',
      tag: 'physics',
      level: 2,
      replyCount: 3,
    },
  ],
  user: {
    uname: 'Ka1-el',
    points: 9001,
    levels: {
      physics: 3,
      biology: 3,
      chemistry: 3,
      maths: 3,
      other: 0,
    },
  },
});

const submissionReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default submissionReducer;
