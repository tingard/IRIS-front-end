/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisLoader from '../../common-resources/IrisLoader';
import ImageCard from './ImageCard';


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
  cards: ImmutablePropTypes.contains({
    cards: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        subject: PropTypes.string,
        difficulty: PropTypes.number,
        key: PropTypes.string,
      }),
    ),
    state: ImmutablePropTypes.contains({
      isFetching: PropTypes.bool,
    }),
  }),
  user: ImmutablePropTypes.contains({
    level: ImmutablePropTypes.contains({
      physics: PropTypes.number,
      biology: PropTypes.number,
      chemistry: PropTypes.number,
      maths: PropTypes.number,
      computerScience: PropTypes.number,
      psychology: PropTypes.number,
      finance: PropTypes.number,
    }),
    state: ImmutablePropTypes.contains({
      isFetching: PropTypes.bool,
    }),
  }),
};

export default HomePage;
