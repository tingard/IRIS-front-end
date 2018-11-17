import React from 'react';

const IssueTrackerPrompt = () => (
  <div className="w3-row w3-card-2">
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
        className="iris-button action"
      >
        Go to issue tracker
      </a>
    </div>
  </div>
);

export default IssueTrackerPrompt;
