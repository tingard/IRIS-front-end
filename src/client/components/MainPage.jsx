import React from 'react';
import PropTypes from 'prop-types';

import ImageCard from './ImageCard';

const MainPage = (props) => {
  const cardList = props.cards.map(
    card => <ImageCard {...card} key={card.key} />,
  );
  return (
    <div>{cardList}</div>
  );
};

MainPage.propTypes = {
  cards: PropTypes.array,
};

export default MainPage;
