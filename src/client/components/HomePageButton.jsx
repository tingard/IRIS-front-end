import React from 'react';
// import Icon from '../svg/home-icon.svg';

const HomePageButton = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34.547028mm"
    height="34.547028mm"
    viewBox="0 0 34.547028 34.547028"
    version="1.1"
    id="svg8"
  >
    <defs
      id="defs2"
    >
      <filter
        style={{ colorInterpolationFilters: 'sRGB' }}
        id="filter375"
      >
        <feFlood
          floodOpacity="0.498039"
          floodColor="rgb(0,0,0)"
          result="flood"
          id="feFlood365"
        />
        <feComposite
          in="flood"
          in2="SourceGraphic"
          operator="in"
          result="composite1"
          id="feComposite367"
        />
        <feGaussianBlur
          in="composite1"
          stdDeviation="2"
          result="blur"
          id="feGaussianBlur369"
        />
        <feOffset
          dx="1"
          dy="2"
          result="offset"
          id="feOffset371"
        />
        <feComposite
          in="SourceGraphic"
          in2="offset"
          operator="over"
          result="fbSourceGraphic"
          id="feComposite373"
        />
        <feColorMatrix
          result="fbSourceGraphicAlpha"
          in="fbSourceGraphic"
          values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
          id="feColorMatrix377"
        />
        <feFlood
          id="feFlood379"
          floodOpacity="0.498039"
          floodColor="rgb(0,0,0)"
          result="flood"
          in="fbSourceGraphic"
        />
        <feComposite
          in2="fbSourceGraphic"
          id="feComposite381"
          in="flood"
          operator="in"
          result="composite1"
        />
        <feGaussianBlur
          id="feGaussianBlur383"
          in="composite1"
          stdDeviation="2"
          result="blur"
        />
        <feOffset
          id="feOffset385"
          dx="1"
          dy="2"
          result="offset"
        />
        <feComposite
          in2="offset"
          id="feComposite387"
          in="fbSourceGraphic"
          operator="over"
          result="composite2"
        />
      </filter>
    </defs>
    <g
      id="layer1"
      transform="translate(-21.847028,-17.600005)"
    >
      <g
        id="g4909"
        transform="matrix(0.25220753,0,0,0.25220753,16.337043,13.161151)"
      >
        <circle
          r="57.074402"
          cy="86.089287"
          cx="90.336311"
          id="path21"
          style={{ fill: '#f2f2f2', strokeWidth: 0.3444145, filter: 'url(#filter375)' }}
          transform="matrix(0.99777604,0,0,1.0012574,0.06843942,-0.04201763)"
        />
        <rect
          style={{ fill: '#f24d36', fillOpacity: 1, strokeWidth: 1.04906988 }}
          id="rect836"
          width="52.078827"
          height="52.078827"
          x="63.809822"
          y="69.978592"
        />
        <path
          style={{ fill: '#f24d36', fillOpacity: 1, strokeWidth: 1.04906988 }}
          id="path868"
          d="m 128.52286,75.5152 -107.695332,-10e-7 53.847666,-93.266893 z"
          transform="matrix(0.65210393,0,0,0.35870824,41.340585,50.793916)"
        />
        <rect
          style={{ fill: '#f24d36', fillOpacity: 1, strokeWidth: 1.04906988 }}
          id="rect872"
          width="5.2453494"
          height="10.490699"
          x="105.77263"
          y="54.916935"
        />
      </g>
    </g>
  </svg>
);

export default HomePageButton;
