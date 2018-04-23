import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
// import ClientAPI from 'grapheel-iris-client-api';

class MainApp extends React.Component {
  componentDidMount() {
    console.log('main app mounted');
  }
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/login" component={LoginPage} />
          <Route
            exact
            path="/"
            component={HomePage}
          />
          <Route
            exact
            path="/create"
            render={p => (
              <div className="iris-narrow-page">
                <h1>Create an account</h1>
                <p>Choose a type!</p>
              </div>
            )}
          />
          <Route
            path="/create/:utype"
            render={p => (
              <div className="iris-narrow-page">
                <h1>
                  {['student', 'volunteer', 'licence-owner'].indexOf(p.match.params.utype) >= 0 ?
                    `Create a ${p.match.params.utype} account` : 'Create an account'}
                </h1>
                <p>this functionality isn't implemented yet</p>
              </div>
            )}
          />
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(
  <MainApp />
  , document.querySelector('.app'),
);
