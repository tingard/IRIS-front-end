import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IrisButton from '../../../common-resources/IrisButton';

class UtypeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      alertInvalidSelection: false,
    };
  }
  handleChange() {
    if (this.select.value !== 'none') {
      this.props.history.push(`/create/${this.select.value}`);
    } else {
      this.setState({ alertInvalidSelection: true });
    }
  }
  render() {
    const options = [
      { value: 'none', label: 'I\'m a...' },
      { value: 'student', label: 'I\'m a student' },
      { value: 'volunteer', label: 'I\'m a volunteer' },
      { value: 'licence-owner', label: 'I want to buy IRIS licences for others' },
    ];

    return (
      <div className="w3-row w3-display-middle w3-animate-opacity">
        <div className="w3-col m6">
          <p className="w3-right-align w3-margin-right">
            Welcome to IRIS! Are you a visually impaired student who needs help describing images,
            or a volunteer who wants to help describe images?
          </p>
        </div>
        <div className="w3-col m6" style={{ marginTop: '1em' }}>
          <div className="w3-margin-left" style={{ height: '150px' }}>
            <div className="w3-row">
              <select
                ref={(r) => { this.select = r; }}
                name="subject-filter-dropdown"
                className={`select-style ${
                  this.state.alertInvalidSelection ? 'invalid' : ''
                }`}
              >
                {options.map(
                  o => (
                    <option value={o.value} key={`sign-up-select-${o.value}`}>
                      {o.label}
                    </option>
                  ),
                )}
              </select>
              {
                this.state.alertInvalidSelection ? (
                  <div role="alert">
                    <span className="invalid-text">Please select an option</span>
                  </div>
                ) : null
              }
            </div>
            <div className="w3-row w3-padding-16">
              <IrisButton
                onClick={this.handleChange}
                text="Next"
                className="w3-bar"
              />
            </div>
            <Link to="/" style={{ float: 'right' }}>IRIS home</Link>
          </div>
        </div>
      </div>
    );
  }
}

UtypeSelect.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default UtypeSelect;
