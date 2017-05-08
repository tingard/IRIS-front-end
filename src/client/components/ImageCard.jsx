import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { imageStyle, messageStyle, cardStyle } from '../componentStyles';

const ImageCard = (props) => {
  const imStyle = Object.assign({ backgroundImage: `url(${props.imageUrl})` }, imageStyle);
  const countColor = props.level > props.userLevel ? '#993333' : '#339933';
  let cardClasses = 'w3-card-4 w3-hover-black w3-hover-shadow-12 w3-animate-bottom ';
  // TODO: there's definitely a better way of doing this
  const borderColorIndex = ({
    physics: 'w3-border-yellow',
    biology: 'w3-border-green',
    chemistry: 'w3-border-blue',
    maths: 'w3-border-black',
  })[props.tag];
  if (typeof (borderColorIndex) !== 'undefined') {
    cardClasses += borderColorIndex;
  }

  const condensedMessage = props.message.length > 80 ? `${props.message.substr(0, 77)}...` : props.message;
  return (
    <div className={cardClasses} style={cardStyle}>
      <Link to={`image/${props.imageID}`}>
        <div
          className="w3-display-container"
          style={imStyle}
        >
          <div className="w3-display-topright" style={{ marginTop: '-2px' }}>
            <span className="w3-text-white">
              {`${props.tag.substr(0, 1).toUpperCase()}${props.tag.substr(1)} `}
            </span>
            <span
              className="w3-text-white"
              style={{ padding: '0 5px', backgroundColor: countColor }}
            >
              {props.level}
            </span>
          </div>
        </div>
        <div className="w3-container w3-center" style={messageStyle}>
          {condensedMessage}
        </div>
      </Link>
    </div>
  );
};

ImageCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageID: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  userLevel: PropTypes.number.isRequired,
};
ImageCard.defaultProps = {
  tag: 'none',
  replyCount: 0,
  userLevel: 0,
};

export default ImageCard;
