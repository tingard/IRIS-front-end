import Immutable from 'immutable';

const initialState = Immutable.List.of(
  {
    id: 'Adf39csdNa',
    note: 'galaxy image',
    question: 'Could you classify this galaxy\'s Hubble type for me?',
    url: 'images/test.jpg',
    replyChains: [
      'UtYQD7rur5',
    ],
    uploadDate: Date.now() - (60 * 32 * 1000),
  },
  {
    id: '19i3O3a09h',
    note: 'hype vs time',
    question: 'Could you tell me what this is an image of?',
    url: 'images/test2.jpg',
    replyChains: [
      'oeZleHOnKz',
    ],
    uploadDate: Date.now() - 3890401,
  },
);

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default imagesReducer;
