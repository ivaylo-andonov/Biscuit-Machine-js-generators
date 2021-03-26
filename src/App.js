import React, { Component } from 'react';
import { connect } from "react-redux";
import { Motor, Extruder, Stamper, Oven } from './engine/components';
import { BiscuitMachineView, SwitchView, BiscuitsView } from './views';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <BiscuitMachineView>
                    <SwitchView onStart={this.props.onStart} onPause={this.props.onPause} onStop={this.props.onStop} />
                    <Motor deviceName={'MOTOR'}  {...this.props} />
                    <Extruder deviceName={'EXTRUDER'} {...this.props} />
                    <Stamper deviceName={'STAMPER'} {...this.props} />
                    <Oven deviceName={'OVEN'} temperature={this.props.temperature} processingComponent={this.props.processingComponent} />
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
        onStart: () => dispatch({ type: "START", mode: "START" }),
        onStop: () => dispatch({ type: "STOP", mode: "STOP" }),
        onPause: () => dispatch({ type: "PAUSE", mode: "PAUSE" })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
