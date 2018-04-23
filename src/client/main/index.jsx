import React from 'react';
import ReactDOM from 'react-dom';
// import ClientAPI from 'grapheel-iris-client-api';

class MainApp extends React.Component {
  componentDidMount() {
    console.log('main app mounted');
  }
  render() {
    return (
      <div className="w3-container">
        <h1>Welcome to IRIS!</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <MainApp />
  , document.querySelector('.app'),
);
