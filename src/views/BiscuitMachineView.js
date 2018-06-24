import React, { Component } from 'react';

export class BiscuitMachineView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="biscuit-machine-container">
                {this.props.children}
            </div>
        );
    }
}