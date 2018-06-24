import Device from './contract/Device';
export const pulseConst = 'pulse';

export class Motor extends Device {
    constructor() {
        super();
        this.isOn = true;
        this.deviceName = this.constructor.name;
    }

    turnOff() {
        this.isOn = false;
    }

    turnOn() {
        this.isOn = true;
    }

    process(isOn, delay) {
        console.log("Motor is called")
        return new Promise((resolve, reject) => {
            if (isOn) {
                setTimeout(function () {
                    console.log("Motor is pulsed")
                    resolve(pulseConst)
                }, delay);

            } else {
                return;
                console.log("Motor is off")
            }
        });
    }
}