import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Description from './Description';

const DescriptionsPage = (props) => {
  if (!props.isFiltered || props.invalidId) {
    return <Redirect to="/volunteer/images" />;
  }
  if (props.isFetching) return <div>Loading Spinner</div>;
  return (
    <div
      className="w3-container w3-animate-opacity"
    >
      <h1 id="messages-header">{(
          props.isFiltered ?
            `Descriptions for your image tagged ${props.messages.get(0).get('image').get('note')}` :
            'Your Messages'
        )}
      </h1>
      {
        props.messages.size > 0 ? (
          <ul
            style={{ listStyle: 'none', paddingLeft: 0 }}
            aria-label="Descriptions list"
            role="grid"
            aria-live="polite"
            aria-relevant="additions removals"
          >
            {
              props.messages.map(m => (
                <li key={m.get('_id')} role="row">
                  <Description {...m.toObject()} acceptDescription={props.acceptDescription} />
                </li>
              ))
            }
          </ul>
        ) : (
          <p>{'This image doesn\'t have any descriptions yet'}</p>
        )
      }
      <Link
        to="/student/images"
        className="w3-margin-top"
      >
        Back to images
      </Link>
    </div>
  );
};

DescriptionsPage.propTypes = {
  isFetching: PropTypes.bool,
  isFiltered: PropTypes.bool,
  invalidId: PropTypes.bool,
  messages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      _id: PropTypes.string,
      messages: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          message: PropTypes.string,
        }),
      ),
    }),
  ),
  acceptDescription: PropTypes.func,
};

export default DescriptionsPage;
