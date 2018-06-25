import Device from './contract/Device';

export class Switch extends Device {
  constructor() {
    super();
    this.deviceName = this.constructor.name;
  }

  start(machine) {
    machine.start();
  }

  stop(machine) {
    machine.stop();
  }

  pause(machine) {
    machine.pause();
  }
}
