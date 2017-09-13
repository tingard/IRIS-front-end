import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

const App = props => (
  <div className="parallax parallax1">
    <Navbar />
    Hihihihih
    <section className="content-section">
      {props.children}
    </section>
    <section id="spacer" style={{ height: '60px' }} />
  </div>
);

App.propTypes = {
  children: PropTypes.object,
};

export default App;
