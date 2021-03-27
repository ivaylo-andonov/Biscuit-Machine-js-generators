export const WARM_UP = 'WARM_UP';
export const START = 'START';
export const STOP = 'STOP';
export const PAUSE = 'PAUSE';
export const RESUME = 'RESUME';
export const TRIGGER_MOTOR = 'TRIGGER_MOTOR';
export const TRIGGER_EXTRUDER = 'TRIGGER_EXTRUDER';
export const TRIGGER_STAMPER = 'TRIGGER_STAMPER';
export const TRIGGER_OVEN = 'TRIGGER_OVEN';
export const PRODUCE_COOKIE = 'PRODUCE_COOKIE';
export const UPDATE_TEMP = 'UPDATE_TEMP';

export const updateTemp = (temp) => ({ type: UPDATE_TEMP, temp });
export const startConveyor = () => ({ type: START });
