import Device from './contract/Device';
import { pulseConst } from './Motor';

export class Extruder extends Device {
    constructor() {
        super();
        this.deviceName = this.constructor.name;
    }

    process(pulse,machine, delay) {
        console.log("Extruder is called")
        return new Promise((resolve, reject) => {
            if (pulse === pulseConst && machine.motor.isOn) {
                super.processIt('Extruder', resolve, null, delay);
            } else {
                reject("Extruder is off")
            }
        });
    }


}