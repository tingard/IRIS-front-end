import React, { PropTypes } from 'react';
import { imageStyle, messageStyle, cardStyle } from '../componentStyles';

const ImageCard = (props) => {
  const imStyle = Object.assign({ backgroundImage: `url(${props.imageUrl})` }, imageStyle);
  const countColor = props.replyCount > 5 ? '#993333' : '#339933';
  let cardClasses = 'w3-card-4 w3-hover-greyscale w3-hover-black w3-animate-bottom ';
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
  return (
    <div className="w3-col m4 l3">
      <div className={cardClasses} style={cardStyle}>
        <div
          className="w3-display-container"
          style={imStyle}
        >
          <span
            className="w3-display-topright w3-text-white"
            style={{ padding: '0 5px', backgroundColor: countColor }}
          >
            {props.replyCount}
          </span>
        </div>
        <div className="w3-container w3-center" style={messageStyle}>
          {props.message}
        </div>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  tag: PropTypes.string,
  replyCount: PropTypes.number,
};
ImageCard.defaultProps = {
  tag: 'none',
  replyCount: 0,
};

export default ImageCard;
