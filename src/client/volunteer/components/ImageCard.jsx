import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ImageCard = props => (
  <Link to={`/cards/${props.id}`}>
    <div className={`grapheel-image-card w3-card-4 w3-animate-bottom ${props.subject}-card`}>
      <div className="image-card-level">
        <span
          className={`user-level-${
            props.user.get('level').get(props.subject) >= props.difficulty ? 'above' : 'below'
          }`}
        >
          {props.difficulty}
        </span>
      </div>
      <div className="image-card-image-wrapper">
        <div
          className="image-card-image"
          style={{ backgroundImage: `url(${props.url})` }}
          alt=""
        />
      </div>
      <div className="image-card-message">
        {props.question.length > 60 ? `${props.question.slice(0, 50)}...` : props.question}
      </div>
    </div>
  </Link>
);

ImageCard.propTypes = {
  question: PropTypes.string,
  url: PropTypes.string,
  subject: PropTypes.string,
  difficulty: PropTypes.number,
  user: PropTypes.object,
  id: PropTypes.string,
};

export default ImageCard;
