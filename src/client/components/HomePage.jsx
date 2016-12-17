import React from 'react';
import ImageCardContainer from '../containers/imageCardContainer';
import { themeColors } from '../componentStyles';

const HomePage = () => (
  <div>
    <div className="w3-container" style={themeColors.lightMain}>
      <h1>Welcome</h1>
      <p>Available Cards:</p>
    </div>
    { /* TODO: image card holder here */ }
    <div className="w3-row">
      <div className="w3-col m6 l4">
        <ImageCardContainer subID={0} />
      </div>
      <div className="w3-col m6 l4">
        <ImageCardContainer subID={1} />
      </div>
      <div className="w3-col m6 l4">
        <ImageCardContainer subID={2} />
      </div>
      <div className="w3-col m6 l4">
        <ImageCardContainer subID={3} />
      </div>
      <div className="w3-col m6 l4">
        <ImageCardContainer subID={4} />
      </div>
    </div>
  </div>
);
export default HomePage;
