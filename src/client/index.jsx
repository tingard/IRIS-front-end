import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import InProgressPage from './components/InProgressPage';
import dogReducer from './reducers/dog-reducer';
import submissionReducer from './reducers/submissionReducer';

const store = createStore(combineReducers({
  dog: dogReducer,
  grapheel: submissionReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/messages" component={InProgressPage} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.app'),
);
/*
ReactDOM.render(
  <Provider store={store}>
    <App>
      <HomePage />
    </App>
  </Provider>
  , document.querySelector('.app'),
);
*/
