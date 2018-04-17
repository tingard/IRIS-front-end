import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Route, Switch } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Navbar from './components/Navbar';
import ApiWrapper from './containers/apiWrapper';
import HomePage from './containers/homePage';
import DescriptionsPage from './containers/descriptionsPage';
import ConversationPage from './containers/conversationPage';
import AcceptDescriptionPage from './containers/acceptDescriptionPage';
import ImagesPage from './containers/imagesPage';
import ProfilePage from './containers/profilePage';
import FeedbackPage from './components/FeedbackPage';
import ConfirmEmailPage from './containers/confirmEmailPage';

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
            <Route exact path="/messages" render={p => <DescriptionsPage {...p} />} />
            <Route exact path="/messages/:messageID" render={p => <ConversationPage {...p} />} />
            <Route exact path="/images" component={ImagesPage} />
            <Route
              exact
              path="/images/descriptions/:imageId"
              render={p => <DescriptionsPage filterByImage {...p} />}
            />
            <Route
              exact
              path="/images/descriptions/:imageId/:messageId"
              render={p => <AcceptDescriptionPage {...p} />}
            />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/feedback" render={p => <FeedbackPage {...p} />} />
            <Route exact path="/confirm/:id" component={ConfirmEmailPage} />
            <Route component={HomePage} />
          </Switch>
        </section>
      </ApiWrapper>
    </div>
  </Provider>
);

export default App;
