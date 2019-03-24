import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import ApiWrapper from './containers/apiWrapper';
import homePage from './containers/homePage';
import Navbar from './components/Navbar';
import MessagesPage from './containers/messagesPage';
import ProfilePage from './containers/profilePage';
import ClassifyPage from './containers/classifyPage';
import '../common-resources/_IrisBase.scss';

const VolunteerApp = () => (
  <BrowserRouter forceRefresh={!('pushState' in window.history)}>
    <Switch>
      <Route
        path="/volunteer"
        render={props => [
          <Navbar {...props} key="iris-volunteer-navbar" />,
          <ApiWrapper key="iris-volunteer-api-wrapper">
            <section className="volunteer-app">
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
          </ApiWrapper>,
        ]}
      />
      <Route render={() => <Redirect to="/volunteer" />} />
    </Switch>
  </BrowserRouter>
);

export default hot(VolunteerApp);
