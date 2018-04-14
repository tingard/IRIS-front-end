import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import IrisButton from '../../commonResources/IrisButton';

/* eslint-disable no-sequences */
const ImagesPage = (props) => {
  const getReplyLen = im => props.messages.filter(
    m => m.get('image').get('_id') === im.get('_id'),
  ).size;
  const activeImages = props.images.filter(i => i.get('markedAsCompleted') === false)
    .sort((i, j) => (i.get('uploadDate') < j.get('uploadDate') ? 1 : -1));
  const completedImages = props.images.filter(i => i.get('markedAsCompleted') === true)
    .sort((i, j) => (i.get('uploadDate') < j.get('uploadDate') ? 1 : -1));
  return (
    <div className="w3-container">
      <h1>Your Images</h1>
      <section role="status">
        <span className="mf-disable">
          {
            activeImages.size > 0 ? (
              `You currently have ${activeImages.size} image${activeImages.size > 1 ? 's' : ''} being shown to volunteers`
            ) : 'You don\'t have any images being shown to IRIS Volunteers right now'
          }
        </span>
      </section>
      <section>
        {
          activeImages.size > 0 ? (
            <React.Fragment>
              <h2>Images being shown to IRIS Volunteers</h2>
              <ul
                style={{ listStyle: 'none', paddingLeft: 0 }}
                aria-label="List of images on being shown to Volunteers"
                role="grid"
              >
                {activeImages.map(im => (
                  <li key={`${im.get('_id')}`} role="row">
                    <div className="w3-panel w3-border-left" role="gridcell">
                      <p>
                        Image with note: <em className="mf-disable">{`"${im.get('note')}"`}</em>,
                        uploaded <span className="mf-disable">{moment(im.get('uploadDate')).fromNow()}</span>,
                        has
                        <span className="mf-disable">
                          {getReplyLen(im) !== 1 ?
                            ` ${getReplyLen(im)} replies` :
                            ` ${getReplyLen(im)} reply`
                          }
                        </span>
                      </p>
                      <div className="w3-panel" role="group" aria-label="action buttons">
                        <span className="w3-margin-right">Actions:</span>
                        <div className="w3-btn-bar">
                          {getReplyLen(im) !== 0 ? (
                            <Link
                              to={`/images/descriptions/${im.get('_id')}`}
                              className="w3-margin-right iris-button primary"
                            >
                              See descriptions
                            </Link>
                          ) : null}
                          <IrisButton
                            className="w3-margin-right"
                            onClick={() => {
                              console.log('marking as completed', im.get('_id'));
                              props.markImageAsDone(im.get('_id'));
                            }}
                            type="secondary"
                            text="Mark as completed"
                          />
                          <IrisButton
                            className="w3-margin-right"
                            onClick={() => {
                              console.log('marking as deleted', im.get('_id'));
                              props.deleteImage(im.get('_id'));
                            }}
                            type="delete"
                            text="Delete image"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ) : null
        }
      </section>
      <section>
        {
          completedImages.size > 0 ? (
            <React.Fragment>
              <h2>Images you have marked as completed</h2>
              <ul
                style={{ listStyle: 'none', paddingLeft: 0 }}
                aria-label="List of completed images"
                role="grid"
              >
                {completedImages.map(im => (
                  <li key={`${im.get('_id')}`} role="row">
                    <div className="w3-panel w3-border-left" role="gridcell">
                      <p>
                        Image with note: <em className="mf-disable">{`"${im.get('note')}"`}</em>,
                        uploaded <span className="mf-disable">{moment(im.get('uploadDate')).fromNow()}</span>,
                        has
                        <span className="mf-disable">
                          {getReplyLen(im) !== 1 ?
                            ` ${getReplyLen(im)} replies` :
                            ` ${getReplyLen(im)} reply`
                          }
                        </span>
                      </p>
                      <div className="w3-panel" role="group" aria-label="action buttons">
                        <span className="w3-margin-right">Actions:</span>
                        <div className="w3-btn-bar">
                          {getReplyLen(im) !== 0 ? (
                            <Link
                              to={`/images/descriptions/${im.get('_id')}`}
                              className="w3-margin-right iris-button primary"
                            >
                              See descriptions
                            </Link>
                          ) : null}
                          <IrisButton
                            className="w3-margin-right"
                            type="secondary"
                            onClick={() => {
                              console.log('marking as active', im.get('_id'));
                              props.makeImageActive(im.get('_id'));
                            }}
                            text="Show to volunteers"
                          />
                          <IrisButton
                            className="w3-margin-right"
                            onClick={() => {
                              console.log('marking as deleted', im.get('_id'));
                              props.deleteImage(im.get('_id'));
                            }}
                            type="delete"
                            text="Delete image"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ) : null
        }
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
  markImageAsDone: PropTypes.func,
  deleteImage: PropTypes.func,
  makeImageActive: PropTypes.func,
  /* eslint-enable react/no-unused-prop-types */
};

ImagesPage.defaultProps = {
  images: [],
};

export default ImagesPage;
