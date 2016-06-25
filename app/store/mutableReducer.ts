import {AppState} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {MutationManager} from "./mutations/MutationManager";
import {MutationManagerFactory} from "./mutations/MutationManagerFactory";
import {PerfUtils} from "./PerfUtils";


export let mainReducer = (state: AppState, action) => {
    switch (action.type) {
        case ReduxTestsActions.INIT_PERF:
            state.perf = PerfUtils.generateBigState();
            break;
        case ReduxTestsActions.INCREMENT:
            state.clicksCount++;
            state.someData.id++;
            delete state.name;
            state.justVal = true;
            break;
        case ReduxTestsActions.ADD_NUM:
            state.clicksCount += action.num;
            break;
    }
};

export let rootMutableReducer = (state: AppState, action): AppState => {
    console.time('reducer');
    const mutationManager: MutationManager = MutationManagerFactory.getInstance();
    const mutableState: AppState = mutationManager.getMutableCopy(state);

    mainReducer(mutableState, action);

    state =  mutationManager.synchronizeState(state, mutableState);
    console.timeEnd('reducer');
    return state;
};