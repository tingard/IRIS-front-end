import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import ApiWrapper from './containers/apiWrapper';
import HomePage from './containers/homePage';
import RepliesPage from './containers/repliesPage';
import userReducer from './reducers/userReducer';
import licencesReducer from './reducers/licencesReducer';
import imagesReducer from './reducers/imagesReducer';

const loggerMiddleware = createLogger({
  stateTransformer: s => JSON.parse(JSON.stringify(s)),
});

const store = createStore(
  combineReducers({
    user: userReducer,
    images: imagesReducer,
    licences: licencesReducer,
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);

const LicenceOwnerApp = () => (
  <BrowserRouter forceRefresh={!('pushState' in window.history)}>
    <Route
      path="/"
      render={() => (
        <Provider store={store}>
          <div id="modal-root">
            <ApiWrapper>
              <Switch>
                <Route exact path="/licence-owner/images/:imageId" component={RepliesPage} />
                <Route exact path="/licence-owner/:imageId/:replyId" component={HomePage} />
                <Route exact path="/licence-owner" component={HomePage} />
                <Route render={() => <Redirect to="/licence-owner" />} />
              </Switch>
            </ApiWrapper>
          </div>
        </Provider>
      )}
    />
  </BrowserRouter>
);

ReactDOM.render(
  <LicenceOwnerApp />
  , document.querySelector('.app'),
);
