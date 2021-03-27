import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class BiscuitMachineView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="biscuit-machine-container">
            <h1>Biscuit Machine</h1>
                {this.props.children}
            </div>
        );
    }
}

BiscuitMachineView.propTypes = {
    children: PropTypes.any
};