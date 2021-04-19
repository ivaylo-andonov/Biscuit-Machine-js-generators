import React from 'react';
import PropTypes from 'prop-types';

export const Switch = ({ onStart, onPause, onStop }) =>
  <div className="biscuit-switch">
    <button onClick={onStart}>Start</button>
    <button onClick={onPause}>Pause</button>
    <button onClick={onStop}>Stop</button>
  </div>

Switch.propTypes = {
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onPause: PropTypes.func
};
