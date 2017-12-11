import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const getDt = (date) => {
  const dT = (Date.now() - date) / (1000);
  let dTmessage;
  if (dT < 60) { // less than a minute
    dTmessage = 'just now';
  } else if (dT < 3600) { // less than an hour
    dTmessage = `${parseInt(dT / 60, 10)} minutes ago`;
  } else if (dT < 86400) { // less than a day
    dTmessage = `${parseInt(dT / 3600, 10)} hour${parseInt(dT / 3600, 10) > 1 ? 's' : ''} ago`;
  } else { // more than a day
    dTmessage = `${parseInt(dT / 86400, 10)} days ago`;
  }
  return dTmessage;
};

const ImagesPage = props => (
  <div className="w3-container">
    <h1>Your Images</h1>
    <section>
      You currently have {props.images.length} images on IRIS
    </section>
    <section>
      {props.images.sort((i, j) => (i.uploadDate < j.uploadDate)).map(im => (
        <section className="w3-panel w3-card-4" key={`${im.id}`}>
          <p>
            Image with note: <em>{`"${im.note}"`}</em>,
            uploaded {getDt(im.uploadDate)},
            has {im.replyChains.length} {im.replyChains.length > 1 ? 'replies' : 'reply'}
          </p>
          <div className="w3-btn-bar">
            Actions:
            <Link to={`/images/messages/${im.id}`} className="w3-button">
              See replies
            </Link>
            <button className="w3-button w3-blue" onClick={() => props.markImageAsDone(im.id)}>
              Mark as done
            </button>
            <button className="w3-button w3-red" onClick={() => props.deleteImage(im.id)}>
              Delete image
            </button>
          </div>
        </section>
      ))}
    </section>
  </div>
);

ImagesPage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      note: PropTypes.string,
      uploadDate: PropTypes.number,
      replyChains: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  // markImageAsDone: PropTypes.func,
  // deleteImage: PropTypes.func,
};

ImagesPage.defaultProps = {
  images: [],
};

export default ImagesPage;
