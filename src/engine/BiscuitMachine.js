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

        this.conveyorCircleStart = this.conveyorCircleStart.bind(this);
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
        this.motor.process(isON, 2000)
            .then(pulse => this.extruder.process(pulse, 2000))
            .then(() => this.stamper.process('pulse', 2000))
            .then(() => this.oven.process(false))
            .then(temperature => this.produceBiscuit(temperature))
            .then(biscuit => console.log(biscuit))
            .catch(error => {console.log(error);})
            .then(() => this.circleConveyor(this.motor.isOn))
    }

    circleConveyor(isOn){
        this.conveyorCircleStart(isOn)
    }

    produceBiscuit(temperature) {
        if (temperature < minBakingTemperature || temperature > maxBakingTemperature) {
            throw ('Biscuit is not cooked.Temperature is' + temperature)
        }
        else {
            let biscuit = new Biscuit(true);
            this.biscuitsCount += 1;
            console.log(this.biscuitsCount);
            return biscuit
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