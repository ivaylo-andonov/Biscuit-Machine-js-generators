import React, { Component } from 'react';
import { BiscuitMachine } from './engine/BiscuitMachine';
import * as Devices from './engine/components';
import { BiscuitMachineView, SwitchView, DeviceView, BiscuitsView } from './views';

class App extends Component {
    constructor(props) {
        super(props); 

        this.biscuitMachine = this.constructBiscuitMachine();

        this.handleStart = this.handleStart.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleStop = this.handleStop.bind(this);
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

    handleStart() {
        this.biscuitMachine.switch.start(this.biscuitMachine)
    }

    handlePause() {
        this.biscuitMachine.switch.pause(this.biscuitMachine)
    }

    handleStop() {
        this.biscuitMachine.switch.stop(this.biscuitMachine)
    }

    render() {
        return (           
            <div className="app-biscuit-machine">
                <BiscuitMachineView>
                    <SwitchView onStart={this.handleStart} onPause={this.handlePause} onStop={this.handleStop} />
                    <DeviceView deviceName={'Motor'} isInProcess={this.biscuitMachine.motor.isInProcess}  />
                    <DeviceView deviceName={'Extruder'} isInProcess={this.biscuitMachine.extruder.isInProcess} />
                    <DeviceView deviceName={'Stamper'} isInProcess={this.biscuitMachine.stamper.isInProcess} />
                    <DeviceView deviceName={'Oven'} isInProcess={this.biscuitMachine.oven.isInProcess} temperature={this.biscuitMachine.oven.temp}/>
                    <BiscuitsView biscuits={this.biscuitMachine.biscuitsCount}/>
                </BiscuitMachineView>
            </div>
        );
    }
}

export default App