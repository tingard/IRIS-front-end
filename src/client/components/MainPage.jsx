import React from 'react';
import PropTypes from 'prop-types';

import ImageCard from './ImageCard';

const MainPage = (props) => {
  const cardList = props.cards.map(
    card => <ImageCard {...card} key={card.key} />,
  );
  return (
    <div>
      <div className="main-page-topmessage">
        <h3>Welcome back!</h3>
        {/* card filters */}
        <p>I feel like classifying <code>Tag dropdown</code></p>
      </div>
      <div>{cardList}</div>
    </div>
  );
};

MainPage.propTypes = {
  cards: PropTypes.array,
};

export default MainPage;
