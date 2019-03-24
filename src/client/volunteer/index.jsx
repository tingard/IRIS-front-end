import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import configureStore from './configureStore';

import VolunteerApp from './VolunteerApp';

const loggerMiddleware = createLogger({
  stateTransformer: s => JSON.parse(JSON.stringify(s)),
});

const store = configureStore(
  process.env.NODE_ENV === 'production' ? (
    applyMiddleware(thunkMiddleware)
  ) : (
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  ),
);

ReactDOM.render(
  <Provider store={store} key="iris-volunteer-provider"><VolunteerApp /></Provider>,
  document.querySelector('.app'),
);
