import React from 'react';

export default () => (
  <defs>
    <filter
      id="iris-svg-shadow"
      x="-0.20000000000000001"
      y="-0.20000000000000001"
      height="1.3999999999999999"
      width="1.3999999999999999"
    >
      <feOffset result="offOut" in="SourceGraphic" dx="0" dy="10" />
      <feColorMatrix
        result="matrixOut"
        in="offOut"
        type="matrix"
        values="0.7 0 0 0 0 0 0.7 0 0 0 0 0 0.7 0 0 0 0 0 1 0"
      />
      <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
);
