import React from 'react';
import PropTypes from 'prop-types';

const StarBox = (props) => {
  const ret = Array(3);
  let n = props.n;
  for (let i = 0; i < 3; i++) {
    if (n > 1) {
      ret[i] = <span className="star on" key={Math.random()} />;
    } else if (n > 0) {
      ret[i] = <span className="star half" key={Math.random()} />;
    } else {
      ret[i] = <span className="star" key={Math.random()} />;
    }
    n--;
  }
  console.log(ret);
  return (<div style={{ position: 'relative' }}>{ret}</div>);
};

StarBox.propTypes = {
  n: PropTypes.number,
};

export default StarBox;
