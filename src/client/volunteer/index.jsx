import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Route, Switch } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import mainPage from './containers/mainPage';
import Navbar from './components/Navbar';
import MessagesPage from './containers/messagesPage';
import ProfilePage from './containers/profilePage';
import CardPage from './containers/cardPage';

import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import cardReducer from './reducers/cardReducer';

const loggerMiddleware = createLogger({
  stateTransformer: s => JSON.parse(JSON.stringify(s)),
});

const store = createStore(
  combineReducers({
    user: userReducer,
    cards: cardReducer,
    messages: messageReducer,
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware),
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
