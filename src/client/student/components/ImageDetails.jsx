import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import moment from 'moment';
import IrisButton from '../../commonResources/IrisButton';

const ImageDetails = props => (
  <div className="w3-panel w3-border w3-round w3-card-2 image-details" role="gridcell">
    <img src={props.image.get('url')} alt={props.image.get('note')} />
    <div>
      <p>
          Image with note: <em className="mf-disable">{`"${props.image.get('note')}"`}</em>,
          uploaded <span className="mf-disable">{moment(props.image.get('uploadDate')).fromNow()}</span>,
          has
        <span className="mf-disable">
          {props.messages.size !== 1 ?
              ` ${props.messages.size} replies` :
              ` ${props.messages.size} reply`
            }
        </span>
      </p>
      <div className="w3-panel" role="group" aria-label="action buttons">
        <div className="w3-btn-bar">
          {props.messages.size !== 0 ? (
            <Link
              to={`/images/descriptions/${props.image.get('_id')}`}
              className="w3-margin-right iris-button primary"
              role="button"
              tabIndex="0"
            >
                See descriptions
            </Link>
            ) : null}
          <IrisButton
            onClick={() => props.toggleActive(props.image.get('_id'))}
            type="secondary"
            text={props.isActive ? 'Mark as completed' : 'Show to volunteers'}
          />
          <IrisButton
            onClick={() => props.deleteImage(props.image.get('_id'))}
            type="delete"
            text="Delete image"
          />
        </div>
      </div>
    </div>
  </div>
);

ImageDetails.propTypes = {
  image: ImmutablePropTypes.contains({
    _id: PropTypes.string,
    note: PropTypes.string,
    uploadDate: PropTypes.string,
    replyChains: ImmutablePropTypes.listOf(PropTypes.string),
  }),
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
  isActive: PropTypes.bool,
  toggleActive: PropTypes.func,
  deleteImage: PropTypes.func,
  /* eslint-enable react/no-unused-prop-types */
};

export default ImageDetails;
