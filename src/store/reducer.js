import * as actions from '../actions'

const initialState = {
    processingComponent: "",
    pausedComponent: "",
    biscuitsCount: 0,
    temperature: 0
};

const rootReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case actions.WARM_UP:
            break;
        case actions.START:
            break;

        case actions.STOP:
            newState.biscuitsCount = 0
            newState.pausedComponent = null
            newState.processingComponent = ""
            newState.temperature = 0;
            break;

        case actions.PAUSE:
            newState.pausedComponent = state.processingComponent
            break;

        case actions.RESUME:
            newState.pausedComponent = ""
            break;

        case actions.TRIGGER_MOTOR:
            newState.processingComponent = "Motor";
            break;

        case actions.TRIGGER_EXTRUDER:
            newState.processingComponent = "Extruder";
            break;

        case actions.TRIGGER_STAMPER:
            newState.processingComponent = "Stamper";
            break;

        case actions.TRIGGER_OVEN:
            newState.processingComponent = "Oven";
            break;

        case actions.UPDATE_TEMP:
            newState.temperature += action.temp;
            break;

        case actions.PRODUCE_COOKIE:
            newState.biscuitsCount += 1;
            break;
    }

    return newState;
};

export default rootReducer;
