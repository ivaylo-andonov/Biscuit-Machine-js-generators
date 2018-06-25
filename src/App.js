import React, { Component } from 'react';
import { BiscuitMachine } from './engine/BiscuitMachine';
import * as Devices from './engine/components';
import { BiscuitMachineView, SwitchView, CommonDeviceView } from './views';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleStart = this.handleStart.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleStop = this.handleStop.bind(this);

        this.biscuitMachine = this.constructBiscuitMachine()
    }

    constructBiscuitMachine() {
        return new BiscuitMachine.Builder("Machine for the sweetes biscuits")
            .withSwitch(new Devices.Switch())
            .withMotor(new Devices.Motor())
            .withExtruder(new Devices.Extruder())
            .withStamper(new Devices.Stamper())
            .withOven(new Devices.Oven())
            .build();
    }

    componentDidMount() {
        window.biscuitMachine = this.biscuitMachine;
    }

    handleStart() {
        this.biscuitMachine.start()
    }

    handlePause() {
        this.biscuitMachine.pause()
    }

    handleStop() {
        this.biscuitMachine.stop()
    }

    render() {
        return (
            <div className="app-biscuit-machine">
                <BiscuitMachineView>
                    <SwitchView onStart={this.handleStart} onPause={this.handlePause} onStop={this.handleStop} />
                    <CommonDeviceView deviceName={"Motor"} isInProcess={this.biscuitMachine.motor.isInProcess} />
                    <CommonDeviceView deviceName={"Extruder"} isInProcess={this.biscuitMachine.extruder.isInProcess} />
                    <CommonDeviceView deviceName={"Stamper"} isInProcess={this.biscuitMachine.stamper.isInProcess} />
                    <CommonDeviceView deviceName={"Oven"} isInProcess={this.biscuitMachine.oven.isInProcess} />
                </BiscuitMachineView>
            </div>
        );
    }
}

export default App