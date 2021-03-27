import Biscuit from '../products/Biscuit';
import * as Devices from './components';
import { minBakingTemperature, maxBakingTemperature } from './components/Oven';
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

  produceBiscuit(store) {
    const temperature = store.getState();
    if (temperature < minBakingTemperature || temperature > maxBakingTemperature) {
      throw (`Biscuit is not cooked well.Temperature is${temperature}`);
    } else {
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

export const biscuitMachineFactory = () => new BiscuitMachine.Builder('The sweetest cookies')
  .withMotor(new Devices.Motor())
  .withExtruder(new Devices.Extruder())
  .withStamper(new Devices.Stamper())
  .withOven(new Devices.Oven())
  .build();
