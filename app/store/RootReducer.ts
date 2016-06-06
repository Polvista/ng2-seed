import {AppState} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";

export let rootReducer = (state: AppState, action): AppState => {
    console.log(state, action);

    if(!state) {
        state = {
            clicksCount: 0
        };
    }

    switch (action.type) {
        case ReduxTestsActions.INCREMENT:
            return { clicksCount: state.clicksCount + 1 };
        case 'ADD':
            return { clicksCount: state.clicksCount + action.num };
        default:
            return state;
    }
};