import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImageDetails from './ImageDetails';

/* eslint-disable no-sequences */
const ImagesPage = (props) => {
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
                    <ImageDetails
                      messages={props.messages.filter(
                        m => m.get('image').get('_id') === im.get('_id'),
                      )}
                      image={im}
                      isActive
                      toggleActive={props.markImageAsDone}
                      deleteImage={props.deleteImage}
                    />
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
                    <ImageDetails
                      messages={props.messages.filter(
                        m => m.get('image').get('_id') === im.get('_id'),
                      )}
                      image={im}
                      toggleActive={props.makeImageActive}
                      deleteImage={props.deleteImage}
                    />
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
