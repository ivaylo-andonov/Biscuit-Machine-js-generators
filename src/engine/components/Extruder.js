import Device from './contract/Device';
import { pulseConst } from './Motor';

export class Extruder extends Device {
    constructor() {
        super();
        this.deviceName = this.constructor.name;
    }

    process(pulse, isMachineOn, isPaused, delay) {
        console.log('Extruder is called');
        return new Promise((resolve, reject) => {
            if (pulse === pulseConst && isMachineOn) {
                super.processIt('Extruder', resolve, null, delay);
            } else if (isPaused) {
                console.log('Paused')
            } else {
                reject('Machine is off');
            }
        });
    }
}