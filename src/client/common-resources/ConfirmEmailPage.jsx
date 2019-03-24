// Page which sends confirmation to API then redirects homePage
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ConfirmEmailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingForConfirmation: true,
      successfulConfirmation: true,
    };
  }

  componentWillMount() {
    this.props.confirmEmail(this.props.match.params.id)
      .then(
        (result) => {
          console.log(result);
          return this.setState({
            waitingForConfirmation: false,
            successfulConfirmation: result.res && result.res.success,
          });
        },
      ).catch(
        () => this.setState({
          waitingForConfirmation: false,
          successfulConfirmation: false,
        }),
      );
  }

  render() {
    if (this.state.waitingForConfirmation) {
      return (
        <div
          className="w3-container"
          style={{ maxWidth: '1000px', margin: 'auto', paddingTop: '40px' }}
        >
          <h1>Confirm Email</h1>
          <div role="status" className="w3-padding-16">
            <p>Confirming your email on the server, please wait</p>
          </div>
        </div>
      );
    }
    return (
      <div
        className="w3-container"
        style={{ maxWidth: '1000px', margin: 'auto', paddingTop: '40px' }}
      >
        <h1>Confirm Email</h1>
        <div role="status" className="w3-padding-16">
          {this.state.successfulConfirmation ? (
            <React.Fragment>
              <p>Thanks for confirming your email, you can now use IRIS fully!</p>
              <Link to="/" className="iris-button primary">
                Go to the IRIS HomePage
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>
                Something went wrong and we couldn't confirm your email,
                please email us and we will help fix this issue!
              </p>
              <a
                href="mailto:contact@grapheel.com?subject=Problem%20creating%20account"
                className="iris-button action w3-margin-right"
              >
                Email contact@grapheel.com
              </a>
              <Link to="/" className="iris-button primary">
                Go to the IRIS HomePage
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

ConfirmEmailPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  confirmEmail: PropTypes.func,
};

export default ConfirmEmailPage;
