import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import InProgressPage from './components/InProgressPage';
import imagePage from './containers/imagePage';
import MessagePage from './containers/messagePage';

import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import submissionReducer from './reducers/submissionReducer';

const store = createStore(combineReducers({
  user: userReducer,
  submissions: submissionReducer,
  messages: messageReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/messages" component={MessagePage} />
        <Route path="/user-profile" component={InProgressPage} />
        <Route path="/about" component={InProgressPage} />
        <Route path="/contact" component={InProgressPage} />
        <Route path="/logout" component={InProgressPage} />
        <Route path="/image/:imageID" component={imagePage} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.app'),
);
