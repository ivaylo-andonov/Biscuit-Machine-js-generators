const initialState = {
    processingComponent: "",
    pausedComponent: "",
    biscuitsCount: 0,
    temperature: 0
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case "START":
            break;

        case "STOP":
            newState.biscuitsCount = 0
            newState.pausedComponent = null
            newState.processingComponent = ""
            break;

        case "PAUSE":
            newState.pausedComponent = state.processingComponent
            break;

        case "RESUME":
            newState.pausedComponent = ""
            break;

        case "MOTOR":
            newState.processingComponent = "MOTOR";
            break;

        case "EXTRUDER":
            newState.processingComponent = "EXTRUDER";
            break;

        case "STAMPER":
            newState.processingComponent = "STAMPER";
            break;

        case "OVEN":
            newState.processingComponent = "OVEN";
            break;

        case "INCREASE_TEMP":
            newState.temperature += action.temp;
            break;

        case "PRODUCE_COOKIE":
            newState.biscuitsCount += 1;
            break;
    }
    return newState;
};

export default reducer;
