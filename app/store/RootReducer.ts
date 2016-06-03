import {AppState} from "./AppState";

export let rootReducer = (state: AppState, action): AppState => {
    console.log(state, action);

    if(!state) {
        state = {
            clicksCount: 0
        }
    }

    switch (action.type) {
        case 'INCREMENT':
            return { clicksCount: state.clicksCount + 1 };
        default:
            return state;
    }
};