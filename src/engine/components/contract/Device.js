import { observable } from "mobx"

export default class Device {

    constructor() {
        this.deviceName = null;
        this.isInProcess = observable.box(false);
    }

    processIt(deviceName, resolve, output, delay) {
        this.isInProcess.set(true);;
        setTimeout(() => {
            this.isInProcess.set(false);
            console.log(`${deviceName} processed the biscuit successfuly`);
            resolve(output);
        }, delay);
    }
}