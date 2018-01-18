import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

const ImagesPage = (props) => {
  const getLen = im => props.messages.filter(
    m => m.get('image').get('id') === im.get('id')).size;
  return (
    <div className="w3-container">
      <h1>Your Images</h1>
      <section>
        {
          props.images.size > 0 ? (
            `You currently have ${props.images.size > 0 ? props.images.size : 'any'} images on IRIS`
          ) : 'You don\'t have any images on IRIS'
        }
      </section>
      <section aria-live="polite" aria-relevant="additions removals">
        <ul style={{ listStyle: 'none', paddingLeft: 0 }} aria-label="List of images on IRIS" role="grid">
          {props.images.sort((i, j) => (i.get('uploadDate') < j.get('uploadDate'))).map(im => (
            <li key={`${im.get('id')}`} role="row">
              <div className="w3-panel w3-card-4" role="gridcell">
                <p>
                  Image with note: <em>{`"${im.get('note')}"`}</em>,
                  uploaded {moment(im.get('uploadDate')).fromNow()},
                  has {
                    getLen(im) !== 1 ? `${getLen(im)} replies` : `${getLen(im)} reply`
                  }
                </p>
                <div className="w3-btn-bar" role="group" aria-label="action buttons">
                  Actions:
                  <Link to={`/images/messages/${im.get('id')}`} className="w3-button">
                    See replies
                  </Link>
                  <button className="w3-button w3-blue" disabled onClick={() => props.markImageAsDone(im.get('id'))}>
                    Mark as completed
                  </button>
                  <button className="w3-button w3-red" disabled onClick={() => props.deleteImage(im.get('id'))}>
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
};

ImagesPage.propTypes = {
  images: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string,
      note: PropTypes.string,
      uploadDate: PropTypes.number,
      replyChains: ImmutablePropTypes.listOf(PropTypes.string),
    }),
  ),
  /* eslint-disable react/no-unused-prop-types */
  messages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      messageChain: ImmutablePropTypes.list,
      imageId: PropTypes.string,
    }),
  ),
  isStale: PropTypes.bool,
  isFetching: PropTypes.bool,
  /* eslint-enable react/no-unused-prop-types */
  // markImageAsDone: PropTypes.func,
  // deleteImage: PropTypes.func,
};

ImagesPage.defaultProps = {
  images: [],
};

export default ImagesPage;
