import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
/* eslint-disable no-sequences */
const ImagesPage = (props) => {
  const getLen = im => props.messages.filter(
    m => m.get('image').get('id') === im.get('id'),
  ).size;
  console.log(
    props.images.sort((i, j) => (i.get('uploadDate') > j.get('uploadDate') ? 1 : -1))
      .map(i => i.get('uploadDate')).toArray(),
  );
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
          {props.images.sort((i, j) => (i.get('uploadDate') < j.get('uploadDate') ? 1 : -1)).map(im => (
            <li key={`${im.get('id')}`} role="row">
              <div className="w3-panel w3-border-left" role="gridcell">
                <p>
                  Image with note: <em>{`"${im.get('note')}"`}</em>,
                  uploaded {moment(im.get('uploadDate')).fromNow()},
                  has {
                    getLen(im) !== 1 ? `${getLen(im)} replies` : `${getLen(im)} reply`
                  }
                </p>
                <div className="w3-panel" role="group" aria-label="action buttons">
                  <span className="w3-margin-right">Actions:</span>
                  <div className="w3-btn-bar">
                    {getLen(im) !== 0 ? (
                      <Link
                        to={`/images/messages/${im.get('id')}`}
                        className="w3-button w3-light-blue w3-margin-right"
                      >
                        See replies
                      </Link>
                    ) : null}
                    <button
                      className="w3-button w3-green w3-margin-right"
                      onClick={() => props.markImageAsDone(im.get('id'))}
                      disabled
                    >
                      Mark as completed
                    </button>
                    <button
                      className="w3-button w3-red w3-margin-right"
                      onClick={() => props.deleteImage(im.get('id'))}
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
      id: PropTypes.string,
      note: PropTypes.string,
      uploadDate: PropTypes.string,
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
  /* eslint-enable react/no-unused-prop-types */
  // markImageAsDone: PropTypes.func,
  // deleteImage: PropTypes.func,
};

ImagesPage.defaultProps = {
  images: [],
};

export default ImagesPage;
