import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ClientAPI from 'grapheel-iris-client-api';
import { store as volunteerStore, App as VolunteerApp } from './volunteer';
import { store as studentStore, App as StudentApp } from './student';

const api = new ClientAPI();
api.init().then(
  // here we will have decided whether we need to show the login page
  // or not, so set a global to render, until then we should render a
  // loading page or something
);

const utype = false; // true for volunteer false for student

ReactDOM.render(
  <Provider store={utype ? volunteerStore : studentStore}>
    <HashRouter>
      {utype ? <VolunteerApp api={api} /> : <StudentApp api={api} />}
    </HashRouter>
  </Provider>
  , document.querySelector('.app'),
);
