import Device from './contract/Device';
import { pulseConst } from './Motor';

export class Extruder extends Device {
    constructor() {
        super();
        this.deviceName = this.constructor.name;
    }

    process(pulse, delay) {
        console.log("Extruder is called")
        return new Promise((resolve, reject) => {
            if (pulse === pulseConst) {
                setTimeout(function () {
                    console.log("Extruder is pulsed")
                    resolve();
                }, delay);
            } else {
                reject("Extruder is off")
            }
        });
    }

    
}