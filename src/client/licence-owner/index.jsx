import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import ApiWrapper from './containers/apiWrapper';
import HomePage from './containers/homePage';
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
                <Route component={HomePage} />
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
