import React from 'react';
import './_IrisLoader.scss';
// loading gif from https://codepen.io/Roosa/pen/yOQrdg

const IrisLoader = () => {
  const divs = [];
  for (let i = 0; i < 7; i += 1) {
    divs.push(
      <div
        key={i}
        id={`iris-loader-circle${i + 1}`}
        className="iris-loader-circle"
      />,
    );
  }
  return (
    <div id="iris-loader-spinner">
      {divs}
    </div>
  );
};

export default IrisLoader;
