import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const ImagesPage = props => (
  <div className="w3-container">
    <h1>Your Images</h1>
    <section>
      You currently have {props.images.length} images on IRIS
    </section>
    <section>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }} aria-label="List of images on IRIS" role="grid">
        {props.images.sort((i, j) => (i.uploadDate < j.uploadDate)).map(im => (
          <li key={`${im.id}`} role="row">
            <div className="w3-panel w3-card-4" role="gridcell">
              <p>
                Image with note: <em>{`"${im.note}"`}</em>,
                uploaded {moment(im.uploadDate).fromNow()},
                has {im.replyChains.length} {im.replyChains.length > 1 ? 'replies' : 'reply'}
              </p>
              <div className="w3-btn-bar" role="group" aria-label="action buttons">
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
            </div>
          </li>
        ))}
      </ul>
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
