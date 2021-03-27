import React from 'react';
import PropTypes from 'prop-types';

export const SwitchView = (props) => {
  return (
    <div className="biscuit-switch">
      <button onClick={props.onStart}>Start</button>
      <button onClick={props.onPause}>Pause</button>
      <button onClick={props.onStop}>Stop</button>
    </div>
  );
};

SwitchView.propTypes = {
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onPause: PropTypes.func
};
