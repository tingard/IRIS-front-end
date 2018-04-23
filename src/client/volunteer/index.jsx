import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Route, Switch, Redirect } from 'react-router-dom';
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

const VolunteerApp = () => [
  <Navbar key="iris-volunteer-navbar" />,
  <Provider store={store} key="iris-volunteer-provider">
    <ApiWrapper>
      <section className="volunteer-app content-section">
        <Switch>
          <Route exact path="/" component={homePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/messages/:messageID?" component={MessagesPage} />
          <Route path="/cards/:cardId" component={ClassifyPage} />
          <Route
            exact
            path="/confirm/:id"
            render={(p) => { console.log(p); return <p>Confirmed email</p>; }}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </section>
    </ApiWrapper>
  </Provider>,
];

ReactDOM.render(
  <VolunteerApp />
  , document.querySelector('.app'),
);
