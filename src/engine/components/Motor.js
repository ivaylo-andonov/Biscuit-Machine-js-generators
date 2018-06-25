import Device from './contract/Device';
export const pulseConst = 'pulse';

export class Motor extends Device {
    constructor() {
        super();
        this.pulse = pulseConst;
        this.deviceName = this.constructor.name;
    }

    process(isMachineOn, isPaused, delay) {
        console.log('Motor is called')
        return new Promise((resolve, reject) => {
            if (isMachineOn) {
                super.processIt('Motor', resolve, this.pulse, delay);
            } else if (isPaused) {
                console.log('Paused')
            } else {
                reject('Machine is off');
            }
        });
    }
}