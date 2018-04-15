import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import moment from 'moment';
import IrisButton from '../../commonResources/IrisButton';
import ImageDescription from '../../commonResources/imageDescription';

const Description = (props) => {
  const m = props.messages.get(props.messages.size - 1);
  console.log(props.messages.size);
  return (
    <div role="gridcell" aria-live="polite" className="w3-border-left w3-panel">
      <div role="group">
        <div className="w3-row w3-padding-16">
          <ImageDescription classification={props.classification} />
        </div>
        <p>
          Received <span className="mf-disable">{moment(props.startDate).fromNow()}</span>.
        </p>
        {props.messages.size > 1 ?
          <p className="mf-disable">
            This conversation has&nbsp;
            <span className="mf-disable">
              {Math.max(props.messages.size - 1, 0)} message{props.messages.size > 2 ? 's. ' : '. '}
            </span>
            Most recent message&nbsp;
            <span className="mf-disable">
              {moment(m.get('sendDate')).fromNow()}
            </span>
          </p> : ''
        }
        <IrisButton
          className="w3-margin-right"
          onClick={() => props.acceptDescription(props._id)}
          type="primary"
          text="Accept this description"
        />
        <Link
          to={`/messages/${props._id}`}
          className="w3-margin-right iris-button secondary"
        >
          {props.messages.size > 1 ? 'Read all messages in this conversation' : 'Ask a question about this description'}
        </Link>
      </div>
    </div>
  );
};

Description.propTypes = {
  _id: PropTypes.string,
  messages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      message: PropTypes.string,
    }),
  ),
  startDate: PropTypes.string,
  acceptDescription: PropTypes.func,
  classification: PropTypes.object,
};

export default Description;
