import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IrisButton from '../../../common-resources/IrisButton';
import IrisSelect from '../../../common-resources/IrisSelect';

class UtypeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      alertInvalidSelection: false,
      userType: 'none',
    };
  }
  handleChange() {
    if (this.state.userType !== 'none') {
      this.props.history.push(`/create/${this.state.userType}`);
    } else {
      this.setState({ alertInvalidSelection: true });
    }
  }
  render() {
    const options = [
      { value: 'none', text: 'I\'m a...' },
      { value: 'student', text: 'I\'m a student' },
      { value: 'volunteer', text: 'I\'m a volunteer' },
      { value: 'licence-owner', text: 'I want to buy IRIS licences for others' },
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
              <IrisSelect
                id="resetPwd-utype"
                label=""
                options={options}
                value={this.state.userType}
                onChange={val => this.setState({ userType: val })}
              />
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
