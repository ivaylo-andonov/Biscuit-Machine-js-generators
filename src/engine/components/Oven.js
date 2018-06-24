import Device from './contract/Device';

export const minBakingTemperature = 220;
export const maxBakingTemperature = 240;

export class Oven extends Device {
    constructor() {
        super();
        
        this.temperature = 0;
        this.warmUpInterval = null;
        this.isHeatingElementOn = false;
        this.deviceName = this.constructor.name;

        this.turnOn = this.turnOn.bind(this);
    }

    turnOff() {

    }

    turnOn(callback) {
        var self = this;
        console.log("Oven is turned on");

        if (self.temperature >= minBakingTemperature) {
            callback(true);
            return;
        }

        self.warmUpInterval = setInterval(function () {
            if (self.temperature >= minBakingTemperature) {
                clearInterval(self.warmUpInterval);
                self.isHeatingElementOn = false;
                callback(true);
                console.log("Oven is ready");
            }
            else {
                self.temperature += 50;
                console.log("Oven`s temperature is:" + self.temperature);
            }
        }, 1000);
    }

    process(isHeatingElementOn, delay) {
        console.log("Oven is called");
        this.isHeatingElementOn = isHeatingElementOn;
        isHeatingElementOn ? this.temperature += 50 : this.temperature;

        return new Promise((resolve, reject) => {
            if (isHeatingElementOn && this.temperature > maxBakingTemperature) {
                setTimeout(function () {
                    console.log("Oven is overheating!")
                    reject("Oven is overheated")
                }, delay);
            } else {
                setTimeout(function () {
                    console.log("Oven is baking")
                    resolve("Bisquit")
                }, delay);
            }
        });
    }

}
