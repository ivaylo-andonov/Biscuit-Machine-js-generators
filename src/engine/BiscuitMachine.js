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
        this.biscuitsCount = 0;

        this.interval;

        this.circleConveyor = this.circleConveyor.bind(this);
        this.conveyorCircleStart = this.conveyorCircleStart.bind(this);
        this.produceBiscuit = this.produceBiscuit.bind(this)
    }

    start() {
        this.motor.turnOn();
        this.oven.turnOn(this.conveyorCircleStart);
    }

    stop() {
        this.motor.turnOff();
    }

    pause() {

    }

    conveyorCircleStart(isON) {
        this.circleConveyor();
        this.interval = setInterval(this.circleConveyor, 10 * 1000)
    }

    circleConveyor() {
        this.motor.process(true, this, 2 * 1000)
            .then(pulse => this.extruder.process('pulse', this, 2 * 1000))
            .then(() => this.stamper.process('pulse', this, 2 * 1000))
            .then(() => this.oven.process(false, this, 2 * 1000))
            .then(temperature => this.produceBiscuit(temperature, 1 * 1000))
            .catch(error => {
                console.log(error);
                clearInterval(this.interval)
            })
    }

    produceBiscuit(temperature, delay) {
        if (temperature < minBakingTemperature || temperature > maxBakingTemperature) {
            throw ('Biscuit is not cooked.Temperature is' + temperature)
        }
        else {
            setTimeout(() => {
                console.log('New biscuit is produced!');
                this.biscuitsCount += 1;
                console.log('Biscuits count: ' + this.biscuitsCount)
                console.log(new Biscuit(true));
            }, delay);
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