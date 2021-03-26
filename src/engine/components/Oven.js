import React, { Component } from 'react';
import DeviceView from '../../views/DeviceView'
import { store } from '../..'
import { shouldResume } from '../BiscuitMachine'
import { put } from "redux-saga/effects";

export const minBakingTemperature = 220;
export const maxBakingTemperature = 240;
export const warmingTempInc = 40;
export const keepHeatingInc = 10;
export const sec = 1000;

export class Oven extends Component {
    constructor(props) {
        super(props);

        this.deviceName = this.constructor.name;
        this.warmUpInterval = null;
        this.heatingInterval = null;

        this.warmUp = this.warmUp.bind(this);
    }

    turnOff() {
        this.temperature = 0;
        this.temp.val = 0;
        clearInterval(this.warmUpInterval);
        clearInterval(this.heatingInterval);
    }

    warmUp(store) {
        var self = this;
        const machineState = store.getState()
        console.log('Oven is turned on');

        if (machineState.temperature >= minBakingTemperature) {
            return
        }

        self.warmUpInterval = setInterval(function () {
            if (store.getState().temperature >= minBakingTemperature) {
                console.log('Oven is ready');
                clearInterval(self.warmUpInterval);
                self.keepHeating()
            }
            else {
                store.dispatch(increaseTemp(warmingTempInc))
                console.log('Oven`s temperature is:' + store.getState().temperature);
            }
        }, sec);
    }

    keepHeating() {
        var self = this;
        var inc = keepHeatingInc;
        self.heatingInterval = setInterval(function () {
            console.log(store.getState())
            if (store.getState().temperature === minBakingTemperature ||
                store.getState().temperature === maxBakingTemperature) {
                inc *= -1;
            }

            store.dispatch(increaseTemp(inc))
        }, sec);
    }

    *process(store) {
        const machineState = store.getState()
        if (shouldResume(machineState)) {
            yield put({ type: "RESUME" })
        } else if (!machineState.pausedComponent) {
            yield new Promise((resolve, reject) => {
                if (machineState.temperature > maxBakingTemperature) {
                    setTimeout(function () {
                        console.log('Oven is overheating!');
                    }, 1000);
                } else {
                    setTimeout(() => {
                        console.log(`${machineState.processingComponent} processed the biscuit successfully`);
                        resolve(machineState.temperature);
                    }, 1000);
                }
            });
        }
    }

    render() {
        return (
            <DeviceView {...this.props} />
        );
    }
}

const increaseTemp = (temp) => ({ type: "INCREASE_TEMP", temp })
