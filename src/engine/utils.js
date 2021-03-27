export const shouldResume = (machineState) => (
    machineState.pausedComponent &&
    machineState.pausedComponent === machineState.processingComponent
);

export const processDelay = (callback, component) => setTimeout(() => {
    console.log(`${component} processed the biscuit successfully`);
    callback('pulse');
}, 1000);