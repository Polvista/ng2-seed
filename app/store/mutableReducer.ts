import {AppState} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {MutationManager} from "./mutations/MutationManager";
import {MutationManagerFactory} from "./mutations/MutationManagerFactory";
import {PerfUtils} from "./../redux/PerfUtils";
import {ReduxTestManager} from "../redux/ReduxTestManager";

let globalManagers = [];
let statePartManagers = {
    reduxTest: ReduxTestManager
};

initManagers();

export let rootMutableReducer = (state: AppState, action): AppState => {
    const mutationManager: MutationManager = MutationManagerFactory.getInstance();
    const mutableState: AppState = mutationManager.getMutableCopy(state);

    globalManagers.forEach(manager => {
        manager[action.type] && manager[action.type](mutableState, action);
    });

    Object.keys(statePartManagers).forEach(prop => {
        const manager = statePartManagers[prop];

        if(manager[action.type]) {
            let statePart = mutableState[prop];
            if(!statePart) {
                mutableState[prop] = manager.initialValue();
                statePart = mutableState[prop];
            }

            manager[action.type](statePart, action, mutableState);
        }
    });

    state = mutationManager.synchronizeState(state, mutableState);
    return state;
};

function initManagers() {
    globalManagers = globalManagers.map(managerClass => new managerClass());

    Object.keys(statePartManagers).forEach(prop => {
        statePartManagers[prop] = new statePartManagers[prop]();
    });
}