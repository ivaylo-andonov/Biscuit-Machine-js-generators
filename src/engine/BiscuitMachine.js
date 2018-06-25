import Biscuit from './../products/Biscuit';
import { observable } from 'mobx';
import { minBakingTemperature, maxBakingTemperature } from './components/Oven';

export const sec = 1000;

export class BiscuitMachine {

    constructor(build) {

        this.machineName = build.machineName;
        this.switch = build.switch;
        this.motor = build.motor;
        this.extruder = build.extruder;
        this.stamper = build.stamper;
        this.oven = build.oven;

        this.isOn = false;
        this.isPaused = false;
        this.biscuitsCount = observable({val: 0});

        this.conveyorCircleStart = this.conveyorCircleStart.bind(this);
        this.produceBiscuit = this.produceBiscuit.bind(this)
    }

    start() {
        this.isOn = true;
        console.log('Machine is started');
        this.oven.turnOn(this.conveyorCircleStart);
    }

    stop() {
        this.isOn = false;
        this.oven.turnOff();
        this.biscuitsCount.val = 0;
    }

    pause() {
        this.isPaused = true;
        this.isOn = false;
    }

    // Conveyor revolution
    conveyorCircleStart() {
        this.motor.process(this.isOn, this.isPaused, 1 * sec)
            .then(pulse => this.extruder.process(pulse, this.isOn, this.isPaused, 1 * sec))
            .then(() => this.stamper.process(this.motor.pulse, this.isOn, this.isPaused, 1 * sec))
            .then(() => this.oven.process(this.isOn, 1 * sec))
            .then(temperature => this.produceBiscuit(temperature, 0.5 * sec))
            .then(() => this.conveyorCircleStart())
            .catch(error => {
                console.log(error);
            })
    }

    produceBiscuit(temperature, delay) {
        if (temperature < minBakingTemperature || temperature > maxBakingTemperature) {
            throw ('Biscuit is not cooked well.Temperature is' + temperature)
        }
        else if (!this.isOn) {
            throw ('Machine is off');
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    var biscuit = new Biscuit(true);
                    console.log('New biscuit is produced!');
                    console.log(biscuit);
                    this.biscuitsCount.val++;
                    resolve(biscuit)
                }, delay);
            });
        }
    }

    static get Builder() {
        class Builder {
            constructor(name) {
                this.machineName = name;
            }
            withSwitch(switchInstance) {
                this.switch = switchInstance;
                return this;
            }
            withMotor(motorInstance) {
                this.motor = motorInstance;
                return this;
            }
            withExtruder(extruderInstance) {
                this.extruder = extruderInstance;
                return this;
            }
            withStamper(stamperInstance) {
                this.stamper = stamperInstance;
                return this;
            }
            withOven(ovenInstance) {
                this.oven = ovenInstance;
                return this;
            }
            build() {
                return new BiscuitMachine(this);
            }
        }
        return Builder;
    }
}