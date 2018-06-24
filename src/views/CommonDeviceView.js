import React, { Component } from 'react';

export class CommonDeviceView extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className={this.props.device.deviceName}>
                <div>{this.props.device.deviceName}</div>
                <div>{this.props.device.isInProcess}</div>
            </div>
        );
    }
}