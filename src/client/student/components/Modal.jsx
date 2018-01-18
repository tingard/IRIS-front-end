import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ModalPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.modalRoot = document.getElementById(this.props.target);
  }
  componentDidMount() {
    if (this.modalRoot) this.modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    if (this.modalRoot) this.modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

ModalPortal.propTypes = {
  children: PropTypes.element.isRequired,
  target: PropTypes.string,
};

const modalStyle = {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'fixed',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

/* eslint-disable react/no-multi-comp */
class Modal extends React.Component {
  componentDidMount() {
    this.mainDiv.focus();
  }
  render() {
    const n = Math.random();
    return (
      <ModalPortal target="modal-root">
        <div
          style={modalStyle}
          role="document"
          aria-labelledby={`modal-${n}-head`}
          aria-describedby={`modal-${n}-body`}
          tabIndex={0}
          ref={(r) => { this.mainDiv = r; }}
        >
          <div>
            <h2 id={`modal-${n}-head`}>{this.props.title}</h2>
            <p id={`modal-${n}-body`}>{this.props.message}</p>
            <button onClick={this.props.handleHide}>Hide modal</button>
          </div>
        </div>
      </ModalPortal>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  handleHide: PropTypes.func,
};

export default Modal;
