import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const CardPage = (props) => {
  console.log(props);
  console.log(props.card != null);
  return (
    props.card != null ? (
      <div className="w3-container">
        <div className="w3-row">
          <div className="w3-col s4">
            <div className="grapheel-image-card">
              <div className="image-card-image-wrapper">
                <div
                  className="image-card-image"
                  style={{ backgroundImage: `url(${props.card.imageUrl})` }}
                  alt=""
                />
              </div>
              <div className="image-card-message">
                {props.card.message.length > 60 ? `${props.card.message.slice(0, 50)}...` : props.card.message}
              </div>
            </div>
          </div>
          <div className="w3-col s8">
            <p>{props.match.params.cardId}</p>
            <p>{props.card.id}</p>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    )
  );
};


CardPage.propTypes = {
  match: PropTypes.object,
  // user: PropTypes.object,
  card: PropTypes.object,
};
export default CardPage;
