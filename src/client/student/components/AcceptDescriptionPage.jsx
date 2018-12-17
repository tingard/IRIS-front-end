import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisButton from '../../common-resources/IrisButton';
import IrisSelect from '../../common-resources/IrisSelect';
import IrisAlert from '../../common-resources/IrisAlert';
import ImageDescription from '../../common-resources/imageDescription';
import ratingValues from '../../common-resources/ratingValues';
import '../styles/accept-description-page.scss';

class AcceptDescriptionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '2',
      didError: false,
    };
    this.acceptDescription = this.acceptDescription.bind(this);
  }

  acceptDescription() {
    this.props.acceptDescription(this.state.rating)
      .then(
        (m) => {
          console.log(m);
          if (m.error && !m.error.success) {
            this.setState({ didError: !m.error.success });
            return m;
          }
          this.props.history.push(`/images/descriptions/${this.props.message.get('image').get('_id')}`);
          return m;
        },
      )
      .catch(
        e => ((console.warn('accepting description failed', e), Promise.reject(e))),
      );
  }

  render() {
    if (this.props.isFetching || this.props.message === null) {
      return <p>Loading...</p>;
    }
    return (
      <div className="w3-container accept-description-page">
        <h1>Accept description</h1>
        <section role="group" className="w3-padding-16">
          <h2>Description</h2>
          <ImageDescription classification={this.props.message.get('classification')} />
        </section>
        <section role="group" aria-labelledby="w3-padding-16 accept-description-rating-header">
          <h2 id="accept-description-rating-header">
            How would you rate this description?
          </h2>
          <IrisSelect
            id="rating-input"
            label="Choose a rating"
            options={ratingValues}
            value={this.state.rating}
            onChange={val => this.setState({ rating: val })}
          />
          <IrisButton
            text="Submit"
            onClick={this.acceptDescription}
          />
          {this.state.didError ? (
            <IrisAlert
              title="Whoops, something went wrong..."
              message="Please try again later!"
              type="warning"
              onClose={() => this.setState({ didError: false })}
            />
          ) : null}
        </section>
      </div>
    );
  }
}

AcceptDescriptionPage.propTypes = {
  isFetching: PropTypes.bool,
  message: ImmutablePropTypes.contains({
    classification: ImmutablePropTypes.contains({
      imageType: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  acceptDescription: PropTypes.func,
};

export default AcceptDescriptionPage;
