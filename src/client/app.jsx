import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import dogReducer from './reducers/dog-reducer';
import submissionReducer from './reducers/submissionReducer';
import ImageCard from './containers/imageCardContainer';
import Navbar from './components/navbar';

const store = createStore(combineReducers({
  dog: dogReducer,
  grapheel: submissionReducer,
}));

const w = window.innerWidth;

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Navbar width={w} />
      <div className="w3-container w3-blue-grey">
        <h1>Welcome</h1>
        <p>Available Cards:</p>
      </div>
      { /* TODO: image card holder here */ }
      <ImageCard subID={0} />
      <ImageCard subID={1} />
      <ImageCard subID={2} />
      <ImageCard subID={3} />
      <ImageCard subID={4} />
    </div>
  </Provider>
  , document.querySelector('.app'),
);
