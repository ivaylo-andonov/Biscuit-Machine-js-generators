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
            <div className="App">
                <BiscuitMachineView>
                    <SwitchView onStart={this.handleStart} onPause={this.handlePause} onStop={this.handleStop}/>
                    <CommonDeviceView device={this.biscuitMachine.motor}/>
                    <CommonDeviceView device={this.biscuitMachine.extruder}/>
                    <CommonDeviceView device={this.biscuitMachine.stamper}/>
                    <CommonDeviceView device={this.biscuitMachine.oven}/>
                </BiscuitMachineView>
            </div>
        );
    }
}

export default App