import { put, select } from 'redux-saga/effects';
import { shouldResume, shouldChangeHeatingDir } from '../utils';
import { oneSec, keepHeatingInc, warmingTempInc, maxBakingTemp } from '../../config';
import * as actions from '../../actions'
import { store } from '../..';

class Oven {
  constructor() {
    this.warmUpInterval = null;
    this.heatingInterval = null;
    this.inc = keepHeatingInc;

    this.warmUp = this.warmUp.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.keepHeating = this.keepHeating.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  turnOff() {
    clearInterval(this.warmUpInterval);
    clearInterval(this.heatingInterval);
  }

  warmUp(minBakingTemp, maxBakingTemp) {
    const self = this;
    console.log('Oven warming up is turned on');

    self.warmUpInterval = setInterval(() => {
      const currentTemp = store.getState().temperature;   

      if (currentTemp >= minBakingTemp) {
        console.log('Oven is ready');
        clearInterval(self.warmUpInterval);

        store.dispatch(actions.startConveyor());
        self.keepHeating(minBakingTemp, maxBakingTemp);
      } else {
        store.dispatch(actions.updateTemp(warmingTempInc));
      }
    }, oneSec / 2);
  }

  keepHeating(minBakingTemp, maxBakingTemp) {
    const self = this;

    self.heatingInterval = setInterval(() => {
      const currentTemp = store.getState().temperature;

      if (shouldChangeHeatingDir(currentTemp, minBakingTemp, maxBakingTemp, this.inc)) {
        this.inc *= -1;
      }

      store.dispatch(actions.updateTemp(this.inc));
    }, oneSec);
  }

  * trigger() {
    yield put({ type: actions.TRIGGER_OVEN });

    const { currentComponent, pausedComponent, temperature } = yield select();

    if (shouldResume({ pausedComponent, currentComponent })) {
      yield put({ type: actions.RESUME });
    } else if (!pausedComponent) {
      yield new Promise((resolve) => {
        if (temperature > maxBakingTemp) {
          setTimeout(() => {
            console.log('Oven is overheating!');
          }, oneSec);
        } else {
          setTimeout(() => {
            console.log(`${currentComponent} processed the biscuit successfully`);
            resolve(temperature);
          }, oneSec);
        }
      });
    }
  }
}

export const ovenFactory = () => new Oven();