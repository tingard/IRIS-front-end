import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
  process.env.NODE_ENV === 'production' ? (
    applyMiddleware(thunkMiddleware)
  ) : (
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  ),
);

const StudentApp = () => (
  <BrowserRouter forceRefresh={!('pushState' in window.history)}>
    <Route
      path="/"
      render={() => (
        <Provider store={store}>
          <div id="modal-root">
            <Navbar />
            <ApiWrapper>
              <section className="student-app content-section">
                <Switch>
                  <Route exact path="/student/messages" render={p => <DescriptionsPage {...p} />} />
                  <Route
                    exact
                    path="/student/messages/:messageID"
                    render={p => <ConversationPage {...p} />}
                  />
                  <Route exact path="/student/images" component={ImagesPage} />
                  <Route
                    exact
                    path="/student/images/descriptions/:imageId"
                    render={p => <DescriptionsPage filterByImage {...p} />}
                  />
                  <Route
                    exact
                    path="/student/images/descriptions/:imageId/:messageId"
                    render={p => <AcceptDescriptionPage {...p} />}
                  />
                  <Route exact path="/student/profile" component={ProfilePage} />
                  <Route exact path="/student/feedback" render={p => <FeedbackPage {...p} />} />
                  <Route exact path="/student/confirm/:id" component={ConfirmEmailPage} />
                  <Route component={HomePage} />
                </Switch>
              </section>
            </ApiWrapper>
          </div>
        </Provider>
      )}
    />
  </BrowserRouter>
);

ReactDOM.render(
  <StudentApp />
  , document.querySelector('.app'),
);
