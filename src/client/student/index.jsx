import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Route, Switch } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Navbar from './components/Navbar';
import ApiWrapper from './containers/apiWrapper';
import HomePage from './containers/homePage';
import MessagesPage from './containers/messagesPage';
import ConversationPage from './containers/conversationPage';
import ImagesPage from './containers/imagesPage';
import ProfilePage from './containers/profilePage';
import FeedbackPage from './components/FeedbackPage';

import userReducer from './reducers/userReducer';
import messagesReducer from './reducers/messagesReducer';
import imagesReducer from './reducers/imagesReducer';

const loggerMiddleware = createLogger({
  stateTransformer: s => JSON.parse(JSON.stringify(s)),
});

const store = createStore(
  combineReducers({
    user: userReducer,
    messages: messagesReducer,
    images: imagesReducer,
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);

const App = () => (
  <Provider store={store}>
    <div id="modal-root">
      <Navbar />
      <ApiWrapper>
        <section className="student-app content-section">
          <Switch>
            <Route exact path="/messages" render={p => <MessagesPage {...p} />} />
            <Route exact path="/messages/:messageID" render={p => <ConversationPage {...p} />} />
            <Route exact path="/images" component={ImagesPage} />
            <Route
              exact
              path="/images/messages/:imageId"
              render={p => <MessagesPage filterByImage {...p} />}
            />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/feedback" render={p => <FeedbackPage {...p} />} />
            <Route component={HomePage} />
          </Switch>
        </section>
      </ApiWrapper>
    </div>
  </Provider>
);

export default App;
