export const shouldResume = (machineState) => (machineState.pausedComponent && machineState.pausedComponent === machineState.processingComponent);
