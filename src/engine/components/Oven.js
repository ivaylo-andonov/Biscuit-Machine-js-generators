import Device from './contract/Device';
import { observable } from 'mobx';

export const minBakingTemperature = 220;
export const maxBakingTemperature = 240;
export const warmingTempInc = 40;
export const keepHeatingInc = 10;
export const sec = 1000;

export class Oven extends Device {
    constructor() {
        super();

        this.temperature = 0;
        this.temp = observable({ val: 0 });
        this.warmUpInterval = null;
        this.heatingInterval = null;
        this.deviceName = this.constructor.name;

        this.turnOn = this.turnOn.bind(this);
    }

    turnOff() {
        this.temperature = 0;
        this.temp.val = 0;
        clearInterval(this.warmUpInterval);
        clearInterval(this.heatingInterval);
    }

    turnOn(callback) {
        var self = this;
        console.log('Oven is turned on');

        if (self.temperature >= minBakingTemperature) {
            callback(true);
            return;
        }

        self.warmUpInterval = setInterval(function () {
            if (self.temperature >= minBakingTemperature) {
                console.log('Oven is ready');
                clearInterval(self.warmUpInterval);
                callback(true);
                self.keepHeating()
            }
            else {
                self.temperature += warmingTempInc;
                self.temp.val = self.temperature;
                console.log('Oven`s temperature is:' + self.temperature);
            }
        }, sec);
    }

    keepHeating() {
        var self = this;
        var inc = keepHeatingInc;
        self.heatingInterval = setInterval(function () {
            if (self.temperature === minBakingTemperature ||
                self.temperature === maxBakingTemperature) {
                inc *= -1;
            }

            self.temperature += inc;
            self.temp.val = self.temperature;
        }, sec);
    }

    process(isMachineOn, isPaused, delay) {
        console.log('Oven is called');

        return new Promise((resolve, reject) => {
            if (isMachineOn && this.temperature > maxBakingTemperature) {
                setTimeout(function () {
                    console.log('Oven is overheating!');
                    reject('Oven is overheated');
                }, delay);
            }
            else if (!isMachineOn) {
                reject('Machine is off');
            } else if (isPaused) {
                reject('Machine is paused');
            } else {
                super.processIt('Oven', resolve, this.temperature, delay);
            }
        });
    }
}
