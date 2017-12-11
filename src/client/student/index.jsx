import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './containers/homePage';
import MessagesPage from './containers/messagesPage';
import MessageChainPage from './containers/messageChainPage';
import ImagesPage from './containers/imagesPage';
import ProfilePage from './containers/profilePage';


import userReducer from './reducers/userReducer';
import messagesReducer from './reducers/messagesReducer';
import imagesReducer from './reducers/imagesReducer';

const store = createStore(
  combineReducers({
    user: userReducer,
    messages: messagesReducer,
    images: imagesReducer,
  }),
);

const App = () => (
  <div>
    <div className="w3-container">
      <Navbar />
    </div>
    <Switch>
      <Route exact path="/messages" render={p => <MessagesPage {...p} />} />
      <Route exact path="/messages/:messageID" render={p => <MessageChainPage {...p} />} />
      <Route exact path="/images" component={ImagesPage} />
      <Route
        exact
        path="/images/messages/:imageID"
        render={p => <MessagesPage {...p} filterByImage />}
      />
      <Route exact path="/profile" component={ProfilePage} />

      <Route component={HomePage} />
    </Switch>
  </div>
);

export {
  store,
  App,
};