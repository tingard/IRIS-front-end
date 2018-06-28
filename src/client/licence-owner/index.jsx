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
import CancelPage from './components/CancelPage';
import StudentPage from './containers/studentPage';
import AddToStudentPage from './components/AddToStudentPage';
import userReducer from './reducers/userReducer';
import imagesReducer from './reducers/imagesReducer';

const loggerMiddleware = createLogger({
  stateTransformer: s => JSON.parse(JSON.stringify(s)),
});

const store = createStore(
  combineReducers({
    user: userReducer,
    images: imagesReducer,
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
                <Route exact path="/licence-owner" component={HomePage} />
                <Route exact path="/licence-owner/images/:imageId" component={RepliesPage} />
                <Route
                  exact
                  path="/licence-owner/connect/:licenceId"
                  component={AddToStudentPage}
                />
                <Route exact path="/licence-owner/cancel/" component={CancelPage} />
                <Route exact path="/licence-owner/cancel/:licenceId" component={CancelPage} />
                <Route exact path="/licence-owner/student/:licenceId" component={StudentPage} />
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
