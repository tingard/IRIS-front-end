import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Route, Switch } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import HomePage from './components/HomePage';
import licenceReducer from './reducers/licenceReducer';
import userReducer from './reducers/userReducer';

const loggerMiddleware = createLogger({
  stateTransformer: s => JSON.parse(JSON.stringify(s)),
});

const store = createStore(
  combineReducers({
    licenceReducer,
    userReducer,
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);

const App = () => (
  <Provider store={store}>
    <div id="modal-root">
      <section className="licence-owner-app content-section">
        <Switch>
          <Route component={HomePage} />
        </Switch>
      </section>
    </div>
  </Provider>
);

export default App;
