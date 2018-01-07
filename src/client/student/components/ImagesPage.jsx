import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import moment from 'moment';

const ImagesPage = props => (
  <div className="w3-container">
    <h1>Your Images</h1>
    <section>
      {
        props.images.size > 0 ? (
          `You currently have ${props.images.size > 0 ? props.images.size : 'any'} images on IRIS`
        ) : 'You don\'t have any images on IRIS'
      }
    </section>
    <section>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }} aria-label="List of images on IRIS" role="grid">
        {props.images.sort((i, j) => (i.get('uploadDate') < j.get('uploadDate'))).map(im => (
          <li key={`${im.id}`} role="row">
            <div className="w3-panel w3-card-4" role="gridcell">
              <p>
                Image with note: <em>{`"${im.get('note')}"`}</em>,
                uploaded {moment(im.get('uploadDate')).fromNow()},
                has {im.get('replyChains').size} {im.get('replyChains').size > 1 ? 'replies' : 'reply'}
              </p>
              <div className="w3-btn-bar" role="group" aria-label="action buttons">
                Actions:
                <Link to={`/images/messages/${im.get('id')}`} className="w3-button">
                  See replies
                </Link>
                <button className="w3-button w3-blue" onClick={() => props.markImageAsDone(im.get('id'))}>
                  Mark as done
                </button>
                <button className="w3-button w3-red" onClick={() => props.deleteImage(im.get('id'))}>
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
  images: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string,
      note: PropTypes.string,
      uploadDate: PropTypes.number,
      replyChains: ImmutablePropTypes.listOf(PropTypes.string),
    }),
  ),
  // markImageAsDone: PropTypes.func,
  // deleteImage: PropTypes.func,
};

ImagesPage.defaultProps = {
  images: [],
};

export default ImagesPage;
