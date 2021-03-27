import Biscuit from '../products/Biscuit';
import { motorFactory, extruderFactory, stamperFactory, ovenFactory } from './components';
import { minBakingTemp, maxBakingTemp } from './components/Oven';
import { put, select } from 'redux-saga/effects';
import * as actions from '../actions';
import { currentTemperature } from '../engine/utils'

class BiscuitMachine {
  constructor(build) {
    this.machineName = build.machineName;
    this.switch = build.switch;
    this.motor = build.motor;
    this.extruder = build.extruder;
    this.stamper = build.stamper;
    this.oven = build.oven;
    this.produceBiscuit = this.produceBiscuit.bind(this);
  }

  static get Builder() {
    class Builder {
      constructor(name) {
        this.machineName = name;
      }

      withMotor(motorInstance) {
        this.motor = motorInstance;
        return this;
      }

      withExtruder(extruderInstance) {
        this.extruder = extruderInstance;
        return this;
      }

      withStamper(stamperInstance) {
        this.stamper = stamperInstance;
        return this;
      }

      withOven(ovenInstance) {
        this.oven = ovenInstance;
        return this;
      }

      build() {
        return new BiscuitMachine(this);
      }
    }
    return Builder;
  }

  * produceBiscuit() {
    const currentTemp = yield select(currentTemperature);
    if (currentTemp < minBakingTemp || currentTemp > maxBakingTemp) {
      throw (`Biscuit is not cooked well.Current temperature is ${currentTemp}`);
    } else {
      yield put({ type: actions.PRODUCE_COOKIE });
      return new Promise((resolve) => {
        setTimeout(() => {
          const cookie = new Biscuit(true);
          console.log('New cookie is produced!', cookie);
          resolve(cookie);
        }, 0);
      });
    }
  }
}

export const biscuitMachineFactory = (machineName) => new BiscuitMachine.Builder(machineName)
  .withMotor(motorFactory())
  .withExtruder(extruderFactory())
  .withStamper(stamperFactory())
  .withOven(ovenFactory())
  .build();
