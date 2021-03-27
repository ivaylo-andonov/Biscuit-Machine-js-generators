import { put } from 'redux-saga/effects';
import { shouldResume } from '../utils';
import { updateTemp, startConveyor } from '../../actions';
import { store } from '../..';

export const minBakingTemperature = 220;
export const maxBakingTemperature = 240;
export const warmingTempInc = 40;
export const keepHeatingInc = 10;
export const sec = 1000;

export class Oven {
  constructor() {
    this.warmUpInterval = null;
    this.heatingInterval = null;
    this.warmUp = this.warmUp.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.keepHeating = this.keepHeating.bind(this);
    this.process = this.process.bind(this);
  }

  turnOff() {
    clearInterval(this.warmUpInterval);
    clearInterval(this.heatingInterval);
  }

  warmUp() {
    const self = this;
    console.log('Oven warming up is turned on');

    if (store.getState().temperature >= minBakingTemperature) {
      store.dispatch(startConveyor());
    }

    self.warmUpInterval = setInterval(() => {
      if (store.getState().temperature >= minBakingTemperature) {
        console.log('Oven is ready');
        clearInterval(self.warmUpInterval);
        store.dispatch(startConveyor());
        self.keepHeating(store);
      } else {
        store.dispatch(updateTemp(warmingTempInc));
        console.log(`Oven\`s temperature is: ${store.getState().temperature}`);
      }
    }, sec);
  }

  keepHeating() {
    const self = this;
    let inc = keepHeatingInc;
    self.heatingInterval = setInterval(() => {
      if (store.getState().temperature === minBakingTemperature
                || store.getState().temperature === maxBakingTemperature) {
        inc *= -1;
      }

      store.dispatch(updateTemp(inc));
    }, sec);
  }

  * process(store) {
    const machineState = store.getState();
    if (shouldResume(machineState)) {
      yield put({ type: 'RESUME' });
    } else if (!machineState.pausedComponent) {
      yield new Promise((resolve) => {
        if (machineState.temperature > maxBakingTemperature) {
          setTimeout(() => {
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
}
