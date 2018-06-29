import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import moment from 'moment';
import IrisLoader from '../../common-resources/IrisLoader';
import IrisButton from '../../common-resources/IrisButton';
import ImageDescription from '../../common-resources/imageDescription';

const RepliesPage = props => (
  <div className="licence-owner-page">
    {props.state.get('isFetching') || !props.image ? <IrisLoader /> : (
      <div className="panel">
        <Link to="/licence-owner" className="iris-button tertiary">Go back</Link>
        <h3>Image</h3>
        <img src={props.image.get('url')} alt={props.image.get('name')} className="iris-image" />
        <p>{`Named: ${props.image.get('note')}`}</p>
        <p>{`Question: ${props.image.get('question')}`}</p>
        <p>{`Marked as ${props.image.get('subject')}`}</p>
        <p>{`Uploaded ${moment(props.image.get('uploadDate')).fromNow()}`}</p>
        <p>
          If you want this image or any of the associated replies removed from IRIS,
          please email us at&nbsp;
          <a href="mailto:contact@grapheel.com">contact@grapheel.com</a>
        </p>
        <h3>Replies:</h3>
        <ul>
          {props.image.get('classifications').map(
            classification => (
              <li key={classification.get('_id')} >
                <ImageDescription classification={classification.get('classification')} />
                <IrisButton text="Flag" type="action" />
              </li>
            ),
          )}
        </ul>
      </div>
    )}
  </div>

);

RepliesPage.propTypes = {
  image: ImmutablePropTypes.contains({
    _id: PropTypes.string.isRequired,
  }),
  state: ImmutablePropTypes.contains({
    isLoading: PropTypes.bool,
  }),
};

export default RepliesPage;
