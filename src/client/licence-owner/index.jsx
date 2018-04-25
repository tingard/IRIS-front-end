import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import HomePage from './containers/homePage';
import userReducer from './reducers/userReducer';
import licencesReducer from './reducers/licencesReducer';

const loggerMiddleware = createLogger({
  stateTransformer: s => JSON.parse(JSON.stringify(s)),
});

const store = createStore(
  combineReducers({
    user: userReducer,
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
            <Switch>
              <Route component={HomePage} />
            </Switch>
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
