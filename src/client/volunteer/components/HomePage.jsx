/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import IrisLoader from '../../common-resources/IrisLoader';
import ImageCard from './ImageCard';
import '../../common-resources/_IrisLoader.scss';
import '../../common-resources/_IrisButton.scss';
import '../styles/home-page.scss';

const HomePage = (props) => {
  if (props.cards.get('state').get('isFetching') || props.user.get('isFetching')) {
    return <IrisLoader />;
  }
  const cardList = props.cards.get('cards')
    .filter(
      card => props.user.get('levels').get(card.get('subject')) > card.get('difficulty'),
    )
    .map(
      card => <ImageCard {...card.toObject()} key={card.get('_id')} user={props.user} />,
    );
  return (
    <div className="iris-narrow-page">
      <div className="cardHolder">
        {cardList.size > 0 ? cardList.toArray() : (
          <h4 className="w3-padding-32">Looks like there aren't any images here!</h4>)}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  cards: PropTypes.shape({
    get: PropTypes.func.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        subject: PropTypes.string,
        difficulty: PropTypes.number,
        key: PropTypes.string,
      }),
    ),
    state: PropTypes.shape({
      isFetching: PropTypes.bool,
    }),
  }),
  user: PropTypes.shape({
    get: PropTypes.func.isRequired,
    level: PropTypes.shape({
      physics: PropTypes.number,
      biology: PropTypes.number,
      chemistry: PropTypes.number,
      maths: PropTypes.number,
      computerScience: PropTypes.number,
      psychology: PropTypes.number,
      finance: PropTypes.number,
    }),
    state: PropTypes.shape({
      isFetching: PropTypes.bool,
    }),
  }),
};

export default HomePage;
