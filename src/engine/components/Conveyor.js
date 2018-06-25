import Device from './contract/Device';

export class Conveyor extends Device {
    constructor() {
        super();
        this.deviceName = this.constructor.name;
    }
}