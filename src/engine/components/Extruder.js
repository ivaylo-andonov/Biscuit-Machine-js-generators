import React, { Component } from 'react';
import { put } from "redux-saga/effects";
import { DeviceView } from '../../views/DeviceView'
import { shouldResume } from '../BiscuitMachine'

export class Extruder extends Component {

    *process(store) {
        const machineState = store.getState();
        if (shouldResume(machineState)) {
            yield put({ type: "RESUME" })
        } else if (!machineState.pausedComponent) {
            yield new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`${machineState.processingComponent} processed the biscuit successfully`);
                    resolve("pulse");
                }, 1000);
            });
        }
    }

    render() {
        return (
            <DeviceView {...this.props} />
        );
    }
}