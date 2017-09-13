import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import mainPage from './containers/mainPage';
import MessagePage from './components/MessagePage';
import ProfilePage from './components/ProfilePage';

import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import cardReducer from './reducers/cardReducer';

const store = createStore(combineReducers({
  user: userReducer,
  cards: cardReducer,
  messages: messageReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={mainPage} />
        <Route path="/messages" component={MessagePage} />
        <Route path="/profile" component={ProfilePage} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.app'),
);
