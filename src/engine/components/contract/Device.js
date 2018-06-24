export default class Device {

    constructor() {
        this.deviceName = null;
        this.inInProcess = false;
    }

    process(delay) {
        this.inInProcess = true;
        console.log("Processing by: " + this.deviceName);
        setTimeout(function () {
            console.log("Processed by: " + this.deviceName);
            this.inInProcess = false;
        }, delay);
    }
}