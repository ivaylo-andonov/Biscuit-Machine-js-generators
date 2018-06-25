import Device from './contract/Device';
export const pulseConst = 'pulse';

export class Motor extends Device {
    constructor() {
        super();
        this.isOn = true;
        this.pulse = null;
        this.deviceName = this.constructor.name;
    }

    turnOff() {
        this.isOn = false;
        this.pulse = null;
    }

    turnOn() {
        this.isOn = true;
        this.pulse = 'pulse';
    }

    process(isOn, machine, delay) {
        console.log("Motor is called")
        return new Promise((resolve, reject) => {
            if (isOn && this.isOn) {
                super.processIt('Motor', resolve, this.pulse, delay);
            } else {
                reject("Motor is off")
            }
        });
    }
}