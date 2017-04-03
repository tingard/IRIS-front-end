import React from 'react';
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
  submissions: React.PropTypes.array,
};

export default Hand;
