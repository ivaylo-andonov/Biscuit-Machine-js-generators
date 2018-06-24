import Device from './contract/Device';
import { pulseConst } from './../../engine/components/Motor';

export class Stamper extends Device {
    constructor() {
        super();
        this.deviceName = this.constructor.name;

    }

    process(pulse,machine, delay) {
        console.log("Stamper is called")
        return new Promise((resolve, reject) => {
            if (pulse === pulseConst && machine.motor.isOn) {
                super.processIt('Stamper', resolve, null, delay);
            } else {
                reject("Stamper is off")
            }
        });
    }
}