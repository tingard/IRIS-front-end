import React from 'react';
import ImageCardContainer from '../containers/imageCardContainer';

const HomePage = () => (
  <div>
    <div className="w3-container w3-blue-grey">
      <h1>Welcome</h1>
      <p>Available Cards:</p>
    </div>
    { /* TODO: image card holder here */ }
    <ImageCardContainer subID={0} />
    <ImageCardContainer subID={1} />
    <ImageCardContainer subID={2} />
    <ImageCardContainer subID={3} />
    <ImageCardContainer subID={4} />
  </div>
);
export default HomePage;
