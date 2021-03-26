import React, { Component } from 'react';
import { put } from "redux-saga/effects";
import DeviceView from '../../views/DeviceView'

export class Motor extends Component {
    constructor(props) {
        super(props);
        this.deviceName = this.constructor.name;
    }

    *process(machineState) {
        if (machineState.pausedComponent && machineState.pausedComponent === machineState.processingComponent) {
            yield put({ type: "RESUME" })
        } else if (!machineState.pausedComponent) {
            yield new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`${machineState.processingComponent} processed the biscuit successfully`);
                    resolve("pulse");
                }, 1000);
            });
        }
    }

    render() {
        return (
            <DeviceView deviceName={'MOTOR'} {...this.props} />
        );
    }
}