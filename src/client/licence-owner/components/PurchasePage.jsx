import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import IrisButton from '../../common-resources/IrisButton';

const PurchasePage = props => (
  <div className="licence-owner-page">
    <div className="panel">
      <h3>Purchase a licence</h3>
      {!props.user.get('last4') ? (
        <React.Fragment>
          <p>
            To purchase an IRIS licence, please email us at&nbsp;
            <a href="mailto:contact@grapheel.com?subject=Purhase an IRIS licence">
              contact@grapheel.com
            </a>
          </p>
          <p>
            Please use the email-address you use to login to IRIS.
          </p>
        </React.Fragment>
      ) : null}
      {props.user.get('last4') ? (
        <React.Fragment>
          <p>You have registered a card with IRIS</p>
          <p>{`Card number ends in ${props.user.get('last4')}`}</p>
          <p>If this is incorrect please send us an email at&nbsp;
            <a href="mailto:contact@grapheel.com">
              contact@grapheel.com
            </a>
          </p>
        </React.Fragment>
      ) : (
        <p>You have not yet registered a card with IRIS</p>
      )}
      <IrisButton type="primary" onClick={props.purchaseLicence} text="Purchase a Licence" disabled={!props.user.get('last4')} />
      <Link to="/licence-owner" className="iris-button tertiary">Go back</Link>
    </div>
  </div>
);

PurchasePage.propTypes = {
  user: ImmutablePropTypes.contains({
    last4: PropTypes.string,
  }),
  purchaseLicence: PropTypes.func.isRequired,
};

export default PurchasePage;
