import React from 'react';
import Navbar from './Navbar';

const App = props => (
  <div className="parallax parallax1">
    <Navbar width={window.innerWidth} />
    <section className="content-section">
      {props.children}
    </section>
    <section id="spacer" style={{ height: '50px' }} />
  </div>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
