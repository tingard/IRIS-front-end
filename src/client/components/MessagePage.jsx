import React from 'react';

import Message from './Message';

const MessagesPageButton = () => (
  <div className="w3-row">
    <div className="w3-row">
      <div className="w3-col s12">
        <h3>
          Your Messages
        </h3>
      </div>
    </div>
    <Message message="I am a message" date="2016-12-8 22:33:12" />
  </div>
);

export default MessagesPageButton;
