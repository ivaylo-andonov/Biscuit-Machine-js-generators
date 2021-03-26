import React, { Component } from 'react';
import { connect } from "react-redux";
import { Motor, Extruder, Stamper, Oven } from './engine/components';
import { BiscuitMachineView, SwitchView, BiscuitsView, TemperatureView } from './views';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <BiscuitMachineView>
                    <SwitchView onStart={this.props.onStart} onPause={this.props.onPause} onStop={this.props.onStop} />
                    <Motor deviceName={'Motor'}  {...this.props} />
                    <Extruder deviceName={'Extruder'} {...this.props} />
                    <Stamper deviceName={'Stamper'} {...this.props} />
                    <Oven deviceName={'Oven'} {...this.props} />
                    <TemperatureView  {...this.props} />
                    <BiscuitsView biscuitsCount={this.props.biscuitsCount} />
                </BiscuitMachineView>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        pausedComponent: state.pausedComponent,
        processingComponent: state.processingComponent,
        biscuitsCount: state.biscuitsCount,
        temperature: state.temperature
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onStart: () => dispatch({ type: "WARM_UP", mode: "WARM_UP" }),
        onStop: () => dispatch({ type: "STOP", mode: "STOP" }),
        onPause: () => dispatch({ type: "PAUSE", mode: "PAUSE" })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
