import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div id="iris-home-page">
    <div className="call-to-action">
      <div className="iris-narrow-page">
        <h1 style={{ fontSize: '2em' }}>
          <em><q>A picture is worth a thousand words</q></em>
        </h1>
        <h1>
          Let's make IRIS worth ten thousand pictures.
        </h1>
        <Link
          className="iris-button action"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="iris-button secondary"
          to="/create"
        >
          Sign up to IRIS
        </Link>
      </div>
    </div>
    <section aria-label="about IRIS" id="home-page-about-iris" className="iris-narrow-page">
      <div className="column-info-panel three-column">
        <h3 className="grid-header1">What is IRIS?</h3>
        <p className="grid-content" data-index="1">
          IRIS is an application which connects blind and visually impaired students
          to a network of volunteers with experience in different subject areas.
        </p>
        <h3 className="grid-header2">Why is it useful?</h3>
        <p className="grid-content2" data-index="2">
          A student can upload an image from their course, and volunteers with
          expertise in that subject area provide a subject-specific description
          of that image.
        </p>
        <h3 className="grid-header3">What is the end result?</h3>
        <p className="grid-content3" data-index="3">
          The description is then sent to the student in an fully accessible form,
          making sure nobody is left in the dark
        </p>
      </div>
      <div className="spacer hline" />
    </section>
    <section aria-labelledby="home-page-how-can-we-help" className="iris-narrow-page">
      <h2 id="home-page-how-can-we-help">How can we help?</h2>
      <div className="spacer-small" />
      <div className="column-info-panel two-column">
        <h3 className="grid-header1">For visually impaired students</h3>
        <p className="grid-content1">
          IRIS is currently undergoing beta testing, meaning we are offering the
          service for free while we work with our students and volunteers to
          create the best possible experience.
        </p>
        <Link
          to="/create/student"
          className="iris-button tertiary grid-action1"
        >
            Sign up as a student
        </Link>
        <div className="spacer-small" />
        <h3 className="grid-header2">For institutions</h3>
        <p className="grid-content2">
          We are keen to partner with schools, colleges and other places of
          learning to provide multiple licences and ensure your students
          receive the best education they can.
        </p>
        <Link
          to="/create/licence-owner"
          className="iris-button tertiary grid-action2"
        >
          Sign up as a licence-owner
        </Link>
      </div>
      <div className="spacer hline" />
    </section>
    <section aria-label="call for volunteers" className="column-info-panel">
      <h2>We need volunteers!</h2>
      <p>
        If you are a sighted volunteer who wishes to help describe images for
        visually impaired students (and have a little experience with sciency-pictures)
        we'd love to have you on board.
      </p>
      <Link
        to="/create/volunteer"
        className="iris-button action"
      >
          Sign up as a volunteer
      </Link>
    </section>
    <div className="spacer" />
  </div>
);

export default HomePage;
