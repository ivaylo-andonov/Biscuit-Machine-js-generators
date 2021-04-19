import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Device } from './views'
import { BiscuitMachine, Switch, BiscuitsCount, Temperature } from './views';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <BiscuitMachine>
                    <Switch onStart={this.props.onStart} onPause={this.props.onPause} onStop={this.props.onStop} />
                    <Device deviceName={'Motor'}  {...this.props} />
                    <Device deviceName={'Extruder'} {...this.props} />
                    <Device deviceName={'Stamper'} {...this.props} />
                    <Device deviceName={'Oven'} {...this.props} />
                    <Temperature temperature={this.props.temperature} />
                    <BiscuitsCount biscuitsCount={this.props.biscuitsCount} />
                </BiscuitMachine>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { pausedComponent, currentComponent, biscuitsCount, temperature } = state;
    return {
        pausedComponent,
        currentComponent,
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
