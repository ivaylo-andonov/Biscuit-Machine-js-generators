import Device from './contract/Device';
export const pulseConst = 'pulse';

export class Motor extends Device {
    constructor() {
        super();
        this.isOn = true;
        this.pulse = pulseConst;
        this.deviceName = this.constructor.name;
    }

    turnOff() {
        this.isOn = false;
    }

    turnOn() {
        this.isOn = true;
    }

    process(isOn, machine, delay) {
        console.log("Motor is called")
        return new Promise((resolve, reject) => {
            if (isOn) {
                super.processIt('Motor', resolve, this.pulse, delay);
            } else {
                reject("Motor is off")
            }
        });
    }
}