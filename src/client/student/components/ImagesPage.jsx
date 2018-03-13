import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
/* eslint-disable no-sequences */
const ImagesPage = (props) => {
  const getLen = im => props.messages.filter(
    m => m.get('image').get('_id') === im.get('_id'),
  ).size;
  return (
    <div className="w3-container">
      <h1>Your Images</h1>
      <section>
        <span className="mf-disable">
          {
            props.images.size > 0 ? (
              `You currently have ${props.images.size > 0 ? props.images.size : 'any'} images on IRIS`
            ) : 'You don\'t have any images on IRIS'
          }
        </span>
      </section>
      <section aria-live="polite">
        <ul style={{ listStyle: 'none', paddingLeft: 0 }} aria-label="List of images on IRIS" role="grid">
          {props.images.sort((i, j) => (i.get('uploadDate') < j.get('uploadDate') ? 1 : -1)).map(im => (
            <li key={`${im.get('id')}`} role="row">
              <div className="w3-panel w3-border-left" role="gridcell">
                <p>
                  Image with note: <em className="mf-disable">{`"${im.get('note')}"`}</em>,
                  uploaded <span className="mf-disable">{moment(im.get('uploadDate')).fromNow()}</span>,
                  has <span className="mf-disable">{getLen(im) !== 1 ? `${getLen(im)} replies` : `${getLen(im)} reply`}</span>
                </p>
                <div className="w3-panel" role="group" aria-label="action buttons">
                  <span className="w3-margin-right">Actions:</span>
                  <div className="w3-btn-bar">
                    {getLen(im) !== 0 ? (
                      <Link
                        to={`/images/messages/${im.get('_id')}`}
                        className="w3-button w3-light-blue w3-margin-right"
                      >
                        See replies
                      </Link>
                    ) : null}
                    <button
                      className="w3-button w3-green w3-margin-right"
                      onClick={() => props.markImageAsDone(im.get('_id'))}
                      disabled
                    >
                      Mark as completed
                    </button>
                    <button
                      className="w3-button w3-red w3-margin-right"
                      onClick={() => props.deleteImage(im.get('_id'))}
                      disabled
                    >
                      Delete image
                    </button>
                  </div>
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
      _id: PropTypes.string,
      note: PropTypes.string,
      uploadDate: PropTypes.string,
      replyChains: ImmutablePropTypes.listOf(PropTypes.string),
    }),
  ),
  /* eslint-disable react/no-unused-prop-types */
  messages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      messages: ImmutablePropTypes.list,
      image: ImmutablePropTypes.contains({
        _id: PropTypes.string,
      }),
      _id: PropTypes.string,
    }),
  ),
  /* eslint-enable react/no-unused-prop-types */
  // markImageAsDone: PropTypes.func,
  // deleteImage: PropTypes.func,
};

ImagesPage.defaultProps = {
  images: [],
};

export default ImagesPage;
