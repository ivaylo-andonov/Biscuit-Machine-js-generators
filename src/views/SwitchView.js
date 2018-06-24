import React, { Component } from 'react';

export class SwitchView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="biscuit-switch">
        <button onClick={this.props.onStart}>Start</button>
        <button onClick={this.props.onPause}>Pause</button>
        <button onClick={this.props.onStop}>Stop</button>
      </div>
    );
  }
}
