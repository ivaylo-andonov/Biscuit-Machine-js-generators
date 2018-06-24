import Device from './contract/Device';
import { pulseConst } from './../../engine/components/Motor';

export class Stamper extends Device {
    constructor() {
        super();
        this.deviceName = this.constructor.name;

    }

    process(pulse, delay) {
        console.log("Stamper is called")
        return new Promise((resolve, reject) => {
            if (pulse === pulseConst) {
                setTimeout(function () {
                    console.log("Stamper is pulsed")
                    resolve()
                }, delay);
            } else {
                reject("Stamper is off")
            }
        });
    }
}