import React from 'react';
import { Link } from 'react-router-dom';

const SelectPage = () => (
  <div className="login-container" key="select-page">
    <Link
      className="login-option"
      to="/login/student"
      aria-label="login as a student"
    >
      <div className="panel">
        <div className="image-holder">
          <img src="https://i.imgur.com/Ce3hu9g.png" alt="A cartoon mortarboard" />
        </div>
        <h2>VIP student</h2>
        <p>
          If you are a visually impaired student who wants to use IRIS to
          generate descriptions of images, click here
        </p>
      </div>
    </Link>
    <Link
      className="login-option"
      to="/login/volunteer"
      aria-label="login as a volunteer"
    >
      <div className="panel">
        <div className="image-holder">
          <img src="https://i.imgur.com/8rS4yzv.png" alt="A cartoon pair of glasses" />
        </div>
        <h2>Sighted Volunteer</h2>
        <p>
          If you are a volunteer who wants to help describe images for visually
          impaired students, click here
        </p>
      </div>
    </Link>
    <Link
      className="login-option"
      to="/login/licence-owner"
      aria-label="login as a licence-manager"
    >
      <div className="panel">
        <div className="image-holder">
          <img src="https://i.imgur.com/c3lmqEB.png" alt="A cartoon tie" />
        </div>
        <h2>Licence manager</h2>
        <p>
          If you manage and distribute licences for IRIS, click here.
        </p>
      </div>
    </Link>
  </div>
);

export default SelectPage;
