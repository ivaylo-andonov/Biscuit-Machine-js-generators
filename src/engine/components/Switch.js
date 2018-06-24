import Device from './contract/Device';

export class Switch extends Device {
  constructor() {
    super();
    this.deviceName = this.constructor.name;
  }

  doProcess() {
    super.process();
  }
}
