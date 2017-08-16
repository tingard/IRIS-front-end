import React from 'react';
import PropTypes from 'prop-types';
import StarBox from './StarBox';

const closeButtonStyle = {
  backgroundColor: '#fff',
  border: '2px solid black',
  borderRadius: '10px',
  fontSize: '10px',
  opacity: 0.8,
  position: 'relative',
  height: '15px',
  width: '15px',
  textAlign: 'center',
  paddingTop: '-3px',
  lineHeight: '10px',
};

const Rating = props => (
  <div
    className="w3-col s3 w3-display-container"
    style={{ width: '150px' }}
  >
    <a
      href="#delete-rating"
      className="w3-display-topright"
      style={{ zIndex: 2 }}
      onClick={(e) => { console.log(e); }}
    >
      <div style={closeButtonStyle}>x</div>
    </a>
    <div className="w3-row" style={{ width: '100%', textAlign: 'center' }}>
      <StarBox n={props.update.rating} />
    </div>
    <div className="w3-row">
      <p style={{ fontSize: '12px', lineHeight: 1.1, opacity: 0.5 }}>
        {props.update.message}
      </p>
    </div>
  </div>
);

Rating.propTypes = {
  update: PropTypes.object,
};

const RatingsBox = (props) => {
  console.log(props);
  const updates = props.updates.sort((a, b) => b.rating - a.rating).slice(0, 3).map(
    u => <Rating update={u} key={Math.random()} />,
  );
  return (
    <div>
      <div style={{ minHeight: '100px', marginTop: '5px', display: 'inline-block' }}>
        {updates}
      </div>
      <div style={{ display: 'inline-block', position: 'relative', top: '-40px', opacity: 0.5 }}>
        <span className="w3-badge w3-xlarge w3-light-grey">+{props.updates.length - 3}</span>
      </div>
    </div>
  );
};

RatingsBox.propTypes = {
  updates: PropTypes.array,
};

export default RatingsBox;
