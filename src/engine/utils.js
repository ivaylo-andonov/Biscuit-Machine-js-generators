import { oneSec } from '../config'

export const shouldResume = (machineState) => (
    machineState.pausedComponent &&
    machineState.pausedComponent === machineState.currentComponent
);

export const shouldChangeHeatingDir = (currentTemp, minBakingTemp, maxBakingTemp, increment) => (
    currentTemp === minBakingTemp && increment < 0) ||
    (currentTemp === maxBakingTemp && increment > 0)

export const processDelay = (callback, component) => setTimeout(() => {
    console.log(`${component} processed the biscuit successfully`);
    callback('pulse');
}, oneSec);

export const componentOnPause = (state) => state.pausedComponent;
export const componentInProcess = (state) => state.currentComponent;
export const currentTemperature = (state) => state.temperature;