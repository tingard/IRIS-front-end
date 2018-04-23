import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div id="iris-home-page">
    <div className="iris-narrow-page">
      <div style={{ width: '100%', height: '100px' }} />
      <h1>A picture is worth a thousand words</h1>
      <p>
        Let's make IRIS worth ten thousand pictures.
      </p>
      <Link
        className="iris-button action"
        to="/login"
      >
        Login
      </Link>
      <Link
        className="iris-button secondary"
        to="/login"
      >
        Sign up to IRIS
      </Link>
      <div style={{ width: '100%', height: '200px' }} />
      <h2>What is IRIS?</h2>
      <div className="image-panel">
        <p>
          IRIS is an application which connects blind and visually impaired students
          to a network of volunteers with experience in different subject areas.
        </p>
      </div>
      <div className="image-panel">
        <p>
          A student uploads an image from their course, and volunteers provide a
          subject-specific description of that image.
        </p>
      </div>
    </div>
  </div>
);

export default HomePage;
