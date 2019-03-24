import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import IrisLoader from '../../../common-resources/IrisLoader';
import LicencesPanel from './LicencesPanel';
import ImagePanel from './ImagePanel';
import ContactPanel from './ContactPanel';
import FeedbackPanel from './FeedbackPanel';

class HomePage extends React.Component {
  componentDidMount() {
  }

  render() {
    if (this.props.user.get('state').get('isStale')) {
      return <IrisLoader />;
    }
    return (
      <section className="home-page">
        <LicencesPanel
          licences={this.props.user.get('licences')}
          state={this.props.user.get('state')}
          history={this.props.history}
        />
        <ImagePanel
          state={this.props.images.get('state')}
          images={this.props.images.get('images')}
          history={this.props.history}
        />
        <FeedbackPanel />
        <ContactPanel />
      </section>
    );
  }
}

HomePage.propTypes = {
  user: ImmutablePropTypes.contains({
    state: ImmutablePropTypes.contains({
      isStale: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired,
    }),
    name: PropTypes.string.isRequired,
    licences: ImmutablePropTypes.contains({
      licences: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          inUse: PropTypes.bool,
        }),
      ),
    }),
  }),
  images: ImmutablePropTypes.contains({
    state: ImmutablePropTypes.contains({
      isStale: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired,
    }),
    images: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        url: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
      }),
    ),
  }),
  /* eslint-disable react/forbid-prop-types */
  history: PropTypes.object.isRequired,
};

export default HomePage;
