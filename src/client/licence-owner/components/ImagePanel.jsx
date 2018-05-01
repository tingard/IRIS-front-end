import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisLoader from '../../common-resources/IrisLoader';
import ImageDetails from './ImageDetails';

const ImagePanel = props => (
  <div className="panel image-feed">
    <h3>Your image feed</h3>
    {props.state.get('isFetching') ? <IrisLoader /> : (
      <React.Fragment>
        {props.images.shape === 0 ? (
          <p>None of your students have added any images to IRIS yet!</p>
        ) : (
          <React.Fragment>
            <p>This is a list of all images uploaded by your students</p>
            <ul>
              {props.images.map(
                image => <ImageDetails key={image.get('_id')} image={image} />,
              )}
            </ul>
          </React.Fragment>
        )}
      </React.Fragment>
    )}
  </div>
);

ImagePanel.propTypes = {
  images: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      _id: PropTypes.string.isRequired,
    }),
  ),
  state: ImmutablePropTypes.contains({
    isStale: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }),
};

export default ImagePanel;
