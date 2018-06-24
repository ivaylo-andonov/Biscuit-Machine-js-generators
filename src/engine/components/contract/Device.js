export default class Device {

    constructor() {
        this.deviceName = null;
        this.isInProgress = false;
    }

    processIt(deviceName, resolve, output, delay) {
        this.isInProgress = true;
        setTimeout(function () {
            this.isInProgress = false;
            console.log(`${deviceName} processed the biscuit successfuly`);
            resolve(output);
        }, delay);
    }
}