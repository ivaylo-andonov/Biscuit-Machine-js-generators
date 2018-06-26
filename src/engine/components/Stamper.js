import Device from './contract/Device';
import { pulseConst } from './../../engine/components/Motor';

export class Stamper extends Device {
    constructor() {
        super();
        this.deviceName = this.constructor.name;

    }

    process(pulse, isMachineOn, isPaused, delay) {
        console.log('Stamper is called')
        return new Promise((resolve, reject) => {
            if (pulse === pulseConst && isMachineOn) {
                super.processIt('Stamper', resolve, null, delay);
            } else if (isPaused) {
                reject('Machine is paused');
            }
            else if (!isMachineOn) {
                reject('Machine is off');
            }
        });
    }
}