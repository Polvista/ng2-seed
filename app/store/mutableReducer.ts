import {AppState} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {MutationManager} from "./mutations/MutationManager";
import {MutationManagerFactory} from "./mutations/MutationManagerFactory";
import {PerfUtils} from "./../redux/PerfUtils";
import {ReduxTestManager} from "../redux/ReduxTestManager";
import {Action} from "./Action";
import {RootManager} from "./RootManager";
import {PARTS_MANAGERS_PROPERTY} from "./StateManager";
import {InnerManagerDescription} from "./StateManager";
import {ACTIONS_MAP_PROPERTY} from "./OnAction";

const rootManager: RootManager = new RootManager();

export let rootMutableReducer = (state: AppState, action: Action): AppState => {
    const mutationManager: MutationManager = MutationManagerFactory.getInstance();
    const mutableState: AppState = mutationManager.getMutableCopy(state);

    manageAction(mutableState, action, mutableState, rootManager);

    state = mutationManager.synchronizeState(state, mutableState);
    return state;
};

function manageAction(statePart: any, action: Action, state: AppState, manager: any) {
    if(manager[ACTIONS_MAP_PROPERTY] && manager[ACTIONS_MAP_PROPERTY][action.type]) {
        manager[ACTIONS_MAP_PROPERTY][action.type].forEach(( {handlerMethodName} ) => {
            manager[handlerMethodName](statePart, action, state);
        });
    }

    if(typeof(statePart) !== "undefined" && statePart !== null) {
        const innerManagersDescriptions: InnerManagerDescription[] = manager[PARTS_MANAGERS_PROPERTY] || [];
        innerManagersDescriptions.forEach(description => {
            if(!statePart[description.selector] && description.manager[action.type]) {
                statePart[description.selector] = description.initialValue;
            }
            manageAction(statePart[description.selector], action, state, description.manager);
        });
    }

}