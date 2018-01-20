import React from 'react';
import PropTypes from 'prop-types';

class UtypeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    if (this.select.value !== 'none') {
      this.props.history.push(`/sign-up/${this.select.value}`);
    }
  }
  render() {
    const options = [
      { value: 'none', label: 'I\'m a...' },
      { value: 'student', label: 'I\'m a student' },
      { value: 'volunteer', label: 'I\'m a volunteer' },
    ];
    return (
      <div className="w3-row w3-display-middle w3-animate-opacity">
        <div className="w3-col m6">
          <p className="w3-right-align w3-margin-right">
            Welcome to IRIS! Are you a visually impaired student who needs help describing images,
            or a volunteer who wants to help describe images?
          </p>
        </div>
        <div className="w3-col m6">
          <div className="w3-margin-left w3-display-container" style={{ height: '150px' }}>
            <select
              ref={(r) => { this.select = r; }}
              name="subject-filter-dropdown"
              onChange={this.handleChange}
              className="w3-display-middle select-style large"
            >
              {options.map(
                o => <option value={o.value} key={`sign-up-select-${o.value}`}>
                  {o.label}
                </option>,
              )}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

UtypeSelect.propTypes = {
  history: PropTypes.object,
};

export default UtypeSelect;
