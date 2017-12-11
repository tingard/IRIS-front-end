import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store as volunteerStore, App as VolunteerApp } from './volunteer';
import { store as studentStore, App as StudentApp } from './student';

const utype = false; // true for volunteer false for student

ReactDOM.render(
  <Provider store={utype ? volunteerStore : studentStore}>
    <HashRouter>
      {utype ? <VolunteerApp /> : <StudentApp />}
    </HashRouter>
  </Provider>
  , document.querySelector('.app'),
);
