import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// import ConfirmEmailPage from '../common-resources/ConfirmEmailPage';
import ApiWrapper from './containers/apiWrapper';
import homePage from './containers/homePage';
import Navbar from './components/Navbar';
import MessagesPage from './containers/messagesPage';
import ProfilePage from './containers/profilePage';
import ClassifyPage from './containers/classifyPage';

import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import cardReducer from './reducers/cardReducer';

const loggerMiddleware = createLogger({
  stateTransformer: s => JSON.parse(JSON.stringify(s)),
});

const store = createStore(
  combineReducers({
    user: userReducer,
    cards: cardReducer,
    messages: messageReducer,
  }),
  process.env.NODE_ENV === 'production' ? (
    applyMiddleware(thunkMiddleware)
  ) : (
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  ),
);

const VolunteerApp = () => (
  <BrowserRouter forceRefresh={!('pushState' in window.history)}>
    <Switch>
      <Route
        path="/volunteer"
        render={props => [
          <Navbar {...props} key="iris-volunteer-navbar" />,
          <Provider store={store} key="iris-volunteer-provider">
            <ApiWrapper>
              <section className="volunteer-app content-section">
                <Switch>
                  <Route exact path="/volunteer" component={homePage} />
                  <Route path="/volunteer/profile" component={ProfilePage} />
                  <Route path="/volunteer/messages/:messageID?" component={MessagesPage} />
                  <Route path="/volunteer/cards/:cardId" component={ClassifyPage} />
                  <Route
                    exact
                    path="/volunteer/confirm/:id"
                    render={(p) => { console.log(p); return <p>Confirmed email</p>; }}
                  />
                </Switch>
              </section>
            </ApiWrapper>
          </Provider>,
      ]}
      />
      <Route render={() => <Redirect to="/volunteer" />} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <VolunteerApp />
  , document.querySelector('.app'),
);
