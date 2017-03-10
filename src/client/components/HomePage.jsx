import React from 'react';
import UserWidget from '../containers/userWidget';
import RatingsBox from '../containers/ratingsBox';
import HandContainer from '../containers/handContainer';
import { themeColors } from '../componentStyles';

const HomePage = () => (
  <div>
    <div className="w3-container" style={themeColors.lightMain}>
      <div className="w3-row" style={{ minHeight: '100px' }}>
        <div className="w3-col s4">
          <UserWidget />
        </div>
        <div className="w3-col s8">
          <RatingsBox />
        </div>
      </div>
    </div>
    { /* TODO: image card holder here */ }
    <div className="w3-row">
      <HandContainer />
    </div>
  </div>
);

export default HomePage;
