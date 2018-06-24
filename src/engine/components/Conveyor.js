import Device from './contract/Device';

export class Conveyor extends Device {
    constructor() {
        super();
        this.deviceName = this.constructor.name;
    }

    process(pulse, delay) {
        return new Promise((resolve, reject) => {
            if (pulse === "pulse") {
                setTimeout((function () {
                    console.log("Extruder is pulsed")
                    resolve("pulse")
                }, delay))
            } else {
                reject("Extruder is off")
            }
        });
    }

    
}