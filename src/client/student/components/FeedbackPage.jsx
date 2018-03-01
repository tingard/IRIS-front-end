import React from 'react';

const FeedbackPage = () => (
  <div className="w3-container">
    <h1>Leave Feedback</h1>
    <div className="w3-panel">
      <p>
        IRIS is currently in a testing stage, and we value your feedback. Please email us
        at <a href="mailto:contact@grapheel.com">contact@grapheel.com</a> or use our GitHub
        issue tracker to leave comments, bug reports or feature suggestions!
      </p>
      <a
        href="https://github.com/grapheel/iris"
        rel="noopener noreferrer nofollow"
        target="_blank"
        className="w3-button w3-border w3-round w3-cyan w3-hover-black"
      >
        Go to issue tracker
      </a>
    </div>
  </div>
);

export default FeedbackPage;
