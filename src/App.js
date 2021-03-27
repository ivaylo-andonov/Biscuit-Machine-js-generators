import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { DeviceView } from './views'
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
                    <DeviceView deviceName={'Motor'}  {...this.props} />
                    <DeviceView deviceName={'Extruder'} {...this.props} />
                    <DeviceView deviceName={'Stamper'} {...this.props} />
                    <DeviceView deviceName={'Oven'} {...this.props} />
                    <TemperatureView temperature={this.props.temperature} />
                    <BiscuitsView biscuitsCount={this.props.biscuitsCount} />
                </BiscuitMachineView>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { pausedComponent, processingComponent, biscuitsCount, temperature } = state;
    return {
        pausedComponent,
        processingComponent,
        biscuitsCount,
        temperature
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

App.propTypes = {
    onStart: PropTypes.func,
    onStop: PropTypes.func,
    onPause: PropTypes.func,
    temperature: PropTypes.number,
    biscuitsCount: PropTypes.number
};
