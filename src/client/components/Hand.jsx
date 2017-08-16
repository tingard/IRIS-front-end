import React from 'react';
import PropTypes from 'prop-types';
import ImageCardContainer from '../containers/imageCardContainer';

const Hand = (props) => {
  const foo = props.submissions.map(
    (m, i) =>
      <div className="w3-col m6 l4" key={Math.random()}>
        <ImageCardContainer subID={i} />
      </div>,
  );
  return (
    <div>
      {foo}
    </div>
  );
};

Hand.propTypes = {
  submissions: PropTypes.array,
};

export default Hand;
