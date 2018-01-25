import React from 'react';
import MediaQuery from 'react-responsive';
import BounceLoader from 'react-spinners/dist/spinners/BounceLoader';

const FullPageSpinner = () => (
  <div>
    <MediaQuery minHeight={500}>
      <div className="w3-container w3-display-container" style={{ height: '500px' }}>
        <div className="w3-display-middle">
          <BounceLoader color="#777" size={100} />
        </div>
      </div>
    </MediaQuery>
    <MediaQuery maxHeight={500}>
      <div className="w3-container w3-display-container" style={{ height: '200px' }}>
        <div className="w3-display-middle">
          <BounceLoader color="#777" size={100} />
        </div>
      </div>
    </MediaQuery>
  </div>
);

export default FullPageSpinner;
