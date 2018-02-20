import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const difficulties = [
  'GCSE Level',
  'A-Level',
  'Degree Level',
];

function prettify(propertyName) {
  function upperToSpace(match, offset) {
    return (offset > 0 ? ' ' : '') + match;
  }
  const out = propertyName.replace(/[A-Z]/g, upperToSpace);
  return `${out.charAt(0).toUpperCase()}${out.slice(1)}`;
}


const ImageCard = props => (
  <Link to={`/cards/${props._id}`}>
    <div className={`grapheel-image-card w3-card-4 w3-animate-bottom ${props.subject}-card`}>
      <div className="image-card-level">
        <span
          className={`user-level-${
            props.user.get('levels').get(props.subject) > props.difficulty ? 'above' : 'below'
          }`}
        >
          {`${difficulties[parseInt(props.difficulty, 10)]} ${prettify(props.subject)}`}
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
  _id: PropTypes.string,
};

export default ImageCard;
