import React from 'react';
import PropTypes from 'prop-types';

export const SwitchView = ({ onStart, onPause, onStop }) => {
  return (
    <div className="biscuit-switch">
      <button onClick={onStart}>Start</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onStop}>Stop</button>
    </div>
  );
};

SwitchView.propTypes = {
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onPause: PropTypes.func
};
