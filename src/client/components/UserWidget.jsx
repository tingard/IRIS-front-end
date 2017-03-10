import React from 'react';

const UserWidget = (props) => {
  const s = {
    margin: '4px',
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    maxWidth: '350px',
  };
  return (
    <div
      className="w3-row w3-hide-small"
      style={s}
    >
      <img src="./images/avatar.png" alt="user badge" />
      <div style={{ display: 'inline-block', position: 'relative', top: '-20px' }}>
        <div className="w3-row">
          <span style={{ opacity: '0.8' }}>{props.user.uname}</span>
        </div>
        <div className="w3-row">
          <span style={{ opacity: '0.8' }}>{props.user.title}</span>
        </div>
        <div className="w3-row">
          <span className="star on" />
          <span className="star on" />
          <span className="star on" />
          <span className="star half" />
          <span className="star" />
        </div>
      </div>
    </div>
  );
};

UserWidget.propTypes = {
  user: React.PropTypes.object,
};

export default UserWidget;
