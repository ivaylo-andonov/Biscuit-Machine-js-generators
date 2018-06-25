import Biscuit from './../products/Biscuit';
import { minBakingTemperature, maxBakingTemperature } from './components/Oven'

export class BiscuitMachine {

    constructor(build) {

        this.machineName = build.machineName;
        this.switch = build.switch;
        this.motor = build.motor;
        this.extruder = build.extruder;
        this.stamper = build.stamper;
        this.oven = build.oven;
        this.pulse = null;

        this.biscuits = [];
        this.interval;
        this.isPaused = false;

        this.conveyorCircleStart = this.conveyorCircleStart.bind(this);
        this.produceBiscuit = this.produceBiscuit.bind(this)
    }

    start() {
        this.motor.turnOn();
        this.oven.turnOn(this.conveyorCircleStart);
        this.isPaused = false;
    }

    stop() {
        this.motor.turnOff();
    }

    pause() {
        this.isPaused = true;
    }

    conveyorCircleStart() {
        this.motor.process(true, this, 2 * 1000)
            .then(pulse => this.extruder.process(pulse, this, 2 * 1000))
            .then(() => this.stamper.process(this.motor.pulse, this, 2 * 1000))
            .then(() => this.oven.process(false, this, 2 * 1000))
            .then(temperature => this.produceBiscuit(temperature, 2 * 1000))
            .then(() => this.conveyorCircleStart())
            .catch(error => {
                console.log(error);
            })
    }

    produceBiscuit(temperature, delay) {
        if (temperature < minBakingTemperature || temperature > maxBakingTemperature) {
            throw ('Biscuit is not cooked.Temperature is' + temperature)
        }
        else if (!this.motor.isOn) {
            throw ('Machine is off');
        }
        else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    var biscuit = new Biscuit(true);
                    this.biscuits.push(biscuit);
                    console.log('New biscuit is produced!' + biscuit.type);
                    console.log('Biscuits count: ' + this.biscuits.length);
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