import * as actions from '../actions';

const initialState = {
  currentComponent: null,
  pausedComponent: null,
  biscuitsCount: 0,
  temperature: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WARM_UP:
    case actions.START:
      return state;

    case actions.STOP:
      return {
        ...state,
        biscuitsCount: 0,
        pausedComponent: null,
        currentComponent: null,
        temperature: 0,
      };

    case actions.PAUSE:
      return {
        ...state,
        pausedComponent: state.currentComponent
      };

    case actions.RESUME:
      return { ...state, pausedComponent: null };

    case actions.TRIGGER_MOTOR:
      return { ...state, currentComponent: 'Motor' };

    case actions.TRIGGER_EXTRUDER:
      return { ...state, currentComponent: 'Extruder' };

    case actions.TRIGGER_STAMPER:
      return { ...state, currentComponent: 'Stamper' };

    case actions.TRIGGER_OVEN:
      return { ...state, currentComponent: 'Oven' };

    case actions.UPDATE_TEMP:
      return { ...state, temperature: state.temperature + action.temp };

    case actions.PRODUCE_COOKIE:
      return { ...state, biscuitsCount: ++state.biscuitsCount };

    default: return state;
  }
};

export default rootReducer;
