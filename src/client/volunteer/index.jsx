import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Route, Switch } from 'react-router-dom';

import mainPage from './containers/mainPage';
import Navbar from './components/Navbar';
import MessagesPage from './containers/messagesPage';
import ProfilePage from './containers/profilePage';
import CardPage from './containers/cardPage';

import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import cardReducer from './reducers/cardReducer';

const store = createStore(
  combineReducers({
    user: userReducer,
    cards: cardReducer,
    messages: messageReducer,
  }),
);

const App = () => (
  <div>
    <Navbar />
    <section className="content-section">
      <Switch>
        <Route exact path="/" component={mainPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/messages/:messageID?" component={MessagesPage} />
        <Route path="/cards/:cardId" component={CardPage} />
      </Switch>
    </section>
  </div>
);

export {
  store,
  App,
};
