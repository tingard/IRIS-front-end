import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LicencesPanel from './LicencesPanel';

class HomePage extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <section className="w3-container home-page">
        <LicencesPanel
          licences={this.props.licences.get('licences')}
          state={this.props.licences.get('state')}
        />
        <div className="panel image-feed">
          <h2>Your image feed</h2>
        </div>
        <div className="panel feedback">
          <h2>Feedback</h2>
        </div>
        <div className="panel contact-us">
          <h2>Contact Us</h2>
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  user: ImmutablePropTypes.contains({
    name: PropTypes.string.isRequired,
  }),
  licences: ImmutablePropTypes.contains({
    licences: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        inUse: PropTypes.bool,
      }),
    ),
  }),
};

export default HomePage;
