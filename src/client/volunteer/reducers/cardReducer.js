import Immutable from 'immutable';

// const url = require('../../images/test.jpg');

const initialState = Immutable.List.of(
  {
    key: Math.random(),
    // rest of this should be provided by the API
    id: 'KOu8trFE7t',
    owner: 'tingard',
    message: 'Can someone describe this image for me? Can someone describe this image for me? Can someone describe this image for me?',
    imageUrl: 'images/test.jpg',
    tag: 'physics',
    level: 2,
    replyCount: 0,
  },
  {
    key: Math.random(),
    id: '21otD8kywA',
    owner: 'tingard',
    message: 'What is this a plot of?',
    imageUrl: 'images/test2.png',
    tag: 'computerScience',
    level: 2,
    replyCount: 3,
  },
  {
    key: Math.random(),
    id: 'NB3UvoVsxm',
    owner: 'tingard',
    message: 'Is this image just random noise?',
    imageUrl: 'images/test4.png',
    tag: 'biology',
    level: 1,
    replyCount: 3,
  },
  {
    key: Math.random(),
    id: '3jG3bwGFMF',
    owner: 'tingard',
    message: 'What is this a plot of?',
    imageUrl: 'images/test2.png',
    tag: 'chemistry',
    level: 2,
    replyCount: 3,
  },
  {
    key: Math.random(),
    id: 'sjjEM5Enqc',
    owner: 'tingard',
    message: 'Could someone describe this diagram to me?',
    imageUrl: 'images/test3.png',
    tag: 'maths',
    level: 3,
    replyCount: 3,
  },
);

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default cardReducer;
