import React from 'react';
import ReactDOM from 'react-dom';
import IrisButton from '../common-resources/IrisButton';
// import ClientAPI from 'grapheel-iris-client-api';

class MainApp extends React.Component {
  componentDidMount() {
    console.log('main app mounted');
  }
  render() {
    return (
      <div className="w3-container">
        <h1>Welcome to IRIS!</h1>
        <p>This page should look a lot nicer soon...</p>
        <IrisButton
          type="action"
          text="Click me"
          onClick={() => null}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <MainApp />
  , document.querySelector('.app'),
);
